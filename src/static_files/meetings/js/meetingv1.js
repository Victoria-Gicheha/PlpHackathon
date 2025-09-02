// meeting.js

let localStream;
let screenStream;
let peerConnections = {};
let mediaRecorder;
let recordedChunks = [];

const localVideo = document.getElementById('localVideo');
const remoteVideos = document.getElementById('remoteVideos');
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
const screenShareButton = document.getElementById('screenShareButton');
const recordButton = document.getElementById('recordButton');
const stopRecordButton = document.getElementById('stopRecordButton');
const mainscreen = document.getElementById('screensharingvideoplayer');

const servers = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'turn:your.turn.server', username: 'user', credential: 'pass' }
  ]
};

startButton.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
  mainscreen.srcObject = localStream;
};

callButton.onclick = () => {
  const ws = new WebSocket('ws:https://' + window.location.host + '/ws/meetings/' + roomName + '/');

  ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    handleSignalingData(data);
  };

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'join' }));
  };

  function handleSignalingData(data) {
    const peerId = data.sender;
    if (data.type === 'offer') {
      createPeerConnection(peerId, ws);
      peerConnections[peerId].setRemoteDescription(new RTCSessionDescription(data.offer));
      peerConnections[peerId].createAnswer()
        .then(answer => peerConnections[peerId].setLocalDescription(answer))
        .then(() => {
          ws.send(JSON.stringify({ type: 'answer', answer: peerConnections[peerId].localDescription, sender: peerId }));
        });
    } else if (data.type === 'answer') {
      peerConnections[peerId].setRemoteDescription(new RTCSessionDescription(data.answer));
    } else if (data.type === 'ice') {
      peerConnections[peerId].addIceCandidate(new RTCIceCandidate(data.ice));
    } else if (data.type === 'join' && data.sender !== ws.channel) {
      createPeerConnection(peerId, ws);
      peerConnections[peerId].createOffer()
        .then(offer => peerConnections[peerId].setLocalDescription(offer))
        .then(() => {
          ws.send(JSON.stringify({ type: 'offer', offer: peerConnections[peerId].localDescription, sender: peerId }));
        });
    }
  }

  function createPeerConnection(peerId, ws) {
    const peerConnection = new RTCPeerConnection(servers);
    peerConnections[peerId] = peerConnection;

    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    if (screenStream) {
      screenStream.getTracks().forEach(track => peerConnection.addTrack(track, screenStream));
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(JSON.stringify({ type: 'ice', ice: event.candidate, sender: peerId }));
      }
    };

    peerConnection.ontrack = (event) => {
      let remoteVideo = document.getElementById(peerId);
      if (!remoteVideo) {
        remoteVideo = document.createElement('video');
        remoteVideo.id = peerId;
        remoteVideo.autoplay = true;
        remoteVideos.appendChild(remoteVideo);
      }
      remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.oniceconnectionstatechange = () => {
      if (peerConnection.iceConnectionState === 'disconnected') {
        let remoteVideo = document.getElementById(peerId);
        if (remoteVideo) {
          remoteVideo.remove();
        }
        delete peerConnections[peerId];
      }
    };
  }
};

hangupButton.onclick = () => {
  for (const peerId in peerConnections) {
    peerConnections[peerId].close();
    let remoteVideo = document.getElementById(peerId);
    if (remoteVideo) {
      remoteVideo.remove();
    }
  }
  peerConnections = {};
};

screenShareButton.onclick = async () => {
  screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const screenShareVideo = document.createElement('video');
  screenShareVideo.id = 'screenShareVideo';
  screenShareVideo.autoplay = true;
  screenShareVideo.srcObject = screenStream;
  // remoteVideos.appendChild(screenShareVideo);
  // const mainscreen = document.getElementById('screen-sharing-video-player');
  mainscreen.autoplay = true
  mainscreen.srcObject = screenStream;
  screenStream.getTracks().forEach(track => {
    for (const peerId in peerConnections) {
      peerConnections[peerId].addTrack(track, screenStream);
    }
  });
};

recordButton.onclick = () => {
  let allStreams = new MediaStream();
  for (const track of localStream.getTracks()) {
    allStreams.addTrack(track);
  }
  for (const peerId in peerConnections) {
    for (const track of peerConnections[peerId].getReceivers().map(receiver => receiver.track)) {
      allStreams.addTrack(track);
    }
  }
  mediaRecorder = new MediaRecorder(allStreams);
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };
  mediaRecorder.start();
};

stopRecordButton.onclick = () => {
  mediaRecorder.stop();
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'recording.webm';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};
