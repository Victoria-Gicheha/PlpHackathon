(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    var val = aliases[name];
    return (val && name !== val) ? expandAlias(val) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("js/app.js", function(exports, require, module) {
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".


// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

require("phoenix_html");

require("./socket");

var _vue = require("vue/dist/vue");

var _vue2 = _interopRequireDefault(_vue);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _vueAxios = require("vue-axios");

var _vueAxios2 = _interopRequireDefault(_vueAxios);

var _veeValidate = require("vee-validate");

var _veeValidate2 = _interopRequireDefault(_veeValidate);

var _highchartsVue = require("highcharts-vue");

var _highchartsVue2 = _interopRequireDefault(_highchartsVue);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueTelInput = require("vue-tel-input");

var _vueTelInput2 = _interopRequireDefault(_vueTelInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Swal = _sweetalert2.default;

_vue2.default.mixin({
    data: function data() {
        return {
            window: window
        };
    },

    methods: {
        showValidationErrors: function showValidationErrors(errors) {
            var _this = this;

            var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            Object.entries(errors).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                _this.errors.add({
                    field: key,
                    msg: value[0],
                    scope: scope
                });
                _this.$validator.flag(key, {
                    valid: false,
                    dirty: true
                });
            });
        }
    }
});
_vue2.default.use(_veeValidate2.default, {
    classes: true
});
_vue2.default.use(_vueAxios2.default, _axios2.default);
_vue2.default.axios.defaults.headers.post['x-csrf-token'] = window.csrf_token;

_vue2.default.use(_highchartsVue2.default);
_vue2.default.use(_vueTelInput2.default);
require('./components');

if ('development' === 'production') {
    _vue2.default.config.devtools = false;
}
});

;require.register("js/components/Modal.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".modal-mask[data-v-17f96188] {\n    position: fixed;\n    z-index: 9998;\n    top: 0;\n    left: 0;\n    width: 100%;\n    min-height: 100%;\n    background-color: rgba(0, 0, 0, 0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    transition: opacity 0.3s ease;\n    overflow-y: scroll;\n}\n\n.modal-wrapper[data-v-17f96188] {\n    padding: 10px;\n    position: absolute;\n}\n\n.modal-container[data-v-17f96188] {\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    padding: 20px 30px;\n    background-color: #fff;\n    border-radius: 2px;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n    transition: all 0.3s ease;\n    font-family: Helvetica, Arial, sans-serif;\n@media (max-width: 650px) {\n    width: 100% !important;\n}\n@media(max-height: 650px){\n    height: auto !important;\n}\n}\n\n.modal-body[data-v-17f96188] {\n    flex-grow: 1;\n    margin: 20px 0;\n@media (max-width: 480px) {\n    margin: 0;\n}\n}\n\n.modal-footer[data-v-17f96188]{\n    margin-top: auto;\n}\n\n.modal-enter[data-v-17f96188] {\n    opacity: 0;\n}\n\n.modal-leave-active[data-v-17f96188] {\n    opacity: 0;\n}\n\n.modal-enter .modal-container[data-v-17f96188],\n.modal-leave-active .modal-container[data-v-17f96188] {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n}\n\n.close[data-v-17f96188] {\n    cursor: pointer;\n    position: absolute;\n    width: 20px;\n    height: 20px;\n    background-size: cover;\n    top: 8px;\n    right: 8px;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACClBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACITYxqAAAArXRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFxgZGhscHR4fICEjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BCQ0RFRkdJSktMTU5PUFFUVVZXWFtcYWJjZGZoaWtsb3Bxc3R1eHl7fH6AgoOFhoiJi4yPkZKUlZeYmp6goqOmqKqrra+wsrS5ury+wMHDxcfIyszOz9HT1dfZ2tze4OLk5ujp6+3v8fP19/n7/QUyX7MAAAWVSURBVGjerZrnQxRHFMDfnRwcIgIWLCcW1HiaSGKMRGNHoimaojFFLFFMNGqqojERBazIJZoIeAYBz6N45fc/5sMucLBtZm/nE7f7dn7MzGvzZkTUWqiibttXlzu6+1LZl097Oq+27Fo5JyQBttDij9uzWFv+zuG6cCCE8PpreVzarc2zikXEzr/Cq+V/W1MMYs2DyZ6ynWf2r5sXjYRDIuGSaPWappPt45Nvn2zyi9j42Owi09a0wHaRa3b8PGrK/LfdD6L6rjkZ1za4LW6o/kdTJx4v0V7uY8aXQ/tKvGUb+w3hCxEtxtJBAPobFU1hfQKA0Q0ajE8AGNGZ5g3Gv3VK1UBLbgBwrkRvgr/OA3SXK0lXPgdILtJWlbkJgNHFCqK1IwBtfsw4dBYgu9ZTcFUGyDf7NK23XgFs9ZBqyAPjMd8+onoY4CP3ceSB1LwiPFF5P4CbXtZmgGcVRbnUSA9A3Fk9RoCBsmJjw19AbqmTfTwHRiqLjkClSWDMYT7agUxtAHGuIgX8bWv7nwOslSDaghxwzubFMoAvA8oKdgK8Y12uYeBuYLnHr0AmOvPpSSBdFhgk/BS4NuPhPIA3A0yjFgPMSDDuA7eDzNXkIvBsmoZtAqgKFBIZAw4VPukFjlsFo4m5aubXU2N9uBdIF+QgcSBrzQKiSVIqlNI+0lZKaBjYN/U7AZyyakgSVCilfUDaoq/yPjA0uSp1ALOtXzejQintA2ixUeMxoHHi1yXgJ7vvVSiODJEjwL0JYhaoE38UF4ZUAJjZy0bgpUMfXhQ3hshD4EPjzz/s9VeF4s6QvcATY7YAnMOIG8WDIWWTGhUDxl1m3ZnixRB5BGwSEfkUuC4+KN4MaQG+ExHpBPaLPkWBIXFgQERCedclcaSoMIxFiYrMAfDaKFspSgyRFBATWQG88PRPMymKDOkA3jVi/i3RpKgypBU4KnIMaBU9ijJDPgCuiFwFDogWRZ0hceCxSFehP1aiaDAkBgwZAesN0aCs1mDIQiAj8hRYLRoUNBhSDSCSBpaJJkWVIbMNK8wB6jvdL4zSg7J8GcAsvZEYa66WwxSORGdNTIYGxVwTDe0yGHd1KKZ2qdvJhH00a1BMO1G2+Ckb1KCYFn8MOKPF0KEcMHzXLjUvPN2XKFNajT3iSqV4MtNfqVI6jFKLUmS0+kRFygvDClVivJ3fVaJMxHjp8sxW7H27CmUiW/HOu5zihwKlBfheJYN0jlHelMkM0iMXdouDXpQyAKOS86dbVu8eaz0oU1m9NAApf3sDD0r31P4knHUMKd45gxulcKflvGdUyUtcKIV7RmP3W+6P4UIJj06LIgngpFVIMfcxKFHb58Mhr4rEQcW8pBk4ba1IDE2vSEivfXcHFXOfZhuG7AFGCj3v2w5VohWK+cIKlSqRPAC6Ai1FXbDUu2R+0JW7RTaVu8BrkP02NUiZNQzcCQzyi2011bDIowExdgBssXlx2G4W/bX5WeC87aubQGZhAIyKFPDI/pwuMgik5xRfR00C4079VI0Gcn6SAHLOJ1a1WSA5u7hxeJwEidQDvKgpglHeB7DDVaYhD4z5P52rGvI+nROpzwD5Jp+MhnGA9zzljBPTK75OTFsBcusUROcOAiT1D7cqEwBjamf/kXYAzmqeYh/NAzwsV/3gMwDSWzUY8QEATmtcmIkNAdC7RfGb+EMAxjbqDf64sWEfbPLWgHCjub2/FNFdxpp75m2PtrjbcEKrLmYMwX98WVfDv2b94dXl3fNtQVXbLo2YMgM7/V5feq176gZOx7fNa2uiJWERCZeUVdXvOXFj6gZO7+ZibkjFfsh43yW6XHSoC79+3fVWVOeWom9FGZwlh27m7AD3jiwPhjChRRXLt3/T1tnT/zKXTiZu/35i96rKQG+qFd3+B8bFMLqaFutAAAAAAElFTkSuQmCC);\n}")
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        width: {
            'default': '650px'
        },
        height: {
            'default': 'auto'
        }
    },
    name: 'Modal'
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"modal"}},[_c('div',{staticClass:"modal-mask"},[_c('div',{staticClass:"modal-wrapper"},[_c('div',{staticClass:"modal-container",style:({width: _vm.width, height: _vm.height})},[_c('div',{staticClass:"close",on:{"click":function($event){return _vm.$emit('close')}}}),_vm._v(" "),_c('div',{staticClass:"modal-header"},[_vm._t("header")],2),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_vm._t("body",function(){return [_vm._v("\n                        Body\n                    ")]})],2),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_vm._t("footer")],2)])])])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-17f96188"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17f96188", __vue__options__)
  } else {
    hotAPI.reload("data-v-17f96188", __vue__options__)
  }
})()}
});

;require.register("js/components/Prompt.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    url: {
      default: false
    },
    title: {
      default: "Confirm"
    },
    beforeSubmit: {
      default: function _default() {
        return function () {
          return _promise2.default.resolve(true);
        };
      }
    },
    message: {
      default: "Are you sure you want to do this?"
    },
    ajax: {
      default: true
    },
    method: {
      default: "GET"
    },
    actionClass: {
      default: ""
    },
    actionStyle: {
      default: function _default() {
        return {};
      }
    },
    actionText: {
      default: "Confirm"
    },
    payload: {
      default: function _default() {
        return {};
      }
    },
    cancelText: {
      default: "Cancel"
    },
    okText: {
      default: "Continue"
    },
    okBtnClass: {
      default: "btn-warning"
    },
    cancelBtnClass: {
      default: "btn-success"
    }
  },
  data: function data() {
    return {
      show: false,
      sending: false,
      csrf_token: this.$attrs["csrf_token"]
    };
  },

  computed: {
    requestMethod: function requestMethod() {
      var method = (this.method || "GET").toLowerCase();

      if (!(method === "get" || method === "post")) {
        method = "post";
      }

      return method;
    }
  },
  methods: {
    showModal: function showModal() {
      $(this.$el).parents(".dropdown-menu").css({ display: "block" });
      this.show = true;
    },
    doCancel: function doCancel() {
      $(this.$el).parents(".dropdown-menu").css({ display: "" });
      this.$emit("cancelled");
      this.show = false;
    },
    doAction: function doAction() {
      var _this = this;

      if (!this.url) {
        this.$emit("confirmed");
        this.show = false;
        return true;
      }

      if (typeof this.beforeSubmit === "function") {
        var proceed = this.beforeSubmit().then(function (proceed) {
          if (!proceed) {
            return false;
          }

          if (_this.ajax) {
            _this.performAjax();
          } else {
            _this.performRequest();
          }
        });
      } else {
        if (this.ajax) {
          this.performAjax();
        } else {
          this.performRequest();
        }
      }
    },
    performAjax: function performAjax() {
      var _this2 = this;

      this.sending = true;

      var data = new FormData(this.$refs["form"]);

      (0, _entries2.default)(this.payload).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        data.append(key, value);
      });

      var jsonObject = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(data.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          jsonObject[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.$http[this.method](this.url, jsonObject).then(function (response) {
        _this2.$emit("success", response.data);
        _this2.show = false;
      }).catch(function (error) {
        _this2.$emit("failed", error.response);
      }).finally(function () {
        _this2.sending = false;
      });
    },
    performRequest: function performRequest() {
      if (this.requestMethod === "get") {
        window.location.href = this.url;
      } else {
        this.$refs["form"].submit();
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"d-inline"},[_c('a',{class:_vm.actionClass,attrs:{"href":""},on:{"click":function($event){$event.preventDefault();return _vm.showModal()}}},[_vm._v(_vm._s(_vm.actionText))]),_vm._v(" "),(_vm.show)?_c('modal',{on:{"close":function($event){return _vm.doCancel()}}},[_c('h4',{attrs:{"slot":"header"},slot:"header"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{attrs:{"slot":"body"},slot:"body"},[_c('form',{ref:"form",attrs:{"action":_vm.url,"method":_vm.requestMethod}},[_c('input',{attrs:{"type":"hidden","name":"_method"},domProps:{"value":_vm.method}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"_csrf_token"},domProps:{"value":_vm.csrf_token}}),_vm._v(" "),_c('div',[_vm._t("default",function(){return [_vm._v(_vm._s(_vm.message))]})],2)])]),_vm._v(" "),_c('div',{staticClass:"text-right",attrs:{"slot":"footer"},slot:"footer"},[_c('button',{staticClass:"btn",class:_vm.cancelBtnClass,on:{"click":function($event){$event.preventDefault();return _vm.doCancel()}}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('button',{staticClass:"btn",class:_vm.okBtnClass,on:{"click":function($event){$event.preventDefault();return _vm.doAction()}}},[(_vm.sending)?_c('span',{staticClass:"fa fa-spinner fa-spin"}):_vm._e(),_vm._v("\n        "+_vm._s(_vm.okText)+"\n      ")])])]):_vm._e()],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22150865", __vue__options__)
  } else {
    hotAPI.reload("data-v-22150865", __vue__options__)
  }
})()}
});

;require.register("js/components/account/details.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ['chartdata', 'date-range'],
    data: function data() {
        return {
            date_range: [],
            async_dates: [],
            async_data: []
        };
    },

    computed: {
        current_range: function current_range() {

            if (this.date_range && this.date_range[0] && this.date_range[1]) {
                return this.date_range.join(" - ");
            }
            return "";
        }
    },
    mounted: function mounted() {
        var data = this.chartdata;
        /*data = data.sort(function (d1, d2) {
            let m1 = moment(d1.date);
            let m2 = moment(d2.date);
            if (m1.isBefore(m2)) return -1;
            if (m1.isSame(m2)) return 0;
            if (m1.isAfter(m2)) return 1;
        });*/
        this.async_dates = this.chartdata.map(function (d) {
            return (0, _moment2.default)(d.inserted_at).format("ddd Do MMM hh:mm:ss");
        });
        this.async_data = this.chartdata.map(function (d) {
            return Math.floor(parseFloat(d.balance));
        });

        this.date_range = (this.dateRange || "").split(" - ");
        this.showChart();
    },

    methods: {
        applyFilter: function applyFilter() {
            this.$nextTick(function () {
                document.getElementById("filter-form").submit();
            });
        },
        showChart: function showChart() {
            Highcharts.chart('graph', {
                title: { text: 'Transactions Summary' },
                xAxis: {
                    type: 'datetime',

                    title: {
                        text: 'Date'
                    },
                    categories: this.async_dates
                },
                yAxis: {

                    title: { text: 'Account Balance' },
                    min: 0
                },
                legend: { layout: 'vertical', align: 'right', vertical_align: 'middle' },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Account Balance',
                    //data: this.chartdata || []
                    data: this.async_data
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        }
    }
};
});

;require.register("js/components/admin/AdminAccountModalForms.vue", function(exports, require, module) {
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"btn-group",attrs:{"role":"group","aria-label":"Basic example"}},[_c('button',{staticClass:"btn btn-outline-primary",attrs:{"type":"button"}},[_vm._v("Create")]),_vm._v(" "),_c('div',{staticClass:"btn-group",attrs:{"role":"group"}},[_c('button',{staticClass:"btn btn-secondary dropdown-toggle",attrs:{"id":"btnGroupDrop1","type":"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}},[_vm._v("\n        Account For\n      ")]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu",attrs:{"aria-labelledby":"btnGroupDrop1"}},[_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addMerchantAccountModal"}},[_vm._v("Merchant")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addServiceAccountModal"}},[_vm._v("Service")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addGatewayAccountModal"}},[_vm._v("Payment Gateway")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addBankAccountModal"}},[_vm._v("Bank Account")]),_vm._v(" "),_c('div',{staticClass:"dropdown-divider"}),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addCustomerAccountModal"}},[_vm._v("Customer")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-toggle":"modal","data-target":"#addAgentAccountModal"}},[_vm._v("Agent")])])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b3b331fe", __vue__options__)
  } else {
    hotAPI.reload("data-v-b3b331fe", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminApplicationCustomersRevenue.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["weeklyapplicationscustomers", "monthlyapplicationscustomers", "biweeklyapplicationscustomers", "dates", "default_currency"],
  data: function data() {
    return {
      wklappcustomers: [],
      biwklyappcustomers: [],
      monapplicationscustomers: [],
      loading: false,
      annual_data: [],
      selected_year: "",
      selected_year_val: "",
      annual_drill_downs: {},
      month_names: {
        1: "jan",
        2: "feb",
        3: "mar",
        4: "apr",
        5: "may",
        6: "jun",
        7: "jul",
        8: "aug",
        9: "sep",
        10: "oct",
        11: "nov",
        12: "dec"
      }
    };
  },

  created: function created() {},
  watch: {
    weeklyapplicationscustomers: function weeklyapplicationscustomers(val) {
      this.renderApplicationsCustomersRevenueGraph("Last 7 days", val, "weekly-applications-customers-currency");
    },
    monthlyapplicationscustomers: function monthlyapplicationscustomers(val) {
      this.renderApplicationsCustomersRevenueGraph("Last 30 days", val, "monthly-applications-customers-currency");
    },
    biweeklyapplicationscustomers: function biweeklyapplicationscustomers(val) {
      this.renderApplicationsCustomersRevenueGraph("Last 14 days", val, "bi-weekly-applications-customers-currency");
    }
  },
  methods: {
    refresh_data: function refresh_data() {
      if (this.selected_year) {
        this.selected_year_val = this.selected_year.id;
      }
      this.loadData(this.selected_year_val);
      this.selected_year_val = "";
    },
    loadData: function loadData(the_year) {
      var _this = this;
      this.loading = true;
      $.ajax({
        url: "/api/dashboard/admin/annual",
        method: "GET",
        data: {
          fetch: "annual-view",
          filter: {
            merchant: "",
            service: "",
            year: the_year
          }
        },
        success: function success(response) {
          console.log(response.data);
          _this.parseDataAndRender(response.data);
        },
        complete: function complete() {
          _this.loading = false;
        }
      });
    },
    parseDataAndRender: function parseDataAndRender(data) {
      var kes_applications = this.generateSeries(data, this.default_currency + " Applications", "kes_applications");

      var usd_applications = this.generateSeries(data, "USD Applications", "usd_applications");

      var kes_revenue = this.generateSeries(data, this.default_currency + " Revenue", "kes_revenue");

      var kes_customers = this.generateSeries(data, this.default_currency + " Customers", "kes_customers");

      var usd_customers = this.generateSeries(data, "USD Customers", "usd_customers");

      var kes_applications_drilldown = this.generateDrilldown(data, this.default_currency + " Applications", "kes_applications");

      var usd_applications_drilldown = this.generateDrilldown(data, "USD Applications", "usd_applications");

      var kes_revenue_drilldown = this.generateDrilldown(data, this.default_currency + " Revenue", "kes_revenue");

      var kes_customers_drilldown = this.generateDrilldown(data, this.default_currency + " Customers", "kes_customers");

      var usd_customers_drilldown = this.generateDrilldown(data, "USD Customers", "usd_customers");

      this.renderGraph("annual-kes-applications", this.default_currency + " Applications", [kes_applications], kes_applications_drilldown);

      this.renderGraph("annual-usd-applications", "USD Applications", [usd_applications], usd_applications_drilldown);

      this.renderGraph("annual-kes-revenue", "Annual " + this.default_currency + " Revenue", [kes_revenue], kes_revenue_drilldown);

      var usd_revenue = this.generateSeries(data, "USD Revenue", "usd_revenue");

      var usd_revenue_drilldown = this.generateDrilldown(data, "USD Revenue", "usd_revenue");

      this.renderGraph("annual-usd-revenue", "Annual USD Revenue", [usd_revenue], usd_revenue_drilldown);

      this.renderGraph("annual-kes-customers", "Annual " + this.default_currency + " Customers", [kes_customers], kes_customers_drilldown);

      this.renderGraph("annual-usd-customers", "Annual USD Customers", [usd_customers], usd_customers_drilldown);
    },
    generateSeries: function generateSeries(data, name, data_key) {
      var _this2 = this;

      return {
        name: name,
        colorByPoint: true,
        data: data.map(function (month) {
          var month_name = _this2.month_names[month.month];
          return {
            name: month_name,
            y: month.days.reduce(function (accum, day) {
              return accum + day.data[data_key];
            }, 0),
            drilldown: data_key + "_" + month_name
          };
        })
      };
    },
    generateDrilldown: function generateDrilldown(data, name, data_key) {
      var _this3 = this;

      return data.map(function (month) {
        return {
          name: name,
          id: data_key + "_" + _this3.month_names[month.month],
          data: month.days.map(function (day) {
            return [day.date, day.data[data_key]];
          })
        };
      });
    },

    renderGraph: function renderGraph(chart_id, title, series, drilldowns) {
      if (this.annual_drill_downs[chart_id]) {
        this.annual_drill_downs[chart_id].destroy();
      }

      this.chart = Highcharts.chart(chart_id, {
        chart: {
          type: "column"
        },
        title: {
          text: title,
          align: "left"
        },
        subtitle: {
          text: "Click the columns for a monthly breakdown",
          align: "left"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "Values"
          }
        },
        legend: {
          enabled: true,
          align: "right",
          borderWidth: 1,
          borderRadius: 2,
          padding: 15,
          verticalAlign: "top",
          floating: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: false,
              format: "{point.y:.1f}%"
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },
        series: series,
        drilldown: {
          series: drilldowns
        }
      });
    },
    renderApplicationsCustomersRevenueGraph: function renderApplicationsCustomersRevenueGraph(subtitle, data, container) {
      return Highcharts.chart(container, {
        chart: {
          type: "column"
        },
        title: {
          text: "Applications/Customers",
          align: "left"
        },
        subtitle: {
          text: subtitle,
          align: "left"
        },
        legend: {
          enabled: true,
          align: "right",
          borderWidth: 1,
          borderRadius: 2,
          padding: 15,
          verticalAlign: "top",
          floating: false
        },
        xAxis: {
          gridLineWidth: 1,
          tickmarkPlacement: "on",
          categories: data.map(function (day) {
            return day.date;
          })
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: ""
          }
        },
        tooltip: {
          formatter: function formatter() {
            return "<b>" + this.x + "</b>, " + this.y + "<br/>";
          }
        },
        plotOptions: {
          line: {
            enableMouseTracking: true
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: this.default_currency + " Applications",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: data.map(function (day) {
            return day.kes_applications;
          })
        }, {
          lineWidth: 2,
          color: "#283c9b",
          name: this.default_currency + " Customers",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: data.map(function (day) {
            return day.kes_customers;
          })
        }, {
          lineWidth: 2,
          color: "#3C009B",
          name: "USD Applications",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: data.map(function (day) {
            return day.usd_applications;
          })
        }, {
          lineWidth: 2,
          color: "#489b7d",
          name: "USD Customers",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: data.map(function (day) {
            return day.usd_customers;
          })
        }]
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"tab-content"},[_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_vm._m(3),_vm._v(" "),_c('div',{staticClass:"tab-pane fade",attrs:{"id":"annual-view-tab","role":"tabpanel","aria-labelledby":"annual-view-tab"}},[_c('v-select',{attrs:{"options":_vm.dates,"label":"name"},on:{"input":_vm.refresh_data},model:{value:(_vm.selected_year),callback:function ($$v) {_vm.selected_year=$$v},expression:"selected_year"}}),_vm._v(" "),(_vm.loading)?_c('div',{staticClass:"text-center p-4"},[_c('span',{staticClass:"fa fa-spinner fa-spin fa-2x"})]):_vm._e(),_vm._v(" "),_vm._m(4),_vm._v(" "),_vm._m(5),_vm._v(" "),_vm._m(6),_vm._v(" "),_c('div',{staticClass:"mb-5",attrs:{"id":"annual-usd-applications"}}),_vm._v(" "),_vm._m(7),_vm._v(" "),_c('div',{staticClass:"mb-5",attrs:{"id":"annual-usd-customers"}})],1)])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header tbn-tabs justify-content-end"},[_c('div',{staticClass:"col-md-4 nav -nav-tabs btn-group btn-group-toggle pull-right",attrs:{"role":"tablist","data-toggle":"buttons"}},[_c('a',{staticClass:"btn btn-sm btn-light border border-secondary active",attrs:{"href":"#weekly-applications-customers-currency-tab","data-toggle":"tab","role":"tab"}},[_vm._v("7 days")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-light border border-secondary",attrs:{"href":"#bi-weekly-applications-customers-currency-tab","data-toggle":"tab","role":"tab"}},[_vm._v("14 days")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-light border border-secondary",attrs:{"href":"#monthly-applications-customers-currency-tab","data-toggle":"tab","role":"tab"}},[_vm._v("30 days")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-light border border-secondary",attrs:{"href":"#annual-view-tab","data-toggle":"tab","role":"tab"}},[_vm._v("Annual View")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tab-pane fade active show",attrs:{"id":"weekly-applications-customers-currency-tab","role":"tabpanel","aria-labelledby":"seven-days-view-tab"}},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"weekly-applications-customers-currency"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tab-pane fade",attrs:{"id":"bi-weekly-applications-customers-currency-tab","role":"tabpanel","aria-labelledby":"fourteen-days-view-tab"}},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"bi-weekly-applications-customers-currency"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tab-pane fade",attrs:{"id":"monthly-applications-customers-currency-tab","role":"tabpanel","aria-labelledby":"thirty-days-view-tab"}},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"monthly-applications-customers-currency"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mb-5"},[_c('div',{attrs:{"id":"annual-kes-revenue"}}),_vm._v(" "),_c('hr')])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mb-5"},[_c('div',{attrs:{"id":"annual-usd-revenue"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mb-5"},[_c('div',{attrs:{"id":"annual-kes-applications"}}),_vm._v(" "),_c('hr')])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"mb-5"},[_c('div',{attrs:{"id":"annual-kes-customers"}}),_vm._v(" "),_c('hr')])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-077ee269", __vue__options__)
  } else {
    hotAPI.reload("data-v-077ee269", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminApplicationsPerGateway.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["gatewaysales", "gatewaysalesencoded", "default_currency"],
  data: function data() {
    return {
      sales: [],
      sales_encoded: []
    };
  },

  created: function created() {},
  watch: {
    gatewaysales: function gatewaysales(val) {
      this.sales = val;

      this.render_revenue_graph();
    },
    gatewaysalesencoded: function gatewaysalesencoded(val) {
      this.sales_encoded = val;

      this.render_pg_graphs();
    }
  },

  methods: {
    render_revenue_graph: function render_revenue_graph() {
      var gatewaySales = this.sales;
      $("#payment-gateway-revenue").highcharts({
        chart: {
          type: "column",
          inverted: true
        },
        title: {
          enabled: false,
          text: "Payment Gateway Breakdown"
        },
        xAxis: {
          gridLineWidth: 1,
          categories: gatewaySales.map(function (gt) {
            return gt.gateway_name;
          }),
          title: { text: "Gateways" }
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: "Number Of Invoices"
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0003",
          name: this.default_currency + " Payments",
          data: gatewaySales.map(function (gt) {
            return parseInt(gt.num_invoices_kes);
          })
        }, {
          lineWidth: 2,
          color: "#3C009B",
          name: "USD Payments",
          data: gatewaySales.map(function (gt) {
            return parseInt(gt.num_invoices_usd);
          })
        }]
      });
    },
    render_pg_graphs: function render_pg_graphs() {
      var gatewaySales = JSON.parse(this.sales_encoded);
      $("#paymentGateways").highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 350,
          padding: 0,
          margin: 0,
          spacing: 0
        },
        title: {
          text: ""
        },
        legend: {
          enabled: false,
          align: "center",
          layout: "horizontal",
          verticalAlign: "top",
          alignColumns: false,
          margin: 30
        },
        tooltip: {
          headerFormat: "",
          pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {point.name}: <b>{point.y}</b>%<br/>"
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            showInLegend: true,
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [{
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "Payment Gateways",
          data: gatewaySales
        }]
      });
    }

  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-row justify-content-between align-items-stretch"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"col card margin-bottom-20"},[_c('div',{staticClass:"card-header tbn-tabs"},[_c('div',{staticClass:"form-row row-eq-height"},[_c('div',{staticClass:"col-8 col-md-8"},[_c('br'),_vm._v(" "),_c('h4',[_vm._v(_vm._s(_vm.default_currency)+" / USD Revenue - Last 7 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("Payment Gateway Breakdown")])]),_vm._v(" "),_c('div',{staticClass:"col-4 col-md-4"})])]),_vm._v(" "),_vm._m(1)])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col card margin-bottom-20",attrs:{"id":"dashboard-orders-card"}},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-8 col-md-8"},[_c('br'),_vm._v(" "),_c('h4',[_vm._v("Payment Gateways - Last 7 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("Applications/Payment gateways breakdown")])])])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"paymentGateways"}})])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body"},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"payment-gateway-revenue"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03b8ad68", __vue__options__)
  } else {
    hotAPI.reload("data-v-03b8ad68", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminDashboard.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".flex-container {\n  display: -webkit-box;\n  /* OLD - iOS 6-, Safari 3.1-6, BB7 */\n  display: -ms-flexbox;\n  /* TWEENER - IE 10 */\n  display: -webkit-flex;\n  /* NEW - Safari 6.1+. iOS 7.1+, BB10 */\n  display: flex;\n  /* NEW, Spec - Firefox, Chrome, Opera */\n\n  justify-content: center;\n  align-items: center;\n\n  width: 400px;\n  height: 200px;\n  background-color: #3498db;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["con_key", "con_secret", "merchant", "def_currency"],
  data: function data() {
    return {
      admin: null,
      loading: true,
      dt_revenue_today: null,

      revenue_today: {
        usd: "USD 0.0",
        default_currency: this.def_currency + " 0.0",
        invoices: 0,
        customers: 0
      },
      dt_revenue_this_month: null,
      revenue_this_month: {
        usd: "USD 0.0",
        default_currency: this.def_currency + " 0.0",
        invoices: 0,
        customers: 0
      },
      dt_revenue_this_year: null,
      revenue_this_year: {
        usd: "USD 0.0",
        default_currency: this.def_currency + " 0.0",
        invoices: 0,
        customers: 0
      },
      dt_revenue_all_time: null,
      revenue_all_time: {
        usd: "USD 0.0",
        default_currency: this.def_currency + " 0.0",
        invoices: 0,
        customers: 0
      },
      daily_revenue: [],
      hourly_revenue: [],
      monthly_revenue: [],
      annual_revenue: [],
      dt_daily_reg: null,
      daily_reg: {
        male: 0,
        female: 0
      },
      monthly_reg: {
        male: 0,
        female: 0
      },
      annual_reg: {
        male: 0,
        female: 0
      },
      all_time_reg: {
        male: 0,
        female: 0
      },
      default_currency: null,
      api_token: null,
      services: [],
      merchants: [],
      selected_service: null,
      selected_merchant: null,
      consumer_key: null,
      consumer_secret: null,
      revenue_last_7days: [],
      revenue_last_14days: [],
      revenue_last_30days: [],
      board_data: [],
      applications_per_gateway_data: [],
      applications_per_gateway_encoded_data: [],
      weekly_applications_customers: [],
      monthly_applications_customers: [],
      bi_weekly_applications_customers: [],
      years: [],
      current_user: null,
      current_account_balance: 0,
      banner: null,
      account_id: null,
      currency: null,
      current_selection: null
    };
  },

  mounted: function mounted() {
    this.consumer_secret = this.con_secret;
    this.consumer_key = this.con_key;
    var c = this.$attrs["isadmin"];
    if (this.$attrs["isadmin"] !== "false") {
      this.admin = true;
    } else {
      this.admin = false;
    }
    this.currency = this.$attrs["def_currency"];
    this.current_user = this.$attrs["current_user"];
    this.current_account_balance = this.$attrs["account_bal"];
    this.banner = this.$attrs["banner"];
    this.account_id = this.$attrs["account_id"];

    $("#7day-title").text(this.formatDate((0, _moment2.default)().subtract(7, "days")) + " - " + this.formatDate((0, _moment2.default)()));

    $("#14day-title").text(this.formatDate((0, _moment2.default)().subtract(14, "days")) + " - " + this.formatDate((0, _moment2.default)()));

    $("#30day-title").text(this.formatDate((0, _moment2.default)().subtract(30, "days")) + " - " + this.formatDate((0, _moment2.default)()));

    this.loading = true;
    if (this.admin) {
      this.fetch_dashboard_data([]);
    } else {
      this.initialize_dashboard_data();
    }
  },
  created: function created() {},
  methods: {
    formatDate: function formatDate(moment) {
      return moment.format("ddd Do MMMM, YYYY");
    },

    refresh_utility_accounts: function refresh_utility_accounts(value) {
      var _this = this;

      var api_url = "/api/accounts/merchant/utility";
      this.selected_merchant = value;

      this.loading = true;
      this.current_selection = value;
      if (this.selected_merchant == null) {
        this.fetch_dashboard_data([]);
        return;
      }

      Vue.axios.get(api_url, {
        params: {
          merchant_id: this.selected_merchant.id
        }
      }).then(function (response) {
        _this.services = response.data.accounts;
        _this.loading = false;
        _this.fetch_dashboard_data(_this.services);
      }).catch(function (error) {
        _this.loading = false;
      }).then(function () {
        _this.loading = false;
      });
    },

    initialize_dashboard_data: async function initialize_dashboard_data() {
      try {
        var api_url = "/api/dashboard/admin/data";
        var payload = {
          merchant: null,
          service_accounts: []
        };

        var response = await Vue.axios.post(api_url, payload);
        var content = response.data.content;
        this.merchants = content.merchants;
        this.default_currency = content.currency;
        this.dt_revenue_today = content.revenue_today;
        this.dt_revenue_this_month = content.revenue_this_month;
        this.dt_revenue_this_year = content.revenue_this_year;
        this.dt_revenue_all_time = content.revenue_all_time;
        this.daily_reg = content.daily_reg;
        this.monthly_reg = content.monthly_reg;
        this.annual_reg = content.annual_reg;
        this.all_time_reg = content.all_time_reg;
        this.hourly_revenue = content.hourly_revenue;
        this.daily_revenue = content.daily_revenue;
        this.monthly_revenue = content.monthly_revenue;
        this.annual_revenue = content.annual_revenue;
        this.revenue_last_7days = content.revenue_last_7days;
        this.revenue_last_14days = content.revenue_last_14days;
        this.revenue_last_30days = content.revenue_last_30days;
        this.board_data = content.service_leader_board;
        this.applications_per_gateway_data = content.gateway_sales;
        this.applications_per_gateway_encoded_data = content.encoded_gateway_sales;

        this.weekly_applications_customers = content.weekly_applications_customers;
        this.monthly_applications_customers = content.monthly_applications_customers;
        this.bi_weekly_applications_customers = content.bi_weekly_applications_customers;
        this.years = content.years;

        this.emitToBoard();
        this.set_dashboard_data();
        this.loading = false;
      } catch (error) {
        console.log("error => ", error);
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    fetch_dashboard_data_by_account_id: function fetch_dashboard_data_by_account_id(value) {
      var accounts = [];
      if (value) {
        accounts.push(value);
      }
      this.fetch_dashboard_data(accounts);
    },
    fetch_dashboard_data: async function fetch_dashboard_data(accounts) {
      try {
        var api_url = "/api/dashboard/admin/data";
        if (!this.loading) this.loading = true;

        var merchant_id = this.selected_merchant ? this.selected_merchant.id : null;
        var payload = {
          merchant: merchant_id,
          service_accounts: accounts.map(function (account) {
            return account.id;
          })
        };

        var response = await Vue.axios.post(api_url, payload);
        var content = response.data.content;
        this.merchants = content.merchants;
        this.default_currency = content.currency;
        this.dt_revenue_today = content.revenue_today;
        this.dt_revenue_this_month = content.revenue_this_month;
        this.dt_revenue_this_year = content.revenue_this_year;
        this.dt_revenue_all_time = content.revenue_all_time;
        this.daily_reg = content.daily_reg;
        this.monthly_reg = content.monthly_reg;
        this.annual_reg = content.annual_reg;
        this.all_time_reg = content.all_time_reg;
        this.hourly_revenue = content.hourly_revenue;
        this.daily_revenue = content.daily_revenue;
        this.monthly_revenue = content.monthly_revenue;
        this.annual_revenue = content.annual_revenue;
        this.revenue_last_7days = content.revenue_last_7days;
        this.revenue_last_14days = content.revenue_last_14days;
        this.revenue_last_30days = content.revenue_last_30days;
        this.board_data = content.service_leader_board;
        this.applications_per_gateway_data = content.gateway_sales;
        this.applications_per_gateway_encoded_data = content.encoded_gateway_sales;

        this.weekly_applications_customers = content.weekly_applications_customers;
        this.monthly_applications_customers = content.monthly_applications_customers;
        this.bi_weekly_applications_customers = content.bi_weekly_applications_customers;
        this.years = content.years;

        this.emitToBoard();
        this.set_dashboard_data();
        this.loading = false;
      } catch (error) {
        console.log("error => ", error);
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },

    emitToBoard: function emitToBoard(event) {
      this.$emit("leaderboardservices", this.board_data);
      this.$emit("gatewaysales", this.applications_per_gateway_data);
      this.$emit("gatewaysalesencoded", this.applications_per_gateway_encoded_data);
      this.$emit("weeklyapplicationscustomers", this.weekly_applications_customers);
      this.$emit("biweeklyapplicationscustomers", this.bi_weekly_applications_customers);
      this.$emit("monthlyapplicationscustomers", this.monthly_applications_customers);
    },
    set_dashboard_data: function set_dashboard_data() {
      this.revenue_today = {
        invoices: this.to_human_no_fixed(this.dt_revenue_today.invoices),
        usd: "USD " + this.to_human(this.dt_revenue_today.usd),
        default_currency: this.default_currency + " " + this.to_human(this.dt_revenue_today.default_currency),
        customers: this.to_human_no_fixed(this.dt_revenue_today.customers)
      };

      this.revenue_this_month = {
        invoices: this.to_human_no_fixed(this.dt_revenue_this_month.invoices),
        usd: "USD " + this.to_human(this.dt_revenue_this_month.usd),
        default_currency: this.default_currency + " " + this.to_human(this.dt_revenue_this_month.default_currency),
        customers: this.to_human_no_fixed(this.dt_revenue_this_month.customers)
      };

      this.revenue_this_year = {
        invoices: this.to_human_no_fixed(this.dt_revenue_this_year.invoices),
        usd: "USD " + this.to_human(this.dt_revenue_this_year.usd),
        default_currency: this.default_currency + " " + this.to_human(this.dt_revenue_this_year.default_currency),
        customers: this.to_human_no_fixed(this.dt_revenue_this_year.customers)
      };

      this.revenue_all_time = {
        invoices: this.to_human_no_fixed(this.dt_revenue_all_time.invoices),
        usd: "USD " + this.to_human(this.dt_revenue_all_time.usd),
        default_currency: this.default_currency + " " + this.to_human(this.dt_revenue_all_time.default_currency),
        customers: this.to_human_no_fixed(this.dt_revenue_all_time.customers)
      };

      this.set_hourly_chart();
      this.set_daily_chart();
      this.set_monthly_chart();
      this.set_annual_chart();
      this.set_seven_day_revenue_chart();
      this.set_frtn_day_revenue_chart();
      this.set_thirty_day_revenue_chart();
    },
    to_human_no_fixed: function to_human_no_fixed(x) {
      if (x == null) return 0;
      return x.toLocaleString();
    },
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    to_human: function to_human(x) {
      if (x == null) return 0;
      var n = this.to_fixed(x);
      return this.formatNumber(n.toLocaleString());
    },
    to_fixed: function to_fixed(val) {
      return (Math.round(val * 100) / 100).toFixed(2);
    },
    set_hourly_chart: function set_hourly_chart() {
      $("#hourly_chart").highcharts({
        chart: {
          renderTo: "hourly_chart",
          backgroundColor: null,
          borderWidth: 0,
          type: "areaspline",
          margin: [3, 0, 0, 0],
          height: 40,
          style: {
            overflow: "visible"
          },

          skipClone: true
        },
        title: {
          text: ""
        },
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: [],
          alignTicks: false,
          minPadding: 0,
          maxPadding: 0
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 4,
            shadow: false,
            states: {
              hover: {
                enabled: false
              }
            },
            marker: {
              radius: 0
            }
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.hourly_revenue.map(function (e) {
            return e.usd;
          }).map(function (e) {
            return parseFloat(e);
          })
        }, {
          lineWidth: 2,
          color: "#3C009B",
          fillColor: {
            linearGradient: [0, 0, 0, 40],
            stops: [[0, "rgb(176,145,226)"], [1, "rgb(255, 255, 255)"]]
          },
          data: this.hourly_revenue.map(function (e) {
            return e.default_currency;
          }).map(function (e) {
            return parseFloat(e);
          })
        }]
      });
    },
    set_daily_chart: function set_daily_chart() {
      $("#daily_chart").highcharts({
        chart: {
          renderTo: "daily_chart",
          backgroundColor: null,
          borderWidth: 0,
          type: "areaspline",
          margin: [3, 0, 0, 0],
          height: 40,
          style: {
            overflow: "visible"
          },

          skipClone: true
        },
        title: {
          text: ""
        },
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: [],
          alignTicks: false,
          minPadding: 0,
          maxPadding: 0
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 4,
            shadow: false,
            states: {
              hover: {
                enabled: false
              }
            },
            marker: {
              radius: 0
            }
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.daily_revenue.map(function (e) {
            return e.usd;
          }).map(function (e) {
            return parseFloat(e);
          })
        }, {
          lineWidth: 2,
          color: "#3C009B",
          fillColor: {
            linearGradient: [0, 0, 0, 40],
            stops: [[0, "rgb(176,145,226)"], [1, "rgb(255, 255, 255)"]]
          },
          data: this.daily_revenue.map(function (e) {
            return e.default_currency;
          }).map(function (e) {
            return parseFloat(e);
          })
        }]
      });
    },
    set_monthly_chart: function set_monthly_chart() {
      $("#monthly_chart").highcharts({
        chart: {
          renderTo: "monthly_chart",
          backgroundColor: null,
          borderWidth: 0,
          type: "areaspline",
          margin: [3, 0, 0, 0],
          height: 40,
          style: {
            overflow: "visible"
          },

          skipClone: true
        },
        title: {
          text: ""
        },
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: [],
          alignTicks: false,
          minPadding: 0,
          maxPadding: 0
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 4,
            shadow: false,
            states: {
              hover: {
                enabled: false
              }
            },
            marker: {
              radius: 0
            }
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.monthly_revenue.map(function (e) {
            return e.usd;
          }).map(function (e) {
            return parseFloat(e);
          })
        }, {
          lineWidth: 2,
          color: "#E88018",
          fillColor: {
            linearGradient: [0, 0, 0, 40],
            stops: [[0, "rgb(254,215,179)"], [1, "rgb(255, 255, 255)"]]
          },
          data: this.monthly_revenue.map(function (e) {
            return e.default_currency;
          }).map(function (e) {
            return parseFloat(e);
          })
        }]
      });
    },
    set_annual_chart: function set_annual_chart() {
      $("#annual_chart").highcharts({
        chart: {
          renderTo: "annual_chart",
          backgroundColor: null,
          borderWidth: 0,
          type: "areaspline",
          margin: [3, 0, 0, 0],
          height: 40,
          style: {
            overflow: "visible"
          },

          skipClone: true
        },
        title: {
          text: ""
        },
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        xAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          labels: {
            enabled: false
          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickPositions: [],
          alignTicks: false,
          minPadding: 0,
          maxPadding: 0
        },
        yAxis: {
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: "transparent",
          endOnTick: false,
          startOnTick: false,
          labels: {
            enabled: false
          },
          title: {
            text: null
          },

          tickPositions: [0]
        },
        legend: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        plotOptions: {
          series: {
            animation: false,
            lineWidth: 4,
            shadow: false,
            states: {
              hover: {
                enabled: false
              }
            },
            marker: {
              radius: 0
            }
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.annual_revenue.map(function (e) {
            return e.usd;
          }).map(function (e) {
            return parseFloat(e);
          })
        }, {
          lineWidth: 2,
          color: "#9B0000",
          fillColor: {
            linearGradient: [0, 0, 0, 40],
            stops: [[0, "rgb(240,221,222)"], [1, "rgb(255, 255, 255)"]]
          },
          data: this.annual_revenue.map(function (e) {
            return e.default_currency;
          }).map(function (e) {
            return parseFloat(e);
          })
        }]
      });
    },
    set_seven_day_revenue_chart: function set_seven_day_revenue_chart() {
      var data = this.revenue_last_14days;
      try {
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
      } catch (e) {}

      var days = data.map(function (d) {
        return d.day;
      });
      var kes = data.map(function (d) {
        return parseFloat(d.default_currency);
      });
      var usd = data.map(function (d) {
        return parseFloat(d.usd);
      });

      $("#usd7").click(function () {
        $("#7day-revenue-area-graph .highcharts-legend-item:nth-child(1)").click();
        $(this).toggleClass("disabled");
      });
      $("#kes7").click(function () {
        $("#7day-revenue-area-graph .highcharts-legend-item:nth-child(2)").click();
        $(this).toggleClass("disabled");
      });

      var revenue7Day = new Highcharts.Chart({
        chart: {
          renderTo: "7day-revenue-area-graph",
          type: "area"
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          align: "left",
          tickPositions: [0, 1, 2, 3, 4, 5, 6],
          tickmarkPlacement: "on",
          tickPosition: "inside",
          categories: days
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: ""
          }
        },
        tooltip: {
          formatter: function formatter() {
            return "<b>X</b>:" + this.x + "<br/>" + "<b>Y</b>:" + this.y;
          }
        },
        legend: {},
        plotOptions: {
          line: {
            enableMouseTracking: true
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: usd
        }, {
          lineWidth: 2,
          color: "#3C009B",
          name: this.default_currency + " Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: kes
        }]
      });
    },
    set_frtn_day_revenue_chart: function set_frtn_day_revenue_chart() {
      var data = this.revenue_last_14days;
      try {
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
      } catch (e) {}

      var days = data.map(function (d) {
        return d.day;
      });
      var kes = data.map(function (d) {
        return parseFloat(d.default_currency);
      });
      var usd = data.map(function (d) {
        return parseFloat(d.usd);
      });

      var dates = data.map(function (d) {
        return (0, _moment2.default)(d.date).format("ddd Do MMM");
      });

      $("#usd14").click(function () {
        $("#14day-revenue-area-graph .highcharts-legend-item:nth-child(1)").click();
        $(this).toggleClass("disabled");
      });
      $("#kes14").click(function () {
        $("#14day-revenue-area-graph .highcharts-legend-item:nth-child(2)").click();
        $(this).toggleClass("disabled");
      });

      var revenue14Day = new Highcharts.Chart({
        chart: {
          renderTo: "14day-revenue-area-graph",
          type: "area"
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          align: "left",
          tickPositions: [].concat((0, _toConsumableArray3.default)(Array(dates.length).keys())),
          tickmarkPlacement: "on",
          tickPosition: "inside",
          categories: dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: ""
          }
        },
        tooltip: {
          formatter: function formatter() {
            return "<b>X</b>:" + this.x + "<br/>" + "<b>Y</b>:" + this.y;
          }
        },
        legend: {},
        plotOptions: {
          line: {
            enableMouseTracking: true
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: usd
        }, {
          lineWidth: 2,
          color: "#3C009B",
          name: this.default_currency + " Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: kes
        }]
      });
    },
    set_thirty_day_revenue_chart: function set_thirty_day_revenue_chart() {
      var data = this.revenue_last_30days;
      try {
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
      } catch (e) {}

      var dates = data.map(function (d) {
        return (0, _moment2.default)(d.date).format("ddd Do MMM");
      });
      var kes = data.map(function (d) {
        return parseFloat(d.default_currency);
      });
      var usd = data.map(function (d) {
        return parseFloat(d.usd);
      });

      $("#usd30").click(function () {
        $("#30day-revenue-area-graph .highcharts-legend-item:nth-child(1)").click();
        $(this).toggleClass("disabled");
      });
      $("#kes30").click(function () {
        $("#30day-revenue-area-graph .highcharts-legend-item:nth-child(2)").click();
        $(this).toggleClass("disabled");
      });

      var revenue30Day = new Highcharts.Chart({
        chart: {
          renderTo: "30day-revenue-area-graph",
          type: "area"
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          startOnTick: false,
          endOnTick: false,
          minPadding: 0,
          maxPadding: 0,
          align: "left",
          tickPositions: [].concat((0, _toConsumableArray3.default)(Array(dates.length).keys())),
          tickmarkPlacement: "on",
          tickPosition: "inside",
          categories: dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: ""
          }
        },
        tooltip: {
          formatter: function formatter() {
            return "<b>X</b>:" + this.x + "<br/>" + "<b>Y</b>:" + this.y;
          }
        },
        legend: {},
        plotOptions: {
          line: {
            enableMouseTracking: true
          }
        },
        series: [{
          lineWidth: 2,
          color: "#9B0000",
          name: "USD Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(240,221,222)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: usd
        }, {
          lineWidth: 2,
          color: "#3C009B",
          name: this.default_currency + " Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: kes
        }]
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('withdrawal-tool',{attrs:{"conkey":_vm.con_key,"consecret":_vm.con_secret,"merchantid":_vm.merchant,"syncbal":_vm.current_account_balance,"currentaccountbalance":_vm.current_account_balance},on:{"update:syncbal":function($event){_vm.current_account_balance=$event}}}),_vm._v(" "),(_vm.loading)?_c('div',[_vm._m(0),_vm._v(" "),_c('br')]):_vm._e(),_vm._v(" "),(_vm.admin)?_c('div',{staticClass:"card mt-4",staticStyle:{"background":"#fffef8"}},[_c('div',{staticClass:"card-body py-2"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-12 col-lg-4 order-lg-2"},[_c('div',{staticClass:"text-center"},[_c('img',{staticClass:"img-fluid mt-md-n5 mt-lg-0 mr-md-n5",staticStyle:{"max-width":"397px"},attrs:{"src":_vm.banner,"alt":"..."}})])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-8 px-4 py-3 order-lg-1"},[_c('span',{staticClass:"h2 mb-0"},[_vm._v("Welcome back "+_vm._s(_vm.current_user))]),_vm._v(" "),_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("Here’s how the numbers are looking.")]),_vm._v(" "),_c('hr')])])])]):_vm._e(),_vm._v(" "),_c('div',{attrs:{"id":"stats"}},[(!_vm.admin)?_c('div',{staticClass:"card mt-4",staticStyle:{"background":"#fffef8"}},[_c('div',{staticClass:"card-body py-2"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-12 col-lg-4 order-lg-2"},[_c('div',{staticClass:"text-center"},[_c('img',{staticClass:"img-fluid mt-md-n5 mt-lg-0 mr-md-n5",staticStyle:{"max-width":"397px"},attrs:{"src":_vm.banner,"alt":"..."}})])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-8 px-4 py-3 order-lg-1"},[_c('span',{staticClass:"h2 mb-0"},[_vm._v("Welcome back, "+_vm._s(_vm.current_user))]),_vm._v(" "),(_vm.current_account_balance > 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n              Here’s how the numbers are looking.\n            ")]):_vm._e(),_vm._v(" "),(_vm.current_account_balance <= 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n              Here’s how the numbers are looking.\n            ")]):_vm._e(),_vm._v(" "),_c('hr'),_vm._v(" "),_vm._m(1)])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"form-group mb-0 col-sm-6 border-right p-3"},[_c('label',[_vm._v("Filter by Merchant")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.merchants,"label":"name","value":_vm.current_selection},on:{"input":_vm.refresh_utility_accounts}}),_vm._v(" "),_c('span',{staticClass:"form-text"},[_vm._v("Start Typing the name of the merchant")])],1),_vm._v(" "),_c('div',{staticClass:"form-group mb-0 col-sm-6 p-3"},[_c('label',[_vm._v("Filter by Service")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.services,"label":"name"},on:{"input":_vm.fetch_dashboard_data_by_account_id},model:{value:(_vm.selected_service),callback:function ($$v) {_vm.selected_service=$$v},expression:"selected_service"}}),_vm._v(" "),_c('span',{staticClass:"form-text"},[_vm._v("Start Typing the name of the service")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"form-row margin-bottom-20"},[_c('div',{staticClass:"col-12 col-xl-3"},[_c('div',{staticClass:"card mb-0"},[_c('div',{staticClass:"card-body text-left pb-0"},[_c('h4',[_vm._v("Today")]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-light"},[_c('b',[_vm._v(_vm._s(_vm.revenue_today.default_currency))])])]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-danger"},[_c('b',[_vm._v(_vm._s(_vm.revenue_today.usd))])])])]),_vm._v(" "),_c('div',{staticStyle:{"overflow":"visible"},attrs:{"id":"hourly_chart"}}),_vm._v(" "),_c('div',{staticClass:"card-body d-flex justify-content-between border-top"},[_c('div',[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Applications")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_today.invoices))])]),_vm._v(" "),_c('div',{staticClass:"text-right"},[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Customers")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_today.customers))])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-3"},[_c('div',{staticClass:"card mb-0"},[_c('div',{staticClass:"card-body text-left pb-0"},[_c('h4',[_vm._v("This Month")]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-light"},[_c('b',[_vm._v(_vm._s(_vm.revenue_this_month.default_currency))])])]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-danger"},[_c('b',[_vm._v(_vm._s(_vm.revenue_this_month.usd))])])])]),_vm._v(" "),_c('div',{attrs:{"id":"daily_chart"}}),_vm._v(" "),_c('div',{staticClass:"card-body d-flex justify-content-between border-top"},[_c('div',[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Applications")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_this_month.invoices))])]),_vm._v(" "),_c('div',{staticClass:"text-right"},[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Customers")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_this_month.customers))])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-3"},[_c('div',{staticClass:"card mb-0"},[_c('div',{staticClass:"card-body text-left pb-0"},[_c('h4',[_vm._v("This Year")]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-light"},[_c('b',[_vm._v(_vm._s(_vm.revenue_this_year.default_currency))])])]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-danger"},[_c('b',[_vm._v(_vm._s(_vm.revenue_this_year.usd))])])])]),_vm._v(" "),_c('div',{attrs:{"id":"monthly_chart"}}),_vm._v(" "),_c('div',{staticClass:"card-body d-flex justify-content-between border-top"},[_c('div',[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Applications")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_this_year.invoices))])]),_vm._v(" "),_c('div',{staticClass:"text-right"},[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Customers")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_this_year.customers))])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-3"},[_c('div',{staticClass:"card mb-0"},[_c('div',{staticClass:"card-body text-left pb-0"},[_c('h4',[_vm._v("All Time")]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-light"},[_c('b',[_vm._v(_vm._s(_vm.revenue_all_time.default_currency))])])]),_vm._v(" "),_c('p',{staticClass:"mb-1 lead"},[_c('span',{staticClass:"btn btn-sm btn-danger"},[_c('b',[_vm._v(_vm._s(_vm.revenue_all_time.usd))])])])]),_vm._v(" "),_c('div',{attrs:{"id":"annual_chart"}}),_vm._v(" "),_c('div',{staticClass:"card-body d-flex justify-content-between border-top"},[_c('div',[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Applications")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_all_time.invoices))])]),_vm._v(" "),_c('div',{staticClass:"text-right"},[_c('p',{staticClass:"legacy-subtitle mb-0"},[_vm._v("Customers")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.revenue_all_time.customers))])])])])])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"card margin-bottom-20",attrs:{"id":"dashboard-revenue-card"}},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"tab-content"},[_c('div',{staticClass:"tab-pane fade active show",attrs:{"id":"revenue-last-7days","role":"tabpanel","aria-labelledby":"seven-days-view-tab"}},[_c('div',{staticClass:"form-row justify-content-end"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-4"},[_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"usd7","type":"button"}},[_vm._v("\n                      USD Revenue\n                    ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"kes7","type":"button"}},[_vm._v("\n                      "+_vm._s(_vm.default_currency)+" Revenue\n                    ")]),_vm._v(" "),_c('div',{staticClass:"dropdown ml-2 d-inline"}),_vm._v(" "),_vm._m(4)])]),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"7day-revenue-area-graph"}})]),_vm._v(" "),_c('div',{staticClass:"tab-pane fade",attrs:{"id":"revenue-last-14days","role":"tabpanel","aria-labelledby":"seven-days-view-tab"}},[_c('div',{staticClass:"form-row justify-content-end"},[_vm._m(5),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-4"},[_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"usd14","type":"button"}},[_vm._v("\n                      USD Revenue\n                    ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"kes14","type":"button"}},[_vm._v("\n                      "+_vm._s(_vm.default_currency)+" Revenue\n                    ")]),_vm._v(" "),_c('div',{staticClass:"dropdown ml-2 d-inline"}),_vm._v(" "),_vm._m(6)])]),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"14day-revenue-area-graph"}})]),_vm._v(" "),_c('div',{staticClass:"tab-pane fade",attrs:{"id":"revenue-last-30days","role":"tabpanel","aria-labelledby":"seven-days-view-tab"}},[_c('div',{staticClass:"form-row justify-content-end"},[_vm._m(7),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-4"},[_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"usd30","type":"button"}},[_vm._v("\n                      USD Revenue\n                    ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-sm btn-light ml-2",attrs:{"href":"","id":"kes30","type":"button"}},[_vm._v("\n                      "+_vm._s(_vm.default_currency)+" Revenue\n                    ")]),_vm._v(" "),_c('div',{staticClass:"dropdown ml-2 d-inline"}),_vm._v(" "),_vm._m(8)])]),_vm._v(" "),_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"30day-revenue-area-graph"}})])])])])])]),_vm._v(" "),(_vm.admin)?_c('admin-applications-customer-revenue',{attrs:{"weeklyapplicationscustomers":_vm.weekly_applications_customers,"monthlyapplicationscustomers":_vm.monthly_applications_customers,"biweeklyapplicationscustomers":_vm.bi_weekly_applications_customers,"default_currency":_vm.default_currency,"dates":_vm.years}}):_vm._e(),_vm._v(" "),(_vm.admin)?_c('admin-applications-per-gateway',{attrs:{"default_currency":_vm.default_currency,"gatewaysales":_vm.applications_per_gateway_data,"gatewaysalesencoded":_vm.applications_per_gateway_encoded_data},on:{"update:gatewaysales":function($event){_vm.applications_per_gateway_data=$event},"update:gatewaysalesencoded":function($event){_vm.applications_per_gateway_encoded_data=$event}}}):_vm._e(),_vm._v(" "),(_vm.admin)?_c('admin-service-leader-board',{attrs:{"leaderboardservices":_vm.board_data},on:{"update:leaderboardservices":function($event){_vm.board_data=$event}}}):_vm._e()],1)],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"d-flex justify-content-center"},[_c('div',{staticClass:"spinner-border"}),_vm._v("\n        \n      "),_c('span',[_vm._v("Please wait, loading dashboard ...")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-auto align-middle"}),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-auto"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header tbn-tabs justify-content-end"},[_c('div',{staticClass:"col-md-3 nav -nav-tabs btn-group btn-group-toggle",attrs:{"role":"tablist","data-toggle":"buttons"}},[_c('a',{staticClass:"btn btn-sm btn-light border border-secondary active",attrs:{"href":"#revenue-last-7days","data-toggle":"tab","role":"tab"}},[_vm._v("7 days")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-light border border-secondary",attrs:{"href":"#revenue-last-14days","data-toggle":"tab","role":"tab"}},[_vm._v("14 days")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-light border border-secondary",attrs:{"href":"#revenue-last-30days","data-toggle":"tab","role":"tab"}},[_vm._v("30 days")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-md-8"},[_c('h4',[_vm._v("Revenue - Last 7 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle",attrs:{"id":"7day-title"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown ml-2 d-inline"},[_c('div',{staticClass:"rw-btn rw-btn--card rw-btn--lg d-inline",attrs:{"data-toggle":"dropdown"}},[_c('div')]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"update"}},[_vm._v("Update")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"expand"}},[_vm._v("Expand")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"invert"}},[_vm._v("Invert style")]),_vm._v(" "),_c('div',{staticClass:"dropdown-divider"}),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"remove"}},[_vm._v("Remove card")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-md-8"},[_c('h4',[_vm._v("Revenue - Last 14 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle",attrs:{"id":"14day-title"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown ml-2 d-inline"},[_c('div',{staticClass:"rw-btn rw-btn--card rw-btn--lg d-inline",attrs:{"data-toggle":"dropdown"}},[_c('div')]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"update"}},[_vm._v("Update")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"expand"}},[_vm._v("Expand")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"invert"}},[_vm._v("Invert style")]),_vm._v(" "),_c('div',{staticClass:"dropdown-divider"}),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"remove"}},[_vm._v("Remove card")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-md-8"},[_c('h4',[_vm._v("Revenue - Last 30 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle",attrs:{"id":"30day-title"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown ml-2 d-inline"},[_c('div',{staticClass:"rw-btn rw-btn--card rw-btn--lg d-inline",attrs:{"data-toggle":"dropdown"}},[_c('div')]),_vm._v(" "),_c('div',{staticClass:"dropdown-menu dropdown-menu-right"},[_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"update"}},[_vm._v("Update")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"expand"}},[_vm._v("Expand")]),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"invert"}},[_vm._v("Invert style")]),_vm._v(" "),_c('div',{staticClass:"dropdown-divider"}),_vm._v(" "),_c('a',{staticClass:"dropdown-item",attrs:{"href":"#","data-demo-action":"remove"}},[_vm._v("Remove card")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30eba986", __vue__options__)
  } else {
    hotAPI.reload("data-v-30eba986", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminInvoiceTracker.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("ul.timeline {\n  list-style-type: none;\n  position: relative;\n}\nul.timeline:before {\n  content: \" \";\n  background: #d4d9df;\n  display: inline-block;\n  position: absolute;\n  left: 29px;\n  width: 2px;\n  height: 100%;\n  z-index: 400;\n}\nul.timeline > li {\n  margin: 20px 0;\n  padding-left: 20px;\n}\nul.timeline > li:before {\n  content: \" \";\n  background: white;\n  display: inline-block;\n  position: absolute;\n  border-radius: 50%;\n  border: 3px solid #22c0e8;\n  left: 20px;\n  width: 20px;\n  height: 20px;\n  z-index: 400;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return (0, _defineProperty3.default)({
      modal_name: "trackerModal",
      modal_target: "#trackerModal",
      invoice_id: null,
      invoice_number: null,
      amount_settled_offline: null,
      amount_expected: null,
      amount_paid: null,
      invoice_status: null,
      invoice_retries: null,
      invoice: null,
      inserted_at: null,
      payment_date: null,
      invoice_payment_complete: null,
      invoice_payment_partial: null,
      invoice_payment_settled: null,
      is_notification_sent: null
    }, "invoice_status", null);
  },

  mounted: function mounted() {
    this.modal_name = this.modal_name + "_" + this.$attrs["id"];
    this.modal_target = this.modal_target + "_" + this.$attrs["id"];
    this.invoice = JSON.parse(this.$attrs["invoice"]);
    this.invoice_number = this.invoice["invoice_number"];
    this.is_notification_sent = this.invoice["confirmed?"];
    this.amount_paid = this.invoice["amount_paid"];
    this.amount_expected = this.invoice["amount_expected"];
    this.amount_settled_offline = this.invoice["amount_settled_offline"];
    this.invoice_retries = this.invoice["retries"];
    this.invoice_status = this.invoice["status"];
    this.inserted_at = this.format_date(this.invoice["inserted_at"]);
    this.payment_date = this.format_date(this.invoice["payment_date"]);
    this.invoice_status = this.invoice["status"];
    this.diagnose();
  },
  methods: {
    format_date: function format_date(date) {
      if (date == null) {
        return "";
      }
      return (0, _moment2.default)(date).format("ddd Do MMMM, YYYY");
    },
    diagnose: function diagnose() {
      if (parseFloat(this.amount_paid) == parseFloat(this.amount_expected)) {
        this.invoice_payment_complete = true;
      }
      if (parseFloat(this.amount_paid) > 0 && parseFloat(this.amount_paid) < parseFloat(this.amount_expected)) {
        this.invoice_payment_partial = true;
      }
      if (this.invoice_status == "settled") {
        this.invoice_payment_settled = !false;
      } else {
        this.invoice_payment_settled = false;
      }
      if (this.is_notification_sent == "true") {
        this.is_notification_sent = !false;
      } else {
        this.is_notification_sent = !false;
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{attrs:{"href":"javascript:void(0)","data-toggle":"modal","data-target":_vm.modal_target}},[_vm._v("Track")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":_vm.modal_name,"tabindex":"-1","role":"dialog","aria-labelledby":"trackerModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Track Results for Invoice "+_vm._s(_vm.invoice_number))]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-12"},[_c('h4',[_vm._v("Invoice Timeline")]),_vm._v(" "),_c('ul',{staticClass:"timeline"},[_c('li',[_c('a',{attrs:{"href":"#"}},[_vm._v("Invoice Created")]),_vm._v(" "),_c('a',{staticClass:"float-right",attrs:{"href":"#"}},[_vm._v(_vm._s(_vm.inserted_at))]),_vm._v(" "),_c('p',[_vm._v("Invoice was created")])]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"#"}},[_vm._v("Invoice Payment")]),_vm._v(" "),_c('a',{staticClass:"float-right",attrs:{"href":"#"}},[_vm._v(_vm._s(_vm.payment_date))]),_vm._v(" "),(_vm.invoice_payment_complete)?_c('p',{staticClass:"alert alert-success"},[_vm._v("Invoice was paid")]):_vm._e(),_vm._v(" "),(!_vm.invoice_payment_complete && !_vm.invoice_payment_partial)?_c('p',{staticClass:"alert alert-info"},[_vm._v("Invoice has not been paid")]):_vm._e(),_vm._v(" "),(_vm.invoice_payment_partial)?_c('p',{staticClass:"alert alert-warning"},[_vm._v("Invoice has been partially paid. Customer should complete payment")]):_vm._e()]),_vm._v(" "),(_vm.invoice_payment_complete)?_c('li',[_c('a',{attrs:{"href":"#"}},[_vm._v("Invoice Settlement")]),_vm._v(" "),(_vm.invoice_payment_settled)?_c('a',{staticClass:"float-right",attrs:{"href":"#"}}):_vm._e(),_vm._v(" "),(_vm.invoice_payment_settled)?_c('p',{staticClass:"alert alert-success"},[_vm._v("Invoice was settled...")]):_vm._e(),_vm._v(" "),(!_vm.invoice_payment_settled)?_c('p',{staticClass:"alert alert-danger"},[_vm._v("Invoice has not yet been settled...")]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.invoice_payment_settled)?_c('li',[_c('a',{attrs:{"href":"#"}},[_vm._v("Invoice Notification")]),_vm._v(" "),(_vm.is_notification_sent)?_c('a',{staticClass:"float-right",attrs:{"href":"#"}}):_vm._e(),_vm._v(" "),(_vm.is_notification_sent)?_c('p',{staticClass:"alert alert-success"},[_vm._v("Invoice notification sent.")]):_vm._e(),_vm._v(" "),(!_vm.is_notification_sent)?_c('p',{staticClass:"alert alert-danger"},[_vm._v("Invoice notification not sent.")]):_vm._e()]):_vm._e()])])])]),_vm._v(" "),_vm._m(1)])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69f9936e", __vue__options__)
  } else {
    hotAPI.reload("data-v-69f9936e", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminLazyLoadList.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["services", "initial"],
  data: function data() {
    return {
      serviceIds: []
    };
  },

  methods: {
    deselect: function deselect(value) {
      var index = this.serviceIds.indexOf(parseInt(value));
      if (index > -1) {
        this.serviceIds.splice(index, 1);
      }
    }
  },
  mounted: function mounted() {
    this.serviceIds = this.initial;
    var vm = this;
    $("#services").multiSelect({
      selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Available'>",
      selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Selected'>",
      afterInit: function afterInit(ms) {
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = "#" + that.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)",
            selectionSearchString = "#" + that.$container.attr("id") + " .ms-elem-selection.ms-selected";

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on("keydown", function (e) {
          if (e.which === 40) {
            that.$selectableUl.focus();
            return false;
          }
        });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on("keydown", function (e) {
          if (e.which == 40) {
            that.$selectionUl.focus();
            return false;
          }
        });
      },
      afterSelect: function afterSelect() {
        this.qs1.cache();
        this.qs2.cache();
      },
      afterDeselect: function afterDeselect(value) {
        this.qs1.cache();
        this.qs2.cache();
        vm.deselect(value);
      }
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"services"}},[_vm._v("Services")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.serviceIds),expression:"serviceIds"}],attrs:{"id":"services","multiple":"multiple","name":"role[service_ids][]"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.serviceIds=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.services),function(service,index){return _c('option',{key:index,domProps:{"value":service.id}},[_vm._v("\n      "+_vm._s(service.name)+"\n    ")])}),0)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ab765794", __vue__options__)
  } else {
    hotAPI.reload("data-v-ab765794", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminMarkInvoiceAsUsedButton.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      consumer_key: null,
      consumer_secret: null,
      invoice_id: null,
      tag: null
    };
  },

  mounted: function mounted() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.invoice_id = this.$attrs["invoice_id"];
  },
  methods: {
    authorize_and_commit: function authorize_and_commit() {
      var _this = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this.submit(response.data.token);
      }).catch(function (error) {}).then(function () {});
    },
    submit: function submit(token) {
      if (this.tag == null || this.tag === "") {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Message",
          text: "Please specify a tag to continue"
        });
        return;
      }
      var urlIs = "/api/invoice/used/" + this.invoice_id;
      var api_headers = {
        Authorization: "Bearer " + token
      };

      var api_params = {
        id: this.invoice_id,
        tag: this.tag
      };

      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred during processing. If this persists, contact customer support for assistance"
          });
        } else {
          $("#addTagModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Invoice has been marked as used",
            showConfirmButton: false,
            timer: 2500
          });
          window.location.href = "/invoices";
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-outline-primary btn-sm",attrs:{"href":"javascript:void(0)","data-toggle":"modal","data-target":"#addTagModal"}},[_vm._v("Mark As Used")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addTagModal","tabindex":"-1","role":"dialog","aria-labelledby":"addTagModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Tag/Description")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tag),expression:"tag"}],staticClass:"form-control",attrs:{"type":"text","maxlength":"50","placeholder":"Enter tag or description","required":""},domProps:{"value":(_vm.tag)},on:{"input":function($event){if($event.target.composing){ return; }_vm.tag=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n              Close\n            ")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Submit"},on:{"click":_vm.authorize_and_commit}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Description/Tags")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d6a3c5a", __vue__options__)
  } else {
    hotAPI.reload("data-v-1d6a3c5a", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminPaymentNotificationsReset.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      payment_id: null,
      retries: null,
      con_secret: null,
      con_key: null
    };
  },
  created: function created() {
    this.payment_id = this.$attrs["payment_id"];
    this.retries = this.$attrs["retries"];
    this.con_secret = this.$attrs["con_secret"];
    this.con_key = this.$attrs["con_key"];
  },


  methods: {
    execute: function execute() {
      var _this = this;

      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset transaction - " + this.payment_id
      }).then(function (result) {
        if (result.value) {
          _this.proceed();
        }
      });
    },
    proceed: function proceed() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.con_secret,
        key: this.con_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.reset_payment(response.data.token);
      }).catch(function (error) {
        _this2.error_message();
      }).then(function () {});
    },
    reset_payment: function reset_payment(token) {
      var _this3 = this;

      var new_retry = parseInt(this.retries) - 1;
      var api = "/api/payment/reset";
      var payload = {
        id: this.payment_id
      };
      Vue.axios.post(api, payload).then(function (response) {
        _this3.success_message();
        window.top.location.href = "/payments?advanced_search[q]=&advanced_search[status]=processing";
      }).catch(function (error) {
        _this3.error_message();
      }).then(function () {});
    },

    success_message: function success_message() {
      _sweetalert2.default.fire({
        title: "Message",
        text: "Request was successful",
        icon: "success"
      });
    },

    error_message: function error_message() {
      _sweetalert2.default.fire({
        title: "Message",
        text: "Unable to process your request at the moment",
        icon: "error"
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":_vm.execute}},[_vm._v("Stalled, Retry ?")])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e12985f", __vue__options__)
  } else {
    hotAPI.reload("data-v-6e12985f", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminServiceLeaderBoard.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["leaderboardservices"],
  data: function data() {
    return {
      services: []
    };
  },

  watch: {
    leaderboardservices: function leaderboardservices(val) {
      this.services = val;
    }
  },
  methods: {
    to_fixed: function to_fixed(val) {
      return (Math.round(val * 100) / 100).toFixed(2);
    },
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    to_human: function to_human(x) {
      if (x == null) return 0;
      var n = this.to_fixed(x);
      return this.formatNumber(n.toLocaleString());
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"card"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(1),_vm._v(" "),_vm._l((_vm.services),function(item,index){return _c('tbody',{key:index},[_c('tr',[_c('td',[_c('strong',[_vm._v(_vm._s(item.service_name))])]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.formatNumber(item.kes_customers)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.formatNumber(item.kes_applications)))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_vm._v("\n                  "+_vm._s(item.currency)+" "+_vm._s(_vm.to_human(item.kes_revenue))+"\n                  ")]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_vm._v("\n                  "+_vm._s(item.currency)+" "+_vm._s(_vm.to_human(item.account_balance))+"\n                ")])])])})],2)])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-8 col-md-6"},[_c('br'),_vm._v(" "),_c('h4',[_vm._v("Service Leader Board - Last 7 Days")]),_vm._v(" "),_c('p',{staticClass:"subtitle"},[_vm._v("List of the most popular services")])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th'),_vm._v(" "),_c('th',{attrs:{"width":"100"}},[_vm._v("Customers")]),_vm._v(" "),_c('th',{attrs:{"width":"100"}},[_vm._v("Submitted")]),_vm._v(" "),_c('th',{staticClass:"text-right",attrs:{"width":"150"}},[_vm._v("Last 7 days")]),_vm._v(" "),_c('th',{staticClass:"text-right",attrs:{"width":"200"}},[_vm._v("All Time Revenue")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41c752e6", __vue__options__)
  } else {
    hotAPI.reload("data-v-41c752e6", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AdminServicesRevShare.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _vueTableDynamic = require("vue-table-dynamic");

var _vueTableDynamic2 = _interopRequireDefault(_vueTableDynamic);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "RevShare",
  props: ["dbrevshares", "currencies", "accounts", "mainagency", "mainmerchant", "currency"],
  data: function data() {
    return {
      account_no: null,

      value: 0,
      desc: "Services - Accounts margin setup",
      indexes: [],
      topushData: [],
      selectedIndex: null,
      revshares: [],
      final_revshare: null,
      all_parsed_accounts: [],
      params: {
        data: null,
        header: "row",
        showCheck: true,
        border: true
      }
    };
  },

  components: { VueTableDynamic: _vueTableDynamic2.default },
  watch: {
    mainagency: function mainagency(val) {
      this.all_parsed_agents = this.all_agencies.filter(function (agent) {
        return agent.id == val;
      });
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.all_parsed_accounts = JSON.parse(this.accounts);
    this.params.data = [["Index", "Account Number", "Account Name", "Value (%)"]];
    $("#addRevShare").on("hidden.bs.modal", function () {
      _this.reset();
    });

    var parsed = JSON.parse(this.dbrevshares);

    parsed.forEach(function (part, index, theArray) {
      var accno = theArray[index].account_number;
      var accname = theArray[index].account_name;
      var amount = theArray[index].value;
      var desc = theArray[index].desc;
      _this.params.data.push([index + 1, accno, accname, amount]);

      _this.topushData.push({
        account_number: accno,
        account_name: accname,
        value: amount,
        desc: desc
      });
    });
  },


  methods: {
    setCurrency: function setCurrency() {
      var selected_currency = this.currency || $("#sel_currency").val();
      var active_currency = JSON.parse(this.currencies).filter(function (m) {
        return m.id == parseInt(selected_currency);
      });
      this.all_parsed_accounts = JSON.parse(this.accounts).filter(function (m) {
        return m.currency == active_currency[0].currency;
      });
    },

    reset: function reset() {
      this.account_no = null;
      this.value = 0;
      this.desc = "Services - Accounts margin setup";
    },
    add_row: function add_row() {
      var _this2 = this;

      if (this.account_no == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select an account"
        });
        return;
      }

      var found = this.topushData.find(function (s) {
        return s.account_number == _this2.account_no.id;
      }) || null;

      if (found == null) {
        $("#addRevShare .close").click();
        var i = this.params.data.length - 1;
        this.params.data.push([i + 1, this.account_no.id, this.account_no.name, this.value]);

        this.topushData.push({
          account_number: this.account_no.id,
          account_name: this.account_no.name,
          value: this.value,
          desc: this.desc
        });

        this.final_revshare = (0, _stringify2.default)(this.topushData);
        this.reset_revshare(this.final_revshare);
      } else {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Revenue share already exists !"
        });
      }
    },
    remove_row: function remove_row() {
      this.params.data.splice(this.selectedIndex, 1);
      this.topushData.$remove(this.topushData[this.selectedIndex - 1]);
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
      this.selectedIndex = null;
    },
    onSelect: function onSelect(isChecked, index, data) {
      if (isChecked) {
        this.indexes.push(index);
        this.selectedIndex = index;
      } else {
        this.indexes.$remove(index);
        this.selectedIndex = null;
      }
    },
    onSelectionChange: function onSelectionChange(checkedDatas, checkedIndexs, checkedNum) {},
    onCellChange: function onCellChange(rowIndex, columnIndex, data) {
      if (columnIndex == 2) {
        this.topushData[rowIndex - 1].value = data;
      } else {
        this.topushData[rowIndex - 1].account_number = data;
      }
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
    },

    reset_revshare: function reset_revshare(val) {
      $("#revshares").val(val);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-demo",staticStyle:{"width":"800px"}},[_c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)","data-toggle":"modal","data-target":"#addRevShare"},on:{"click":_vm.setCurrency}},[_c('i',{staticClass:"fa fa-plus"})]),_vm._v(" "),(_vm.selectedIndex)?_c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.remove_row}},[_c('i',{staticClass:"fa fa-remove"})]):_vm._e(),_vm._v(" "),_c('vue-table-dynamic',{ref:"table",attrs:{"params":_vm.params},on:{"select":_vm.onSelect,"selection-change":_vm.onSelectionChange,"cell-change":_vm.onCellChange}}),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addRevShare","tabindex":"-1","role":"dialog","aria-labelledby":"addRevShare","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Select an Account")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.all_parsed_accounts,"label":"name"},model:{value:(_vm.account_no),callback:function ($$v) {_vm.account_no=$$v},expression:"account_no"}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Amount/Value")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],staticClass:"form-control",attrs:{"type":"number","min":"0","required":""},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.desc),expression:"desc"}],staticClass:"form-control",attrs:{"type":"hidden"},domProps:{"value":(_vm.desc)},on:{"input":function($event){if($event.target.composing){ return; }_vm.desc=$event.target.value}}})],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n              Close\n            ")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Add RevShare"},on:{"click":_vm.add_row}})])])])])])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add Revenue Share")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a74c7d10", __vue__options__)
  } else {
    hotAPI.reload("data-v-a74c7d10", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/AgencyDashboard.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "AgencyDashboard",
    props: ['con_key', 'con_secret', 'banner', 'current_user', 'default_currency', 'current_account_balance', 'current_account_currency'],
    data: function data() {
        var _ref;

        return _ref = {
            api_token: null,
            revenue_today: null
        }, (0, _defineProperty3.default)(_ref, 'revenue_today', null), (0, _defineProperty3.default)(_ref, 'revenue_this_month', null), (0, _defineProperty3.default)(_ref, 'revenue_this_year', null), (0, _defineProperty3.default)(_ref, 'revenue_all_time', null), (0, _defineProperty3.default)(_ref, 'revenues', {}), _ref;
    },
    mounted: function mounted() {
        this.getOauthToken();
        this.get_revenues();
    },
    created: function created() {},

    methods: {
        validater: function validater() {},
        getOauthToken: function getOauthToken() {
            var _this = this;

            var url = "/api/oauth/generate/token";
            _axios2.default.post(url, { secret: this.con_secret, key: this.con_key }).then(function (response) {
                _this.api_token = response.data.token;
            }).catch(function (error) {}).then(function () {});
        },
        get_revenues: function get_revenues() {
            var _this2 = this;

            var url = "/api/dashboard/agency/revenue/stats";
            _axios2.default.get(url).then(function (response) {
                _this2.revenues = response.data;
                _this2.revenue_today = _this2.to_human(_this2.revenues.revenue_today);
                _this2.revenue_this_month = _this2.to_human(_this2.revenues.revenue_this_month);
                _this2.revenue_this_year = _this2.to_human(_this2.revenues.revenue_this_year);
                _this2.revenue_all_time = _this2.to_human(_this2.revenues.revenue_all_time);
            }).catch(function (error) {}).then(function () {});
        },
        to_human: function to_human(x) {
            var n = this.to_fixed(x);
            return n.toLocaleString();
        },
        to_fixed: function to_fixed(val) {
            return (Math.round(val * 100) / 100).toFixed(2);
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"card mt-4",staticStyle:{"background":"#fffef8"}},[_c('div',{staticClass:"card-body py-2"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-12 col-lg-4 order-lg-2"},[_c('div',{staticClass:"text-center"},[_c('img',{staticClass:"img-fluid mt-md-n5 mt-lg-0 mr-md-n5",staticStyle:{"max-width":"397px"},attrs:{"src":_vm.banner,"alt":"..."}})])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-8 px-4 py-3 order-lg-1"},[_c('span',{staticClass:"h2 mb-0"},[_vm._v("Welcome back "+_vm._s(_vm.current_user))]),_vm._v(" "),(_vm.revenue_today > 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n            Here’s how the numbers are looking. You have earned "+_vm._s(_vm.current_account_currency)+"\n            "+_vm._s(_vm.revenue_today)+" today. Keep it up\n          ")]):_vm._e(),_vm._v(" "),(_vm.revenue_today <= 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n            Here’s how the numbers are looking. You have earned "+_vm._s(_vm.current_account_currency)+"\n            "+_vm._s((_vm.revenue_today))+" today.\n          ")]):_vm._e(),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-auto align-middle"},[_c('span',{staticClass:"h1"},[_vm._v(_vm._s(_vm.current_account_currency)+" "+_vm._s(_vm.to_human(_vm.current_account_balance)))])])])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Today")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+" "+_vm._s(_vm.revenue_today))])]),_vm._v(" "),_vm._m(0)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("This month")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+" "+_vm._s(_vm.revenue_this_month))])]),_vm._v(" "),_vm._m(1)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("This year")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+" "+_vm._s(_vm.revenue_this_year))])]),_vm._v(" "),_vm._m(2)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("All time revenue")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+" "+_vm._s(_vm.revenue_all_time))])]),_vm._v(" "),_vm._m(3)])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-xl-12"},[_c('div',{staticClass:"card"},[_vm._m(4),_vm._v(" "),_c('div',{staticClass:"card-body",staticStyle:{"height":"100%","width":"100%"}},[_c('agency-revenue-30day-chart')],1)])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Customers today")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.customers_today))])]),_vm._v(" "),_vm._m(5)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Total customers")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.customers_total))])]),_vm._v(" "),_vm._m(6)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Average services")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.avg_services))])]),_vm._v(" "),_vm._m(7)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Average spending")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.float_account_currency)+" "+_vm._s(_vm.avg_spending))])]),_vm._v(" "),_vm._m(8)])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-xl-8"},[_c('div',{staticClass:"card"},[_vm._m(9),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('agency-customer-30day-chart')],1)])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-4"},[_c('div',{staticClass:"card card-fill"},[_vm._m(10),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_c('thead',[_c('tr',[_vm._m(11),_vm._v(" "),_vm._m(12),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-services"}},[_vm._v(_vm._s(_vm.float_account_currency))])])])]),_vm._v(" "),(_vm.popular_services)?_c('tbody',{staticClass:"list"},_vm._l((_vm.popular_services),function(item,i){return _c('tr',{key:i},[_c('td',{staticClass:"elipsis"},[_vm._v(_vm._s(_vm.trunc(item.service_name)))]),_vm._v(" "),_c('td',{staticClass:"customer-phone"},[_vm._v("\n                  "+_vm._s(_vm.to_human(item.customers_total))+"\n                ")]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                  "+_vm._s(_vm.to_human(item.agent_margin))+"\n                ")])])}),0):_vm._e()])])])])]),_vm._v(" "),_c('withdrawal-tool',{attrs:{"conkey":_vm.con_key,"consecret":_vm.con_secret,"merchantid":_vm.merchant_id,"syncbal":_vm.current_account_balance,"currentaccountbalance":_vm.current_account_balance},on:{"update:syncbal":function($event){_vm.current_account_balance=$event}}}),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"depositModal","tabindex":"-1","role":"dialog","aria-labelledby":"depositModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmDeposit","name":"frmDeposit","onsubmit":"return false;"}},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Deposit Funds "+_vm._s(_vm.current_merchant))]),_vm._v(" "),_vm._m(13)]),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.topup_phone),expression:"topup_phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"211700000000"},domProps:{"value":(_vm.topup_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.topup_phone=$event.target.value}}}),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.topup_amount),expression:"topup_amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","max":"70000","id":"ag_deposit_amount"},domProps:{"value":(_vm.topup_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.topup_amount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('a',{staticClass:"btn btn-primary",attrs:{"href":"#","type":"button"},on:{"click":_vm.validater}},[_vm._v("Checkout")])])])])])])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-dollar-sign text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-clock text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Revenue")]),_vm._v(" "),_c('span',{staticClass:"text-muted mr-3"},[_vm._v("Last year comparision:")]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-switch"},[_c('input',{staticClass:"custom-control-input",attrs:{"type":"checkbox","id":"cardToggle","data-toggle":"chart","data-target":"#conversionsChart","data-trigger":"change","data-action":"add","data-dataset":"1"}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"cardToggle"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-dollar-sign text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('div',{staticClass:"chart chart-sparkline"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-clock text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Customers")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Popular Services")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-id"}},[_vm._v("Service")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-phone"}},[_vm._v("Applications")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51c6b2de", __vue__options__)
  } else {
    hotAPI.reload("data-v-51c6b2de", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/BatchWithdrawForm.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["post_url", "merchants", "accounts_url", "currencies", "index_page", "csrf_token", "initiate_transfer_url", "allow_eft_withdrawals", "gateways_url"],
  data: function data() {
    return {
      merchantsList: [],
      accounts: [],
      merchant_id: "",
      currency_id: "",
      selectedAccounts: [],
      allAccountsSelected: false,
      displayAccounts: [],
      loading: true,
      decodedCurrencies: [],
      changeset: {},
      validAmount: false,
      bank_accounts: [],
      payment_gateways: [],
      amount: null,
      step: 1,
      bankAccountId: null,
      gatewayId: null,
      transferType: null
    };
  },

  computed: {},
  mounted: function mounted() {
    this.merchantsList = JSON.parse(this.merchants);
    this.decodedCurrencies = JSON.parse(this.currencies);
    if (this.merchantsList.length == 1) {
      this.merchant_id = this.merchantsList[0].id;
      this.preloadAccounts();
    }
  },

  watch: {
    selectedAccounts: function selectedAccounts() {
      var _this = this;

      if (this.selectedAccounts.includes("all")) {
        this.allAccountsSelected = true;
      } else {
        this.allAccountsSelected = false;
        this.accounts = this.accounts.filter(function (account) {
          return !_this.selectedAccounts.includes(account.id) && !_this.selectedAccounts.includes("all");
        });
      }
      this.fetchAccounts();
    }
  },
  methods: {
    preloadAccounts: function preloadAccounts() {
      var _this2 = this;

      if (this.merchant_id == "" || this.currency_id == "") {
        return;
      } else {
        _axios2.default.get(this.accounts_url + "?merchant_id=" + this.merchant_id + "&currency_id=" + this.currency_id).then(function (response) {
          if (response.status == 200) {
            _this2.accounts = response.data.accounts;
          }
        });
      }
    },

    fetchAccounts: function fetchAccounts() {
      var _this3 = this;

      var account_ids = [].concat((0, _toConsumableArray3.default)(this.accounts.map(function (account) {
        return account.id;
      })));
      if (this.allAccountsSelected) {
        _axios2.default.post(this.accounts_url, { account_ids: account_ids }).then(function (response) {
          if (response.status == 200) {
            _this3.displayAccounts = response.data.accounts;
            _this3.selectedAccounts = account_ids;
          }
        });
      } else {
        if (this.selectedAccounts.length) {
          _axios2.default.post(this.accounts_url, { account_ids: this.selectedAccounts }).then(function (response) {
            if (response.status == 200) {
              _this3.displayAccounts = response.data.accounts;
            }
          });
        } else {
          this.displayAccounts = [];
        }
      }
    },

    checkAmount: function checkAmount(account) {
      if ((account.amount != null || account.amount != "0") && account.amount <= account.balance) {
        this.loading = false;
        this.validAmount = true;
      } else {
        this.validAmount = false;
        this.changeset = { errors: "Invalid amount" };
      }
    },

    removeAccount: function removeAccount(account) {
      this.allAccountsSelected = false;
      this.selectedAccounts = this.selectedAccounts.filter(function (item) {
        return item != account.id;
      });
      this.fetchAccounts();
      this.preloadAccounts();
    },

    updateBankAccounts: function updateBankAccounts() {
      var _this4 = this;

      if (this.transferType == 'eft') {
        _axios2.default.get(this.gateways_url).then(function (response) {
          if (response.data.status == "ok") {
            _this4.payment_gateways = response.data.gateways;
          }
        });
      }
    },

    withdrawFunds: function withdrawFunds() {
      var _this5 = this;

      var confirmSubmit = confirm("Are you sure?");
      var self = this;
      if (confirmSubmit && this.displayAccounts.length) {
        var payload = {
          accounts: this.displayAccounts,
          merchant_id: this.merchant_id,
          currency_id: this.currency_id,
          transfer_type: this.transferType
        };
        _axios2.default.post(this.post_url, { withdraw: payload }).then(function (response) {
          if (response.data.status == "ok") {
            self.payment_gateways = response.data.payment_gateways;
            self.bank_accounts = response.data.bank_accounts;
            self.amount = response.data.amount;
            self.banks = response.data.banks;
            self.changeset = {};
            self.step = 2;
          } else {
            _this5.changeset = { message: response.data.errors };
          }
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        return;
      }
    },

    submitWithdrawal: function submitWithdrawal() {
      var _this6 = this;

      var confirmSubmit = confirm("Are you sure?");
      if (confirmSubmit && this.bankAccountId != null && this.gatewayId != null) {
        var payload = {
          accounts: this.displayAccounts,
          merchant_id: this.merchant_id,
          currency_id: this.currency_id,
          amount: this.amount,
          payment_gateway_id: this.gatewayId,
          bank_account_id: this.bankAccountId,
          transfer_type: this.transferType
        };
        _axios2.default.post(this.initiate_transfer_url, {
          _csrf_token: this.csrf_token,
          withdraw: payload
        }).then(function (res) {
          if (res.data.status == "ok") {
            _sweetalert2.default.fire({
              position: "top-end",
              icon: "success",
              title: "Successful request",
              text: "A withdrawal requst has been submitted successfully to be processed.",
              timer: 3000
            }).then(function () {
              location.href = _this6.index_page;
            });
          } else {
            _this6.changeset = { message: res.data.errors };
          }
        });
      } else {
        this.changeset = {
          message: "Please select destination account and payment gateway"
        };
        return;
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.step == 1)?_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit.apply(null, arguments)}}},[(_vm.changeset.message != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n      "+_vm._s(_vm.changeset.message)+"\n    ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.merchantsList.length > 1),expression:"merchantsList.length > 1"}],staticClass:"mb-3"},[_c('label',[_vm._v("Merchant")]),_vm._v(" "),_c('select2',{staticClass:"form-control",on:{"change":_vm.preloadAccounts},model:{value:(_vm.merchant_id),callback:function ($$v) {_vm.merchant_id=$$v},expression:"merchant_id"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select merchant")]),_vm._v(" "),_vm._l((_vm.merchantsList),function(merchant){return _c('option',{key:merchant.id,domProps:{"value":merchant.id}},[_vm._v("\n            "+_vm._s(merchant.name)+"\n          ")])})],2)],1),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Currency")]),_vm._v(" "),_c('select2',{staticClass:"form-control",on:{"change":_vm.preloadAccounts},model:{value:(_vm.currency_id),callback:function ($$v) {_vm.currency_id=$$v},expression:"currency_id"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select Currency")]),_vm._v(" "),_vm._l((_vm.decodedCurrencies),function(currency){return _c('option',{key:currency.id,domProps:{"value":currency.id}},[_vm._v("\n            "+_vm._s(currency.symbol)+"\n          ")])})],2)],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.accounts.length > 0),expression:"accounts.length > 0"}],staticClass:"form-group mb-3"},[_c('label',[_vm._v("Accounts")]),_vm._v(" "),_c('select2',{attrs:{"multiple":""},model:{value:(_vm.selectedAccounts),callback:function ($$v) {_vm.selectedAccounts=$$v},expression:"selectedAccounts"}},[_c('option',{attrs:{"value":"all"}},[_vm._v("Select all")]),_vm._v(" "),_vm._l((_vm.accounts),function(account){return _c('option',{key:account.id,domProps:{"value":account.id}},[_vm._v("\n            "+_vm._s(account.name)+"\n          ")])})],2)],1),_vm._v(" "),(_vm.displayAccounts && _vm.displayAccounts.length > 0)?_c('div',{staticClass:"form-group mb-3 border-bottom"},_vm._l((_vm.displayAccounts),function(account){return _c('div',{key:account.id},[_c('div',{staticClass:"form-row mb-3"},[_c('div',{staticClass:"form-group col-md-4"},[_c('label',[_vm._v("Account name")]),_vm._v(" "),_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":account.name}})]),_vm._v(" "),_c('div',{staticClass:"form-group col-md-3"},[_c('label',[_vm._v("Account balance")]),_vm._v(" "),_c('input',{staticClass:"form-control",class:{ 'is-invalid': account.balance == 0 },attrs:{"type":"number","readonly":""},domProps:{"value":account.balance}})]),_vm._v(" "),_c('div',{staticClass:"form-group col-md-3"},[_c('label',[_vm._v("Amount to withdraw")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(account.amount),expression:"account.amount"}],staticClass:"form-control",class:{ 'is-invalid': account.balance == 0 },attrs:{"type":"number","min":"0","max":account.balance,"disabled":account.balance == 0,"required":""},domProps:{"value":(account.amount)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(account, "amount", $event.target.value)},function($event){return _vm.checkAmount(account)}]}})]),_vm._v(" "),_c('div',{staticClass:"form-group col-md-2 mt-4"},[_c('div',{staticClass:"btn btn-outline-danger",on:{"click":function($event){return _vm.removeAccount(account)}}},[_c('i',{staticClass:"fe fe-minus-circle"},[_vm._v(" Remove")])])])])])}),0):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.selectedAccounts.length >= 1),expression:"selectedAccounts.length >= 1"}],staticClass:"row mb-3"},[_c('div',{staticClass:"col-6 mt-3"},[_c('button',{staticClass:"btn btn-block btn-outline-secondary",attrs:{"type":"button"},on:{"click":function($event){return _vm.window.location.reload()}}},[_vm._v("\n            Cancel\n          ")])]),_vm._v(" "),_c('div',{staticClass:"col-6 mt-3"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button","disabled":_vm.loading},on:{"click":_vm.withdrawFunds}},[_vm._v("\n            Proceed\n          ")])])])])]):_vm._e(),_vm._v(" "),(_vm.step == 2)?_c('form',[(_vm.changeset.message != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n      "+_vm._s(_vm.changeset.message)+"\n    ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Destination Account")]),_vm._v(" "),_c('select2',{attrs:{"required":""},model:{value:(_vm.bankAccountId),callback:function ($$v) {_vm.bankAccountId=$$v},expression:"bankAccountId"}},[_c('option',[_vm._v("Select Bank Account...")]),_vm._v(" "),_vm._l((_vm.bank_accounts),function(account){return _c('option',{key:account.id,domProps:{"value":account.id}},[_vm._v("\n            "+_vm._s(account.name)+"\n          ")])})],2)],1),_vm._v(" "),(_vm.allow_eft_withdrawals == 'true')?_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Select the type of transfer")]),_vm._v(" "),_c('select2',{attrs:{"required":""},on:{"change":_vm.updateBankAccounts},model:{value:(_vm.transferType),callback:function ($$v) {_vm.transferType=$$v},expression:"transferType"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select transfer type...")]),_vm._v(" "),_c('option',{attrs:{"value":"interbank"}},[_vm._v("Internal Funds Transfer")]),_vm._v(" "),_c('option',{attrs:{"value":"eft"}},[_vm._v("External Funds Transfer")])])],1):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Withdraw Through... ")]),_vm._v(" "),_c('select2',{attrs:{"required":""},model:{value:(_vm.gatewayId),callback:function ($$v) {_vm.gatewayId=$$v},expression:"gatewayId"}},[_c('option',[_vm._v("Select gateway...")]),_vm._v(" "),_vm._l((_vm.payment_gateways),function(gateway){return _c('option',{key:gateway.id,domProps:{"value":gateway.id}},[_vm._v("\n          "+_vm._s(gateway.name)+"\n        ")])})],2)],1),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Amount to Withdraw")]),_vm._v(" "),_c('input',{staticClass:"form-control",attrs:{"type":"number","readonly":""},domProps:{"value":_vm.amount}})]),_vm._v(" "),_c('div',{staticClass:"row mb-3"},[_c('div',{staticClass:"col-6 mt-3"},[_c('button',{staticClass:"btn btn-block btn-outline-secondary",attrs:{"type":"button"},on:{"click":function($event){return _vm.window.location.reload()}}},[_vm._v("\n          Cancel\n        ")])]),_vm._v(" "),_c('div',{staticClass:"col-6 mt-3"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button"},on:{"click":_vm.submitWithdrawal}},[_vm._v("\n          Submit\n        ")])])])]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a365852", __vue__options__)
  } else {
    hotAPI.reload("data-v-7a365852", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/DownloadReport.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _xlsx = require("xlsx");

var _xlsx2 = _interopRequireDefault(_xlsx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["item"],
  data: function data() {
    return {
      parsedItem: {},
      name: "Excel"
    };
  },
  mounted: function mounted() {
    this.parsedItem = JSON.parse(this.item);
    this.name = this.$attrs["name"];
  },

  methods: {
    download_report: async function download_report() {
      var resp = await _axios2.default.post("/api/download/child/settlements", {
        item: this.parsedItem
      });
      var data = resp.data.content;
      var worksheet = _xlsx2.default.utils.json_to_sheet(data);
      var workbook = _xlsx2.default.utils.book_new();
      _xlsx2.default.utils.book_append_sheet(workbook, worksheet, "Settlement Items");
      var excelBuffer = _xlsx2.default.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      var filename = "settlement_items.xlsx";
      var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      var blob = new Blob([excelBuffer], { type: mimeType });
      var url = window.URL.createObjectURL(blob);

      var link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn btn-outline-success btn-sm",on:{"click":_vm.download_report}},[_c('span',{staticClass:"iconify",attrs:{"data-icon":"fa:file-excel-o","data-inline":"false"}}),_vm._v("\n  "+_vm._s(this.name)+"\n")])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25a119dd", __vue__options__)
  } else {
    hotAPI.reload("data-v-25a119dd", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/MakerChecker.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _TaskPaginate = require("./TaskPaginate.vue");

var _TaskPaginate2 = _interopRequireDefault(_TaskPaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { TaskPaginate: _TaskPaginate2.default },
    props: ["task_url", "pick_url", "return_url", "csrf_token", "show_url"],
    data: function data() {
        return {
            activeTab: 0,
            searchQuery: '',
            currentPage: 1,
            totalPages: 0,
            activeTasks: [],
            pickedTasks: [],
            pendingTasks: [],
            pendingReview: [],
            completedTasks: [],
            totalApproved: 0,
            totalPendingReview: 0,
            inProgress: 0
        };
    },
    mounted: function mounted() {
        this.loadQueue();
    },
    methods: {
        toHumanDate: function toHumanDate(date) {
            return moment(date).format('DD-MM-YYYY hh:mmA');
        },
        changeTab: function changeTab(tab) {
            this.activeTab = tab;
            switch (tab) {
                case 0:
                    return this.loadQueue();
                case 1:
                    return this.loadPicked();
                case 2:
                    return this.loadInProgress();
                case 3:
                    return this.loadPendingReview();
                case 4:
                    return this.loadComplete();
                default:
                    return this.loadQueue();
            }
        },
        loadQueue: function loadQueue() {
            var _this = this;

            Vue.axios.get(this.task_url + "?page=" + this.currentPage + "&status=pending&search=" + this.searchQuery).then(function (response) {
                _this.pendingTasks = response.data.tasks;
                _this.totalPages = response.data.total_pages;
                _this.inProgress = response.data.total_active;
                _this.totalApproved = response.data.total_acted_on;
                page: response.data.page;
            }).catch(function (error) {
                console.log(error);
            });
        },
        loadPicked: function loadPicked() {
            var _this2 = this;

            Vue.axios.get(this.task_url + "?page=" + this.currentPage + "&status=active&search=" + this.searchQuery + "&type=picked").then(function (response) {
                _this2.pickedTasks = response.data.tasks;
                _this2.totalPages = response.data.total_pages;
                page: response.data.page;
            }).catch(function (error) {
                console.log(error);
            });
        },
        loadInProgress: function loadInProgress() {
            var _this3 = this;

            Vue.axios.get(this.task_url + "?page=" + this.currentPage + "&status=active&search=" + this.searchQuery).then(function (response) {
                _this3.activeTasks = response.data.tasks;
                _this3.totalPages = response.data.total_pages;
                _this3.inProgress = response.data.total_active;
                page: response.data.page;
            }).catch(function (error) {
                console.log(error);
            });
        },
        loadPendingReview: function loadPendingReview() {
            this.totalPages = 0;
        },
        loadComplete: function loadComplete() {
            var _this4 = this;

            Vue.axios.get(this.task_url + "?page=" + this.currentPage + "&status=completed&search=" + this.searchQuery).then(function (response) {
                _this4.completedTasks = response.data.tasks;
                _this4.totalPages = response.data.total_pages;
                _this4.totalApproved = response.data.total_acted_on;
                page: response.data.page;
            }).catch(function (error) {
                console.log(error);
            });
        },
        pageChanged: function pageChanged(page) {
            this.currentPage = page;
            this.changeTab(this.activeTab);
        },
        pickTask: function pickTask(task) {
            var _this5 = this;

            var url = this.pick_url.replace('__id', task.id);
            Vue.axios.put(url, { _csrf_token: this.csrf_token }).then(function (response) {
                _this5.loadPicked();
                _this5.loadQueue();
            }).catch(function (error) {
                console.log(error);
            });
        },
        returnTask: function returnTask(task) {
            var _this6 = this;

            var url = this.return_url.replace('__id', task.id);
            Vue.axios.put(url, { _csrf_token: this.csrf_token }).then(function (response) {
                _this6.loadPicked();
                _this6.loadQueue();
            }).catch(function (error) {
                console.log(error);
            });
        },
        showTask: function showTask(task) {
            var url = this.show_url.replace('__id', task.id);
            window.top.location = url;
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tab-wrapper mt-4"},[_c('div',{staticClass:"d-md-flex d-none justify-content-between"},[_c('span',[_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 0 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px","color":"#667085"},on:{"click":function($event){return _vm.changeTab(0)}}},[_vm._v("Queue\n                ")]),_vm._v(" "),_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 1 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px","color":"#667085"},on:{"click":function($event){return _vm.changeTab(1)}}},[_vm._v("Picked\n                ")])]),_vm._v(" "),_c('span',[_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 2 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px","color":"#667085"},on:{"click":function($event){return _vm.changeTab(2)}}},[_vm._v("In Progress\n                    "),_c('span',{staticStyle:{"background-color":"#F2F4F7","padding":"0px 8px","border-radius":"100%","margin-left":"8px"}},[_vm._v(_vm._s(_vm.inProgress))])]),_vm._v(" "),_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 3 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px","color":"#667085"},on:{"click":function($event){return _vm.changeTab(3)}}},[_vm._v("Pending Review\n                    "),_c('span',{staticStyle:{"background-color":"#F2F4F7","padding":"0px 8px","border-radius":"100%","margin-left":"8px"}},[_vm._v(_vm._s(_vm.totalPendingReview))])]),_vm._v(" "),_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 4 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px","color":"#667085"},on:{"click":function($event){return _vm.changeTab(4)}}},[_vm._v("Complete\n                    "),_c('span',{staticStyle:{"background-color":"#F2F4F7","padding":"0px 8px","border-radius":"100%","margin-left":"8px"}},[_vm._v(_vm._s(_vm.totalApproved))])])])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 0),expression:"activeTab === 0"}]},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 0),expression:"activeTab === 0"}],staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 0 }},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(0),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchQuery),expression:"searchQuery"}],staticClass:"form-control",attrs:{"type":"search","placeholder":"Search Queue..."},domProps:{"value":(_vm.searchQuery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchQuery=$event.target.value},function($event){return _vm.changeTab(_vm.activeTab)}]}})])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(1),_vm._v(" "),_c('tbody',_vm._l((_vm.pendingTasks),function(task){return _c('tr',{key:task.id},[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(task.id))]),_vm._v(" "),_c('th',[_vm._v(_vm._s(_vm.toHumanDate(task.inserted_at)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.on_approved.params.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.task_type.name))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.pickTask(task)}}},[_vm._v("Pick")])])])}),0)])]),_vm._v(" "),(_vm.totalPages > 1)?_c('TaskPaginate',{attrs:{"totalPages":_vm.totalPages,"currentPage":_vm.currentPage},on:{"pageChanged":_vm.pageChanged}}):_vm._e()],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 1),expression:"activeTab === 1"}]},[_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 1 }},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(2),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchQuery),expression:"searchQuery"}],staticClass:"form-control",attrs:{"type":"search","placeholder":"Search Picked..."},domProps:{"value":(_vm.searchQuery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchQuery=$event.target.value},function($event){return _vm.changeTab(_vm.activeTab)}]}})])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(3),_vm._v(" "),_c('tbody',_vm._l((_vm.pickedTasks),function(task){return _c('tr',{key:task.id},[(task.status == 'active')?[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(task.id))]),_vm._v(" "),_c('th',[_vm._v(_vm._s(_vm.toHumanDate(task.inserted_at)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.on_approved.params.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.task_type.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.actor))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.returnTask(task)}}},[_vm._v("Cancel")])]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.showTask(task)}}},[_vm._v("View Details")])])]:_vm._e()],2)}),0)])]),_vm._v(" "),(_vm.totalPages > 1)?_c('TaskPaginate',{attrs:{"totalPages":_vm.totalPages,"currentPage":_vm.currentPage},on:{"pageChanged":_vm.pageChanged}}):_vm._e()],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 2),expression:"activeTab === 2"}]},[_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 2 }},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(4),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchQuery),expression:"searchQuery"}],staticClass:"form-control",attrs:{"type":"search","placeholder":"Search In Progress..."},domProps:{"value":(_vm.searchQuery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchQuery=$event.target.value},function($event){return _vm.changeTab(_vm.activeTab)}]}})])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(5),_vm._v(" "),_c('tbody',_vm._l((_vm.activeTasks),function(task){return _c('tr',{key:task.id},[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(task.id))]),_vm._v(" "),_c('th',[_vm._v(_vm._s(_vm.toHumanDate(task.inserted_at)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.on_approved.params.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.task_type.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.status))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.returnTask(task)}}},[_vm._v("Cancel")])]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.showTask(task)}}},[_vm._v("View Details")])])])}),0)])]),_vm._v(" "),(_vm.totalPages > 1)?_c('TaskPaginate',{attrs:{"totalPages":_vm.totalPages,"currentPage":_vm.currentPage},on:{"pageChanged":_vm.pageChanged}}):_vm._e()],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 3),expression:"activeTab === 3"}]},[_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 3 }},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(6),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchQuery),expression:"searchQuery"}],staticClass:"form-control",attrs:{"type":"search","placeholder":"Search Pending Review..."},domProps:{"value":(_vm.searchQuery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchQuery=$event.target.value},function($event){return _vm.changeTab(_vm.activeTab)}]}})])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(7),_vm._v(" "),_c('tbody',_vm._l((_vm.pendingReview),function(task){return _c('tr',{key:task.id},[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(task.id))]),_vm._v(" "),_c('th',[_vm._v(_vm._s(_vm.toHumanDate(task.inserted_at)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.on_approved.params.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.task_type.name))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.showTask(task)}}},[_vm._v("View Details")])])])}),0)])]),_vm._v(" "),(_vm.totalPages > 1)?_c('TaskPaginate',{attrs:{"totalPages":_vm.totalPages,"currentPage":_vm.currentPage},on:{"pageChanged":_vm.pageChanged}}):_vm._e()],1)])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeTab === 4),expression:"activeTab === 4"}]},[_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 4 }},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(8),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchQuery),expression:"searchQuery"}],staticClass:"form-control",attrs:{"type":"search","placeholder":"Search Completed Tasks..."},domProps:{"value":(_vm.searchQuery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.searchQuery=$event.target.value},function($event){return _vm.changeTab(_vm.activeTab)}]}})])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(9),_vm._v(" "),_c('tbody',_vm._l((_vm.completedTasks),function(task){return _c('tr',{key:task.id},[_c('th',{attrs:{"scope":"row"}},[_vm._v(_vm._s(task.id))]),_vm._v(" "),_c('th',[_vm._v(_vm._s(_vm.toHumanDate(task.inserted_at)))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.actor))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(task.task_type.name))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":"#"},on:{"click":function($event){return _vm.showTask(task)}}},[_vm._v("View Details")])])])}),0)])]),_vm._v(" "),(_vm.totalPages > 1)?_c('TaskPaginate',{attrs:{"totalPages":_vm.totalPages,"currentPage":_vm.currentPage},on:{"pageChanged":_vm.pageChanged}}):_vm._e()],1)])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('span',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Log")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created On")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created By")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Task Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Action")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('span',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Log")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created On")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created By")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Task Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Assigned to")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}}),_vm._v(" "),_c('th',{attrs:{"scope":"col"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('span',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Log")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created On")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created By")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Task Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Assigned to")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Status")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}}),_vm._v(" "),_c('th',{attrs:{"scope":"col"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('span',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Created On")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created By")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Task Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Action")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('span',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col"}},[_vm._v("Log")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Created On")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Acted By")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Task Name")]),_vm._v(" "),_c('th',{attrs:{"scope":"col"}},[_vm._v("Action")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09f6f492", __vue__options__)
  } else {
    hotAPI.reload("data-v-09f6f492", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/ManualRecon.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".datePicker[data-v-50fccb98] {\n  width: 100% !important;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _vue2Datepicker = require("vue2-datepicker");

var _vue2Datepicker2 = _interopRequireDefault(_vue2Datepicker);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { DatePicker: _vue2Datepicker2.default },
  props: ["merchants", "pending_settlement_url", "submit_url"],
  data: function data() {
    return {
      merchantList: [],
      date_range: null,
      merchant_id: null,
      pendingItems: [],
      isCheckAll: false,
      selectedItems: []
    };
  },
  mounted: function mounted() {
    this.merchantList = JSON.parse(this.merchants);
  },

  methods: {
    applyFilter: function applyFilter() {
      this.date_range = null;
    },

    fetchSettlementItems: function fetchSettlementItems() {
      var _this = this;

      if (this.merchant_id == null || this.merchant_id == "" || this.date_range == null || this.date_range == ["", ""]) {
        return;
      } else {
        _axios2.default.post(this.pending_settlement_url, {
          merchant_id: this.merchant_id,
          date_range: this.date_range
        }).then(function (res) {
          if (res.status == 200) {
            _this.pendingItems = res.data.items;
          }
        });
      }
    },

    checkAll: function checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selectedItems = [];
      if (this.isCheckAll) {
        for (var key in this.pendingItems) {
          this.selectedItems.push(this.pendingItems[key]);
        }
      }
    },

    updateCheckAll: function updateCheckAll() {
      if (this.pendingItems.length == this.selectedItems.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },

    processSettlement: function processSettlement() {
      var confirmSubmit = confirm("Are you sure?");
      if (!confirmSubmit) {
        return;
      } else {
        _axios2.default.post(this.submit_url, { items: this.selectedItems }).then(function (res) {
          if (res.data.status == "ok") {
            _sweetalert2.default.fire({
              position: "top-end",
              icon: "success",
              title: "Successful request",
              text: "The items have been queued for settlement. Please check again later.",
              timer: 3000
            }).then(function () {
              location.reload();
            });
          } else {
            console.log(res.data.errors);
            _sweetalert2.default.fire({
              position: "top-end",
              icon: "error",
              title: "Error processing request",
              text: "Your request cannot be processed at the moment.",
              timer: 4000
            });
          }
        });
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"card",attrs:{"data-toggle":"lists"}},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"form-group mb-0 col-sm-6"},[_c('select2',{on:{"change":_vm.fetchSettlementItems},model:{value:(_vm.merchant_id),callback:function ($$v) {_vm.merchant_id=$$v},expression:"merchant_id"}},[_c('option',{domProps:{"value":null}},[_vm._v("Select Merchant...")]),_vm._v(" "),_vm._l((_vm.merchantList),function(merchant){return _c('option',{key:merchant.id,domProps:{"value":merchant.id}},[_vm._v("\n              "+_vm._s(merchant.name)+"\n            ")])})],2)],1),_vm._v(" "),_c('div',{staticClass:"form-group mb-0 col-sm-3"},[_c('date-picker',{attrs:{"format":"YYYY-MM-DD HH:mm:ss","confirm":true,"range-separator":"-","value-type":"format","placeholder":"Select date","lang":"en","type":"datetime","input-class":"form-control datePicker","append_to_body":true,"range":true,"shortcuts":false},on:{"clear":_vm.applyFilter,"change":_vm.fetchSettlementItems},model:{value:(_vm.date_range),callback:function ($$v) {_vm.date_range=$$v},expression:"date_range"}})],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.selectedItems && _vm.selectedItems.length),expression:"selectedItems && selectedItems.length"}],staticClass:"col-sm-3"},[_c('button',{staticClass:"btn btn-outline-primary lift btn-block",on:{"click":_vm.processSettlement}},[_vm._v("\n            Process Settlement\n          ")])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-hover table-nowrap card-table"},[_c('thead',[_c('tr',[_c('th',{directives:[{name:"show",rawName:"v-show",value:(_vm.pendingItems && _vm.pendingItems.length),expression:"pendingItems && pendingItems.length"}]},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.isCheckAll),expression:"isCheckAll"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.isCheckAll)?_vm._i(_vm.isCheckAll,null)>-1:(_vm.isCheckAll)},on:{"click":_vm.checkAll,"change":function($event){var $$a=_vm.isCheckAll,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.isCheckAll=$$a.concat([$$v]))}else{$$i>-1&&(_vm.isCheckAll=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.isCheckAll=$$c}}}}),_vm._v(" "),_c('label',[_vm._v(" Select All")])]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("ID")]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("Client Invoice Ref")]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("Currency")]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("Amount Paid")]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("Paid At")]),_vm._v(" "),_c('th',{staticClass:"text-muted"},[_vm._v("Status")])])]),_vm._v(" "),(_vm.pendingItems && _vm.pendingItems.length)?_c('tbody',_vm._l((_vm.pendingItems),function(item){return _c('tr',{key:item.id},[_c('td',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedItems),expression:"selectedItems"}],attrs:{"type":"checkbox"},domProps:{"value":item,"checked":Array.isArray(_vm.selectedItems)?_vm._i(_vm.selectedItems,item)>-1:(_vm.selectedItems)},on:{"change":[function($event){var $$a=_vm.selectedItems,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=item,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selectedItems=$$a.concat([$$v]))}else{$$i>-1&&(_vm.selectedItems=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.selectedItems=$$c}},_vm.updateCheckAll]}})]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.id)+".")]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.invoice_number))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.currency))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.amount_paid))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.inserted_at))]),_vm._v(" "),(item.status == 'settled')?_c('td',[_c('span',{staticClass:"badge badge-pill badge-success"},[_c('i',{staticClass:"fa fa-check-circle",attrs:{"aria-hidden":"true"}}),_vm._v("\n                "+_vm._s(item.status)+"\n              ")])]):_vm._e()])}),0):_c('tbody',[_vm._m(0)])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td',{staticClass:"text-muted"},[_c('i',[_vm._v("Nothing to show...")])]),_vm._v(" "),_c('td'),_vm._v(" "),_c('td'),_vm._v(" "),_c('td')])}]
__vue__options__._scopeId = "data-v-50fccb98"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50fccb98", __vue__options__)
  } else {
    hotAPI.reload("data-v-50fccb98", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/ServiceBankConfig.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['bank_account', 'merchant_services'],
    data: function data() {
        return {
            services: [],
            account: {},
            selectedServices: [],
            searchText: ""
        };
    },
    computed: {
        filteredServices: function filteredServices() {
            var _this = this;

            var services = this.services;
            if (this.searchText) {
                services = services.filter(function (service) {
                    return service.name.toLowerCase().includes(_this.searchText.toLowerCase());
                });
            }
            return services;
        }
    },
    mounted: function mounted() {
        this.account = JSON.parse(this.bank_account);
        this.services = JSON.parse(this.merchant_services);
        this.check_selected();
    },
    methods: {
        check_selected: function check_selected() {
            for (var i = 0; i < this.account.service_bank_accounts.length; i++) {
                this.selectedServices.push(this.account.service_bank_accounts[i].service_id);
            }
        },
        check_if_selected: function check_if_selected(service_id) {
            return this.selectedServices.includes(service_id);
        },
        selectAll: function selectAll() {
            this.selectedServices = [];
            for (var i = 0; i < this.filteredServices.length; i++) {
                this.selectedServices.push(this.filteredServices[i].id);
            }
        },
        deselectAll: function deselectAll() {
            this.selectedServices = [];
            this.searchText = "";
        },
        selectItem: function selectItem() {
            this.selectedServices = [];
            for (var i = 0; i < this.filteredServices.length; i++) {
                if (document.getElementById(this.filteredServices[i].id).checked) {
                    this.selectedServices.push(this.filteredServices[i].id);
                }
            }
        },
        configure_bank_services: function configure_bank_services() {
            var save_url = "/api/bank/account/services";
            Vue.axios.post(save_url, {
                service_ids: this.selectedServices,
                account_id: this.account.id
            }).then(function (response) {
                if (response.data.status === 200) {
                    $("#addServiceBank").modal('hide');
                    window.location.reload();
                } else {
                    alert("Something went wrong");
                }
            }).catch(function (error) {
                alert("Something went wrong");
            });
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"addServiceBank","tabindex":"-1","role":"dialog","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('h4',{staticClass:"modal-title"},[_vm._v("Configure Services for "+_vm._s(_vm.account.name))]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form"},[_c('form',{attrs:{"method":"POST"},on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit.apply(null, arguments)}}},[_c('div',{staticClass:"row align-item-center mb-3"},[_c('div',{staticClass:"col-10"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchText),expression:"searchText"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Search items"},domProps:{"value":(_vm.searchText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.searchText=$event.target.value}}})]),_vm._v(" "),(_vm.selectedServices.length < 1)?_c('div',{staticClass:"col-2"},[_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","disabled":!_vm.filteredServices.length},on:{"click":_vm.selectAll}},[_vm._v("Select All")])]):_c('div',{staticClass:"col-2"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button"},on:{"click":_vm.deselectAll}},[_vm._v("Clear")])])]),_vm._v(" "),_vm._l((_vm.filteredServices),function(service){return _c('div',{key:service.id,staticClass:"form-check"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedServices),expression:"selectedServices"}],staticClass:"form-check-input",attrs:{"type":"checkbox","id":service.id},domProps:{"checked":_vm.check_if_selected(service.id),"value":service.id,"checked":Array.isArray(_vm.selectedServices)?_vm._i(_vm.selectedServices,service.id)>-1:(_vm.selectedServices)},on:{"change":[function($event){var $$a=_vm.selectedServices,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=service.id,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selectedServices=$$a.concat([$$v]))}else{$$i>-1&&(_vm.selectedServices=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.selectedServices=$$c}},_vm.selectItem]}}),_vm._v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":service.id}},[_vm._v("\n                                "+_vm._s(service.name)+"\n                            ")])])})],2)])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","disabled":!_vm.selectedServices.length},on:{"click":_vm.configure_bank_services}},[_vm._v("Save changes")])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53972842", __vue__options__)
  } else {
    hotAPI.reload("data-v-53972842", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/ServiceForm.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["tiered_comms", "comm_type"],
  data: function data() {
    return {
      tiered_commissions: [{ min: "", max: "", value: "" }],
      commission_type: ""
    };
  },
  mounted: function mounted() {
    this.tiered_commissions = JSON.parse(this.tiered_comms);
    this.commission_type = this.comm_type;
  },

  computed: {
    tiered_comm: function tiered_comm() {
      return (0, _stringify2.default)(this.tiered_commissions);
    }
  },
  methods: {
    add_commission: function add_commission() {
      this.tiered_commissions.push({ min: "", max: "", value: "" });
    },
    remove_commission: function remove_commission(index) {
      this.tiered_commissions.splice(index, 1);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9adc5b30", __vue__options__)
  } else {
    hotAPI.reload("data-v-9adc5b30", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/ServiceInvoiceTemplateForm.vue", function(exports, require, module) {
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('label',[_vm._v("\n  HTML Template\n")]),_vm._v(" "),_c('textarea',{staticClass:"form-control",attrs:{"col":"30","rows":"10","placeholder":"Enter HTML Template here"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1aa412b7", __vue__options__)
  } else {
    hotAPI.reload("data-v-1aa412b7", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/SettlementDashboard.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".datePicker[data-v-86efe68c] {\n  width: 100% !important;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _xlsx = require("xlsx");

var _xlsx2 = _interopRequireDefault(_xlsx);

var _vue2Datepicker = require("vue2-datepicker");

var _vue2Datepicker2 = _interopRequireDefault(_vue2Datepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["default_currency", "currencies", "services", "merchants", "bank_accounts", "items_url", "current_user_id", "merchant_ids"],
  components: { DatePicker: _vue2Datepicker2.default },
  data: function data() {
    var _ref;

    return _ref = {
      loading: false,
      settlement_records: [],
      service_name: null,
      service: "",
      total_pages: 0,
      total_entries: 0,
      current_page: 1,
      page_size: 0,
      status: "",
      currency: "",
      all_currencies: [],
      all_services: [],
      merchantsList: [],
      bankAccounts: [],
      bank_account_id: null,
      date_range: null,
      merchant_id: null,
      service_id: null
    }, (0, _defineProperty3.default)(_ref, "loading", false), (0, _defineProperty3.default)(_ref, "filters", {}), (0, _defineProperty3.default)(_ref, "collection_summary", {
      collected: {
        usd_revenue: 0,
        other_revenue: 0,
        usd_applications: 0,
        other_applications: 0
      },
      settled: {
        usd_revenue: 0,
        other_revenue: 0,
        usd_applications: 0,
        other_applications: 0
      },
      pending: {
        usd_revenue: 0,
        other_revenue: 0,
        usd_applications: 0,
        other_applications: 0
      }
    }), _ref;
  },

  computed: {
    can_download: function can_download() {
      if (this.settlement_records.length > 0) return true;
      return false;
    }
  },
  mounted: function mounted() {
    this.all_currencies = JSON.parse(this.currencies);
    this.all_services = JSON.parse(this.services);
    this.merchantsList = JSON.parse(this.merchants);
    this.bankAccounts = JSON.parse(this.bank_accounts);
    this.loading = true;
    this.fetch_collection_summary();
    this.fetch_settlement_records(this.current_page);
  },

  methods: {
    search: function search() {
      this.fetch_settlement_records(this.current_page);
    },
    get_view: function get_view(id) {
      return "/settlements/" + id + "/details";
    },

    fetch_collection_summary: function fetch_collection_summary() {
      var _this = this;

      var auth_url = "/api/settlements/dashboard/data?merchant_ids=" + JSON.parse(this.merchant_ids);
      this.loading = true;
      _axios2.default.get(auth_url).then(function (response) {
        _this.loading = false;
        _this.collection_summary = response.data.collection_summary;
      }).catch(function () {
        _this.loading = false;
      });
    },
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    to_human: function to_human(x) {
      if (x == null) return 0;
      var n = this.to_fixed(x);
      return this.formatNumber(n.toLocaleString());
    },
    to_fixed: function to_fixed(val) {
      return (Math.round(val * 100) / 100).toFixed(2);
    },

    fetch_settlement_records: function fetch_settlement_records(page) {
      var _this2 = this;

      var auth_url = "/api/settlements/batch/list";
      this.loading = true;
      Vue.axios.get(auth_url, {
        params: {
          s: this.service_name,
          page: page,
          status: this.status,
          currency: this.currency,
          service_id: this.service_id,
          merchant_id: this.merchant_id,
          bank_account_id: this.bank_account_id,
          date_range: this.date_range,
          current_user_id: this.current_user_id
        }
      }).then(function (response) {
        _this2.all_services = response.data.merchant_services;
        _this2.loading = false;
        _this2.settlement_records = response.data.entries;
        _this2.total_pages = response.data.total_pages;
        _this2.total_entries = response.data.total_entries;
        _this2.current_page = page;
      }).catch(function () {
        _this2.loading = false;
      });
    },
    applyFilter: function applyFilter() {},
    download_statement: async function download_statement() {
      var resp = await _axios2.default.get("/api/settlements/batch/list", {
        params: {
          s: this.service_name,
          page: this.current_page,
          status: this.status,
          currency: this.currency,
          service_id: this.service_id,
          merchant_id: this.merchant_id,
          bank_account_id: this.bank_account_id,
          paginate: false,
          date_range: this.date_range
        }
      });
      var data = resp.data.map(function (item) {
        return {
          "ID": item.id,
          Reference: item.trx_ref,
          "Start Date": item.start_date,
          "End Date": item.end_date,
          merchant: item.services.merchant_name,
          Service: item.services.name,
          "Bank": item.bank,
          "Account Name": item.account_name,
          "Account Number": item.account_number,
          Applications: item.number_of_transactions,
          Currency: item.currency,
          "Gross Amount": item.gross_value,
          "Net Amount": item.amount,
          Commission: item.commission,
          Status: item.status,
          "Date Submitted": item.inserted_at,
          "Date Settled": item.updated_at,
          "Payment Methods": item.payment_methods
        };
      });
      var worksheet = _xlsx2.default.utils.json_to_sheet(data);
      var workbook = _xlsx2.default.utils.book_new();
      _xlsx2.default.utils.book_append_sheet(workbook, worksheet, "Settlement Items");
      var excelBuffer = _xlsx2.default.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      var filename = "settlement_items.xlsx";
      var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      var blob = new Blob([excelBuffer], { type: mimeType });
      var url = window.URL.createObjectURL(blob);

      var link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"container-fluid"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body bg-warning-soft rounded-top"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h5',{staticClass:"text-uppercase text-warning mb-4"},[_vm._v("Collected")]),_vm._v(" "),_c('div',{staticClass:"h1 mb-3"},[_vm._v("\n                  "+_vm._s(_vm.default_currency)+".\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.collected.other_revenue))+"\n                ")]),_vm._v(" "),_c('div',{staticClass:"h2 mb-0"},[_vm._v("\n                  USD.\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.collected.usd_revenue))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  "+_vm._s(_vm.default_currency)+". APPLICATIONS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(
                      _vm.collection_summary.collected.other_applications
                    ))+"\n                ")])]),_vm._v(" "),_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  USD. APPLICATIONS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(
                      _vm.collection_summary.collected.usd_applications
                    ))+"\n                ")])])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body bg-success-soft rounded-top"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h5',{staticClass:"text-uppercase text-success mb-4"},[_vm._v("\n                  Pending Settlement\n                ")]),_vm._v(" "),_c('div',{staticClass:"h1 mb-3"},[_vm._v("\n                  "+_vm._s(_vm.default_currency)+".\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.pending.other_revenue))+"\n                ")]),_vm._v(" "),_c('div',{staticClass:"h2 mb-0"},[_vm._v("\n                  USD.\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.pending.usd_revenue))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  TOTAL "+_vm._s(_vm.default_currency)+". RECORDS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(
                      _vm.collection_summary.pending.other_applications
                    ))+"\n                ")])]),_vm._v(" "),_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  TOTAL USD. RECORDS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(_vm.collection_summary.pending.usd_applications))+"\n                ")])])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body bg-primary-soft rounded-top"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h5',{staticClass:"text-uppercase text-primary mb-4"},[_vm._v("Settled")]),_vm._v(" "),_c('div',{staticClass:"h1 mb-3"},[_vm._v("\n                  "+_vm._s(_vm.default_currency)+".\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.settled.other_revenue))+"\n                ")]),_vm._v(" "),_c('div',{staticClass:"h2 mb-0"},[_vm._v("\n                  USD.\n                  "+_vm._s(_vm.to_human(_vm.collection_summary.settled.usd_revenue))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  TOTAL "+_vm._s(_vm.default_currency)+". RECORDS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(
                      _vm.collection_summary.settled.other_applications
                    ))+"\n                ")])]),_vm._v(" "),_c('div',{staticClass:"col-lg-6"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2 mt-2"},[_vm._v("\n                  TOTAL USD. RECORDS\n                ")]),_vm._v(" "),_c('div',{staticClass:"h3 mb-0"},[_vm._v("\n                  "+_vm._s(_vm.formatNumber(_vm.collection_summary.settled.usd_applications))+"\n                ")])])])])])])]),_vm._v(" "),_c('div',{staticClass:"card",attrs:{"data-toggle":"lists","data-options":"{\"valueNames\": [\"customer-name\", \"customer-id\", \"customer-id\", \"customer-phone\", \"customer-services\", \"customer-lastserved\",\"customer-servedby\"]}"}},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select2',{staticClass:"form-control",on:{"change":_vm.search},model:{value:(_vm.merchant_id),callback:function ($$v) {_vm.merchant_id=$$v},expression:"merchant_id"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select by Merchant")]),_vm._v(" "),_vm._l((_vm.merchantsList),function(m){return _c('option',{key:m.id,domProps:{"value":m.id}},[_vm._v("\n              "+_vm._s(m.name)+"\n            ")])})],2)],1)]),_vm._v(" "),_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select2',{staticClass:"form-control",on:{"change":_vm.search},model:{value:(_vm.service_id),callback:function ($$v) {_vm.service_id=$$v},expression:"service_id"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select by Service")]),_vm._v(" "),_vm._l((_vm.all_services),function(m){return _c('option',{key:m.id,domProps:{"value":m.id}},[_vm._v("\n              "+_vm._s(m.name)+"\n            ")])})],2)],1),_vm._v(" "),_c('div',{staticClass:"form-group mb-0 col-sm-2"},[_c('select2',{staticClass:"form-control",on:{"change":_vm.search},model:{value:(_vm.currency),callback:function ($$v) {_vm.currency=$$v},expression:"currency"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select by Currency")]),_vm._v(" "),_vm._l((_vm.all_currencies),function(m){return _c('option',{key:m.id,domProps:{"value":m.symbol}},[_vm._v("\n              "+_vm._s(m.symbol)+"\n            ")])})],2)],1),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select2',{staticClass:"form-control",on:{"change":_vm.search},model:{value:(_vm.status),callback:function ($$v) {_vm.status=$$v},expression:"status"}},[_c('option',{attrs:{"value":""}},[_vm._v("Select by Status")]),_vm._v(" "),_c('option',{attrs:{"value":"generated"}},[_vm._v("Generated")]),_vm._v(" "),_c('option',{attrs:{"value":"generated_settlement_inprogress"}},[_vm._v("\n              Settlement In-Progress\n            ")]),_vm._v(" "),_c('option',{attrs:{"value":"settled"}},[_vm._v("Settled")])])],1),_vm._v(" "),_c('div',{staticClass:"form-group mb-0 col-sm-3"},[_c('date-picker',{attrs:{"format":"YYYY-MM-DD","confirm":true,"range-separator":"-","value-type":"format","placeholder":"Select date","lang":"en","type":"date","input-class":"form-control datePicker","append_to_body":true,"range":true,"shortcuts":false},on:{"clear":_vm.applyFilter,"change":_vm.fetch_settlement_records},model:{value:(_vm.date_range),callback:function ($$v) {_vm.date_range=$$v},expression:"date_range"}})],1),_vm._v(" "),(_vm.can_download)?_c('div',{staticClass:"form-group mb-0 col-sm-1"},[_c('button',{staticClass:"btn btn-sm btn-outline-success",on:{"click":_vm.download_statement}},[_c('span',{staticClass:"iconify",attrs:{"data-icon":"fa:file-excel-o","data-inline":"false"}}),_vm._v("\n            Download\n          ")])]):_vm._e()]),_vm._v(" "),(_vm.loading)?_c('div',{staticClass:"table-responsive"},[_c('br'),_vm._v(" "),_vm._m(1)]):_vm._e(),_vm._v(" "),(!_vm.loading)?_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(2),_vm._v(" "),_vm._l((_vm.settlement_records),function(item,index){return _c('tbody',{key:index,staticClass:"list"},[_c('tr',[_c('td',{staticClass:"customer-id"},[_c('a',{attrs:{"href":"#"}},[_vm._v("\n                  "+_vm._s(item.id)+"\n                ")])]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_c('a',{attrs:{"href":_vm.get_view(item.id)}},[_vm._v("\n                  "+_vm._s(item.trx_ref)+"\n                ")])]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_c('time',{attrs:{"datetime":"2022-01-02"}},[_vm._v(_vm._s(item.start_date))]),_vm._v(" "),_c('div',{staticClass:"text-muted"},[_vm._v(_vm._s(item.start_date_time))])]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_c('time',{attrs:{"datetime":"2022-01-02"}},[_vm._v(_vm._s(item.end_date))]),_vm._v(" "),_c('div',{staticClass:"text-muted"},[_vm._v(_vm._s(item.end_date_time))])]),_vm._v(" "),_c('td',{staticClass:"customer-phone"},[_vm._v("\n                "+_vm._s(item.services.merchant_name)+"\n                "),_c('br'),_vm._v(" "),_c('i',{staticClass:"text-muted"},[_vm._v(_vm._s(item.services.name))])]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                "+_vm._s(_vm.formatNumber(item.number_of_transactions))+"\n              ")]),_vm._v(" "),_c('td',{staticClass:"customer-lastserved"},[_vm._v(_vm._s(item.currency))]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                "+_vm._s(_vm.to_human(item.gross_value || 0))+"\n              ")]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                "+_vm._s(_vm.to_human(item.commission || 0))+"\n              ")]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                "+_vm._s(_vm.to_human(item.amount || 0))+"\n              ")]),_vm._v(" "),(item.status == 'complete' || item.status == 'settled')?_c('td',{staticClass:"customer-services"},[_c('span',{staticClass:"badge rounded-pill bg-success text-white pt-2 px-3 text-uppercase"},[_vm._v("Settled")])]):_vm._e(),_vm._v(" "),(item.status == 'pending' || item.status == 'generated')?_c('td',{staticClass:"customer-services"},[_c('span',{staticClass:"badge rounded-pill bg-primary text-white pt-2 px-3 text-uppercase"},[_vm._v("Generated")])]):_vm._e(),_vm._v(" "),(item.status == 'generated_settlement_inprogress')?_c('td',{staticClass:"customer-services"},[_c('span',{staticClass:"badge rounded-pill bg-primary text-white pt-2 px-3 text-uppercase"},[_vm._v("Settlement In-progress")])]):_vm._e(),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_c('time',{attrs:{"datetime":"2022-01-02"}},[_vm._v(_vm._s(item.inserted_at))])]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_vm._v(_vm._s(item.settlement_date))]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_vm._v(_vm._s(item.payment_methods))]),_vm._v(" "),_c('td',{staticClass:"customer-id"},[_c('a',{attrs:{"href":_vm.get_view(item.id)}},[_vm._v("View Settlement")])])])])})],2),_vm._v(" "),(_vm.total_pages > 1)?_c('div',{staticClass:"card-footer d-flex justify-content-between"},[_c('nav',{attrs:{"aria-label":"Page navigation example"}},[_c('ul',{staticClass:"pagination"},[(_vm.total_pages > 1 && _vm.current_page > 1)?_c('li',{staticClass:"page-item"},[_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.fetch_settlement_records(_vm.current_page - 1)}}},[_vm._v("Previous")])]):_vm._e(),_vm._v(" "),_c('li',{staticClass:"page-item"},[(
                    _vm.total_pages > 1 &&
                    _vm.current_page > 0 &&
                    _vm.current_page < _vm.total_pages
                  )?_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.fetch_settlement_records(_vm.current_page + 1)}}},[_vm._v("Next")]):_vm._e()]),_vm._v(" "),_c('li',{staticClass:"page-item d-flex"},[_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"}},[_vm._v("Page "+_vm._s(_vm.current_page)+" of "+_vm._s(_vm.total_entries))])])])])]):_vm._e()]):_vm._e()])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"header mt-md-5"},[_c('div',{staticClass:"header-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"header-pretitle"},[_vm._v("Summary")]),_vm._v(" "),_c('h1',{staticClass:"header-title"},[_vm._v("Settlements Dashboard")]),_vm._v(" "),_c('p',{staticClass:"text-muted"},[_vm._v("\n              Overview of revenue collections and settlements\n            ")])])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-center"},[_c('div',{staticClass:"spinner-border",attrs:{"role":"status"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("ID")]),_vm._v(" "),_c('th',[_vm._v("Reference")]),_vm._v(" "),_c('th',[_vm._v("Start Date")]),_vm._v(" "),_c('th',[_vm._v("End Date")]),_vm._v(" "),_c('th',[_vm._v("Service")]),_vm._v(" "),_c('th',[_vm._v("Applications")]),_vm._v(" "),_c('th',[_vm._v("Currency")]),_vm._v(" "),_c('th',[_vm._v("Gross")]),_vm._v(" "),_c('th',[_vm._v("Commission")]),_vm._v(" "),_c('th',[_vm._v("Net")]),_vm._v(" "),_c('th',[_vm._v("Status")]),_vm._v(" "),_c('th',[_vm._v("Date Submitted")]),_vm._v(" "),_c('th',[_vm._v("Date Settled")]),_vm._v(" "),_c('th',[_vm._v("Payment Method(s)")]),_vm._v(" "),_c('th')])])}]
__vue__options__._scopeId = "data-v-86efe68c"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-86efe68c", __vue__options__)
  } else {
    hotAPI.reload("data-v-86efe68c", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/SettlementDetails.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["default_currency", "id", "name", "datetime", "account_id", "current_user", "bank_details", "status", "start_date", "settlement_recon_type", "can_execute_settlement"],
  data: function data() {
    return {
      loading: false,
      error_message: null,
      creating: false,
      settlement_detail_records: [],
      sales_encoded: [],
      canExecuteSettlement: null,
      settlement_summary: {
        settled: 0,
        pending: 0
      },
      bank_data: {},
      downloadable_items: (0, _stringify2.default)({
        type: "single",
        account_id: this.account_id,
        date: this.start_date
      })
    };
  },
  mounted: function mounted() {
    this.bank_data = JSON.parse(this.bank_details);
    this.fetch_settlement_detail_collection_summary();
    this.fetch_settlement_detail_records();
    this.canExecuteSettlement = this.can_execute_settlement;
    console.log(this.can_execute_settlement);
  },

  computed: {
    can_execute_automatic_settlement: function can_execute_automatic_settlement() {
      if ((this.status == "pending" || this.status == "generated") && this.bank_data.bank_account_no) {
        return true;
      }
      return false;
    }
  },
  methods: {
    get_view: function get_view(id) {
      return "/settlements/" + id + "/details";
    },
    initiate_download: function initiate_download() {},
    fetch_settlement_detail_collection_summary: function fetch_settlement_detail_collection_summary() {
      var _this = this;

      var auth_url = "/api/settlements/" + this.id + "/details/summary";
      this.loading = true;
      Vue.axios.get(auth_url).then(function (response) {
        _this.loading = false;
        _this.settlement_summary.pending = _this.extract_amount(response.data.filter(function (v) {
          return v.status != "settled";
        }));
        _this.settlement_summary.settled = _this.extract_amount(response.data.filter(function (v) {
          return v.status == "settled";
        }));
      }).catch(function () {
        _this.loading = false;
      });
    },
    extract_amount: function extract_amount(elem) {
      if (elem.length == 1) {
        return elem[0].amount;
      }
      if (elem.length > 1) {
        return elem.reduce(this.getSum, 0);
      }
      return 0;
    },
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },

    to_human: function to_human(x) {
      if (x == null) return 0;
      var n = this.to_fixed(x);
      return this.formatNumber(n.toLocaleString());
    },
    to_fixed: function to_fixed(val) {
      return (Math.round(val * 100) / 100).toFixed(2);
    },
    fetch_settlement_detail_records: function fetch_settlement_detail_records() {
      var _this2 = this;

      var auth_url = "/api/settlements/" + this.id + "/details";
      this.loading = true;
      Vue.axios.get(auth_url).then(function (response) {
        _this2.loading = false;
        _this2.settlement_detail_records = response.data.records || [];
        var total = _this2.settlement_detail_records.reduce(_this2.getSum, 0);
        _this2.settlement_detail_records.map(function (v) {
          _this2.sales_encoded.push({
            name: v.gateway,
            y: Math.round(v.amount * 100 / total)
          });
        });
        _this2.render_pg_graphs();
      }).catch(function () {
        _this2.loading = false;
      });
    },
    getSum: function getSum(total, num) {
      return total + Math.round(num.amount);
    },

    render_pg_graphs: function render_pg_graphs() {
      var gatewaySales = this.sales_encoded;
      $("#paymentGateways").highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          height: 350,
          padding: 0,
          margin: 0,
          spacing: 0
        },
        title: {
          text: ""
        },
        legend: {
          enabled: false,
          align: "center",
          layout: "horizontal",
          verticalAlign: "top",
          alignColumns: false,
          margin: 30
        },
        tooltip: {
          headerFormat: "",
          pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> {point.name}: <b>{point.y}</b>%<br/>"
        },
        credits: { enabled: false },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            showInLegend: true,
            dataLabels: {
              enabled: true
            }
          }
        },
        series: [{
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "Payment Gateways",
          data: gatewaySales
        }]
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"header mt-md-5"},[_c('div',{staticClass:"header-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"header-pretitle"},[_vm._v("Summary")]),_vm._v(" "),_c('h1',{staticClass:"header-title"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('p',{staticClass:"text-muted"},[_vm._v("\n              Total funds collected as at "+_vm._s(_vm.datetime)+"\n            ")]),_vm._v(" "),_c('div',[_c('h3',{staticStyle:{"color":"red"}},[_vm._v("Bank Settlement Details")]),_vm._v(" "),_c('p',[_vm._v("\n                Bank Account No: "+_vm._s(this.bank_data.bank_account_no)+" "),_c('br'),_vm._v("\n                Bank: "+_vm._s(this.bank_data.bank_name)+" "),_c('br'),_vm._v("\n                Bank Branch: "+_vm._s(this.bank_data.bank_account_branch)+" "),_c('br')])]),_vm._v(" "),_c('download-report',{attrs:{"item":_vm.downloadable_items,"name":"Download Settlement Items"}},[_vm._v("\n              Download Report\n            ")])],1),_vm._v(" "),_c('div',{staticClass:"row"},[(_vm.canExecuteSettlement == 'true')?_c('div',[(_vm.settlement_recon_type == 'automatic')?_c('div',{staticClass:"col-auto"},[(_vm.can_execute_automatic_settlement)?_c('button',{staticClass:"btn btn-outline-primary lift",attrs:{"data-toggle":"modal","data-target":"#runSettlementModal"}},[_vm._v("\n                Execute Settlement\n              ")]):_vm._e(),_vm._v(" "),(_vm.status == 'generated_settlement_inprogress')?_c('button',{staticClass:"btn btn-outline-warning"},[_vm._v("\n                Settlement in progress\n              ")]):_vm._e(),_vm._v(" "),(_vm.status == 'settled')?_c('button',{staticClass:"btn btn-danger"},[_vm._v("\n                Settled\n              ")]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.settlement_recon_type == 'manual')?_c('div',{staticClass:"col-auto"},[(_vm.status == 'generated')?_c('button',{staticClass:"btn btn-outline-primary lift",attrs:{"data-toggle":"modal","data-target":"#uploadPaymentSlipModal"}},[_vm._v("\n                Execute Settlement\n              ")]):_vm._e(),_vm._v(" "),(_vm.status == 'settled')?_c('button',{staticClass:"btn btn-danger"},[_vm._v("\n                Settled\n              ")]):_vm._e()]):_vm._e()]):_vm._e(),_vm._v(" "),_vm._m(0)])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-7"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body bg-success-soft rounded"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h5',{staticClass:"text-uppercase text-success mb-2"},[_vm._v("\n                      Pending Settlement\n                    ")]),_vm._v(" "),_c('div',{staticClass:"h1 mb-0"},[_vm._v("\n                      "+_vm._s(_vm.default_currency)+".\n                      "+_vm._s(_vm.to_human(_vm.settlement_summary.pending))+"\n                    ")])])])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body bg-primary-soft rounded"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h5',{staticClass:"text-uppercase text-primary mb-2"},[_vm._v("Settled")]),_vm._v(" "),_c('div',{staticClass:"h1 mb-0"},[_vm._v("\n                      "+_vm._s(_vm.default_currency)+".\n                      "+_vm._s(_vm.to_human(_vm.settlement_summary.settled))+"\n                    ")])])])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"card"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_vm._m(2),_vm._v(" "),_vm._l((_vm.settlement_detail_records),function(item,index){return _c('tbody',{key:index,staticClass:"fs-base"},[_c('tr',[_c('td',[_vm._v(_vm._s(item.gateway))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.applications || 0))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(item.currency))]),_vm._v(" "),_c('td',{staticClass:"text-right"},[_vm._v("\n                        "+_vm._s(_vm.to_human(item.amount))+"\n                      ")])])])})],2)])])])])]),_vm._v(" "),_vm._m(3)])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('a',{staticClass:"btn btn-primary lift",attrs:{"href":"/settlements"}},[_vm._v("Back")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Payment Gateway Breakdown")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Gateway")]),_vm._v(" "),_c('th',[_vm._v("Applications")]),_vm._v(" "),_c('th',[_vm._v("Currency")]),_vm._v(" "),_c('th',{staticClass:"text-right"},[_vm._v("Amount")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-lg-5"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Payment Gateway Summary")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticStyle:{"width":"100%","height":"350px","overflow-x":"hidden"},attrs:{"id":"paymentGateways"}})])])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1c3398e8", __vue__options__)
  } else {
    hotAPI.reload("data-v-1c3398e8", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/ShowTask.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['task', 'maker', 'actor', 'comments', 'attachments', 'return_url', 'csrf_token', 'show_url', 'process_url'],
    data: function data() {
        return {
            makeTask: {},
            taskComments: null,
            taskAttachments: null,
            taskActor: null,
            taskMaker: null,
            activeTab: 0,
            result: { ext: '', fileName: '' },
            reasons: '',
            message: null,
            errorMessage: null
        };
    },
    mounted: function mounted() {
        this.makeTask = JSON.parse(this.task);
        this.taskComments = JSON.parse(this.comments);
        this.taskAttachments = JSON.parse(this.attachments);
        this.taskActor = JSON.parse(this.actor);
        this.taskMaker = JSON.parse(this.maker);
    },
    computed: {
        isButtonDisabled: function isButtonDisabled() {
            return this.makeTask.status == 'approved' || this.makeTask.status == 'declined';
        }
    },
    methods: {
        changeTab: function changeTab(tab) {
            this.activeTab = tab;
        },

        toHumanDate: function toHumanDate(date) {
            return moment(date).format('DD-MM-YYYY hh:mmA');
        },
        processAttachment: function processAttachment(attachment) {
            var fileName = attachment.name.split("||")[0];
            var ext = fileName.split(".").pop();
            var elipsis = fileName.length > 18 ? "..." : "";
            var truncatedFileName = fileName.slice(0, 18) + elipsis;

            this.result.ext = ext;
            this.result.fileName = truncatedFileName + ext;
        },

        reAssign: function reAssign() {
            var _this = this;

            var url = this.return_url.replace('__id', this.makeTask.id);
            var confirm = window.confirm('Are you sure you want to reassign this task?');
            if (confirm) {
                Vue.axios.put(url, { _csrf_token: this.csrf_token }).then(function (response) {
                    window.top.location = _this.show_url.replace('__id', _this.makeTask.id);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        },
        processTask: function processTask(action) {
            var _this2 = this;

            var url = this.process_url.replace('__id', this.makeTask.id);
            var payload = void 0;
            if (action == 'decline') {
                if (this.reasons == '') {
                    alert('Please provide reasons for declining this task');
                    return;
                } else {
                    payload = { _csrf_token: this.csrf_token, action: action, comments: this.reasons };
                }
            } else {
                payload = { _csrf_token: this.csrf_token, action: action };
            }

            Vue.axios.put(url, payload).then(function (response) {
                if (response && response.status == 200) {
                    _this2.message = response.data.message;
                    window.location.reload();
                } else {
                    _this2.errorMessage = response.data.message;
                    window.location.reload();
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        cancel: function cancel() {
            window.location.reload();
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.message != null)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v(_vm._s(_vm.message))]):_vm._e(),_vm._v(" "),(_vm.errorMessage != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(_vm._s(_vm.errorMessage))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"tab-wrapper mt-4"},[_c('div',{staticClass:"flex"},[_c('label',{staticClass:"tab-control pb-3 ps-1",class:{ 'border-bottom border-primary border-2 active': _vm.activeTab === 0 },staticStyle:{"font-size":"14px","font-weight":"500","line-height":"22px","margin-right":"36px"},on:{"click":function($event){return _vm.changeTab(0)}}},[_vm._v("Task Overview")])]),_vm._v(" "),(_vm.activeTab === 0)?_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 0 }},[_c('div',{staticClass:"px-sm-4 px-2 py-3 mt-sm-3 mt-2",staticStyle:{"background-color":"white","border-radius":"12px","border":"1px solid #EAECF0","display":"flex","flex-direction":"column","gap":"16px"}},[_c('div',{staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('p',{staticStyle:{"font-size":"18px","line-height":"24px","font-weight":"500","color":"#111827","margin-bottom":"8px"}},[_vm._v("Summary")]),_vm._v(" "),_c('div',[_c('span',{staticStyle:{"display":"inline-flex","padding-top":"2px","padding-bottom":"2px","padding-left":"8px","padding-right":"10px","column-gap":"6px","align-items":"center","border-radius":"9999px","font-size":"12px","font-weight":"500","line-height":"16px","color":"#047857","background-color":"#D1FAE5"}},[_c('svg',{staticStyle:{"width":"8px","height":"8px","color":"#34D399 !important"},attrs:{"viewBox":"0 0 6 6","aria-hidden":"true"}},[_c('circle',{attrs:{"cx":"3","cy":"3","r":"3"}})]),_vm._v("\n                            "+_vm._s(_vm.makeTask.status)+"\n                        ")])])]),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" Created by")]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(_vm.taskMaker.first_name)+" "+_vm._s(_vm.taskMaker.last_name))])]),_vm._v(" "),_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" Date Created")]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(_vm.toHumanDate(_vm.makeTask.inserted_at)))])])]),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" Assigned To")]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(_vm.taskActor.first_name)+" "+_vm._s(_vm.taskActor.last_name))])]),_vm._v(" "),(_vm.makeTask.status == 'declined')?_c('div',[_c('a',{staticStyle:{"color":"#2C7BE5","text-decoration":"none","font-size":"14px","line-height":"21px","font-weight":"500"},attrs:{"href":"#"},on:{"click":_vm.reAssign}},[_vm._v("Reassign")])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-between"},[_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" Due Date")]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(_vm.toHumanDate(_vm.makeTask.updated_at)))])]),_vm._v(" "),_vm._m(0)])]),_vm._v(" "),_c('div',{staticClass:"px-sm-4 px-2 py-3 mt-sm-3 mt-2 mt-3",staticStyle:{"background-color":"white","border-radius":"12px","border":"1px solid #EAECF0","display":"flex","flex-direction":"column","gap":"16px"}},[_c('div',{staticClass:"d-sm-flex d-block justify-content-between"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-between gap-4 mt-sm-0 mt-2"},[_c('span',[_c('button',{staticClass:"btn btn-outline-danger",attrs:{"type":"button","data-toggle":"modal","data-target":"#declineModal","disabled":_vm.isButtonDisabled}},[_vm._v("Decline")])]),_vm._v(" "),_c('span',[_c('button',{staticClass:"btn btn-outline-primary",attrs:{"type":"button","data-toggle":"modal","data-target":"#approveModal","disabled":_vm.isButtonDisabled}},[_vm._v("Approve")])])])]),_vm._v(" "),_vm._l((_vm.makeTask.details),function(key,value){return _c('div',{key:value,staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" "+_vm._s(value))]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(key))])])])})],2)]):_vm._e(),_vm._v(" "),(_vm.activeTab === 1)?_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 1 }},[_vm._m(2)]):_vm._e(),_vm._v(" "),(_vm.activeTab === 2)?_c('div',{staticClass:"tab-panel mt-3",class:{ 'active': _vm.activeTab === 2 }},[_c('div',{staticClass:"px-sm-4 px-2 py-3 mt-sm-3 mt-2 mt-3",staticStyle:{"background-color":"white","border-radius":"12px","border":"1px solid #EAECF0","display":"flex","flex-direction":"column","gap":"16px"}},[_vm._m(3),_vm._v(" "),_vm._l((_vm.taskAttachments),function(attachment){return _c('div',{key:attachment,staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#374151","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" "+_vm._s(_vm.processAttachment(attachment)))]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" "+_vm._s(_vm.toHumanDate(_vm.makeTask.inserted_at)))])]),_vm._v(" "),_c('div',[_c('a',{staticClass:"d-flex gap-2",staticStyle:{"border":"1px solid #667085","border-radius":"8px","padding":"8px 14px","color":"#667085","text-decoration":"none","font-size":"14px","line-height":"21px","font-weight":"500"},attrs:{"href":"#"}},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"20","height":"21","fill":"none"}},[_c('path',{attrs:{"stroke":"#667085","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.667","d":"M6.667 14.667 10 18m0 0 3.333-3.333M10 18v-7.5m6.667 3.952a4.583 4.583 0 0 0-2.917-8.12.516.516 0 0 1-.445-.25 6.25 6.25 0 1 0-9.816 7.58"}})]),_vm._v("\n                            Download\n                        ")])])])})],2)]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"approveModal","tabindex":"-1","role":"dialog","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(4),_vm._v(" "),_vm._m(5),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button"},on:{"click":_vm.cancel}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.processTask('approve')}}},[_vm._v("Approve")])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"declineModal","tabindex":"-1","role":"dialog","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(6),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"col"},[_vm._m(7),_vm._v(" "),_c('p',{staticClass:"mb-3"},[_vm._v("Please give reasons for declining this task.")]),_vm._v(" "),_vm._m(8),_vm._v(" "),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.reasons),expression:"reasons"}],staticClass:"form-control",attrs:{"rows":"3","placeholder":"Add comment"},domProps:{"value":(_vm.reasons)},on:{"input":function($event){if($event.target.composing){ return; }_vm.reasons=$event.target.value}}})])])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button"},on:{"click":_vm.cancel}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-danger",attrs:{"type":"button"},on:{"click":function($event){return _vm.processTask('decline')}}},[_vm._v("Decline")])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',{staticClass:"mb-1",staticStyle:{"color":"#667085","font-size":"14px","line-height":"22px","font-weight":"500"}},[_vm._v(" Priority")]),_vm._v(" "),_c('div',[_c('span',{staticStyle:{"display":"inline-flex","padding-top":"2px","padding-bottom":"2px","padding-left":"8px","padding-right":"10px","column-gap":"6px","align-items":"center","border-radius":"9999px","font-size":"12px","font-weight":"500","line-height":"16px","color":"#991B1B","background-color":"#FEE2E2","margin-bottom":"0px"}},[_vm._v("\n                                Urgent\n                            ")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('p',{staticClass:"mb-2",staticStyle:{"color":"#667085","font-size":"18px","line-height":"24px","font-weight":"500"}},[_vm._v(" Task Overview")]),_vm._v(" "),_c('p',{staticClass:"mb-2",staticStyle:{"color":"#111827","font-size":"14px","line-height":"18px","font-weight":"400"}},[_vm._v(" Details provided by task creator")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"px-sm-4 px-2 py-3 mt-sm-3 mt-2 mt-3",staticStyle:{"background-color":"white","border-radius":"12px","border":"1px solid #EAECF0","display":"flex","flex-direction":"column","gap":"16px"}},[_c('div',{staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('p',{staticStyle:{"font-size":"18px","line-height":"24px","font-weight":"500","color":"#111827","margin-bottom":"8px"}},[_vm._v("Comments")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"d-flex justify-content-between border-bottom border-gray-300"},[_c('p',{staticStyle:{"font-size":"18px","line-height":"24px","font-weight":"500","color":"#111827","margin-bottom":"8px"}},[_vm._v("Attachments")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"col"},[_c('p',{staticClass:"mb-3"},[_c('b',[_vm._v("Acknowledgement")])]),_vm._v(" "),_c('p',{staticClass:"mb-3"},[_vm._v("Are you sure you want to approve this task?")]),_vm._v(" "),_c('p',{staticClass:"mb-3"},[_vm._v("Once approved it's not reversible.")])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h3',{staticClass:"mb-3"},[_c('b',[_vm._v("Acknowledgement")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',{staticClass:"mb-2"},[_c('b',[_vm._v("Reasons for declining")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a23783a", __vue__options__)
  } else {
    hotAPI.reload("data-v-3a23783a", __vue__options__)
  }
})()}
});

;require.register("js/components/admin/TaskPaginate.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["totalPages", "currentPage"],
  name: "TaskPaginate",
  computed: {
    pagination: function pagination() {
      var maxVisiblePages = 10;
      var pages = [];
      if (this.totalPages <= maxVisiblePages) {
        for (var i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        var halfMaxVisible = Math.floor(maxVisiblePages / 2);
        var startPage = this.currentPage - halfMaxVisible;
        var endPage = this.currentPage + halfMaxVisible;

        if (startPage < 1) {
          startPage = 1;
          endPage = maxVisiblePages;
        }

        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = this.totalPages - maxVisiblePages + 1;
        }

        if (startPage > 1) {
          pages.push(1);
        }

        if (startPage > 2) {
          pages.push("...");
        }

        for (var _i = startPage; _i <= endPage; _i++) {
          pages.push(_i);
        }

        if (endPage < this.totalPages - 1) {
          pages.push("...");
        }

        if (endPage < this.totalPages) {
          pages.push(this.totalPages);
        }
      }
      return pages;
    }
  },
  methods: {
    goToPage: function goToPage(page) {
      if (page !== "...") {
        this.$emit("pageChanged", page);
      }
    },
    prevPage: function prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    nextPage: function nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-footer"},[_c('nav',{attrs:{"aria-label":"Page navigation example"}},[_c('ul',{staticClass:"pagination justify-content-center"},[_c('li',{staticClass:"page-item",class:{ disabled: _vm.currentPage === 1 }},[_c('a',{staticClass:"page-link",attrs:{"href":"#","tabindex":"-1"},on:{"click":_vm.prevPage}},[_vm._v("Previous")])]),_vm._v(" "),_vm._l((_vm.pagination),function(page){return _c('li',{key:page,staticClass:"page-item",class:{ 'active': _vm.currentPage === page }},[_c('a',{staticClass:"page-link",attrs:{"href":"#"},on:{"click":function($event){return _vm.goToPage(page)}}},[_vm._v(_vm._s(page))])])}),_vm._v(" "),_c('li',{staticClass:"page-item",class:{ disabled: _vm.currentPage === _vm.totalPages || _vm.totalPages <= 1 }},[_c('a',{staticClass:"page-link",attrs:{"href":"#"},on:{"click":_vm.nextPage}},[_vm._v("Next")])])],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2381dd5d", __vue__options__)
  } else {
    hotAPI.reload("data-v-2381dd5d", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AddAgentServiceModal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      modal_name: "addAgentServicesModal",
      modal_target: "#addAgentServicesModal",
      merchant_id: null,
      service_id: null,
      service_name: null,
      service_currency: null,
      service_currency_id: null,
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      service_margin: 0,
      agent_margin: 0,
      total_margin: 0,
      agents: [],
      success_callback_url: null,
      action: null
    };
  },

  mounted: function mounted() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
  },
  created: function created() {
    this.agents = this.$attrs["agents"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.service_id = this.$attrs["item_id"];
    this.service_name = this.$attrs["service_name"];
    this.service_currency = this.$attrs["service_currency"];
    this.service_currency_id = this.$attrs["service_currency_id"];
    this.service_margin = this.$attrs["service_margin"];
    this.modal_name = this.modal_name + "_" + this.service_id;
    this.modal_target = this.modal_target + "_" + this.service_id;
    this.success_callback_url = this.$attrs["current_merchant"] + "/agent-services";
    this.action = this.$attrs["type"];
  },
  methods: {
    getOauthToken: function getOauthToken() {
      var _this = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this.api_token = response.data.token;
        _this.createService();
      }).catch(function (error) {}).then(function () {});
    },
    getDeactivateOauthToken: function getDeactivateOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.dropService();
      }).catch(function (error) {}).then(function () {});
    },
    recalculateMargin: function recalculateMargin() {
      this.total_margin = parseFloat(this.service_margin) + parseFloat(this.agent_margin);
    },
    createService: function createService() {
      var _this3 = this;

      var urlIs = "/api/agent/service/create";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      var api_params = {
        service_id: this.service_id,
        margin: this.total_margin,
        merchant_id: this.merchant_id
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Ensure the service is not already added !"
          });
        } else {
          $(_this3.modal_target + " .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Service has been added",
            showConfirmButton: false,
            timer: 3000
          });

          location.reload();
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    },
    dropService: function dropService() {
      var _this4 = this;

      var urlIs = "/api/agent/service/drop";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      var api_params = {
        id: this.service_id
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went horribly wrong !"
          });
        } else {
          $(_this4.modal_target + " .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Service has been deactivated",
            showConfirmButton: false,
            timer: 4000
          });

          location.reload();
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    },
    deactivateService: function deactivateService() {
      var _this5 = this;

      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, de-activate it!"
      }).then(function (result) {
        if (result.value) {
          _this5.getDeactivateOauthToken();
        }
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.action==='add')?_c('a',{staticClass:"btn btn-sm btn-primary",attrs:{"href":"#","data-toggle":"modal","data-target":_vm.modal_target}},[_c('span',{staticClass:"fe fe-plus"})]):_vm._e(),_vm._v(" "),(_vm.action==='del')?_c('a',{staticClass:"btn btn-sm btn-danger",attrs:{"href":"#"},on:{"click":_vm.deactivateService}},[_c('span',{staticClass:"fe fe-trash"})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":_vm.modal_name,"tabindex":"-1","role":"dialog","aria-labelledby":_vm.modal_name,"aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Service Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.service_name),expression:"service_name"}],staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":(_vm.service_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.service_name=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Select Merchant User")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.agents,"label":"name"}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Service Cost")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.service_margin),expression:"service_margin"}],staticClass:"form-control",attrs:{"type":"number","readonly":""},domProps:{"value":(_vm.service_margin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.service_margin=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Agent Margin")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_margin),expression:"agent_margin"}],staticClass:"form-control",attrs:{"type":"number","min":"0","placeholder":"e.g 30"},domProps:{"value":(_vm.agent_margin)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.agent_margin=$event.target.value},_vm.recalculateMargin]}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Total Margin")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.total_margin),expression:"total_margin"}],staticClass:"form-control",attrs:{"type":"number","min":"0"},domProps:{"value":(_vm.total_margin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.total_margin=$event.target.value}}})],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Submit"},on:{"click":_vm.getOauthToken}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add Agent Service")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f6206d5", __vue__options__)
  } else {
    hotAPI.reload("data-v-1f6206d5", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AgencyCustomers.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      async_data: null,
      async_dates: null,
      merchant_id: null,
      current_user_id: null
    };
  },
  created: function created() {
    this.merchant_id = this.$attrs["merchant_id"];
    this.current_user_id = this.$attrs["user_id"];
    this.get_revenue_data();
  },

  computed: {
    chartOptions: function chartOptions() {
      return {
        reflow: true,
        chart: {
          type: "areaspline"
        },
        title: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          title: {
            text: "Day"
          },
          categories: this.async_dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: "No of customers"
          }
        },
        series: [(0, _defineProperty3.default)({
          lineWidth: 2,
          color: "#3C009B",
          name: "Customers Served",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.async_data
        }, "color", "#6fcd98")]
      };
    }
  },
  methods: {
    get_revenue_data: function get_revenue_data() {
      var _this = this;

      var url = "/api/dashboard/agency/customers/graph";
      Vue.axios.get(url, {
        params: { owner_id: this.merchant_id, user_id: this.current_user_id }
      }).then(function (response) {
        var vdata = (0, _stringify2.default)(response.data);
        var data = JSON.parse(vdata);
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
        _this.async_dates = data.map(function (d) {
          return (0, _moment2.default)(d.date).format("ddd Do MMM");
        });
        _this.async_data = data.map(function (d) {
          return parseFloat(d.customers_total);
        });
      }).catch(function (error) {}).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('highcharts',{attrs:{"options":_vm.chartOptions}})}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-7a4a4b87"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a4a4b87", __vue__options__)
  } else {
    hotAPI.reload("data-v-7a4a4b87", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AgencyRevenue.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      async_data: null,
      async_dates: null,
      merchant_id: null,
      user_id: null
    };
  },
  created: function created() {
    this.merchant_id = this.$attrs["agency_id"];
    this.get_revenue_data();
  },

  computed: {
    chartOptions: function chartOptions() {
      return {
        reflow: true,
        chart: {
          type: "areaspline"
        },
        title: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          title: {
            text: "Day"
          },
          categories: this.async_dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: "Amount in Ksh"
          }
        },
        series: [(0, _defineProperty3.default)({
          lineWidth: 2,
          color: "#3C009B",
          name: "30 Day Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.async_data
        }, "color", "#6fcd98")]
      };
    }
  },
  methods: {
    get_revenue_data: function get_revenue_data() {
      var _this = this;

      var url = "/api/dashboard/stats/agency/revenue";
      Vue.axios.get(url).then(function (response) {
        var vdata = (0, _stringify2.default)(response.data);
        var data = JSON.parse(vdata);
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
        _this.async_dates = data.map(function (d) {
          return (0, _moment2.default)(d.date).format("ddd Do MMM");
        });
        _this.async_data = data.map(function (d) {
          return parseFloat(d.default_currency);
        });
      }).catch(function (error) {}).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('highcharts',{attrs:{"options":_vm.chartOptions}})}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-52405364"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52405364", __vue__options__)
  } else {
    hotAPI.reload("data-v-52405364", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AgencyServiceRevShare.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _vueTableDynamic = require("vue-table-dynamic");

var _vueTableDynamic2 = _interopRequireDefault(_vueTableDynamic);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "RevShare",
  props: ["dbrevshares", "agents", "merchants", "agency", "mainagency", "mainmerchant", "agent_margin", "margin", "commission", "agent_commission"],
  data: function data() {
    return {
      account_no: null,
      value: 0,
      new_margin: 0,
      commission_type: null,
      desc: "Agency -Agent margin setup",
      indexes: [],
      topushData: [],
      selectedIndex: null,
      revshares: [],
      final_revshare: null,
      all_parsed_agents: [],
      all_agencies: [],
      all_merchants: [],
      max_margin: 0,
      params: {
        data: null,
        header: "row",
        showCheck: true,
        border: true,
        edit: {
          column: [1, 2],
          cell: [[-1, -1]]
        }
      }
    };
  },

  components: { VueTableDynamic: _vueTableDynamic2.default },
  watch: {
    mainagency: function mainagency(val) {
      if (val != undefined) {
        this.all_parsed_agents = this.all_agencies.filter(function (agent) {
          return agent.id == val;
        });
      }
    },
    mainmerchant: function mainmerchant(val) {
      if (val != undefined) {
        this.all_parsed_agents = this.all_merchants.filter(function (agent) {
          return agent.id == val;
        });
      }
    },
    margin: function margin(val) {
      this.new_margin = val;
    },
    commission: function commission(val) {
      this.commission_type = val;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.all_agencies = JSON.parse(this.agents);
    this.all_merchants = JSON.parse(this.merchants);
    this.new_margin = this.agent_margin;
    this.params.data = [["Index", "Account Number", "Value"]];
    $("#addRevShare").on("hidden.bs.modal", function () {
      _this.reset();
    });

    var parsed = JSON.parse(this.dbrevshares);

    parsed.forEach(function (part, index, theArray) {
      var accno = theArray[index].account_number;
      var amount = theArray[index].value;
      var desc = theArray[index].desc;
      _this.params.data.push([index + 1, accno, amount]);
      _this.topushData.push({
        account_number: accno,
        value: amount,
        desc: desc
      });
    });
  },


  methods: {
    get_max_margin: function get_max_margin() {
      if (this.commission_type != "fixed") {
        this.max_margin = 100 - this.new_margin;
      } else {
        this.max_margin = this.new_margin;
      }
      console.log("margins ", this.max_margin);
      return this.max_margin;
    },

    reset: function reset() {
      this.account_no = null;
      this.value = 0;
      this.desc = "Agency -Agent margin setup";
    },
    add_row: function add_row() {
      var _this2 = this;

      if (this.account_no == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select an account"
        });
        return;
      }

      var found = this.topushData.find(function (s) {
        return s.account_number == _this2.account_no.account_id;
      }) || null;

      if (found == null) {
        $("#addRevShare .close").click();
        var i = this.params.data.length - 1;
        this.params.data.push([i + 1, this.account_no.account_id, this.value]);

        this.topushData.push({
          account_number: this.account_no.account_id,
          value: this.value,
          desc: this.desc
        });

        this.final_revshare = (0, _stringify2.default)(this.topushData);
        this.reset_revshare(this.final_revshare);
      } else {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Revenue share already exists !"
        });
      }
    },
    remove_row: function remove_row() {
      this.params.data.splice(this.selectedIndex, 1);
      this.topushData.$remove(this.topushData[this.selectedIndex - 1]);
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
      this.selectedIndex = null;
    },
    onSelect: function onSelect(isChecked, index, data) {
      if (isChecked) {
        this.indexes.push(index);
        this.selectedIndex = index;
      } else {
        this.indexes.$remove(index);
        this.selectedIndex = null;
      }
    },
    onSelectionChange: function onSelectionChange(checkedDatas, checkedIndexs, checkedNum) {},
    onCellChange: function onCellChange(rowIndex, columnIndex, data) {
      if (columnIndex == 2) {
        this.topushData[rowIndex - 1].value = data;
      } else {
        this.topushData[rowIndex - 1].account_number = data;
      }
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
    },

    reset_revshare: function reset_revshare(val) {
      $("#revshares").val(val);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-demo",staticStyle:{"width":"600px"}},[_vm._m(0),_vm._v(" "),(_vm.selectedIndex)?_c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.remove_row}},[_c('i',{staticClass:"fa fa-remove"})]):_vm._e(),_vm._v(" "),_c('vue-table-dynamic',{ref:"table",attrs:{"params":_vm.params},on:{"select":_vm.onSelect,"selection-change":_vm.onSelectionChange,"cell-change":_vm.onCellChange}}),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addRevShare","tabindex":"-1","role":"dialog","aria-labelledby":"addRevShare","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Which Agency should receive commission ?")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.all_parsed_agents,"label":"name"},model:{value:(_vm.account_no),callback:function ($$v) {_vm.account_no=$$v},expression:"account_no"}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Commission Amount ( should be less than or equal to\n                "),_c('b',[_vm._v(_vm._s(_vm.get_max_margin()))]),_vm._v(")\n              ")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],staticClass:"form-control",attrs:{"type":"number","min":"0","required":""},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.desc),expression:"desc"}],staticClass:"form-control",attrs:{"type":"hidden"},domProps:{"value":(_vm.desc)},on:{"input":function($event){if($event.target.composing){ return; }_vm.desc=$event.target.value}}})],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n              Close\n            ")]),_vm._v(" "),(
                _vm.commission_type != 'fixed' &&
                Number(_vm.value) > 0 &&
                Number(_vm.value) <= Number(_vm.max_margin)
              )?_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Add RevShare"},on:{"click":_vm.add_row}}):_vm._e(),_vm._v(" "),(_vm.commission_type == 'fixed' && Number(_vm.value) > 0)?_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Add RevShare"},on:{"click":_vm.add_row}}):_vm._e()])])])])])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)","data-toggle":"modal","data-target":"#addRevShare"}},[_c('i',{staticClass:"fa fa-plus"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add Agent - Agency Revenue Share")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e7019efa", __vue__options__)
  } else {
    hotAPI.reload("data-v-e7019efa", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AgentDashboard.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".elipsis[data-v-fc8c75b0] {\n  white-space: nowrap;\n  width: 0px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "AgentDashboard",
  props: ["con_key", "con_secret"],
  data: function data() {
    return {
      current_user: null,
      current_agent_slug: null,
      current_user_id: null,
      revenues: null,
      banner: null,
      revenue_today: null,
      revenue_this_month: null,
      revenue_this_year: null,
      revenue_all_time: null,
      customers_today: null,
      customers_total: null,
      avg_spending: null,
      avg_services: null,
      topup_amount: null,
      topup_phone: null,
      current_merchant: null,
      merchant_id: null,
      bank_accounts: [],
      selectedAccount: null,
      withdrawTo: null,
      mpesaAccount: null,
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      customers_url: null,
      withdrawal_amount: null,
      account_id: null,
      agent_current_account_id: null,
      float_account_id: null,
      current_account_balance: null,
      current_account_currency: null,
      float_account_currency: null,
      float_account_balance: null,
      popular_services: null,
      syncbal: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.con_secret;
    this.consumer_key = this.con_key;
    this.merchant_id = this.merchant_id;
    this.getOauthToken();

    $("#depositModal").on("hidden.bs.modal", function () {
      _this.topup_amount = null;
    });
    $("#withdrawalModal").on("hidden.bs.modal", function () {
      _this.withdrawal_amount = null;
    });
    this.get_revenues();
    this.get_customer_stats();
  },
  created: function created() {
    this.banner = this.$attrs["banner"];
    this.current_user = this.$attrs["current_user"];
    this.current_agent_slug = this.$attrs["current_agent"];
    this.current_user_id = this.$attrs["current_user_id"];
    this.current_merchant = this.$attrs["current_merchant"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.float_account_id = this.$attrs["float_account_id"];
    this.agent_current_account_id = this.$attrs["agent_current_account_id"];
    this.current_account_currency = this.$attrs["current_account_currency"];
    this.float_account_currency = this.$attrs["float_account_currency"];
    this.customers_url = this.current_merchant + "/customers";
  },


  methods: {
    trunc: function trunc(value) {
      var line = value;
      if (line.length > 10) {
        return line.substring(0, 10) + "...";
      }
      return value;
    },
    validateR: function validateR() {
      if (this.topup_phone == null || this.topup_phone.length < 10) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid phone number"
        });
        return;
      }

      var re = /^(254)\d{9}$/;
      if (!re.test(this.topup_phone)) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid Phone Number"
        });
        return;
      }

      if (this.topup_amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount !"
        });
        return;
      }

      if (this.topup_amount <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount greater than 0"
        });
        return;
      }

      location.href = "/" + this.current_merchant + "/" + this.current_agent_slug + "/topup/checkout/page?phone=" + this.topup_phone + "&amount=" + this.topup_amount + "&account=" + this.float_account_id;
    },
    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.loadBankAccounts();
      }).catch(function (error) {}).then(function () {});
    },
    loadBankAccounts: function loadBankAccounts() {
      var _this3 = this;

      var url = "/api/banks/accounts/filtered?merchant_ids=[" + this.merchant_id + "]";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      Vue.axios.get(url, {
        headers: api_headers
      }).then(function (response) {
        _this3.bank_accounts = response.data.bank_accounts;
      }).catch(function (error) {}).then(function () {});
    },
    get_customer_stats: function get_customer_stats() {
      var _this4 = this;

      var url = "/api/dashboard/stats/customers";
      Vue.axios.get(url, {
        params: { owner_id: this.merchant_id, user_id: this.current_user_id }
      }).then(function (response) {
        _this4.customers_today = _this4.to_human_no_fixed(response.data.customers_today);
        _this4.customers_total = _this4.to_human_no_fixed(response.data.customers_total);
        _this4.avg_spending = _this4.to_human(response.data.avg_spending);
        _this4.avg_services = _this4.to_human_no_fixed(response.data.avg_services);
        _this4.popular_services = response.data.popular_services;
      }).catch(function (error) {}).then(function () {});
    },
    get_revenues: function get_revenues() {
      var _this5 = this;

      var url = "/api/dashboard/stats/revenues";
      Vue.axios.get(url, {
        params: {
          owner_id: this.merchant_id,
          user_id: this.current_user_id,
          agent_current_account_id: this.agent_current_account_id,
          float_account_id: this.float_account_id
        }
      }).then(function (response) {
        _this5.revenues = response.data;
        _this5.revenue_today = _this5.to_human(_this5.revenues.revenue_today);
        _this5.revenue_this_month = _this5.to_human(_this5.revenues.revenue_this_month);
        _this5.revenue_this_year = _this5.to_human(_this5.revenues.revenue_this_year);
        _this5.revenue_all_time = _this5.to_human(_this5.revenues.revenue_all_time);
        _this5.current_account_balance = _this5.to_human(_this5.revenues.current_balance);

        _this5.float_account_balance = _this5.to_human(_this5.revenues.float_balance);
        _this5.$emit("syncbal", _this5.revenues.current_balance);
      }).catch(function (error) {}).then(function () {});
    },
    to_human_no_fixed: function to_human_no_fixed(x) {
      if (x == null) return 0;
      return x.toLocaleString();
    },
    to_human: function to_human(x) {
      var n = this.to_fixed(x);
      return n.toLocaleString();
    },
    to_fixed: function to_fixed(val) {
      return (Math.round(val * 100) / 100).toFixed(2);
    },
    generate_req_ref: function generate_req_ref() {
      var length = 6;
      var result = "";
      var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result.toUpperCase();
    },
    validateWithdrawal: function validateWithdrawal() {
      var re = /^(25471|25470|25472|25479|25474)\d{7}$/;
      if (!re.test(this.mpesaAccount)) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid Safaricom Phone Number"
        });
        return;
      }

      if (this.withdrawal_amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount!"
        });
        return false;
      }
      if (parseFloat(this.withdrawal_amount) <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount not less than 1 !"
        });
        return false;
      }

      if (parseFloat(this.withdrawal_amount) > parseFloat(this.current_account_balance)) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount not greater than " + this.current_account_balance
        });
        return false;
      }

      if (this.selectedAccount == null && this.mpesaAccount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select either a bank account or mobile money account !"
        });
        return false;
      }

      this.executeWithdrawal();
    },
    resetWithdrawalForm: function resetWithdrawalForm() {
      this.selectedAccount = null;
      this.mpesaAccount = null;
      this.withdrawal_amount = null;
      this.withdrawTo = null;
    },
    executeWithdrawal: function executeWithdrawal() {
      var _this6 = this;

      var bankAccountId = null;
      var gateway = "mpesa-b2c";
      if (this.selectedAccount != null) {
        bankAccountId = this.selectedAccount.id;
        gateway = "mpesa";
      }
      var params = {
        bank_account_id: bankAccountId,
        destination: this.mpesaAccount,
        amount: this.withdrawal_amount,
        account_id: this.agent_current_account_id,
        gateway: gateway
      };

      this.resetWithdrawalForm();
      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, withdraw funds"
      }).then(function (result) {
        if (result.value) {
          _this6.authorizeWithdrawal(params);
        }
      });
    },
    authorizeWithdrawal: function authorizeWithdrawal(params) {
      var _this7 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this7.api_token = response.data.token;
        _this7._make_withdrawal(_this7.api_token, params);
      }).catch(function (error) {}).then(function () {});
    },
    _make_withdrawal: function _make_withdrawal(token, params) {
      var urlIs = "/api/payment/withdraw";
      var api_headers = {
        Authorization: "Bearer " + token
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        } else {
          $("#withdrawalModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Withdrawal Inititated !",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"card mt-4",staticStyle:{"background":"#fffef8"}},[_c('div',{staticClass:"card-body py-2"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col-12 col-lg-4 order-lg-2"},[_c('div',{staticClass:"text-center"},[_c('img',{staticClass:"img-fluid mt-md-n5 mt-lg-0 mr-md-n5",staticStyle:{"max-width":"397px"},attrs:{"src":_vm.banner,"alt":"..."}})])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-8 px-4 py-3 order-lg-1"},[_c('span',{staticClass:"h2 mb-0"},[_vm._v("Welcome back, Agent "+_vm._s(_vm.current_user))]),_vm._v(" "),(_vm.revenue_today > 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n            Here’s how the numbers are looking. You have earned "+_vm._s(_vm.current_account_currency)+".\n            "+_vm._s(_vm.revenue_today)+" today. Keep it up\n          ")]):_vm._e(),_vm._v(" "),(_vm.revenue_today <= 0)?_c('p',{staticClass:"mt-2 text-muted"},[_vm._v("\n            Here’s how the numbers are looking. You have earned "+_vm._s(_vm.current_account_currency)+".\n            "+_vm._s(_vm.revenue_today)+" today.\n          ")]):_vm._e(),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-auto align-middle"},[_c('span',{staticClass:"h1"},[_vm._v(_vm._s(_vm.current_account_currency)+". "+_vm._s(_vm.current_account_balance))])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-auto"},[(_vm.current_account_balance > 0)?_c('a',{staticClass:"mt-3 mt-md-0 btn btn-sm btn-outline-primary btn-block lift",attrs:{"href":"#","data-toggle":"modal","data-target":"#withdrawalModal"}},[_vm._v("Withdraw")]):_vm._e()]),_vm._v(" "),(_vm.float_account_id)?_c('div',{staticClass:"col-12 col-md-auto"},[_c('a',{staticClass:"mt-3 mt-md-0 btn btn-sm btn-outline-primary btn-block lift",attrs:{"href":"#","data-toggle":"modal","data-target":"#depositModal"}},[_vm._v("Deposit float")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-auto align-middle"},[_c('span',{staticClass:"h1"},[_vm._v(_vm._s(_vm.float_account_currency)+". "+_vm._s(_vm.float_account_balance))])])])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Today")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+". "+_vm._s(_vm.revenue_today))])]),_vm._v(" "),_vm._m(0)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("This month")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+". "+_vm._s(_vm.revenue_this_month))])]),_vm._v(" "),_vm._m(1)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("This year")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+"."+_vm._s(_vm.revenue_this_year))])]),_vm._v(" "),_c('div',{staticClass:"col-auto"})])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("All time revenue")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.current_account_currency)+". "+_vm._s(_vm.revenue_all_time))])]),_vm._v(" "),_vm._m(2)])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-xl-12"},[_c('div',{staticClass:"card"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"card-body",staticStyle:{"height":"100%","width":"100%"}},[_c('agent-revenue-30day-chart',{attrs:{"merchant_id":_vm.merchant_id,"user_id":_vm.current_user_id}})],1)])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Customers today")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.customers_today))])]),_vm._v(" "),_vm._m(4)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Total customers")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.customers_total))])]),_vm._v(" "),_vm._m(5)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Average services")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.avg_services))])]),_vm._v(" "),_vm._m(6)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-6 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Average spending")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v(_vm._s(_vm.float_account_currency)+". "+_vm._s(_vm.avg_spending))])]),_vm._v(" "),_vm._m(7)])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-xl-8"},[_c('div',{staticClass:"card"},[_vm._m(8),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('agent-customer-30day-chart',{attrs:{"merchant_id":_vm.merchant_id,"user_id":_vm.current_user_id}})],1)])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-4"},[_c('div',{staticClass:"card card-fill"},[_vm._m(9),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-nowrap card-table"},[_c('thead',[_c('tr',[_vm._m(10),_vm._v(" "),_vm._m(11),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-services"}},[_vm._v(_vm._s(_vm.float_account_currency))])])])]),_vm._v(" "),(_vm.popular_services)?_c('tbody',{staticClass:"list"},_vm._l((_vm.popular_services),function(item,i){return _c('tr',{key:i},[_c('td',{staticClass:"elipsis"},[_vm._v(_vm._s(_vm.trunc(item.service_name)))]),_vm._v(" "),_c('td',{staticClass:"customer-phone"},[_vm._v("\n                  "+_vm._s(_vm.to_human(item.customers_total))+"\n                ")]),_vm._v(" "),_c('td',{staticClass:"customer-services"},[_vm._v("\n                  "+_vm._s(_vm.to_human(item.agent_margin))+"\n                ")])])}),0):_vm._e()])])])])]),_vm._v(" "),_c('withdrawal-tool',{attrs:{"conkey":_vm.con_key,"consecret":_vm.con_secret,"merchantid":_vm.merchant_id,"syncbal":_vm.current_account_balance,"currentaccountbalance":_vm.current_account_balance},on:{"update:syncbal":function($event){_vm.current_account_balance=$event}}}),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"depositModal","tabindex":"-1","role":"dialog","aria-labelledby":"depositModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmDeposit","name":"frmDeposit","onsubmit":"return false;"}},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Deposit Funds "+_vm._s(_vm.current_merchant))]),_vm._v(" "),_vm._m(12)]),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.topup_phone),expression:"topup_phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"254700000000"},domProps:{"value":(_vm.topup_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.topup_phone=$event.target.value}}}),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.topup_amount),expression:"topup_amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","max":"70000","id":"ag_deposit_amount"},domProps:{"value":(_vm.topup_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.topup_amount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n              Close\n            ")]),_vm._v(" "),_c('a',{staticClass:"btn btn-primary",attrs:{"href":"#","type":"button"},on:{"click":_vm.validateR}},[_vm._v("Checkout")])])])])])])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-dollar-sign text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-clock text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Revenue")]),_vm._v(" "),_c('span',{staticClass:"text-muted mr-3"},[_vm._v("Last year comparision:")]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-switch"},[_c('input',{staticClass:"custom-control-input",attrs:{"type":"checkbox","id":"cardToggle","data-toggle":"chart","data-target":"#conversionsChart","data-trigger":"change","data-action":"add","data-dataset":"1"}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"cardToggle"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-dollar-sign text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('div',{staticClass:"chart chart-sparkline"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-clock text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Customers")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header"},[_c('h4',{staticClass:"card-header-title"},[_vm._v("Popular Services")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-id"}},[_vm._v("Service")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"customer-phone"}},[_vm._v("Applications")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
__vue__options__._scopeId = "data-v-fc8c75b0"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fc8c75b0", __vue__options__)
  } else {
    hotAPI.reload("data-v-fc8c75b0", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/AgentFloatBalance.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "AgentFloatBalance",
  data: function data() {
    return {
      todays_earnings: 0,
      float_balance: 0,
      all_time_earnings: 0,
      consumer_secret: null,
      consumer_key: null,
      merchant_id: null,
      float_account_id: null,
      agent_current_account_id: null,
      user_id: null
    };
  },
  created: function created() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.float_account_id = this.$attrs["float_account_id"];
    this.agent_current_account_id = this.$attrs["agent_current_account_id"];
    this.user_id = this.$attrs["user_id"];

    setTimeout(this.getOauthToken, 500);
  },

  methods: {
    getOauthToken: function getOauthToken() {
      var _this = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };

      Vue.axios.post(url, payload).then(function (response) {
        _this.api_token = response.data.token;
        _this.getStats(_this.api_token);
      }).catch(function (error) {}).then(function () {});
    },
    getStats: function getStats(token) {
      var _this2 = this;

      var url = "/api/dashboard/stats/revenues";
      Vue.axios.get(url, {
        params: {
          owner_id: this.merchant_id,
          user_id: this.user_id,
          float_account_id: this.float_account_id,
          agent_current_account_id: this.agent_current_account_id
        }
      }).then(function (response) {
        _this2.revenues = response.data;
        _this2.todays_earnings = _this2.to_human(_this2.revenues.revenue_today);
        _this2.all_time_earnings = _this2.to_human(_this2.revenues.revenue_all_time);
        _this2.float_balance = _this2.to_human(_this2.revenues.float_balance);
      }).catch(function (error) {}).then(function () {});
    },
    to_human: function to_human(x) {
      var n = x;
      return n.toLocaleString();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-lg-4 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Today’s Earnings")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v("KES. "+_vm._s(_vm.todays_earnings))])]),_vm._v(" "),_vm._m(0)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-4 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("All time Earnings")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v("KES. "+_vm._s(_vm.all_time_earnings))])]),_vm._v(" "),_vm._m(1)])])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-lg-4 col-xl"},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"text-uppercase text-muted mb-2"},[_vm._v("Pesaflow float balance")]),_vm._v(" "),_c('span',{staticClass:"h2 mb-0"},[_vm._v("KES. "+_vm._s(_vm.float_balance))])]),_vm._v(" "),_vm._m(2)])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-dollar-sign text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-briefcase text-muted mb-0"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('span',{staticClass:"h2 fe fe-clock text-muted mb-0"})])}]
__vue__options__._scopeId = "data-v-adfd3808"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-adfd3808", __vue__options__)
  } else {
    hotAPI.reload("data-v-adfd3808", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/BankAccountModal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueSelect = require("vue-select");

var _vueSelect2 = _interopRequireDefault(_vueSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component("v-select", _vueSelect2.default);
exports.default = {
  data: function data() {
    return {
      file: null,
      banks: [],
      selectedBank: null,
      owner_type: "merchant",
      bank_account_name: null,
      cancelled_cheque: null,
      bank_account_name_error: null,
      branch_error: null,
      branch: null,
      bank_account_number_error: null,
      bank_account_number: null,
      owner_id: null,
      consumer_secret: null,
      consumer_key: null,
      api_token: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.getOauthToken();
    $("#addBankAccountModal").on("hidden.bs.modal", function () {
      _this.reset();
    });
  },
  created: function created() {
    this.owner_id = this.$attrs["merchant_id"];
  },
  methods: {
    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.banks = _this2.loadBanks();
      }).catch(function (error) {}).then(function () {});
    },
    reset: function reset() {
      this.bank_account_name = null;
      this.bank_account_number = null;
      this.branch = null;
    },
    loadBanks: function loadBanks() {
      var _this3 = this;

      var url = "/api/banks";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      Vue.axios.get(url, {
        headers: api_headers
      }).then(function (response) {
        _this3.banks = response.data.banks;
      }).catch(function (error) {}).then(function () {});
    },
    handleFileUpload: function handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    validateBankAccount: function validateBankAccount() {
      if (this.selectedBank && this.bank_account_number && this.branch && this.bank_account_name) {
        this.createBankAccount();
      }
      _sweetalert2.default.fire({
        icon: "error",
        title: "Oops...",
        text: "Complete the form to create a bank account !"
      });
    },
    createBankAccount: function createBankAccount() {
      var urlIs = "/api/banks/accounts/create/custom";
      var api_headers = {
        Authorization: "Bearer " + this.api_token
      };
      var formData = new FormData();
      formData.append("file", this.file);

      var api_params = {
        bank_id: this.selectedBank.id,
        account_number: this.bank_account_number,
        branch: this.branch,
        name: this.bank_account_name,
        owner_id: this.owner_id,
        owner_type: this.owner_type
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Ensure the Bank Account is not already created"
          });
        } else {
          $("#addBankAccountModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Bank Account has been created",
            showConfirmButton: false,
            timer: 2500
          });
          window.location.href = window.location.pathname;
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12"},[_c('a',{staticClass:"btn btn-primary lift",attrs:{"href":"#","data-toggle":"modal","data-target":"#addBankAccountModal"}},[_vm._v("Add Bank Account")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addBankAccountModal","tabindex":"-1","role":"dialog","aria-labelledby":"addBankAccountModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmaddBankAccountModal","name":"frmaddBankAccountModal","onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"inp_account_name"}},[_vm._v("Bank")]),_vm._v(" "),_c('v-select',{attrs:{"label":"name","options":_vm.banks,"reduce":function (name) { return name.id; }},model:{value:(_vm.selectedBank),callback:function ($$v) {_vm.selectedBank=$$v},expression:"selectedBank"}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Branch")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.branch),expression:"branch"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.branch)},on:{"input":function($event){if($event.target.composing){ return; }_vm.branch=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"inp_account_name"}},[_vm._v("Bank Account Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bank_account_name),expression:"bank_account_name"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.bank_account_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.bank_account_name=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Account Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bank_account_number),expression:"bank_account_number"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.bank_account_number)},on:{"input":function($event){if($event.target.composing){ return; }_vm.bank_account_number=$event.target.value}}})],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Submit"},on:{"click":_vm.validateBankAccount}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add Bank Account")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a03d9b96", __vue__options__)
  } else {
    hotAPI.reload("data-v-a03d9b96", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/BusinessMetadataForm.Vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _vueTableDynamic = require("vue-table-dynamic");

var _vueTableDynamic2 = _interopRequireDefault(_vueTableDynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "RevShare",
  props: ["dbrevshares"],
  data: function data() {
    return {
      item: null,
      value: null,
      desc: null,
      indexes: [],
      topushData: [],
      selectedIndex: null,
      revshares: [],
      final_revshare: null,
      params: {
        data: null,
        header: "row",
        showCheck: true,
        border: true,
        edit: {
          column: [1, 2],
          cell: [[-1, -1]]
        }
      }
    };
  },

  components: { VueTableDynamic: _vueTableDynamic2.default },
  mounted: function mounted() {
    var _this = this;

    this.params.data = [["Index", "Business Item", "Business Item Value"]];
    $("#addRevShare").on("hidden.bs.modal", function () {
      _this.reset();
    });

    var parsed = JSON.parse(this.dbrevshares);
    if (parsed != null) {
      parsed.forEach(function (part, index, theArray) {
        var item = theArray[index].item;
        var value = theArray[index].value;
        _this.params.data.push([index + 1, item, value]);
        _this.topushData.push({
          item: item,
          value: value
        });
      });
    }
  },

  methods: {
    reset: function reset() {
      this.item = null;
      this.value = null;
      this.desc = null;
    },
    add_row: function add_row() {
      $("#addRevShare .close").click();
      var i = this.params.data.length - 1;
      this.params.data.push([i + 1, this.item, this.value]);

      this.topushData.push({
        item: this.item,
        value: this.value
      });

      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
    },
    remove_row: function remove_row() {
      this.params.data.splice(this.selectedIndex, 1);
      this.topushData.$remove(this.topushData[this.selectedIndex - 1]);
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
      this.selectedIndex = null;
    },
    onSelect: function onSelect(isChecked, index, data) {
      if (isChecked) {
        this.indexes.push(index);
        this.selectedIndex = index;
      } else {
        this.indexes.$remove(index);
        this.selectedIndex = null;
      }
    },
    onSelectionChange: function onSelectionChange(checkedDatas, checkedIndexs, checkedNum) {},
    onCellChange: function onCellChange(rowIndex, columnIndex, data) {
      if (columnIndex == 2) {
        this.topushData[rowIndex - 1].value = data;
      } else {
        this.topushData[rowIndex - 1].account_number = data;
      }
      this.final_revshare = (0, _stringify2.default)(this.topushData);
      this.reset_revshare(this.final_revshare);
    },

    reset_revshare: function reset_revshare(val) {
      $("#revshares").val(val);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"base-demo",staticStyle:{"width":"100%"}},[_vm._m(0),_vm._v(" "),(_vm.selectedIndex)?_c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.remove_row}},[_c('i',{staticClass:"fa fa-remove"})]):_vm._e(),_vm._v(" "),_c('vue-table-dynamic',{ref:"table",attrs:{"params":_vm.params},on:{"select":_vm.onSelect,"selection-change":_vm.onSelectionChange,"cell-change":_vm.onCellChange}}),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"addRevShare","tabindex":"-1","role":"dialog","aria-labelledby":"addRevShare","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Business Item")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.item),expression:"item"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.item)},on:{"input":function($event){if($event.target.composing){ return; }_vm.item=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Business Item Value")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value),expression:"value"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(_vm.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.value=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Add Item"},on:{"click":_vm.add_row}})])])])])])],1)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"btn",attrs:{"href":"javascript:void(0)","data-toggle":"modal","data-target":"#addRevShare"}},[_c('i',{staticClass:"fa fa-plus"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add Business Details")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-063d4ca8", __vue__options__)
  } else {
    hotAPI.reload("data-v-063d4ca8", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/ChangePin.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      user_email: null,
      user_id: null,
      old_pwd: null,
      consumer_secret: null,
      consumer_key: null
    };
  },

  mounted: function mounted() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
  },
  created: function created() {
    this.user_email = this.$attrs["email"];
    this.user_id = this.$attrs["userid"];
  },
  methods: {
    verifyPwdChange: function verifyPwdChange() {
      if (this.old_pwd == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Forgot something ? Enter your current Pin"
        });
        return;
      }
      this.getOauthToken();
    },
    getOauthToken: function getOauthToken() {
      var _this = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this.commitPwdChange(response.data.token);
      }).catch(function (error) {}).then(function () {});
    },
    commitPwdChange: function commitPwdChange(token) {
      var urlIs = "/api/agent/pin/verify_and_change";
      var api_headers = {
        Authorization: "Bearer " + token
      };

      var api_params = {
        id: this.user_id,
        current_pin: this.old_pwd
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred during processing. If this persists, contact customer support for assistance"
          });
        } else if (response.data.status == 400) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid  Current PIN specified"
          });
        } else {
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Your PIN has been changed",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-md-6"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Current Pin")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.old_pwd),expression:"old_pwd"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.old_pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.old_pwd=$event.target.value}}})]),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('input',{staticClass:"btn btn-primary lift",attrs:{"type":"button","value":"Generate New Pin"},on:{"click":_vm.verifyPwdChange}})])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('h3',{staticClass:"mb-2"},[_vm._v("PIN")]),_vm._v(" "),_c('label',{staticClass:"mb-5 text-muted"},[_vm._v("Your PIN is private. Change or update your pin often.")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Your New Pin will be automatically generated")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d47de3c", __vue__options__)
  } else {
    hotAPI.reload("data-v-2d47de3c", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/ChangePwdModal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      user_email: null,
      user_id: null,
      old_pwd: null,
      new_pwd: null,
      confirm_new_pwd: null,
      consumer_secret: null,
      consumer_key: null
    };
  },

  mounted: function mounted() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
  },
  created: function created() {
    this.user_email = this.$attrs["email"];
    this.user_id = this.$attrs["userid"];
  },
  methods: {
    verifyPwdChange: function verifyPwdChange() {
      if (this.old_pwd == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Forgot something ? Enter your current password"
        });
        return;
      }
      if (this.new_pwd == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Forgot something ? Enter your new password"
        });
        return;
      }
      if (this.new_pwd.length <= 6) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Password length must be grater than 6"
        });
        return;
      }

      if (this.confirm_new_pwd == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Forgot something ? Enter your confirmation password"
        });
        return;
      }
      var result = this.confirm_new_pwd.localeCompare(this.new_pwd);
      if (result) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Your new  and confirmation passwords do not match !"
        });
        return;
      }
      this.commitPwdChange();
    },
    commitPwdChange: function commitPwdChange() {
      var urlIs = "/api/user/pwd/change";
      var api_headers = {
        Authorization: "Bearer some_token"
      };

      var api_params = {
        id: this.user_id,
        old_pwd: this.old_pwd,
        new_pwd: this.new_pwd
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something isnt right, did you enter the correct current password ?"
          });
        } else {
          $("#addBankAccountModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Your password has been changed",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-12 col-md-6"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.old_pwd),expression:"old_pwd"}],staticClass:"form-control",attrs:{"type":"password"},domProps:{"value":(_vm.old_pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.old_pwd=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("New password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.new_pwd),expression:"new_pwd"}],staticClass:"form-control",attrs:{"type":"password","minlength":"6"},domProps:{"value":(_vm.new_pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.new_pwd=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',[_vm._v("Confirm new password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.confirm_new_pwd),expression:"confirm_new_pwd"}],staticClass:"form-control",attrs:{"type":"password","minlength":"6"},domProps:{"value":(_vm.confirm_new_pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.confirm_new_pwd=$event.target.value}}})]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary lift",attrs:{"type":"button","value":"Update Password"},on:{"click":_vm.verifyPwdChange}})])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('h3',{staticClass:"mb-2"},[_vm._v("Password")]),_vm._v(" "),_c('label',{staticClass:"mb-5 text-muted"},[_vm._v("Your password is private. Change or update your password often.")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-740584d9", __vue__options__)
  } else {
    hotAPI.reload("data-v-740584d9", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/CustomerChart.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      async_data: null,
      async_dates: null,
      merchant_id: null,
      current_user_id: null
    };
  },
  created: function created() {
    this.merchant_id = this.$attrs["merchant_id"];
    this.current_user_id = this.$attrs["user_id"];
    this.get_revenue_data();
  },

  computed: {
    chartOptions: function chartOptions() {
      return {
        reflow: true,
        chart: {
          type: "areaspline"
        },
        title: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          title: {
            text: "Day"
          },
          categories: this.async_dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: "No of customers"
          }
        },
        series: [(0, _defineProperty3.default)({
          lineWidth: 2,
          color: "#3C009B",
          name: "Customers Served",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.async_data
        }, "color", "#6fcd98")]
      };
    }
  },
  methods: {
    get_revenue_data: function get_revenue_data() {
      var _this = this;

      var url = "/api/dashboard/stats/customers/graph";
      Vue.axios.get(url, {
        params: { owner_id: this.merchant_id, user_id: this.current_user_id }
      }).then(function (response) {
        var vdata = (0, _stringify2.default)(response.data);
        var data = JSON.parse(vdata);
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
        _this.async_dates = data.map(function (d) {
          return (0, _moment2.default)(d.date).format("ddd Do MMM");
        });
        _this.async_data = data.map(function (d) {
          return parseFloat(d.customers_total);
        });
      }).catch(function (error) {}).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('highcharts',{attrs:{"options":_vm.chartOptions}})}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-43ea0c17"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43ea0c17", __vue__options__)
  } else {
    hotAPI.reload("data-v-43ea0c17", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/CustomerModal.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("span.error {\n  color: red;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueFormWizard = require("vue-form-wizard");

var _vueFormWizard2 = _interopRequireDefault(_vueFormWizard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vueFormWizard2.default);

exports.default = {
  data: function data() {
    return {
      services: null,
      selected_service: [],
      fname_error: null,
      lname_error: null,
      idno_error: null,
      phone_error: null,
      errorMsg: null,
      customerForm: {
        fname: null,
        lname: null,
        idno: null,
        phone: null
      },
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      merchant_id: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.getOauthToken();
    $("#newCustomerModal").on("hidden.bs.modal", function () {
      _this.reset();
    });
  },
  created: function created() {
    this.services = this.loadAvailableServices();
  },
  computed: {
    checkedNames: function checkedNames() {
      if (this.services) {
        return this.services.filter(function (item) {
          return item.checked;
        }).map(function (name) {
          return name.name;
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.banks = _this2.loadBanks();
      }).catch(function (error) {}).then(function () {});
    },
    reset: function reset() {
      this.services = null;
      this.selected_service = [];
      this.fname_error = null;
      this.lname_error = null;
      this.idno_error = null;
      this.phone_error = null;
      this.customerForm = {
        fname: null,
        lname: null,
        idno: null,
        phone: null
      };
    },
    validateCustomerDetails: function validateCustomerDetails() {
      if (this.customerForm.fname && this.customerForm.lname && this.customerForm.idno && this.customerForm.phone) {
        return true;
      }
      this.fname_error = null;
      this.lname_error = null;
      this.idno_error = null;
      this.phone_error = null;

      if (!this.customerForm.fname) {
        this.fname_error = "* required";
      }
      if (!this.customerForm.lname) {
        this.lname_error = "* required";
      }
      if (!this.customerForm.idno) {
        this.idno_error = "* required";
      }
      if (!this.customerForm.phone) {
        this.phone_error = "* required";
      }
      return false;
    },


    loadAvailableServices: function loadAvailableServices() {
      return [{ id: 1, name: "Deposit Cash" }, { id: 2, name: "Withdraw Cash" }, { id: 3, name: "Apply for Driving Licence" }, { id: 4, name: "Apply for Business Permit" }, { id: 5, name: "Apply for eVisa" }];
    },

    create_customer: function create_customer() {
      var urlIs = "/api/agent/customer/new";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      var api_params = {
        first_name: this.customerForm.fname,
        last_name: this.customerForm.lname,
        id_number: this.customerForm.idno,
        msisdn: this.customerForm.phone,
        merchant_id: this.merchant_id
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Ensure the customer is not already created"
          });
        } else {
          $("#newCustomerModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Customer has been created",
            showConfirmButton: false,
            timer: 4500
          });
          location.reload();
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    },
    onComplete: function onComplete() {
      this.create_customer();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-primary lift",attrs:{"href":"#","data-toggle":"modal","data-target":"#newCustomerModal"}},[_vm._v("New Customer")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"newCustomerModal","tabindex":"-1","role":"dialog","aria-labelledby":"newCustomerModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',[_c('form-wizard',{attrs:{"color":"#9b59b6","error-color":"#ff4949"},on:{"on-complete":_vm.onComplete}},[_c('h2',{attrs:{"slot":"title"},slot:"title"},[_vm._v("Complete this form")]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Customer details","icon":"ti-user","before-change":_vm.validateCustomerDetails}},[_c('form',{ref:"ruleForm",attrs:{"model":_vm.customerForm,"rules":_vm.rules}},[_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label",attrs:{"for":"staticEmail"}},[_vm._v("FirstName")]),_vm._v(" "),_c('div',{staticClass:"col-sm-8"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.fname),expression:"customerForm.fname"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"John"},domProps:{"value":(_vm.customerForm.fname)},on:{"focus":_vm.validateCustomerDetails,"blur":_vm.validateCustomerDetails,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "fname", $event.target.value)}}}),_vm._v(" "),(_vm.fname_error)?_c('span',{staticClass:"error"},[_vm._v("* required")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label",attrs:{"for":"staticEmail"}},[_vm._v("LastName")]),_vm._v(" "),_c('div',{staticClass:"col-sm-8"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.lname),expression:"customerForm.lname"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Doe"},domProps:{"value":(_vm.customerForm.lname)},on:{"focus":_vm.validateCustomerDetails,"blur":_vm.validateCustomerDetails,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "lname", $event.target.value)}}}),_vm._v(" "),(_vm.lname_error)?_c('span',{staticClass:"error"},[_vm._v("* required")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label",attrs:{"for":"staticEmail"}},[_vm._v("IDNumber")]),_vm._v(" "),_c('div',{staticClass:"col-sm-8"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.idno),expression:"customerForm.idno"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"11111111"},domProps:{"value":(_vm.customerForm.idno)},on:{"focus":_vm.validateCustomerDetails,"blur":_vm.validateCustomerDetails,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "idno", $event.target.value)}}}),_vm._v(" "),(_vm.idno_error)?_c('span',{staticClass:"error"},[_vm._v("* required")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label",attrs:{"for":"staticEmail"}},[_vm._v("Phone")]),_vm._v(" "),_c('div',{staticClass:"col-sm-8"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.phone),expression:"customerForm.phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"254XXXYYYZZZ"},domProps:{"value":(_vm.customerForm.phone)},on:{"focus":_vm.validateCustomerDetails,"blur":_vm.validateCustomerDetails,"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "phone", $event.target.value)}}}),_vm._v(" "),(_vm.phone_error)?_c('span',{staticClass:"error"},[_vm._v("* required")]):_vm._e()])])])])],1)],1)]),_vm._v(" "),_vm._m(1)])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Add New Customer")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66fe2f66", __vue__options__)
  } else {
    hotAPI.reload("data-v-66fe2f66", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/CustomerServiceInvoiceModal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["propsdata"],
  data: function data() {
    return {
      customer_name: null,
      customer_phone: null,
      modal_name: "customerServiceInvoiceModal",
      modal_target: "#customerServiceInvoiceModal",
      merchant_id: null,
      service_id: null,
      service_name: null,
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      service_cost: 0,
      margin: 0,
      total_cost: 0,
      selectedService: null,
      availableServices: this.propsdata,
      user_id: null,
      parent_account: null,
      notification_url: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    $(this.modal_target).on("hidden.bs.modal", function () {
      _this.reset();
    });
  },
  created: function created() {
    this.notification_url = this.$attrs["notification_url"];
    this.availableServices = this.$attrs["services"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.parent_account = this.$attrs["account_id"];
    this.customer_id = this.$attrs["customer_id"];
    this.user_id = this.$attrs["user_id"];
    this.customer_name = this.$attrs["customer_name"];
    this.customer_phone = this.$attrs["customer_phone"];
    this.modal_name = this.modal_name + "_" + this.customer_id;
    this.modal_target = this.modal_target + "_" + this.customer_id;
  },
  methods: {
    authAndcreateInvoice: function authAndcreateInvoice() {
      var _this2 = this;

      if (this.selectedService == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a service !"
        });
        return;
      }
      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.createInvoice(response.data.token);
      }).catch(function (error) {}).then(function () {});
    },
    loadMyServices: function loadMyServices() {
      var _this3 = this;

      var url = "/api/service/?merchant_id=" + this.merchant_id;
      var api_headers = { Authorization: "Bearer " + this.api_token };
      Vue.axios.get(url, {
        headers: api_headers
      }).then(function (response) {
        _this3.availableServices = response.data.services;
      }).catch(function (error) {}).then(function () {});
    },
    refreshTotalCost: function refreshTotalCost() {
      this.total_cost = parseFloat(this.margin) + parseFloat(this.service_cost);
    },
    refreshCosts: function refreshCosts() {
      if (this.selectedService != null) {
        this.margin = this.selectedService.commission;
      }
      this.total_cost = parseFloat(this.margin) + parseFloat(this.service_cost);
    },
    createInvoice: function createInvoice(token) {
      var _this4 = this;

      var urlIs = "/api/invoice/create";
      var uniq_ref = this.generateUUID();
      var api_headers = { Authorization: "Bearer " + token };
      var api_params = {
        client_invoice_ref: uniq_ref,
        amount_expected: this.total_cost,
        msisdn: this.customer_phone,
        amount_settled_offline: 0,
        service_id: this.selectedService.id,
        merchant_id: this.merchant_id,
        owner_type: "merchant",
        items: [{
          price: this.total_cost,
          item_ref: uniq_ref,
          quantity: 1,
          desc: "Invoice for service - " + this.selectedService.name,
          require_settlement: true,
          settlements: [{
            id: uniq_ref,
            desc: "Settlement for service - " + this.selectedService.name,
            value: this.total_cost,
            account_number: this.parent_account
          }]
        }],
        account_id: this.parent_account,
        currency: this.selectedService.currency.symbol,
        notification_url: this.notification_url
      };
      Vue.axios.post(urlIs, api_params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went horribly wrong !"
          });
        } else {
          $(_this4.modal_target + " .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Invoice has been created.",
            showConfirmButton: false,
            timer: 4000
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    },
    reset: function reset() {
      this.margin = 0;
      this.total_cost = 0;
      this.selectedService = null;
    },
    generateUUID: function generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    },
    generateInvoiceNo: function generateInvoiceNo() {
      var length = 6;
      var result = "";
      var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result.toUpperCase();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-sm btn-primary lift",attrs:{"href":"#","data-toggle":"modal","data-target":_vm.modal_target}},[_vm._v("Invoice Customer")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":_vm.modal_name,"tabindex":"-1","role":"dialog","aria-labelledby":_vm.modal_name,"aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Invoice Customer - "+_vm._s(_vm.customer_name))]),_vm._v(" "),_vm._m(0)]),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Service Provided")]),_vm._v(" "),_c('v-select',{attrs:{"label":"name","options":_vm.availableServices,"reduce":function (name) { return name.id; }},on:{"change":_vm.refreshCosts},model:{value:(_vm.selectedService),callback:function ($$v) {_vm.selectedService=$$v},expression:"selectedService"}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Service Margin")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.margin),expression:"margin"}],staticClass:"form-control",attrs:{"type":"number","min":"0","readonly":""},domProps:{"value":(_vm.margin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.margin=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Service Cost")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.service_cost),expression:"service_cost"}],staticClass:"form-control",attrs:{"type":"number","min":"0"},domProps:{"value":(_vm.service_cost)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.service_cost=$event.target.value},_vm.refreshTotalCost]}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Total Chargeable Cost")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.total_cost),expression:"total_cost"}],staticClass:"form-control",attrs:{"type":"number","min":"0","readonly":""},domProps:{"value":(_vm.total_cost)},on:{"input":function($event){if($event.target.composing){ return; }_vm.total_cost=$event.target.value}}})],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Create Invoice"},on:{"click":_vm.authAndcreateInvoice}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f8cbbc64", __vue__options__)
  } else {
    hotAPI.reload("data-v-f8cbbc64", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/DWComponent.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "DWComponent",
  data: function data() {
    return {
      current_user: null,
      topup_amount: null,
      current_merchant: null,
      bank_accounts: [],
      selectedAccount: null,
      withdrawTo: null,
      mpesaAccount: null,
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      merchant_id: null,
      account_id: null,
      withdrawal_amount: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.getOauthToken();

    $("#depositModal").on("hidden.bs.modal", function () {
      _this.topup_amount = null;
    });
  },
  created: function created() {
    this.current_user = this.$attrs["current_user"];
    this.current_merchant = this.$attrs["current_merchant"];
    this.merchant_id = this.$attrs["merchant_id"];
    this.account_id = this.$attrs["account_id"];
  },

  methods: {
    validateR: function validateR() {
      if (this.topup_amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount !"
        });
        return;
      }
      if (this.topup_amount <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount greater than 0"
        });
        return;
      }
      location.href = "/" + this.current_merchant + "/topup/checkout/page?amount=" + this.topup_amount;
    },
    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.loadBankAccounts();
      }).catch(function (error) {}).then(function () {});
    },
    loadBankAccounts: function loadBankAccounts() {
      var _this3 = this;

      var url = "/api/banks/accounts/?merchant_ids=[" + this.merchant_id + "]";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      Vue.axios.get(url, {
        headers: api_headers
      }).then(function (response) {
        _this3.bank_accounts = response.data.bank_accounts.entries;
      }).catch(function (error) {}).then(function () {});
    },
    generate_req_ref: function generate_req_ref() {
      var length = 6;
      var result = "";
      var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result.toUpperCase();
    },
    resetWithdrawalForm: function resetWithdrawalForm() {
      this.selectedAccount = null;
      this.mpesaAccount = null;
      this.withdrawal_amount = null;
      this.withdrawTo = null;
    },
    validateWithdrawal: function validateWithdrawal() {
      if (this.withdrawal_amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount!"
        });
        return false;
      }
      if (parseFloat(this.withdrawal_amount) <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount not less than 1 !"
        });
        return false;
      }

      if (this.selectedAccount == null && this.mpesaAccount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select either a bank account or mobile money account !"
        });
        return false;
      }

      this.executeWithdrawal();
    },
    executeWithdrawal: function executeWithdrawal() {
      var _this4 = this;

      var bankAccountId = null;
      var gateway = "mpesa-b2c";
      if (this.selectedAccount != null) {
        bankAccountId = this.selectedAccount.id;
        gateway = "mpesa";
      }
      var params = {
        bank_account_id: bankAccountId,
        destination: this.mpesaAccount,
        amount: this.withdrawal_amount,
        account_id: this.account_id,
        gateway: gateway
      };

      this.resetWithdrawalForm();
      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, withdraw funds"
      }).then(function (result) {
        if (result.value) {
          _this4.authorizeWithdrawal(params);
        }
      });
    },
    authorizeWithdrawal: function authorizeWithdrawal(params) {
      var _this5 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this5.api_token = response.data.token;
        _this5._make_withdrawal(_this5.api_token, params);
      }).catch(function (error) {}).then(function () {});
    },
    _make_withdrawal: function _make_withdrawal(token, params) {
      var urlIs = "/api/payment/withdraw";
      var api_headers = {
        Authorization: "Bearer " + token
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        } else {
          $("#withdrawalModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Withdrawal Inititated !",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"withdrawalModal","tabindex":"-1","role":"dialog","aria-labelledby":"withdrawalModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmWIthdraw","name":"frmWIthdraw","onsubmit":"return false;"}},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.withdrawal_amount),expression:"withdrawal_amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","max":"70000"},domProps:{"value":(_vm.withdrawal_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.withdrawal_amount=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Withdraw To")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.withdrawTo),expression:"withdrawTo"}],staticClass:"form-control list-gateways",attrs:{"tabindex":"-1","aria-hidden":"true"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.withdrawTo=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},[_c('option'),_vm._v(" "),_c('option',{attrs:{"value":"MPESA"}},[_vm._v("DIRECT TO MPESA")]),_vm._v(" "),_c('option',{attrs:{"value":"BANK"}},[_vm._v("DIRECT TO BANK")])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Account")]),_vm._v(" "),(_vm.withdrawTo==='BANK')?_c('v-select',{attrs:{"label":"account_number","options":_vm.bank_accounts,"reduce":function (name) { return name.id; }},model:{value:(_vm.selectedAccount),callback:function ($$v) {_vm.selectedAccount=$$v},expression:"selectedAccount"}}):_vm._e(),_vm._v(" "),(_vm.withdrawTo==='MPESA')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.mpesaAccount),expression:"mpesaAccount"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter Mpesa Number","max":"12"},domProps:{"value":(_vm.mpesaAccount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.mpesaAccount=$event.target.value}}}):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Withdraw"},on:{"click":_vm.validateWithdrawal}})])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"depositModal","tabindex":"-1","role":"dialog","aria-labelledby":"depositModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmDeposit","name":"frmDeposit","onsubmit":"return false;"}},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.topup_amount),expression:"topup_amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","max":"70000","id":"ag_deposit_amount"},domProps:{"value":(_vm.topup_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.topup_amount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('a',{staticClass:"btn btn-primary",attrs:{"href":"#","type":"button"},on:{"click":_vm.validateR}},[_vm._v("Checkout")])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('a',{staticClass:"btn btn-outline-primary lift",attrs:{"href":"#!","data-toggle":"modal","data-target":"#withdrawalModal"}},[_vm._v("Withdraw")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-auto"},[_c('a',{staticClass:"btn btn-primary lift",attrs:{"href":"#!","data-toggle":"modal","data-target":"#depositModal"}},[_vm._v("Top-up")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Withdraw Funds")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Deposit Funds")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
__vue__options__._scopeId = "data-v-1b531bfe"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b531bfe", __vue__options__)
  } else {
    hotAPI.reload("data-v-1b531bfe", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/RevenueChart.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      async_data: null,
      async_dates: null,
      merchant_id: null,
      user_id: null
    };
  },
  created: function created() {
    this.merchant_id = this.$attrs["merchant_id"];
    this.user_id = this.$attrs["user_id"];
    this.get_revenue_data();
  },

  computed: {
    chartOptions: function chartOptions() {
      return {
        reflow: true,
        chart: {
          type: "areaspline"
        },
        title: {
          text: ""
        },
        xAxis: {
          gridLineWidth: 1,
          title: {
            text: "Day"
          },
          categories: this.async_dates
        },
        yAxis: {
          gridLineWidth: 1,
          title: {
            text: "Amount in Ksh"
          }
        },
        series: [(0, _defineProperty3.default)({
          lineWidth: 2,
          color: "#3C009B",
          name: "30 Day Revenue",
          fillColor: {
            linearGradient: [0, 0, 0, 350],
            stops: [[0, "rgb(176,145,226)"], [1, "rgba(255, 255, 255, 0.4)"]]
          },
          data: this.async_data
        }, "color", "#6fcd98")]
      };
    }
  },
  methods: {
    get_revenue_data: function get_revenue_data() {
      var _this = this;

      var url = "/api/dashboard/stats/revenues/graph";
      Vue.axios.get(url, {
        params: { owner_id: this.merchant_id, user_id: this.user_id }
      }).then(function (response) {
        var vdata = (0, _stringify2.default)(response.data);
        var data = JSON.parse(vdata);
        data = data.sort(function (d1, d2) {
          var m1 = (0, _moment2.default)(d1.date);
          var m2 = (0, _moment2.default)(d2.date);
          if (m1.isBefore(m2)) return -1;
          if (m1.isSame(m2)) return 0;
          if (m1.isAfter(m2)) return 1;
        });
        _this.async_dates = data.map(function (d) {
          return (0, _moment2.default)(d.date).format("ddd Do MMM");
        });
        _this.async_data = data.map(function (d) {
          return parseFloat(d.default_currency);
        });
      }).catch(function (error) {}).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('highcharts',{attrs:{"options":_vm.chartOptions}})}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-4c9147fb"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c9147fb", __vue__options__)
  } else {
    hotAPI.reload("data-v-4c9147fb", __vue__options__)
  }
})()}
});

;require.register("js/components/agency/SelfSignUp.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      business_name: null,
      business_reg_no: null,
      business_pin: null,
      availableServices: [],
      selectedServices: [],
      user_params: null,
      user_details: [],
      services: null,
      missing_business_name: false,
      missing_business_reg_no: false,
      missing_business_pin: false,
      consumer_secret: null,
      consumer_key: null,
      api_token: null
    };
  },
  mounted: function mounted() {
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
  },
  created: function created() {
    this.user_params = this.$attrs["user_details"];
    this.services = this.$attrs["services"];
    this.set_services();
    this.set_user_details();
  },

  methods: {
    set_services: function set_services() {
      this.availableServices = this.services;
    },
    set_user_details: function set_user_details() {},
    validate: function validate() {
      if (this.business_reg_no == null) {
        this.missing_business_reg_no = true;
        return;
      } else {
        this.missing_business_reg_no = !true;
      }
      if (this.business_name == null) {
        this.missing_business_name = true;
        return;
      } else {
        this.missing_business_name = !true;
      }
      if (this.business_pin == null) {
        this.missing_business_pin = true;
        return;
      } else {
        this.missing_business_pin = !true;
      }
      this.complete_signup();
    },
    authorize_and_execute: function authorize_and_execute(api_url, callback_url, fpayload) {
      var _this = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this.api_token = response.data.token;
        _this.do_post(_this.api_token, api_url, callback_url, fpayload);
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Contact Pesaflow Support"
        });
      }).then(function () {});
    },
    generate_full_payload: function generate_full_payload() {
      var business_data = {
        business_name: this.business_name,
        business_reg_no: this.business_reg_no,
        business_ra_pin: this.business_pin,
        services: this.selectedServices
      };
      var new_user_params = (0, _assign2.default)(this.user_params, business_data);
      return new_user_params;
    },
    complete_signup: function complete_signup() {
      var api_url = "/api/self/signup";
      var callback_url = "/signin";
      var payload = this.generate_full_payload();
      this.authorize_and_execute(api_url, callback_url, payload);
    },
    do_post: function do_post(api_token, api_url, callback_url, payload) {
      var api_headers = { Authorization: "Bearer " + api_token };
      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed",
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm(setup) {
          return Vue.axios.post(api_url, payload, { headers: api_headers }).then(function (response) {
            window.location.href = callback_url;
          }).catch(function (error) {
            _sweetalert2.default.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong. Contact Support for further assistance"
            });
          }).then(function () {});
        },
        allowOutsideClick: function allowOutsideClick() {
          return !_sweetalert2.default.isLoading();
        }
      }).then(function (result) {
        if (result.value) {
          _sweetalert2.default.fire("Success", "Thank you for registering. You will receive an email confiration and with instructions shortly", "success");
        }
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"form-group citizens residents account-marker"},[_c('label',[_vm._v("Business Name")]),_vm._v(" "),(_vm.missing_business_name)?_c('span',{staticClass:"error"},[_vm._v("*")]):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.business_name),expression:"business_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Name","maxlength":"20"},domProps:{"value":(_vm.business_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.business_name=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group citizens residents account-marker"},[_c('label',[_vm._v("Business Registration Number")]),_vm._v(" "),(_vm.missing_business_reg_no)?_c('span',{staticClass:"error"},[_vm._v("*")]):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.business_reg_no),expression:"business_reg_no"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Registration Number","maxlength":"20"},domProps:{"value":(_vm.business_reg_no)},on:{"input":function($event){if($event.target.composing){ return; }_vm.business_reg_no=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group citizens residents account-marker"},[_c('label',[_vm._v("Revenue Authority Pin Number")]),_vm._v(" "),(_vm.missing_business_pin)?_c('span',{staticClass:"error"},[_vm._v("*")]):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.business_pin),expression:"business_pin"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Revenue Authority Pin Number","maxlength":"20"},domProps:{"value":(_vm.business_pin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.business_pin=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group citizens residents account-marker"},[_c('label',[_vm._v("Select Agency services that you would like to offer")]),_vm._v(" "),_c('v-select',{attrs:{"multiple":"","label":"name","options":_vm.availableServices},model:{value:(_vm.selectedServices),callback:function ($$v) {_vm.selectedServices=$$v},expression:"selectedServices"}})],1),_vm._v(" "),_c('div',[_c('button',{staticClass:"btn btn-lg btn-block btn-primary lift mb-3",on:{"click":_vm.validate}},[_vm._v("\n      Complete Setup\n    ")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25298486", __vue__options__)
  } else {
    hotAPI.reload("data-v-25298486", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/AfriMoneyV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "afrimoney",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      mpgs_url: null,
      currency: null,
      logo: null,
      invoice_amount: 0,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      bill_ref: null,
      service_id: null,
      loaded: false,
      error_message: null,
      processing: false,
      gateway_id: null,
      notification_url: null,
      base_url: "",
      api_token: null,
      is_initiated: false
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.mpgs_url = this.$attrs["mpgs_api_url"];
    this.notification_url = this.$attrs["notification_url"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.bill_ref = this.$attrs["bill_ref"];
    this.service_id = this.$attrs["service_id"];
    this.gateway_id = this.$attrs["gid"];
    this.base_url = this.$attrs["base_url"];
    this.set_total_amount();

    $("#afriMoneyProcessingModal").on("shown.bs.modal", function () {
      _this.is_initiated = false;
    });

    $("#afriMoneyProcessingModal").on("hidden.bs.modal", function () {
      _this.is_initiated = false;
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = this.base_url + "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
      }).catch(function (error) {}).then(function () {});
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    initiate_payment: function initiate_payment() {
      var _payload,
          _this3 = this;

      var urlIs = this.base_url + "/api/payment/afrimoney/checkout";

      if (!this.msisdn) {
        this.error_message = "Please enter the mobile number !";
        return;
      }
      this.error_message = null;
      this.processing = true;

      var payload = (_payload = {
        msisdn: this.msisdn,
        invoice_number: this.invoice_no,
        amount: this.total_amount
      }, (0, _defineProperty3.default)(_payload, "msisdn", this.msisdn), (0, _defineProperty3.default)(_payload, "notification_url", this.notification_url), (0, _defineProperty3.default)(_payload, "gateway_id", this.gateway_id), _payload);

      var api_headers = {
        Authorization: "Bearer " + this.api_token
      };

      Vue.axios.post(urlIs, payload, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this3.error_message = "Unable to initiate at the moment. Try again later !";
          _this3.processing = false;
        } else {
          _this3.msisdn = null;
          _this3.processing = false;
          _this3.is_initiated = true;
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Check your phone for instructions",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function () {
        _this3.error_message = "Unable to initiate at the moment. Try again later !";
        _this3.msisdn = null;
        _this3.processing = false;
        _this3.is_initiated = false;
      }).then(function () {
        _this3.processing = false;
        _this3.msisdn = null;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"afriMoneyProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"afriMoneyProcessingModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using AfriMoney")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Total Due*")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[(_vm.error_message)?_c('div',{staticClass:"row"},[_c('span',{staticClass:"alert alert-danger"},[_vm._v(_vm._s(_vm.error_message))])]):_vm._e(),_vm._v(" "),_c('form',[(!_vm.is_initiated)?_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[(!_vm.processing)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"text","pattern":"\\d*","maxlength":"9","placeholder":"Enter mobile number"},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}}):_vm._e(),_vm._v(" "),(_vm.processing)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"text","pattern":"\\d*","maxlength":"9","disabled":""},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col"},[(!_vm.processing)?_c('button',{staticClass:"btn btn-sm btn-outline-primary mb-2",attrs:{"type":"button"},on:{"click":function($event){return _vm.initiate_payment()}}},[_vm._v("\n                          Proceed to Pay\n                        ")]):_vm._e(),_vm._v(" "),(_vm.processing)?_c('button',{staticClass:"btn btn-sm btn-warning mb-2",attrs:{"type":"button","data-toggle":"modal"}},[_vm._v("\n                          Processing ...\n                        ")]):_vm._e()])]):_vm._e(),_vm._v(" "),(_vm.is_initiated)?_c('div',{staticClass:"row"},[_c('p',{staticClass:"alert alert-info"},[_vm._v("\n                        Transaction Initiated. Click the complete button once\n                        you complete payment or refresh page to retry.\n                      ")])]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"afrimoney","poll_external":"true","gateway_id":_vm.gateway_id,"status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32ccf89c", __vue__options__)
  } else {
    hotAPI.reload("data-v-32ccf89c", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/AirtelV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type", "return_url", "status_api_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      base_url: "",
      total_amount: 0,
      shortcode: null,
      gateway: null,
      stkOpen: false,
      stk_phone: null,
      show_uba_content: false,
      hide_proceed: false,
      initiating: false,
      iframe: null,
      iframeDoc: null,
      html: "",
      error: null,
      toggle_message: "Click here to proceed"
    };
  },

  computed: {
    valid_phone: function valid_phone() {
      if (this.stk_phone) {
        if (this.stk_phone.match(/\d{9}/g)) {
          return true;
        }
      }
      return false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    window.jQuery = _jquery2.default;
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gid"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.set_total_amount();
    $("#airtelProcessingModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });

    console.log("DATA => ", this.status_api_url);
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },
    toggleStkOpen: function toggleStkOpen() {
      if (this.stkOpen) {
        this.toggle_message = "Click here to proceed";
        this.stkOpen = false;
      } else {
        this.toggle_message = "Click here to close";
        this.stkOpen = true;
      }
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    stk_menu: function stk_menu() {
      var _this2 = this;

      this.initiating = true;
      var urlIs = this.base_url + "/api/payment/airtel/checkout";
      var api_headers = {
        Authorization: "****"
      };
      var params = {
        invoice_number: this.invoice_number,
        gateway_id: this.gateway,
        amount: this.total_amount,
        msisdn: this.stk_phone,
        callback_url: this.callback_url,
        return_url: this.return_url
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this2.initiating = false;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Request Failed (422). Try Later or Pay Directly to the bank"
          });
        } else {
          _this2.initiating = false;
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Check your phone for instructions",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _this2.initiating = false;
        _this2.show_uba_content = false;
        _this2.hide_proceed = false;
        $("#airtleProcessingModal").hide();
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Request Failed. Try Later or Pay Directly to the bank"
        });
      }).then(function () {
        _this2.initiating != true;
        _this2.stk_phone = null;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"airtelProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"ubaModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using Airtel")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.toggleStkOpen()}}},[_vm._v(_vm._s(_vm.toggle_message))]),_vm._v(" "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('label',[_vm._v("Phone Number\n                        "),(!_vm.valid_phone)?_c('span',{staticStyle:{"color":"red"}},[_vm._v("* required")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stk_phone),expression:"stk_phone"}],staticClass:"form-control",attrs:{"type":"tel","maxlength":"9","placeholder":"Enter a valid phone number e.g 9XX..."},domProps:{"value":(_vm.stk_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stk_phone=$event.target.value}}})]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.valid_phone)?_c('div',{staticClass:"row"},[(_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n                        Processing ...\n                      ")]):_vm._e(),_vm._v(" "),(!_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary",attrs:{"type":"button"},on:{"click":_vm.stk_menu}},[_vm._v("\n                        Initiate Payment\n                      ")]):_vm._e()]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"airtel","poll_external":"true","gateway_id":_vm.gateway_id,"status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-131620cb", __vue__options__)
  } else {
    hotAPI.reload("data-v-131620cb", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/AirtelmoneyV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.set_total_amount();
    $("#airtelMoneyModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"airtelMoneyModal","tabindex":"-1","role":"dialog","aria-labelledby":"airtelMoneyModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using Airtel Money")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('ol',[_c('li',[_vm._v("Go to Airtel Money on your phone")]),_vm._v(" "),_c('li',[_vm._v("Select Pay Bill option")]),_vm._v(" "),_c('li',[_vm._v("Select Other")]),_vm._v(" "),_c('li',[_vm._v("Enter Business Name. 206206")]),_vm._v(" "),_c('li',[_vm._v("\n                      Enter the Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                    ")]),_vm._v(" "),_c('li',[_vm._v("Enter your Airtel Money PIN and Send")]),_vm._v(" "),_c('li',[_vm._v("Enter Account no. "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("\n                      You will receive a confirmation SMS from Airtel Money\n                    ")])])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"airtelmoney","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-439e1686", __vue__options__)
  } else {
    hotAPI.reload("data-v-439e1686", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/CapitalPayV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.set_total_amount();
    $("#capitalpayProcessingModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"capitalpayProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"capitalpayProcessingModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using CapitalPay")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('ol',[_vm._m(1),_vm._v(" "),_c('li',[_vm._v("Enter pin or register")]),_vm._v(" "),_c('li',[_vm._v("Select E-Services")]),_vm._v(" "),_c('li',[_vm._v("\n                      Enter Invoice Number "),_c('b',[_vm._v(_vm._s(_vm.invoice_number))])]),_vm._v(" "),_c('li',[_vm._v("Approve the invoice payment")]),_vm._v(" "),_c('li',[_vm._v("\n                      You will receive a confirmation message once the payment\n                      completes\n                    ")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                    After you receive a successful reply, click the complete\n                    button below.\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"capitalpay","status_api_url":_vm.url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',[_vm._v("Dial "),_c('b',[_vm._v("*144#")]),_vm._v(" on your phone")])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-480f0bcc", __vue__options__)
  } else {
    hotAPI.reload("data-v-480f0bcc", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/CardV2.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#cardProcessingModal .modal-body[data-v-d0e820ec] {\n  height: 65vh;\n  overflow-y: auto;\n}\n\n#card_page[data-v-d0e820ec] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: none;\n}\n\n@font-face {\n  font-family: \"password\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"/iframev2/assets/fonts/password.ttf\");\n}\n\ninput.key[data-v-d0e820ec] {\n  font-family: \"password\";\n  width: 100px;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      mpgs_url: null,
      mastercard: null,
      visa: null,
      eYear: null,
      eMonth: null,
      CardNo: null,
      CVV: null,
      uierrors: [],
      cvv_error: null,
      month_error: null,
      cardno_error: null,
      year_error: null,
      currency: null,
      logo: null,
      invoice_amount: 0,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      bill_ref: null,
      service_id: null,
      card_charges: 0,
      expiry: null,
      gateway_id: null
    };
  },

  computed: {
    expiry_month: function expiry_month() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        return split_expiry[0].trim();
      }
    },
    expiry_year: function expiry_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        return split_expiry[1].trim();
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    $("#cardModal").on("shown.bs.modal", function () {
      _this.clear_form();
      _this.mount_card_js();
    });

    $("#cardProcessingModal").on("shown.bs.modal", function () {});

    $("#cardProcessingModal").on("hidden.bs.modal", function () {
      var ifr = window.top.$("#card_page");
      ifr.attr("src", "about:blank");
    });

    $("#cardModal").on("hidden.bs.modal", function () {
      $("#jswrapper").remove();
      _this.clear_form();
      _this.destroyTimer();
    });
    this.mpgs_url = this.$attrs["mpgs_api_url"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.bill_ref = this.$attrs["bill_ref"];
    this.service_id = this.$attrs["service_id"];
    this.gateway_id = this.$attrs["gid"];
    this.set_total_amount();
    this.calculate_card_charges();
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    load_iframe: function load_iframe() {
      if (this.eYear.length <= 0 || this.eMonth.length <= 0) {
        this.year_error = "invalid expiry";
        return;
      }
      $("#cardModal .close").click();
      $("#cardProcessingModal").modal("show");
    },
    mount_card_js: function mount_card_js() {
      $("#cardjswrapper").append('<div id="jswrapper" class="card-wrapper"></div>');

      new Card({
        form: "#frmCard",
        container: ".card-wrapper",

        formSelectors: {
          numberInput: "input#CardNo",
          expiryInput: "input#expiry",
          cvcInput: "input#CVV",
          nameInput: "input#name" },

        width: "350px",
        formatting: true,
        messages: {
          validDate: "Valid\nThru",
          monthYear: "month/year" },

        placeholders: {
          CardNo: "•••• •••• •••• ••••",
          name: "",
          expiry: ""
        },

        masks: {},

        debug: false });
    },
    clear_form: function clear_form() {
      $("#frmCard").trigger("reset");
      this.eYear = "";
      this.CardNo = "";
      this.CVV = "";
      this.eMonth = "";
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";
      this.expiry = null;
    },
    check_validation: function check_validation(e) {
      this.set_month_and_year();
      this.checkForm(e);
    },
    set_total_amount: function set_total_amount() {
      this.total_amount = this.set_card_charges(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    calculate_due_amount_less_charges: function calculate_due_amount_less_charges() {},
    set_month_and_year: function set_month_and_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        this.eMonth = split_expiry[0].trim();
        this.eYear = split_expiry[1].trim();
      }
    },

    calculate_card_charges: function calculate_card_charges() {
      var val = this.total_amount - (parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
      this.card_charges = val.toFixed(2);
    },
    set_card_charges: function set_card_charges(base_amount) {
      var a = base_amount * this.$attrs["charges"] / 100;
      var val = a + base_amount;
      return val.toFixed(2);
    },
    checkForm: function checkForm(e) {
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";

      if (!this.eYear) {
        this.uierrors.push("Year is required");
        this.year_error = "Required*";
      }
      if (!this.eMonth) {
        this.uierrors.push("Month is required");
        this.month_error = "Required*";
      }
      if (!this.CardNo) {
        this.uierrors.push("Card Number is required");
        this.cardno_error = "Required*";
      }
      if (!this.CVV) {
        this.uierrors.push("CVV is required");
        this.cvv_error = "Required*";
      }

      if (!this.uierrors.length) {
        return true;
      }

      e.preventDefault();
    },

    destroy: function destroy(e) {
      $("#cardProcessingModal").modal("hide");
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"cardProcessingModal","aria-labelledby":"cardProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('complete-button',{ref:"timer",attrs:{"gateway":"cards","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url},on:{"click":_vm.destroy}}),_vm._v(" "),_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"cardModal","tabindex":"-1","role":"dialog","aria-labelledby":"cardModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('form',{attrs:{"id":"frmCard","action":_vm.mpgs_url,"method":"POST","target":"card_page"},on:{"submit":_vm.load_iframe}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Card")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+"\n                        "+_vm._s((_vm.total_amount - _vm.card_charges).toFixed(2))+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Card Charges*")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.card_charges)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Total Due*")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{attrs:{"id":"cardjswrapper"}}),_vm._v(" "),_c('div',{staticClass:"form-group",staticStyle:{"margin-top":"15px"}},[_c('label',[_vm._v("Card Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CardNo),expression:"CardNo"}],staticClass:"form-control",attrs:{"type":"text","id":"CardNo","name":"cardNo","placeholder":"1234 1234 1234 1234","required":""},domProps:{"value":(_vm.CardNo)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.CardNo=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cardno_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                          "+_vm._s(_vm.cardno_error)+"\n                        ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Valid Thru")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.expiry),expression:"expiry"}],staticClass:"form-control",attrs:{"placeholder":"MM/YY","id":"expiry","type":"tel","maxlength":"7","required":""},domProps:{"value":(_vm.expiry)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.expiry=$event.target.value},_vm.check_validation]}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.expiry_month),expression:"expiry_month"}],attrs:{"type":"hidden","name":"eMonth"},domProps:{"value":(_vm.expiry_month)},on:{"input":function($event){if($event.target.composing){ return; }_vm.expiry_month=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.expiry_year),expression:"expiry_year"}],attrs:{"type":"hidden","name":"eYear"},domProps:{"value":(_vm.expiry_year)},on:{"input":function($event){if($event.target.composing){ return; }_vm.expiry_year=$event.target.value}}}),_vm._v(" "),(_vm.year_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.year_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Card Code (CVC)")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CVV),expression:"CVV"}],staticClass:"key form-control",attrs:{"type":"text","id":"CVV","name":"CVV","placeholder":"CVC","required":""},domProps:{"value":(_vm.CVV)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.CVV=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cvv_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.cvv_error)+"\n                          ")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"submit","data-toggle":"modal","value":"Pay","data-target":".cardProcessingModal"},on:{"submit":function($event){_vm.check_validation();
                        return;}}})])]),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"MerchantTrxRef"},domProps:{"value":_vm.bill_ref}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"serviceID"},domProps:{"value":_vm.service_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"currency"},domProps:{"value":_vm.currency}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"amount"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"gateway_id"},domProps:{"value":_vm.gateway_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"invoiceNumber"},domProps:{"value":_vm.invoice_no}})])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title"},[_vm._v("\n              Processing your payment, please wait...\n            ")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body"},[_c('span',[_vm._v("Do not close this window until your payment processing is\n              complete.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',[_c('iframe',{staticStyle:{"background":"#fff"},attrs:{"id":"card_page","width":"80%","height":"100%","name":"card_page","frameborder":"0"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
__vue__options__._scopeId = "data-v-d0e820ec"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d0e820ec", __vue__options__)
  } else {
    hotAPI.reload("data-v-d0e820ec", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/CardV3.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#cardProcessingModal .modal-body[data-v-d0cbf1ea] {\n  height: 65vh;\n  overflow-y: auto;\n}\n\n#card_page[data-v-d0cbf1ea] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: none;\n}\n\n@font-face {\n  font-family: \"password\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"/iframev2/assets/fonts/password.ttf\");\n}\n\ninput.key[data-v-d0cbf1ea] {\n  font-family: \"password\";\n  width: 100px;\n}\n\n.not-allowed[data-v-d0cbf1ea] {\n  cursor: not-allowed !important;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _DeviceDataCollection = require("./DeviceDataCollection.vue");

var _DeviceDataCollection2 = _interopRequireDefault(_DeviceDataCollection);

var _stepupForm = require("./stepupForm.vue");

var _stepupForm2 = _interopRequireDefault(_stepupForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "cards",
  components: { CardinalCollection: _DeviceDataCollection2.default, StepupForm: _stepupForm2.default },
  props: ["status_api_url", "invoice_no", "callback_url", "notification_url", "enrollment_url"],
  data: function data() {
    return {
      mpgs_url: null,
      mastercard: null,
      visa: null,
      CardNo: null,
      CVV: null,
      uierrors: [],
      cvv_error: null,
      month_error: null,
      cardno_error: null,
      email_error: null,
      year_error: null,
      forename_error: null,
      surname_error: null,
      currency: null,
      logo: null,
      invoice_amount: 0,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      bill_ref: null,
      service_id: null,
      card_charges: 0,
      expiry: null,
      fore_name: null,
      sur_name: null,
      email: null,
      msisdn: null,
      billing_address: "Nairobi",
      bill_to_address_city: null,
      bill_to_address_country: "",
      bill_to_address_postal_code: "",
      signature: null,
      signed_date_time: null,
      signed_field_names: null,
      unsigned_field_names: null,
      merchant_descriptor: null,
      profile_id: null,
      access_key: null,
      session_id: null,
      gateway: null,
      ip_address: null,
      cardjswrapper: null,
      selected_card_type_is: null,
      set_expiry_month: null,
      set_expiry_year: null,
      showVerificationModal: false,
      charged_code: null,
      card_charged: false,
      verified_charged_code: false,
      authentication_url: null,
      authorization_url: null,
      completion_url: null,
      loading: false,
      submitting: false,
      states: [],
      has_pending_confirmation: false,
      confirm_error: null,
      formatted_card_expiry_date: null,
      reference_id: null,
      step: "",
      deviceDataCollectionUrl: null,
      accessToken: null,
      origin: null,
      referenceID: null,
      authenticated: null,
      stepupURL: null,
      pareqToken: null,
      returnUrl: null,
      trackingCode: null,
      trx_details: {},
      auth_info: {}
    };
  },

  computed: {
    charged_code_available: function charged_code_available() {
      if (!this.charged_code) return true;
      return false;
    },
    can_pay: function can_pay() {
      if (this.selected_card_type_is && this.uierrors.length <= 0) return true;
      return false;
    },
    expiry_month: function expiry_month() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        this.set_expiry_month = split_expiry[0].trim();
        return this.set_expiry_month;
      }
    },
    expiry_year: function expiry_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        if (split_expiry.length > 1) {
          this.set_expiry_year = split_expiry[1].trim();
          return this.set_expiry_year;
        }
        return null;
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    $("#cardModalV2").on("shown.bs.modal", function () {
      _this.clear_form();
      _this.mount_card_js();
    });

    $("#cardProcessingModal").on("shown.bs.modal", function () {});

    $("#cardProcessingModal").on("hidden.bs.modal", function () {
      var ifr = window.top.$("#card_page");
      ifr.attr("src", "about:blank");
    });

    $("#cardModalV2").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
    this.has_pending_confirmation = this.$attrs["has_pending_confirmation"];
    if (this.has_pending_confirmation === 'true') {
      this.showVerificationModal = true;
      this.card_charged = true;
      this.confirm_error = null;
    } else {
      this.showVerificationModal = false;
      this.card_charged = false;
    }

    this.mpgs_url = this.$attrs["mpgs_api_url"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.bill_ref = this.$attrs["bill_ref"];
    this.service_id = this.$attrs["service_id"];
    this.msisdn = this.$attrs["msisdn"] ? this.$attrs["msisdn"] : this.$attrs["id_number"];
    this.email = this.$attrs["email"];
    this.signature = this.$attrs["signature"];
    this.signed_date_time = this.$attrs["signed_date_time"];
    this.signed_field_names = this.$attrs["signed_field_names"];
    this.unsigned_field_names = this.$attrs["unsigned_field_names"];
    this.profile_id = this.$attrs["profile_id"];
    this.access_key = this.$attrs["access_key"];
    this.session_id = this.$attrs["session_id"];
    this.gateway_id = this.$attrs["gid"];
    this.merchant_descriptor = this.$attrs["merchant_descriptor"];
    this.ip_address = this.$attrs["ip_address"];
    this.set_total_amount();
    this.calculate_card_charges();
    this.authentication_url = this.$attrs["authentication_url"];
    this.authorization_url = this.$attrs["authorization_url"];
    this.completion_url = this.$attrs["completion_url"];
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    get_card_no: function get_card_no() {
      if (this.CardNo) return this.CardNo.replaceAll(" ", "");
      return this.CardNo;
    },
    load_iframe: function load_iframe() {
      $("#cardModalV2 .close").click();
      $("#cardProcessingModal").modal("show");
    },
    mount_card_js: function mount_card_js() {
      $("#cardjswrapper").append('<div id="jswrapper" class="card-wrapper"></div>');

      this.setCard();
    },
    get_card_expiry: function get_card_expiry() {
      this.formatted_card_expiry_date = this.expiry_month + "-" + this.expiry_year;
      return this.formatted_card_expiry_date;
    },
    removeCardJsWrapper: function removeCardJsWrapper() {
      document.getElementById("jswrapper").style.display = 'none';
    },
    setCard: function setCard() {
      if (document.getElementById("frmCard")) {
        this.cardjswrapper = new Card({
          form: "#frmCard",
          container: ".card-wrapper",

          formSelectors: {
            numberInput: "input#CardNoCS",
            expiryInput: "input#expiryCS",
            cvcInput: "input#CVVCS",
            nameInput: "input#nameCS" },

          width: "350px",
          formatting: true,
          messages: {
            validDate: "Valid\nThru",
            monthYear: "month-year" },

          placeholders: {
            CardNo: "•••• •••• •••• ••••",
            name: "",
            expiry: ""
          },

          masks: {},

          debug: false });
      }
    },

    clear_form: function clear_form() {
      $("#frmCard").trigger("reset");
      this.CardNo = "";
      this.CVV = "";
      this.eMonth = "";
      this.sur_name = "";
      this.fore_name = "";
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";
      this.email_error = "";
      this.forename_error = "";
      this.surname_error = "";
      this.expiry = null;
      this.selected_card_type_is = null;
      this.email = "";
      this.submitting = this.loading = false;
    },
    set_paste_error: function set_paste_error() {
      this.uierrors.push("Paste not allowed for this field.");
      this.cardno_error = "Paste not allowed!";
    },
    check_validation: function check_validation(e) {
      this.set_month_and_year();
      this.get_card_expiry();
      this.set_card_type();
      this.checkForm(e);
    },
    set_total_amount: function set_total_amount() {
      this.total_amount = this.set_card_charges(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    set_card_type: function set_card_type() {
      if (this.cardjswrapper) {
        if (this.CardNo) {
          var type = this.cardjswrapper.cardType;
          if (type == "visa") this.selected_card_type_is = "001";
          if (type == "mastercard") this.selected_card_type_is = "002";
          if (type == "amex") this.selected_card_type_is = "003";
          if (type == "dankort") this.selected_card_type_is = "034";
          if (type == "hipercard") this.selected_card_type_is = "050";
          if (type == "dinersclub") this.selected_card_type_is = "005";
          if (type == "discover") this.selected_card_type_is = "004";
          if (type == "jcb") this.selected_card_type_is = "007";
          if (type == "maestro") this.selected_card_type_is = "042";
          if (type == "unionpay") this.selected_card_type_is = "062";
          if (type == "visaelectron") this.selected_card_type_is = "001";
          if (type == "elo") this.selected_card_type_is = "054";
          if (type == "aura") this.selected_card_type_is = "051";
          if (type == "uatp") this.selected_card_type_is = "040";
        } else {
          this.selected_card_type_is = null;
        }
      }
    },
    set_month_and_year: function set_month_and_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        if (split_expiry.length == 1) this.set_expiry_month = split_expiry[0].trim();
        if (split_expiry.length > 1) this.set_expiry_year = split_expiry[1].trim();
      }
    },

    calculate_card_charges: function calculate_card_charges() {
      var val = this.total_amount - (parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
      this.card_charges = val.toFixed(2);
    },
    set_card_charges: function set_card_charges(base_amount) {
      var a = base_amount * 0 / 100;
      var val = a + base_amount;
      return val.toFixed(2);
    },
    checkForm: function checkForm(e) {
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";
      this.email_error = "";
      this.surname_error = "";
      this.forename_error = "";

      if (!this.set_expiry_year || !this.expiry) {
        this.uierrors.push("Year is required");
        this.year_error = "Required*";
      }
      if (!this.set_expiry_month || !this.expiry) {
        this.uierrors.push("Month is required");
        this.month_error = "Required*";
      }
      if (!this.CardNo) {
        this.uierrors.push("Card Number is required");
        this.cardno_error = "Required*";
      }
      if (!this.CVV) {
        this.uierrors.push("CVV is required");
        this.cvv_error = "Required*";
      }
      if (!this.email) {
        this.uierrors.push("Email is required");
        this.email_error = "Required*";
      }
      if (!this.sur_name) {
        this.uierrors.push("Surname is required");
        this.surname_error = "Required*";
      }
      if (!this.fore_name) {
        this.uierrors.push("First name is required");
        this.forename_error = "Required*";
      }

      if (!this.uierrors.length) {
        return true;
      }

      e.preventDefault();
    },

    destroy: function destroy(e) {
      $("#cardProcessingModal").modal("hide");
    },

    setStates: function setStates() {
      this.bill_to_address_state = null;
      if (this.bill_to_address_country === "US") {
        this.states = [{
          value: "AL",
          name: "Alabama"
        }, { value: "AK", name: "Alaska" }, { value: "AZ", name: "Arizona" }, { value: "AR", name: "Arkansas" }, { value: "CA", name: "California" }, { value: "CO", name: "Colorado" }, { value: "CT", name: "Connecticut" }, { value: "DE", name: "Delaware" }, { value: "DC", name: "District Of Columbia" }, { value: "FL", name: "Florida" }, { value: "GA", name: "Georgia" }, { value: "HI", name: "Hawaii" }, { value: "ID", name: "Idaho" }, { value: "IL", name: "Illinois" }, { value: "IN", name: "Indiana" }, { value: "IA", name: "Iowa" }, { value: "KS", name: "Kansas" }, { value: "KY", name: "Kentucky" }, { value: "LA", name: "Louisiana" }, { value: "ME", name: "Maine" }, { value: "MD", name: "Maryland" }, { value: "MA", name: "Massachusetts" }, { value: "MI", name: "Michigan" }, { value: "MN", name: "Minnesota" }, { value: "MS", name: "Mississippi" }, { value: "MO", name: "Missouri" }, { value: "MT", name: "Montana" }, { value: "NE", name: "Nebraska" }, { value: "NV", name: "Nevada" }, { value: "NH", name: "New Hampshire" }, { value: "NJ", name: "New Jersey" }, { value: "NM", name: "New Mexico" }, { value: "NY", name: "New York" }, { value: "NC", name: "North Carolina" }, { value: "ND", name: "North Dakota" }, { value: "OH", name: "Ohio" }, { value: "OK", name: "Oklahoma" }, { value: "OR", name: "Oregon" }, { value: "PA", name: "Pennsylvania" }, { value: "RI", name: "Rhode Island" }, { value: "SC", name: "South Carolina" }, { value: "SD", name: "South Dakota" }, { value: "TN", name: "Tennessee" }, { value: "TX", name: "Texas" }, { value: "UT", name: "Utah" }, { value: "VT", name: "Vermont" }, { value: "VA", name: "Virginia" }, { value: "WA", name: "Washington" }, { value: "WV", name: "West Virginia" }, { value: "WI", name: "Wisconsin" }, { value: "WY", name: "Wyoming" }, { value: "AS", name: "American Samoa" }, { value: "GU", name: "Guam" }, { value: "MP", name: "Northern Mariana Islands" }, { value: "PR", name: "Puerto Rico" }, { value: "UM", name: "United States Minor Outlying Islands" }, { value: "VI", name: "Virgin Islands" }];
      }
      if (this.bill_to_address_country === "CA") {
        return [{ value: "AB", name: "Alberta" }, { value: "BC", name: "British Columbia" }, { value: "MB", name: "Manitoba" }, { value: "NB", name: "New Brunswick" }, { value: "NL", name: "Newfoundland and Labrador" }, { value: "NS", name: "Nova Scotia" }, { value: "NT", name: "Northwest Territories" }, { value: "NU", name: "Nunavut" }, { value: "ON", name: "Ontario" }, { value: "PE", name: "Prince Edward Island" }, { value: "QC", name: "Quebec" }, { value: "SK", name: "Saskatchewan" }, { value: "YT", name: "Yukon" }];
      }
    },
    verify_charged_code: function verify_charged_code() {
      var _this2 = this;

      this.loading = true;
      this.confirm_error = null;
      var payload = {
        card_no: this.CardNo,
        expiry_year: this.expiry_year,
        expiry_month: this.expiry_month,
        invoice_no: this.invoice_no,
        currency: this.currency,
        gateway_id: this.gateway_id,
        reference: this.charged_code,
        security_code: this.CVV,
        amount: this.total_amount,
        authorization_type: this.type,
        first_name: this.fore_name,
        last_name: this.sur_name,
        address: this.billing_address,
        locality: this.bill_to_address_city,
        administrative_area: this.bill_to_address_state,
        country_code: this.bill_to_address_country,
        email: this.email,
        msisdn: this.msisdn,
        tracking_no: this.trackingCode,
        postal_code: this.bill_to_address_postal_code,
        callback_url: this.callback_url,
        auth_info: this.auth_info,
        tracking_code: this.trackingCode
      };

      Vue.axios.post(this.completion_url, payload).then(function (response) {
        if (response && response.data.message) {
          _sweetalert2.default.fire({
            icon: "success",
            title: "Payment Confirmed",
            text: "Your payment has been received and is being processed...",
            timer: 3000
          }).then(function () {
            window.top.location.href = this.callback_url;
          });
        } else {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Error..",
            text: "An error occured. Please try again later.",
            timer: 3000
          });
        }
        _this2.verified_charged_code = response.data.verified_charged_code;
        _this2.loading = false;
        _this2.showVerificationModal = false;
      }).catch(function (error) {
        _this2.loading = false;
      }).then(function () {
        _this2.loading = false;
      });
    },
    check_payer_authentication: function check_payer_authentication() {
      var _this3 = this;

      this.loading = this.submitting = true;
      Vue.axios.post(this.authentication_url, {
        card_no: this.CardNo,
        expiry_year: this.expiry_year,
        expiry_month: this.expiry_month,
        invoice_no: this.invoice_no,
        currency: this.currency,
        gateway_id: this.gateway_id,
        amount: this.total_amount,
        CVV: this.CVV,
        first_name: this.fore_name,
        last_name: this.sur_name,
        address: this.billing_address,
        locality: this.bill_to_address_city,
        administrative_area: this.bill_to_address_state,
        country_code: this.bill_to_address_country,
        email: this.email,
        msisdn: this.msisdn,
        postal_code: this.bill_to_address_postal_code
      }).then(function (response) {
        _this3.authenticated = response.data.authenticated;

        if (_this3.authenticated == false && response.data.device_url) {
          _this3.referenceID = response.data.reference_id;
          _this3.origin = response.data.origin;
          _this3.accessToken = response.data.access_token;
          _this3.deviceDataCollectionUrl = response.data.device_url;
          _this3.returnUrl = response.data.return_url;
          _this3.trackingCode = response.data.tracking_no;
          _this3.step = "DeviceDataCollection";
          _this3.removeCardJsWrapper();
        } else if (_this3.authenticated == false && response.data.message) {
          _this3.showVerificationModal = true;
          _this3.confirm_error = response.data.message;
          _this3.removeCardJsWrapper();
        } else if (_this3.authenticated == false) {
          _this3.showVerificationModal = true;
          _this3.removeCardJsWrapper();
          _this3.loading = false;
        } else {
          _this3.mpgs_url = response.data.mpgs_url;
          _this3.CardNo = response.data.card_no;
          _this3.CVV = response.data.cvv;
          _this3.auto_submit_form();
          _this3.loading = false;
        }
      }).catch(function (error) {
        _this3.loading = false;
        _this3.submitting = false;
      }).then(function () {
        _this3.loading = false;
        _this3.submitting = false;
      });
    },
    onEnrollmentChecked: function onEnrollmentChecked(data) {
      var _this4 = this;

      this.loading = this.submitting = true;
      Vue.axios.post(this.enrollment_url, {
        card_no: this.CardNo,
        expiry_year: this.expiry_year,
        expiry_month: this.expiry_month,
        invoice_no: this.invoice_no,
        currency: this.currency,
        gateway_id: this.gateway_id,
        amount: this.total_amount,
        CVV: this.CVV,
        first_name: this.fore_name,
        last_name: this.sur_name,
        address: this.billing_address,
        locality: this.bill_to_address_city,
        administrative_area: this.bill_to_address_state,
        country_code: this.bill_to_address_country,
        email: this.email,
        msisdn: this.msisdn,
        postal_code: this.bill_to_address_postal_code,
        reference_id: this.referenceID,
        return_url: this.returnUrl,
        tracking_code: this.trackingCode
      }).then(function (response) {
        console.log("Enrollment Response", response.data);
        _this4.authenticated = response.data.authenticated;
        _this4.submitting = true;
        if (_this4.authenticated == false && response.data.stepup_url) {
          _this4.stepupURL = response.data.stepup_url;
          _this4.pareqToken = response.data.req_token;
          _this4.showVerificationModal = false;
          var trx_details = {
            card: {
              card_no: _this4.CardNo,
              expiry_year: _this4.expiry_year,
              expiry_month: _this4.expiry_month,
              CVV: _this4.CVV,
              first_name: _this4.fore_name,
              last_name: _this4.sur_name,
              address: _this4.billing_address,
              locality: _this4.bill_to_address_city,
              administrative_area: _this4.bill_to_address_state,
              country_code: _this4.bill_to_address_country,
              email: _this4.email,
              msisdn: _this4.msisdn,
              type: _this4.selected_card_type_is,
              postal_code: _this4.bill_to_address_postal_code
            },
            payment: {
              invoice_no: _this4.invoice_no,
              currency: _this4.currency,
              gateway_id: _this4.gateway_id,
              amount: _this4.total_amount,
              tracking_no: _this4.trackingCode,
              callback_url: _this4.callback_url
            }
          };
          _this4.trx_details = (0, _stringify2.default)(trx_details);
          _this4.step = "StepUp";
          _this4.removeCardJsWrapper();
        } else if (_this4.authenticated == false && response.data.message) {
          _this4.showVerificationModal = true;
          _this4.confirm_error = response.data.message;
          _this4.removeCardJsWrapper();
        } else if (_this4.authenticated == false && response.data.auth_info) {
          _this4.auth_info = response.data.auth_info;
          _this4.trackingCode = response.data.ref_no;
          _this4.showVerificationModal = true;
        } else if (_this4.authenticated == false) {
          _this4.showVerificationModal = true;
          _this4.mpgs_url = response.data.mpgs_url;
          _this4.removeCardJsWrapper();
        } else {
          _this4.mpgs_url = response.data.mpgs_url;
          _this4.CardNo = response.data.card_no;
          _this4.CVV = response.data.cvv;
          _this4.auto_submit_form();
        }
      }).catch(function (error) {
        _this4.loading = false;
        _this4.submitting = false;
      }).then(function () {
        _this4.loading = false;
        _this4.submitting = false;
      });
    },
    auto_submit_form: function auto_submit_form() {
      var form = document.getElementById("frmCard");
      form.setAttribute("method", "POST");
      form.setAttribute("action", this.mpgs_url);
      form.setAttribute("target", "card_page");
      this.load_iframe();
      form.submit();
    },

    stepupChecked: function stepupChecked(data) {
      console.log(data);
    },
    authorize_payment: function authorize_payment(type) {
      var _this5 = this;

      this.loading = true;
      this.confirm_error = null;
      var payload = {
        card_no: this.CardNo,
        expiry_year: this.expiry_year,
        expiry_month: this.expiry_month,
        invoice_no: this.invoice_no,
        currency: this.currency,
        gateway_id: this.gateway_id,
        amount: this.total_amount,
        first_name: this.fore_name,
        last_name: this.sur_name,
        address: this.billing_address,
        locality: this.bill_to_address_city,
        administrative_area: this.bill_to_address_state,
        country_code: this.bill_to_address_country,
        email: this.email,
        msisdn: this.msisdn,
        tracking_no: this.trackingCode,
        postal_code: this.bill_to_address_postal_code,
        callback_url: this.callback_url
      };

      Vue.axios.post(this.authorization_url, payload).then(function (response) {
        if (response.data && !response.data.authorized) {
          _this5.confirm_error = response.data.message;
        } else {
          _this5.card_charged = response.data.authorized;
          _this5.loading = false;
        }
      }).catch(function (error) {
        _this5.loading = false;
      }).then(function () {
        _this5.loading = false;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.step == 'DeviceDataCollection')?_c('div',[_c('CardinalCollection',{attrs:{"url":_vm.deviceDataCollectionUrl,"token":_vm.accessToken,"origin":_vm.origin},on:{"enrollmentChecked":_vm.onEnrollmentChecked}})],1):_vm._e(),_vm._v(" "),_c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"cardProcessingModal","aria-labelledby":"cardProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title"},[_vm._v("\n              Processing your payment, please wait...\n            ")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"},on:{"click":function($event){return _vm.window.location.reload()}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('complete-button',{ref:"timer",attrs:{"gateway":"cards","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url},on:{"click":_vm.destroy}}),_vm._v(" "),_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){_vm.destroyTimer(); _vm.window.location.reload();}}},[_vm._v("Cancel")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"cardModalV2","tabindex":"-1","role":"dialog","aria-labelledby":"cardModalV2Label","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(1),_vm._v(" "),(!_vm.showVerificationModal && _vm.step !== 'StepUp')?_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('form',{attrs:{"id":"frmCard"},on:{"submit":function($event){$event.preventDefault();return _vm.check_payer_authentication.apply(null, arguments)}}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Visa / MasterCard")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+"\n                        "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"col-12",attrs:{"id":"cardjswrapper"}}),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("First Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fore_name),expression:"fore_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"First name on card","required":""},domProps:{"value":(_vm.fore_name)},on:{"paste":function($event){$event.preventDefault();},"input":[function($event){if($event.target.composing){ return; }_vm.fore_name=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.forename_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.forename_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Last Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sur_name),expression:"sur_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Surname on card","required":""},domProps:{"value":(_vm.sur_name)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.sur_name=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.surname_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.surname_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_card_type_is),expression:"selected_card_type_is"}],staticClass:"form-control",attrs:{"id":"cardType","type":"hidden","name":"card_type","readonly":""},domProps:{"value":(_vm.selected_card_type_is)},on:{"input":function($event){if($event.target.composing){ return; }_vm.selected_card_type_is=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Card Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CardNo),expression:"CardNo"}],staticClass:"form-control",attrs:{"type":"text","id":"CardNoCS","placeholder":"1234 1234 1234 1234","required":""},domProps:{"value":(_vm.CardNo)},on:{"paste":function($event){$event.preventDefault();},"input":[function($event){if($event.target.composing){ return; }_vm.CardNo=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cardno_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.cardno_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Email")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"form-control",attrs:{"type":"email","name":"bill_to_email","placeholder":"johndoe@email.cc","required":""},domProps:{"value":(_vm.email)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.email=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.email_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.email_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_card_type_is),expression:"selected_card_type_is"}],staticClass:"form-control",attrs:{"id":"cardType","type":"hidden","name":"card_type","readonly":""},domProps:{"value":(_vm.selected_card_type_is)},on:{"input":function($event){if($event.target.composing){ return; }_vm.selected_card_type_is=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Country")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.bill_to_address_country),expression:"bill_to_address_country"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.bill_to_address_country=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},function($event){return _vm.setStates()}]}},[_c('option',{attrs:{"value":""}},[_vm._v("Select Country")]),_vm._v(" "),_c('option',{attrs:{"value":"AF"}},[_vm._v("Afghanistan")]),_vm._v(" "),_c('option',{attrs:{"value":"AX"}},[_vm._v("Åland Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"AL"}},[_vm._v("Albania")]),_vm._v(" "),_c('option',{attrs:{"value":"DZ"}},[_vm._v("Algeria")]),_vm._v(" "),_c('option',{attrs:{"value":"AS"}},[_vm._v("American Samoa")]),_vm._v(" "),_c('option',{attrs:{"value":"AD"}},[_vm._v("Andorra")]),_vm._v(" "),_c('option',{attrs:{"value":"AO"}},[_vm._v("Angola")]),_vm._v(" "),_c('option',{attrs:{"value":"AI"}},[_vm._v("Anguilla")]),_vm._v(" "),_c('option',{attrs:{"value":"AQ"}},[_vm._v("Antarctica")]),_vm._v(" "),_c('option',{attrs:{"value":"AG"}},[_vm._v("Antigua and Barbuda")]),_vm._v(" "),_c('option',{attrs:{"value":"AR"}},[_vm._v("Argentina")]),_vm._v(" "),_c('option',{attrs:{"value":"AM"}},[_vm._v("Armenia")]),_vm._v(" "),_c('option',{attrs:{"value":"AW"}},[_vm._v("Aruba")]),_vm._v(" "),_c('option',{attrs:{"value":"AU"}},[_vm._v("Australia")]),_vm._v(" "),_c('option',{attrs:{"value":"AT"}},[_vm._v("Austria")]),_vm._v(" "),_c('option',{attrs:{"value":"AZ"}},[_vm._v("Azerbaijan")]),_vm._v(" "),_c('option',{attrs:{"value":"BS"}},[_vm._v("Bahamas")]),_vm._v(" "),_c('option',{attrs:{"value":"BH"}},[_vm._v("Bahrain")]),_vm._v(" "),_c('option',{attrs:{"value":"BD"}},[_vm._v("Bangladesh")]),_vm._v(" "),_c('option',{attrs:{"value":"BB"}},[_vm._v("Barbados")]),_vm._v(" "),_c('option',{attrs:{"value":"BY"}},[_vm._v("Belarus")]),_vm._v(" "),_c('option',{attrs:{"value":"BE"}},[_vm._v("Belgium")]),_vm._v(" "),_c('option',{attrs:{"value":"BZ"}},[_vm._v("Belize")]),_vm._v(" "),_c('option',{attrs:{"value":"BJ"}},[_vm._v("Benin")]),_vm._v(" "),_c('option',{attrs:{"value":"BM"}},[_vm._v("Bermuda")]),_vm._v(" "),_c('option',{attrs:{"value":"BT"}},[_vm._v("Bhutan")]),_vm._v(" "),_c('option',{attrs:{"value":"BO"}},[_vm._v("\n                              Bolivia, Plurinational State of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"BQ"}},[_vm._v("\n                              Bonaire, Sint Eustatius and Saba\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"BA"}},[_vm._v("Bosnia and Herzegovina")]),_vm._v(" "),_c('option',{attrs:{"value":"BW"}},[_vm._v("Botswana")]),_vm._v(" "),_c('option',{attrs:{"value":"BV"}},[_vm._v("Bouvet Island")]),_vm._v(" "),_c('option',{attrs:{"value":"BR"}},[_vm._v("Brazil")]),_vm._v(" "),_c('option',{attrs:{"value":"IO"}},[_vm._v("\n                              British Indian Ocean Territory\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"BN"}},[_vm._v("Brunei Darussalam")]),_vm._v(" "),_c('option',{attrs:{"value":"BG"}},[_vm._v("Bulgaria")]),_vm._v(" "),_c('option',{attrs:{"value":"BF"}},[_vm._v("Burkina Faso")]),_vm._v(" "),_c('option',{attrs:{"value":"BI"}},[_vm._v("Burundi")]),_vm._v(" "),_c('option',{attrs:{"value":"KH"}},[_vm._v("Cambodia")]),_vm._v(" "),_c('option',{attrs:{"value":"CM"}},[_vm._v("Cameroon")]),_vm._v(" "),_c('option',{attrs:{"value":"CA"}},[_vm._v("Canada")]),_vm._v(" "),_c('option',{attrs:{"value":"CV"}},[_vm._v("Cape Verde")]),_vm._v(" "),_c('option',{attrs:{"value":"KY"}},[_vm._v("Cayman Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"CF"}},[_vm._v("\n                              Central African Republic\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"TD"}},[_vm._v("Chad")]),_vm._v(" "),_c('option',{attrs:{"value":"CL"}},[_vm._v("Chile")]),_vm._v(" "),_c('option',{attrs:{"value":"CN"}},[_vm._v("China")]),_vm._v(" "),_c('option',{attrs:{"value":"CX"}},[_vm._v("Christmas Island")]),_vm._v(" "),_c('option',{attrs:{"value":"CC"}},[_vm._v("\n                              Cocos (Keeling) Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"CO"}},[_vm._v("Colombia")]),_vm._v(" "),_c('option',{attrs:{"value":"KM"}},[_vm._v("Comoros")]),_vm._v(" "),_c('option',{attrs:{"value":"CG"}},[_vm._v("Congo")]),_vm._v(" "),_c('option',{attrs:{"value":"CD"}},[_vm._v("\n                              Congo, the Democratic Republic of the\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"CK"}},[_vm._v("Cook Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"CR"}},[_vm._v("Costa Rica")]),_vm._v(" "),_c('option',{attrs:{"value":"CI"}},[_vm._v("Côte d'Ivoire")]),_vm._v(" "),_c('option',{attrs:{"value":"HR"}},[_vm._v("Croatia")]),_vm._v(" "),_c('option',{attrs:{"value":"CU"}},[_vm._v("Cuba")]),_vm._v(" "),_c('option',{attrs:{"value":"CW"}},[_vm._v("Curaçao")]),_vm._v(" "),_c('option',{attrs:{"value":"CY"}},[_vm._v("Cyprus")]),_vm._v(" "),_c('option',{attrs:{"value":"CZ"}},[_vm._v("Czech Republic")]),_vm._v(" "),_c('option',{attrs:{"value":"DK"}},[_vm._v("Denmark")]),_vm._v(" "),_c('option',{attrs:{"value":"DJ"}},[_vm._v("Djibouti")]),_vm._v(" "),_c('option',{attrs:{"value":"DM"}},[_vm._v("Dominica")]),_vm._v(" "),_c('option',{attrs:{"value":"DO"}},[_vm._v("Dominican Republic")]),_vm._v(" "),_c('option',{attrs:{"value":"EC"}},[_vm._v("Ecuador")]),_vm._v(" "),_c('option',{attrs:{"value":"EG"}},[_vm._v("Egypt")]),_vm._v(" "),_c('option',{attrs:{"value":"SV"}},[_vm._v("El Salvador")]),_vm._v(" "),_c('option',{attrs:{"value":"GQ"}},[_vm._v("Equatorial Guinea")]),_vm._v(" "),_c('option',{attrs:{"value":"ER"}},[_vm._v("Eritrea")]),_vm._v(" "),_c('option',{attrs:{"value":"EE"}},[_vm._v("Estonia")]),_vm._v(" "),_c('option',{attrs:{"value":"ET"}},[_vm._v("Ethiopia")]),_vm._v(" "),_c('option',{attrs:{"value":"FK"}},[_vm._v("\n                              Falkland Islands (Malvinas)\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"FO"}},[_vm._v("Faroe Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"FJ"}},[_vm._v("Fiji")]),_vm._v(" "),_c('option',{attrs:{"value":"FI"}},[_vm._v("Finland")]),_vm._v(" "),_c('option',{attrs:{"value":"FR"}},[_vm._v("France")]),_vm._v(" "),_c('option',{attrs:{"value":"GF"}},[_vm._v("French Guiana")]),_vm._v(" "),_c('option',{attrs:{"value":"PF"}},[_vm._v("French Polynesia")]),_vm._v(" "),_c('option',{attrs:{"value":"TF"}},[_vm._v("\n                              French Southern Territories\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"GA"}},[_vm._v("Gabon")]),_vm._v(" "),_c('option',{attrs:{"value":"GM"}},[_vm._v("Gambia")]),_vm._v(" "),_c('option',{attrs:{"value":"GE"}},[_vm._v("Georgia")]),_vm._v(" "),_c('option',{attrs:{"value":"DE"}},[_vm._v("Germany")]),_vm._v(" "),_c('option',{attrs:{"value":"GH"}},[_vm._v("Ghana")]),_vm._v(" "),_c('option',{attrs:{"value":"GI"}},[_vm._v("Gibraltar")]),_vm._v(" "),_c('option',{attrs:{"value":"GR"}},[_vm._v("Greece")]),_vm._v(" "),_c('option',{attrs:{"value":"GL"}},[_vm._v("Greenland")]),_vm._v(" "),_c('option',{attrs:{"value":"GD"}},[_vm._v("Grenada")]),_vm._v(" "),_c('option',{attrs:{"value":"GP"}},[_vm._v("Guadeloupe")]),_vm._v(" "),_c('option',{attrs:{"value":"GU"}},[_vm._v("Guam")]),_vm._v(" "),_c('option',{attrs:{"value":"GT"}},[_vm._v("Guatemala")]),_vm._v(" "),_c('option',{attrs:{"value":"GG"}},[_vm._v("Guernsey")]),_vm._v(" "),_c('option',{attrs:{"value":"GN"}},[_vm._v("Guinea")]),_vm._v(" "),_c('option',{attrs:{"value":"GW"}},[_vm._v("Guinea-Bissau")]),_vm._v(" "),_c('option',{attrs:{"value":"GY"}},[_vm._v("Guyana")]),_vm._v(" "),_c('option',{attrs:{"value":"HT"}},[_vm._v("Haiti")]),_vm._v(" "),_c('option',{attrs:{"value":"HM"}},[_vm._v("\n                              Heard Island and McDonald Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"VA"}},[_vm._v("\n                              Holy See (Vatican City State)\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"HN"}},[_vm._v("Honduras")]),_vm._v(" "),_c('option',{attrs:{"value":"HK"}},[_vm._v("Hong Kong")]),_vm._v(" "),_c('option',{attrs:{"value":"HU"}},[_vm._v("Hungary")]),_vm._v(" "),_c('option',{attrs:{"value":"IS"}},[_vm._v("Iceland")]),_vm._v(" "),_c('option',{attrs:{"value":"IN"}},[_vm._v("India")]),_vm._v(" "),_c('option',{attrs:{"value":"ID"}},[_vm._v("Indonesia")]),_vm._v(" "),_c('option',{attrs:{"value":"IR"}},[_vm._v("\n                              Iran, Islamic Republic of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"IQ"}},[_vm._v("Iraq")]),_vm._v(" "),_c('option',{attrs:{"value":"IE"}},[_vm._v("Ireland")]),_vm._v(" "),_c('option',{attrs:{"value":"IM"}},[_vm._v("Isle of Man")]),_vm._v(" "),_c('option',{attrs:{"value":"IL"}},[_vm._v("Israel")]),_vm._v(" "),_c('option',{attrs:{"value":"IT"}},[_vm._v("Italy")]),_vm._v(" "),_c('option',{attrs:{"value":"JM"}},[_vm._v("Jamaica")]),_vm._v(" "),_c('option',{attrs:{"value":"JP"}},[_vm._v("Japan")]),_vm._v(" "),_c('option',{attrs:{"value":"JE"}},[_vm._v("Jersey")]),_vm._v(" "),_c('option',{attrs:{"value":"JO"}},[_vm._v("Jordan")]),_vm._v(" "),_c('option',{attrs:{"value":"KZ"}},[_vm._v("Kazakhstan")]),_vm._v(" "),_c('option',{attrs:{"value":"KE"}},[_vm._v("Kenya")]),_vm._v(" "),_c('option',{attrs:{"value":"KI"}},[_vm._v("Kiribati")]),_vm._v(" "),_c('option',{attrs:{"value":"KP"}},[_vm._v("\n                              Korea, Democratic People's Republic of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"KR"}},[_vm._v("Korea, Republic of")]),_vm._v(" "),_c('option',{attrs:{"value":"KW"}},[_vm._v("Kuwait")]),_vm._v(" "),_c('option',{attrs:{"value":"KG"}},[_vm._v("Kyrgyzstan")]),_vm._v(" "),_c('option',{attrs:{"value":"LA"}},[_vm._v("\n                              Lao People's Democratic Republic\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"LV"}},[_vm._v("Latvia")]),_vm._v(" "),_c('option',{attrs:{"value":"LB"}},[_vm._v("Lebanon")]),_vm._v(" "),_c('option',{attrs:{"value":"LS"}},[_vm._v("Lesotho")]),_vm._v(" "),_c('option',{attrs:{"value":"LR"}},[_vm._v("Liberia")]),_vm._v(" "),_c('option',{attrs:{"value":"LY"}},[_vm._v("Libya")]),_vm._v(" "),_c('option',{attrs:{"value":"LI"}},[_vm._v("Liechtenstein")]),_vm._v(" "),_c('option',{attrs:{"value":"LT"}},[_vm._v("Lithuania")]),_vm._v(" "),_c('option',{attrs:{"value":"LU"}},[_vm._v("Luxembourg")]),_vm._v(" "),_c('option',{attrs:{"value":"MO"}},[_vm._v("Macao")]),_vm._v(" "),_c('option',{attrs:{"value":"MK"}},[_vm._v("\n                              Macedonia, the former Yugoslav Republic of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"MG"}},[_vm._v("Madagascar")]),_vm._v(" "),_c('option',{attrs:{"value":"MW"}},[_vm._v("Malawi")]),_vm._v(" "),_c('option',{attrs:{"value":"MY"}},[_vm._v("Malaysia")]),_vm._v(" "),_c('option',{attrs:{"value":"MV"}},[_vm._v("Maldives")]),_vm._v(" "),_c('option',{attrs:{"value":"ML"}},[_vm._v("Mali")]),_vm._v(" "),_c('option',{attrs:{"value":"MT"}},[_vm._v("Malta")]),_vm._v(" "),_c('option',{attrs:{"value":"MH"}},[_vm._v("Marshall Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"MQ"}},[_vm._v("Martinique")]),_vm._v(" "),_c('option',{attrs:{"value":"MR"}},[_vm._v("Mauritania")]),_vm._v(" "),_c('option',{attrs:{"value":"MU"}},[_vm._v("Mauritius")]),_vm._v(" "),_c('option',{attrs:{"value":"YT"}},[_vm._v("Mayotte")]),_vm._v(" "),_c('option',{attrs:{"value":"MX"}},[_vm._v("Mexico")]),_vm._v(" "),_c('option',{attrs:{"value":"FM"}},[_vm._v("\n                              Micronesia, Federated States of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"MD"}},[_vm._v("Moldova, Republic of")]),_vm._v(" "),_c('option',{attrs:{"value":"MC"}},[_vm._v("Monaco")]),_vm._v(" "),_c('option',{attrs:{"value":"MN"}},[_vm._v("Mongolia")]),_vm._v(" "),_c('option',{attrs:{"value":"ME"}},[_vm._v("Montenegro")]),_vm._v(" "),_c('option',{attrs:{"value":"MS"}},[_vm._v("Montserrat")]),_vm._v(" "),_c('option',{attrs:{"value":"MA"}},[_vm._v("Morocco")]),_vm._v(" "),_c('option',{attrs:{"value":"MZ"}},[_vm._v("Mozambique")]),_vm._v(" "),_c('option',{attrs:{"value":"MM"}},[_vm._v("Myanmar")]),_vm._v(" "),_c('option',{attrs:{"value":"NA"}},[_vm._v("Namibia")]),_vm._v(" "),_c('option',{attrs:{"value":"NR"}},[_vm._v("Nauru")]),_vm._v(" "),_c('option',{attrs:{"value":"NP"}},[_vm._v("Nepal")]),_vm._v(" "),_c('option',{attrs:{"value":"NL"}},[_vm._v("Netherlands")]),_vm._v(" "),_c('option',{attrs:{"value":"NC"}},[_vm._v("New Caledonia")]),_vm._v(" "),_c('option',{attrs:{"value":"NZ"}},[_vm._v("New Zealand")]),_vm._v(" "),_c('option',{attrs:{"value":"NI"}},[_vm._v("Nicaragua")]),_vm._v(" "),_c('option',{attrs:{"value":"NE"}},[_vm._v("Niger")]),_vm._v(" "),_c('option',{attrs:{"value":"NG"}},[_vm._v("Nigeria")]),_vm._v(" "),_c('option',{attrs:{"value":"NU"}},[_vm._v("Niue")]),_vm._v(" "),_c('option',{attrs:{"value":"NF"}},[_vm._v("Norfolk Island")]),_vm._v(" "),_c('option',{attrs:{"value":"MP"}},[_vm._v("\n                              Northern Mariana Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"NO"}},[_vm._v("Norway")]),_vm._v(" "),_c('option',{attrs:{"value":"OM"}},[_vm._v("Oman")]),_vm._v(" "),_c('option',{attrs:{"value":"PK"}},[_vm._v("Pakistan")]),_vm._v(" "),_c('option',{attrs:{"value":"PW"}},[_vm._v("Palau")]),_vm._v(" "),_c('option',{attrs:{"value":"PS"}},[_vm._v("\n                              Palestinian Territory, Occupied\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"PA"}},[_vm._v("Panama")]),_vm._v(" "),_c('option',{attrs:{"value":"PG"}},[_vm._v("Papua New Guinea")]),_vm._v(" "),_c('option',{attrs:{"value":"PY"}},[_vm._v("Paraguay")]),_vm._v(" "),_c('option',{attrs:{"value":"PE"}},[_vm._v("Peru")]),_vm._v(" "),_c('option',{attrs:{"value":"PH"}},[_vm._v("Philippines")]),_vm._v(" "),_c('option',{attrs:{"value":"PN"}},[_vm._v("Pitcairn")]),_vm._v(" "),_c('option',{attrs:{"value":"PL"}},[_vm._v("Poland")]),_vm._v(" "),_c('option',{attrs:{"value":"PT"}},[_vm._v("Portugal")]),_vm._v(" "),_c('option',{attrs:{"value":"PR"}},[_vm._v("Puerto Rico")]),_vm._v(" "),_c('option',{attrs:{"value":"QA"}},[_vm._v("Qatar")]),_vm._v(" "),_c('option',{attrs:{"value":"RE"}},[_vm._v("Réunion")]),_vm._v(" "),_c('option',{attrs:{"value":"RO"}},[_vm._v("Romania")]),_vm._v(" "),_c('option',{attrs:{"value":"RU"}},[_vm._v("Russian Federation")]),_vm._v(" "),_c('option',{attrs:{"value":"RW"}},[_vm._v("Rwanda")]),_vm._v(" "),_c('option',{attrs:{"value":"BL"}},[_vm._v("Saint Barthélemy")]),_vm._v(" "),_c('option',{attrs:{"value":"SH"}},[_vm._v("\n                              Saint Helena, Ascension and Tristan da Cunha\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"KN"}},[_vm._v("Saint Kitts and Nevis")]),_vm._v(" "),_c('option',{attrs:{"value":"LC"}},[_vm._v("Saint Lucia")]),_vm._v(" "),_c('option',{attrs:{"value":"MF"}},[_vm._v("\n                              Saint Martin (French part)\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"PM"}},[_vm._v("\n                              Saint Pierre and Miquelon\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"VC"}},[_vm._v("\n                              Saint Vincent and the Grenadines\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"WS"}},[_vm._v("Samoa")]),_vm._v(" "),_c('option',{attrs:{"value":"SM"}},[_vm._v("San Marino")]),_vm._v(" "),_c('option',{attrs:{"value":"ST"}},[_vm._v("Sao Tome and Principe")]),_vm._v(" "),_c('option',{attrs:{"value":"SA"}},[_vm._v("Saudi Arabia")]),_vm._v(" "),_c('option',{attrs:{"value":"SN"}},[_vm._v("Senegal")]),_vm._v(" "),_c('option',{attrs:{"value":"RS"}},[_vm._v("Serbia")]),_vm._v(" "),_c('option',{attrs:{"value":"SC"}},[_vm._v("Seychelles")]),_vm._v(" "),_c('option',{attrs:{"value":"SL"}},[_vm._v("Sierra Leone")]),_vm._v(" "),_c('option',{attrs:{"value":"SG"}},[_vm._v("Singapore")]),_vm._v(" "),_c('option',{attrs:{"value":"SX"}},[_vm._v("\n                              Sint Maarten (Dutch part)\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"SK"}},[_vm._v("Slovakia")]),_vm._v(" "),_c('option',{attrs:{"value":"SI"}},[_vm._v("Slovenia")]),_vm._v(" "),_c('option',{attrs:{"value":"SB"}},[_vm._v("Solomon Islands")]),_vm._v(" "),_c('option',{attrs:{"value":"SO"}},[_vm._v("Somalia")]),_vm._v(" "),_c('option',{attrs:{"value":"ZA"}},[_vm._v("South Africa")]),_vm._v(" "),_c('option',{attrs:{"value":"GS"}},[_vm._v("\n                              South Georgia and the South Sandwich Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"SS"}},[_vm._v("South Sudan")]),_vm._v(" "),_c('option',{attrs:{"value":"ES"}},[_vm._v("Spain")]),_vm._v(" "),_c('option',{attrs:{"value":"LK"}},[_vm._v("Sri Lanka")]),_vm._v(" "),_c('option',{attrs:{"value":"SD"}},[_vm._v("Sudan")]),_vm._v(" "),_c('option',{attrs:{"value":"SR"}},[_vm._v("Suriname")]),_vm._v(" "),_c('option',{attrs:{"value":"SJ"}},[_vm._v("Svalbard and Jan Mayen")]),_vm._v(" "),_c('option',{attrs:{"value":"SZ"}},[_vm._v("Swaziland")]),_vm._v(" "),_c('option',{attrs:{"value":"SE"}},[_vm._v("Sweden")]),_vm._v(" "),_c('option',{attrs:{"value":"CH"}},[_vm._v("Switzerland")]),_vm._v(" "),_c('option',{attrs:{"value":"SY"}},[_vm._v("Syrian Arab Republic")]),_vm._v(" "),_c('option',{attrs:{"value":"TW"}},[_vm._v("\n                              Taiwan, Province of China\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"TJ"}},[_vm._v("Tajikistan")]),_vm._v(" "),_c('option',{attrs:{"value":"TZ"}},[_vm._v("\n                              Tanzania, United Republic of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"TH"}},[_vm._v("Thailand")]),_vm._v(" "),_c('option',{attrs:{"value":"TL"}},[_vm._v("Timor-Leste")]),_vm._v(" "),_c('option',{attrs:{"value":"TG"}},[_vm._v("Togo")]),_vm._v(" "),_c('option',{attrs:{"value":"TK"}},[_vm._v("Tokelau")]),_vm._v(" "),_c('option',{attrs:{"value":"TO"}},[_vm._v("Tonga")]),_vm._v(" "),_c('option',{attrs:{"value":"TT"}},[_vm._v("Trinidad and Tobago")]),_vm._v(" "),_c('option',{attrs:{"value":"TN"}},[_vm._v("Tunisia")]),_vm._v(" "),_c('option',{attrs:{"value":"TR"}},[_vm._v("Turkey")]),_vm._v(" "),_c('option',{attrs:{"value":"TM"}},[_vm._v("Turkmenistan")]),_vm._v(" "),_c('option',{attrs:{"value":"TC"}},[_vm._v("\n                              Turks and Caicos Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"TV"}},[_vm._v("Tuvalu")]),_vm._v(" "),_c('option',{attrs:{"value":"UG"}},[_vm._v("Uganda")]),_vm._v(" "),_c('option',{attrs:{"value":"UA"}},[_vm._v("Ukraine")]),_vm._v(" "),_c('option',{attrs:{"value":"AE"}},[_vm._v("United Arab Emirates")]),_vm._v(" "),_c('option',{attrs:{"value":"GB"}},[_vm._v("United Kingdom")]),_vm._v(" "),_c('option',{attrs:{"value":"US"}},[_vm._v("United States")]),_vm._v(" "),_c('option',{attrs:{"value":"UM"}},[_vm._v("\n                              United States Minor Outlying Islands\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"UY"}},[_vm._v("Uruguay")]),_vm._v(" "),_c('option',{attrs:{"value":"UZ"}},[_vm._v("Uzbekistan")]),_vm._v(" "),_c('option',{attrs:{"value":"VU"}},[_vm._v("Vanuatu")]),_vm._v(" "),_c('option',{attrs:{"value":"VE"}},[_vm._v("\n                              Venezuela, Bolivarian Republic of\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"VN"}},[_vm._v("Viet Nam")]),_vm._v(" "),_c('option',{attrs:{"value":"VG"}},[_vm._v("\n                              Virgin Islands, British\n                            ")]),_vm._v(" "),_c('option',{attrs:{"value":"VI"}},[_vm._v("Virgin Islands, U.S.")]),_vm._v(" "),_c('option',{attrs:{"value":"WF"}},[_vm._v("Wallis and Futuna")]),_vm._v(" "),_c('option',{attrs:{"value":"EH"}},[_vm._v("Western Sahara")]),_vm._v(" "),_c('option',{attrs:{"value":"YE"}},[_vm._v("Yemen")]),_vm._v(" "),_c('option',{attrs:{"value":"ZM"}},[_vm._v("Zambia")]),_vm._v(" "),_c('option',{attrs:{"value":"ZW"}},[_vm._v("Zimbabwe")])])]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("State")]),_vm._v(" "),(_vm.bill_to_address_country.includes('US', 'CA'))?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.bill_to_address_state),expression:"bill_to_address_state"}],staticClass:"form-control",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.bill_to_address_state=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.states),function(state,index){return _c('option',{key:index},[_vm._v("\n                              "+_vm._s(state.name)+"\n                            ")])}),0):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bill_to_address_state),expression:"bill_to_address_state"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"State /Region","required":""},domProps:{"value":(_vm.bill_to_address_state)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.bill_to_address_state=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.email_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.email_error)+"\n                          ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("City")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bill_to_address_city),expression:"bill_to_address_city"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Some City","required":""},domProps:{"value":(_vm.bill_to_address_city)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.bill_to_address_city=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.email_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.email_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Postal Code")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bill_to_address_postal_code),expression:"bill_to_address_postal_code"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Postal Code","required":""},domProps:{"value":(_vm.bill_to_address_postal_code)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.bill_to_address_postal_code=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.email_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.email_error)+"\n                          ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Valid Through")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.expiry),expression:"expiry"}],staticClass:"form-control",attrs:{"placeholder":"MM/YYYY","id":"expiryCS","type":"tel","maxlength":"9","required":""},domProps:{"value":(_vm.expiry)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.expiry=$event.target.value},_vm.check_validation]}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.set_expiry_month),expression:"set_expiry_month"}],attrs:{"type":"hidden"},domProps:{"value":(_vm.set_expiry_month)},on:{"input":function($event){if($event.target.composing){ return; }_vm.set_expiry_month=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.set_expiry_year),expression:"set_expiry_year"}],attrs:{"type":"hidden"},domProps:{"value":(_vm.set_expiry_year)},on:{"input":function($event){if($event.target.composing){ return; }_vm.set_expiry_year=$event.target.value}}}),_vm._v(" "),(_vm.year_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.year_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Card Code (CVC)")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CVV),expression:"CVV"}],staticClass:"key form-control",attrs:{"type":"text","id":"CVVCS","placeholder":"CVC","required":""},domProps:{"value":(_vm.CVV)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.CVV=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cvv_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.cvv_error)+"\n                          ")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){return _vm.window.location.reload()}}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.can_pay)?_c('input',{staticClass:"btn btn-primary not-allowed",attrs:{"type":"submit","value":"Pay","disabled":""}}):_vm._e(),_vm._v(" "),(!_vm.submitting && _vm.can_pay)?_c('input',{staticClass:"btn btn-primary",attrs:{"type":"submit","value":"Pay","data-toggle":"modal","data-target":".cardProcessingModal"}}):_vm._e(),_vm._v(" "),(_vm.submitting)?_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","disabled":""}},[_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v(" "),_c('span',{staticClass:"visually-hidden"},[_vm._v("Please wait...")])]):_vm._e()])]),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"amount"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_cvn"},domProps:{"value":_vm.CVV}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_number"},domProps:{"value":_vm.get_card_no()}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_expiry_date"},domProps:{"value":_vm.formatted_card_expiry_date}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"profile_id","name":"profile_id"},domProps:{"value":_vm.profile_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"access_key","name":"access_key"},domProps:{"value":_vm.access_key}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"transaction_uuid","name":"transaction_uuid"},domProps:{"value":_vm.bill_ref}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"signed_date_time","name":"signed_date_time"},domProps:{"value":_vm.signed_date_time}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"signed_field_names","name":"signed_field_names"},domProps:{"value":_vm.signed_field_names}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"unsigned_field_names","name":"unsigned_field_names"},domProps:{"value":_vm.unsigned_field_names}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"payment_method","name":"payment_method","value":"card"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"transaction_type","name":"transaction_type","value":"sale"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"reference_number","name":"reference_number"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"auth_trans_ref_no","name":"auth_trans_ref_no"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"amount","name":"amount"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"currency","name":"currency"},domProps:{"value":_vm.currency}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"locale","name":"locale","value":"en-us"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_descriptor","name":"merchant_descriptor"},domProps:{"value":_vm.merchant_descriptor}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_forename","name":"bill_to_forename"},domProps:{"value":_vm.fore_name}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_surname","name":"bill_to_surname"},domProps:{"value":_vm.sur_name}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_phone","name":"bill_to_phone"},domProps:{"value":_vm.msisdn}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_line1","name":"bill_to_address_line1"},domProps:{"value":_vm.billing_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_line2","name":"bill_to_address_line2"},domProps:{"value":_vm.billing_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_city","name":"bill_to_address_city"},domProps:{"value":_vm.bill_to_address_city}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_state","name":"bill_to_address_state"},domProps:{"value":_vm.bill_to_address_state}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_country","name":"bill_to_address_country"},domProps:{"value":_vm.bill_to_address_country}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_postal_code","name":"bill_to_address_postal_code"},domProps:{"value":_vm.bill_to_address_postal_code}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"override_custom_receipt_page","name":"override_custom_receipt_page"},domProps:{"value":_vm.notification_url}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"device_fingerprint_id","name":"device_fingerprint_id"},domProps:{"value":_vm.session_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"customer_ip_address","name":"customer_ip_address"},domProps:{"value":_vm.ip_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"line_item_count","name":"line_item_count","value":"1"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_sku","name":"item_0_sku"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_code","name":"item_0_code"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_name","name":"item_0_name"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_quantity","name":"item_0_quantity","value":"1"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_unit_price","name":"item_0_unit_price"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data1","name":"merchant_defined_data1"},domProps:{"value":_vm.callback_url}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data2","name":"merchant_defined_data2","value":"MDD#2"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data3","name":"merchant_defined_data3","value":"MDD#3"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data4","name":"merchant_defined_data4"},domProps:{"value":_vm.gateway_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"signature"},domProps:{"value":_vm.signature}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"invoiceNumber"},domProps:{"value":_vm.invoice_no}})])])])])]):_vm._e(),_vm._v(" "),(_vm.showVerificationModal)?_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('form',{attrs:{"id":"frmCard2"},on:{"submit":function($event){$event.preventDefault();return _vm.check_payer_authentication.apply(null, arguments)}}},[_c('div',{staticClass:"card mt-3"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"card-header d-flex justify-content-between",staticStyle:{"margin-top":"15px"}},[(!_vm.has_pending_confirmation)?_c('p',{staticClass:"mb-0"},[_vm._v("\n                          Dear Customer, Your card has been flagged for further verification. \n                          We have debited your account with USD $1. Kindly Enter the RRN(Retrieval Reference Number) Code for the debited transaction in order to proceed. The RRN Code can be found in your account statements or you may contact your Bank to help.\n                        ")]):_vm._e(),_vm._v(" "),(_vm.has_pending_confirmation && _vm.confirm_error == null)?_c('p',{staticClass:"mb-0"},[_vm._v("\n                         To Proceed Enter RRN(Retrievel Reference Number) for the Verification Transaction Charged to your card.\n                        ")]):_vm._e(),_vm._v(" "),(_vm.confirm_error)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                          "+_vm._s(_vm.confirm_error)+"\n                        ")]):_vm._e()]),_vm._v(" "),(_vm.card_charged)?_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('label',[_vm._v("Verify Code")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.charged_code),expression:"charged_code"}],staticClass:"form-control",staticStyle:{"text-transform":"uppercase"},attrs:{"type":"text","name":"confirm_amount","placeholder":"e.g R0TG","required":""},domProps:{"value":(_vm.charged_code)},on:{"input":function($event){if($event.target.composing){ return; }_vm.charged_code=$event.target.value}}}),_vm._v(" "),(_vm.confirm_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                          "+_vm._s(_vm.confirm_error)+"\n                        ")]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.loading && !_vm.card_charged)?_c('input',{staticClass:"btn btn-primary",attrs:{"disabled":_vm.card_charged || _vm.confirm_error != null,"type":"button","value":"Accept"},on:{"click":function($event){return _vm.authorize_payment('partial')}}}):_vm._e(),_vm._v(" "),(!_vm.loading && _vm.card_charged)?_c('input',{staticClass:"btn btn-primary",attrs:{"disabled":_vm.charged_code_available,"type":"submit","data-toggle":"modal","value":"Verify","data-target":".cardProcessingModal"},on:{"click":function($event){return _vm.verify_charged_code()}}}):_vm._e(),_vm._v(" "),(_vm.loading)?_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","disabled":""}},[_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v(" "),_c('span',{staticClass:"visually-hidden"},[_vm._v("Please wait...")])]):_vm._e()])])])])])])]):_vm._e(),_vm._v(" "),(_vm.step == 'StepUp')?_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('StepupForm',{attrs:{"token":_vm.pareqToken,"stepupURL":_vm.stepupURL,"md":_vm.trx_details,"origin":_vm.origin},on:{"stepupChecked":_vm.stepupChecked}}),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('complete-button',{ref:"timer",attrs:{"gateway":"cards","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url},on:{"click":_vm.destroy}}),_vm._v(" "),_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){_vm.destroyTimer(); _vm.window.location.reload();}}},[_vm._v("Cancel")])],1)],1)])])]):_vm._e()])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body"},[_c('span',[_vm._v("Do not close this window until your payment processing is complete.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',[_c('iframe',{staticStyle:{"background":"#fff"},attrs:{"id":"card_page","width":"80%","height":"100%","name":"card_page","frameborder":"0"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Let's verify your card ...")]),_vm._v(" "),_c('p',{staticClass:"mb-0"})])}]
__vue__options__._scopeId = "data-v-d0cbf1ea"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d0cbf1ea", __vue__options__)
  } else {
    hotAPI.reload("data-v-d0cbf1ea", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Complete.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Complete",
  props: ["status_api_url", "invoice_no", "gateway_id", "callback_url"],
  data: function data() {
    return {
      loading: false,
      poll_external: false,
      redirecting_you: false,
      timer: null
    };
  },

  mounted: function mounted() {
    this.poll_external = this.$attrs["poll_external"] || false;
  },

  methods: {
    destroyTimer: function destroyTimer() {
      this.loading = false;
      if (this.timer) {
        clearInterval(this.timer);
      }
    },

    complete_payment: function complete_payment() {
      var _this = this;

      this.loading = true;
      var retryCount = 0;

      var intervalId = setInterval(function () {
        _this.check_status();

        retryCount++;

        if (retryCount >= 3) {
          clearInterval(intervalId);
          _this.loading = false;
        }
      }, 4000);
    },
    check_status: function check_status() {
      var _this2 = this;

      var payload = {
        invoiceNumber: this.invoice_no,
        gateway_id: this.gateway_id,
        poll_external: this.poll_external
      };
      Vue.axios.post(this.status_api_url, payload).then(function (response) {
        if (response.data === "OK") {
          clearInterval(_this2.timer);
          _this2.translate(response.data);
        } else if (response.data === "CANCELLED") {
          clearInterval(_this2.timer);
          _this2.loading = false;
          _this2.redirecting_you = false;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Payment Info",
            text: "Payment was cancelled."
          });
        }
      }).catch(function (error) {}).then(function () {});
    },

    translate: function translate(response) {
      this.loading = false;
      this.redirecting_you = true;
      if (this.callback_url != null && this.callback_url.length > 0) {
        window.top.location.href = this.callback_url;
      } else {
        this.redirecting_you = false;
        _sweetalert2.default.fire({
          icon: "success",
          title: "Payment Info",
          text: "Payment was completed."
        });
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.loading)?_c('button',{staticClass:"btn btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n    Checking ...\n  ")]):_vm._e(),_vm._v(" "),(!_vm.loading && !_vm.redirecting_you)?_c('button',{staticClass:"btn btn-primary",on:{"click":_vm.complete_payment}},[_vm._v("\n    Complete\n  ")]):_vm._e(),_vm._v(" "),(_vm.redirecting_you)?_c('button',{staticClass:"btn btn-danger"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n    Redirecting you ...\n  ")]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24315717", __vue__options__)
  } else {
    hotAPI.reload("data-v-24315717", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Cybersource.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#cardProcessingModal .modal-body[data-v-660c38c6] {\n  height: 65vh;\n  overflow-y: auto;\n}\n\n#card_page[data-v-660c38c6] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: none;\n}\n\n@font-face {\n  font-family: \"password\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"/iframev2/assets/fonts/password.ttf\");\n}\n\ninput.key[data-v-660c38c6] {\n  font-family: \"password\";\n  width: 100px;\n}\n\n.not-allowed[data-v-660c38c6] {\n  cursor: not-allowed !important;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url", "notification_url"],
  data: function data() {
    return {
      mpgs_url: null,
      mastercard: null,
      visa: null,
      CardNo: null,
      CVV: null,
      uierrors: [],
      cvv_error: null,
      month_error: null,
      cardno_error: null,
      email_error: null,
      year_error: null,
      forename_error: null,
      surname_error: null,
      currency: null,
      logo: null,
      invoice_amount: 0,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      bill_ref: null,
      service_id: null,
      card_charges: 0,
      expiry: null,
      fore_name: null,
      sur_name: null,
      email: null,
      msisdn: null,
      billing_address: "Nairobi",
      signature: null,
      signed_date_time: null,
      signed_field_names: null,
      unsigned_field_names: null,
      merchant_descriptor: null,
      profile_id: null,
      access_key: null,
      session_id: null,
      gateway: null,
      ip_address: null,
      cardjswrapper: null,
      selected_card_type_is: null,
      set_expiry_month: null,
      set_expiry_year: null
    };
  },

  computed: {
    can_pay: function can_pay() {
      if (this.selected_card_type_is && this.uierrors.length <= 0) return true;
      return false;
    },
    expiry_month: function expiry_month() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        this.set_expiry_month = split_expiry[0].trim();
        return this.set_expiry_month;
      }
    },
    expiry_year: function expiry_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        if (split_expiry.length != 2) return false;
        var year = parseInt(split_expiry[1], 10);
        if (isNaN(year) || year.toString().length !== 4) {
          this.set_expiry_year = null;
          this.year_error = "Invalid year";
          this.uierrors.push("Year is invalid");
          return this.set_expiry_year;
        } else {
          this.set_expiry_year = year;
          return this.set_expiry_year;
        }
      }
    },
    get_card_expiry: function get_card_expiry() {
      return this.expiry_month + "-" + this.expiry_year;
    }
  },
  mounted: function mounted() {
    var _this = this;

    $("#cybersourceModal").on("shown.bs.modal", function () {
      _this.clear_form();
      _this.mount_card_js();
    });

    $("#cardProcessingModal").on("shown.bs.modal", function () {});

    $("#cardProcessingModal").on("hidden.bs.modal", function () {
      var ifr = window.top.$("#card_page");
      ifr.attr("src", "about:blank");
    });

    $("#cybersourceModal").on("hidden.bs.modal", function () {
      _this.clear_form();
      _this.destroyTimer();
    });
    this.mpgs_url = this.$attrs["mpgs_api_url"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.bill_ref = this.$attrs["bill_ref"];
    this.service_id = this.$attrs["service_id"];
    this.msisdn = this.$attrs["msisdn"] ? this.$attrs["msisdn"] : this.$attrs["id_number"];
    this.email = this.$attrs["email"];
    this.signature = this.$attrs["signature"];
    this.signed_date_time = this.$attrs["signed_date_time"];
    this.signed_field_names = this.$attrs["signed_field_names"];
    this.unsigned_field_names = this.$attrs["unsigned_field_names"];
    this.profile_id = this.$attrs["profile_id"];
    this.access_key = this.$attrs["access_key"];
    this.session_id = this.$attrs["session_id"];
    this.gateway = this.$attrs["gateway_id"];
    this.merchant_descriptor = this.$attrs["merchant_descriptor"];
    this.ip_address = this.$attrs["ip_address"];
    this.set_total_amount();
    this.calculate_card_charges();
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    get_card_no: function get_card_no() {
      if (this.CardNo) return this.CardNo.replaceAll(" ", "");
      return this.CardNo;
    },
    load_iframe: function load_iframe() {
      $("#cybersourceModal .close").click();
      $("#cardProcessingModal").modal("show");
    },
    mount_card_js: function mount_card_js() {
      $("#cardjswrapper").append('<div id="jswrapper" class="card-wrapper"></div>');

      this.setCard();
    },
    setCard: function setCard() {
      this.cardjswrapper = new Card({
        form: "#frmCard",
        container: ".card-wrapper",

        formSelectors: {
          numberInput: "input#CardNoCS",
          expiryInput: "input#expiryCS",
          cvcInput: "input#CVVCS",
          nameInput: "input#nameCS" },

        width: "350px",
        formatting: true,
        messages: {
          validDate: "Valid\nThru",
          monthYear: "month-year" },

        placeholders: {
          CardNo: "•••• •••• •••• ••••",
          name: "",
          expiry: ""
        },

        masks: {},

        debug: false });
    },

    clear_form: function clear_form() {
      $("#frmCard").trigger("reset");
      this.CardNo = "";
      this.CVV = "";
      this.eMonth = "";
      this.sur_name = "";
      this.fore_name = "";
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";
      this.email_error = "";
      this.forename_error = "";
      this.surname_error = "";
      this.expiry = null;
      this.selected_card_type_is = null;
      this.email = "";
    },
    set_paste_error: function set_paste_error() {
      this.uierrors.push("Paste not allowed for this field.");
      this.cardno_error = "Paste not allowed!";
    },
    check_validation: function check_validation(e) {
      this.set_month_and_year();
      this.set_card_type();
      this.checkForm(e);
    },
    set_total_amount: function set_total_amount() {
      this.total_amount = this.set_card_charges(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    set_card_type: function set_card_type() {
      if (this.cardjswrapper) {
        if (this.CardNo) {
          var type = this.cardjswrapper.cardType;
          if (type == "visa") this.selected_card_type_is = "001";
          if (type == "mastercard") this.selected_card_type_is = "002";
          if (type == "amex") this.selected_card_type_is = "003";
          if (type == "dankort") this.selected_card_type_is = "034";
          if (type == "hipercard") this.selected_card_type_is = "050";
          if (type == "dinersclub") this.selected_card_type_is = "005";
          if (type == "discover") this.selected_card_type_is = "004";
          if (type == "jcb") this.selected_card_type_is = "007";
          if (type == "maestro") this.selected_card_type_is = "042";
          if (type == "unionpay") this.selected_card_type_is = "062";
          if (type == "visaelectron") this.selected_card_type_is = "001";
          if (type == "elo") this.selected_card_type_is = "054";
          if (type == "aura") this.selected_card_type_is = "051";
          if (type == "uatp") this.selected_card_type_is = "040";
        } else {
          this.selected_card_type_is = null;
        }
      }
    },
    set_month_and_year: function set_month_and_year() {
      if (this.expiry) {
        var split_expiry = this.expiry.split("/");
        if (split_expiry.length == 1) this.set_expiry_month = split_expiry[0].trim();
        if (split_expiry.length > 1) this.set_expiry_year = split_expiry[1].trim();
      }
    },

    calculate_card_charges: function calculate_card_charges() {
      var val = this.total_amount - (parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
      this.card_charges = val.toFixed(2);
    },
    set_card_charges: function set_card_charges(base_amount) {
      var a = base_amount * 0 / 100;
      var val = a + base_amount;
      return val.toFixed(2);
    },
    checkForm: function checkForm(e) {
      this.uierrors = [];
      this.year_error = "";
      this.cvv_error = "";
      this.month_error = "";
      this.cardno_error = "";
      this.email_error = "";
      this.surname_error = "";
      this.forename_error = "";

      if (!this.set_expiry_year || !this.expiry) {
        this.uierrors.push("Year is required");
        this.year_error = "Required*";
      }
      if (!this.set_expiry_month || !this.expiry) {
        this.uierrors.push("Month is required");
        this.month_error = "Required*";
      }
      if (!this.CardNo) {
        this.uierrors.push("Card Number is required");
        this.cardno_error = "Required*";
      }
      if (!this.CVV) {
        this.uierrors.push("CVV is required");
        this.cvv_error = "Required*";
      }
      if (!this.email) {
        this.uierrors.push("Email is required");
        this.email_error = "Required*";
      }
      if (!this.sur_name) {
        this.uierrors.push("Surname is required");
        this.surname_error = "Required*";
      }
      if (!this.fore_name) {
        this.uierrors.push("First name is required");
        this.forename_error = "Required*";
      }

      if (!this.uierrors.length) {
        return true;
      }

      e.preventDefault();
    },

    make_payment: function make_payment() {
      var form = document.getElementById("frmCard");
      form.submit();
      this.clear_form();
    },

    destroy: function destroy(e) {
      $("#cardProcessingModal").modal("hide");
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"cardProcessingModal","aria-labelledby":"cardProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title"},[_vm._v("\n              Processing your payment, please wait...\n            ")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"},on:{"click":function($event){return _vm.window.location.reload();}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('complete-button',{ref:"timer",attrs:{"gateway":"cards","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url},on:{"click":_vm.destroy}}),_vm._v(" "),_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){_vm.destroyTimer(); _vm.window.location.reload();}}},[_vm._v("Cancel")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"cybersourceModal","tabindex":"-1","role":"dialog","aria-labelledby":"cybersourceModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('form',{attrs:{"id":"frmCard","action":_vm.mpgs_url,"method":"POST","target":"card_page"},on:{"submit":_vm.load_iframe}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Visa / MasterCard")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+"\n                        "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"col-12",attrs:{"id":"cardjswrapper"}}),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("First Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.fore_name),expression:"fore_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"First name on card","required":""},domProps:{"value":(_vm.fore_name)},on:{"paste":function($event){$event.preventDefault();},"input":[function($event){if($event.target.composing){ return; }_vm.fore_name=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.forename_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.forename_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Last Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sur_name),expression:"sur_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Surname on card","required":""},domProps:{"value":(_vm.sur_name)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.sur_name=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.surname_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.surname_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_card_type_is),expression:"selected_card_type_is"}],staticClass:"form-control",attrs:{"id":"cardType","type":"hidden","name":"card_type","readonly":""},domProps:{"value":(_vm.selected_card_type_is)},on:{"input":function($event){if($event.target.composing){ return; }_vm.selected_card_type_is=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Card Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CardNo),expression:"CardNo"}],staticClass:"form-control",attrs:{"type":"text","id":"CardNoCS","placeholder":"1234 1234 1234 1234","required":""},domProps:{"value":(_vm.CardNo)},on:{"paste":function($event){$event.preventDefault();},"input":[function($event){if($event.target.composing){ return; }_vm.CardNo=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cardno_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.cardno_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Email")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.email),expression:"email"}],staticClass:"form-control",attrs:{"type":"email","name":"bill_to_email","placeholder":"johndoe@email.cc","required":""},domProps:{"value":(_vm.email)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.email=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.email_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.email_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_card_type_is),expression:"selected_card_type_is"}],staticClass:"form-control",attrs:{"id":"cardType","type":"hidden","name":"card_type","readonly":""},domProps:{"value":(_vm.selected_card_type_is)},on:{"input":function($event){if($event.target.composing){ return; }_vm.selected_card_type_is=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-row",staticStyle:{"margin-top":"15px"}},[_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Valid Thru")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.expiry),expression:"expiry"}],staticClass:"form-control",attrs:{"placeholder":"MM/YYYY","id":"expiryCS","type":"tel","maxlength":"9","required":""},domProps:{"value":(_vm.expiry)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.expiry=$event.target.value},_vm.check_validation]}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.set_expiry_month),expression:"set_expiry_month"}],attrs:{"type":"hidden"},domProps:{"value":(_vm.set_expiry_month)},on:{"input":function($event){if($event.target.composing){ return; }_vm.set_expiry_month=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.set_expiry_year),expression:"set_expiry_year"}],attrs:{"type":"hidden"},domProps:{"value":(_vm.set_expiry_year)},on:{"input":function($event){if($event.target.composing){ return; }_vm.set_expiry_year=$event.target.value}}}),_vm._v(" "),(_vm.year_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.year_error)+"\n                          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6"},[_c('label',[_vm._v("Card Code (CVC)")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.CVV),expression:"CVV"}],staticClass:"key form-control",attrs:{"type":"text","id":"CVVCS","placeholder":"CVC","required":""},domProps:{"value":(_vm.CVV)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.CVV=$event.target.value},_vm.check_validation]}}),_vm._v(" "),(_vm.cvv_error)?_c('p',{staticStyle:{"color":"red"}},[_vm._v("\n                            "+_vm._s(_vm.cvv_error)+"\n                          ")]):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){return _vm.window.location.reload();}}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.can_pay)?_c('input',{staticClass:"btn btn-primary not-allowed",attrs:{"type":"submit","value":"Pay","disabled":""}}):_vm._e(),_vm._v(" "),(_vm.can_pay)?_c('input',{staticClass:"btn btn-primary",attrs:{"type":"submit","value":"Pay","data-toggle":"modal","data-target":".cardProcessingModal"}}):_vm._e()])]),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"amount"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_cvn"},domProps:{"value":_vm.CVV}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_number"},domProps:{"value":_vm.get_card_no()}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"card_expiry_date"},domProps:{"value":_vm.get_card_expiry}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"profile_id","name":"profile_id"},domProps:{"value":_vm.profile_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"access_key","name":"access_key"},domProps:{"value":_vm.access_key}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"transaction_uuid","name":"transaction_uuid"},domProps:{"value":_vm.bill_ref}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"signed_date_time","name":"signed_date_time"},domProps:{"value":_vm.signed_date_time}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"signed_field_names","name":"signed_field_names"},domProps:{"value":_vm.signed_field_names}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"unsigned_field_names","name":"unsigned_field_names"},domProps:{"value":_vm.unsigned_field_names}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"payment_method","name":"payment_method","value":"card"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"transaction_type","name":"transaction_type","value":"sale"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"reference_number","name":"reference_number"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"auth_trans_ref_no","name":"auth_trans_ref_no"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"amount","name":"amount"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"currency","name":"currency"},domProps:{"value":_vm.currency}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"locale","name":"locale","value":"en-us"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_descriptor","name":"merchant_descriptor"},domProps:{"value":_vm.merchant_descriptor}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_forename","name":"bill_to_forename"},domProps:{"value":_vm.fore_name}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_surname","name":"bill_to_surname"},domProps:{"value":_vm.sur_name}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_phone","name":"bill_to_phone"},domProps:{"value":_vm.msisdn}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_line1","name":"bill_to_address_line1"},domProps:{"value":_vm.billing_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_line2","name":"bill_to_address_line2"},domProps:{"value":_vm.billing_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_city","name":"bill_to_address_city","value":"Mountain View"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_state","name":"bill_to_address_state","value":"CA"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_country","name":"bill_to_address_country","value":"US"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"bill_to_address_postal_code","name":"bill_to_address_postal_code","value":"94043"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"override_custom_receipt_page","name":"override_custom_receipt_page"},domProps:{"value":_vm.notification_url}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"device_fingerprint_id","name":"device_fingerprint_id"},domProps:{"value":_vm.session_id}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"customer_ip_address","name":"customer_ip_address"},domProps:{"value":_vm.ip_address}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"line_item_count","name":"line_item_count","value":"1"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_sku","name":"item_0_sku"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_code","name":"item_0_code"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_name","name":"item_0_name"},domProps:{"value":_vm.invoice_no}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_quantity","name":"item_0_quantity","value":"1"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"item_0_unit_price","name":"item_0_unit_price"},domProps:{"value":_vm.total_amount}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data1","name":"merchant_defined_data1"},domProps:{"value":_vm.callback_url}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data2","name":"merchant_defined_data2","value":"MDD#2"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data3","name":"merchant_defined_data3","value":"MDD#3"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","id":"merchant_defined_data4","name":"merchant_defined_data4"},domProps:{"value":_vm.gateway}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"signature"},domProps:{"value":_vm.signature}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"invoiceNumber"},domProps:{"value":_vm.invoice_no}})])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body"},[_c('span',[_vm._v("Do not close this window until your payment processing is\n              complete.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',[_c('iframe',{staticStyle:{"background":"#fff"},attrs:{"id":"card_page","width":"80%","height":"100%","name":"card_page","frameborder":"0"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
__vue__options__._scopeId = "data-v-660c38c6"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-660c38c6", __vue__options__)
  } else {
    hotAPI.reload("data-v-660c38c6", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/DeviceDataCollection.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ["url", "token", "origin"],
    mounted: function mounted() {
        this.submitForm();
        window.addEventListener("message", this.handleMessage, false);
    },

    methods: {
        submitForm: function submitForm() {
            this.$refs.collectionForm.submit();
        },
        handleMessage: function handleMessage(event) {
            if (event.origin === this.origin) {
                this.$emit("enrollmentChecked", event.data);
            }
        }
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener("message", this.handleMessage, false);
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('iframe',{ref:"collectionIframe",staticStyle:{"display":"none"},attrs:{"name":"collectionIframe","height":"10","width":"10"}}),_vm._v(" "),_c('form',{ref:"collectionForm",attrs:{"method":"POST","target":"collectionIframe","action":_vm.url}},[_c('input',{attrs:{"type":"hidden","name":"JWT"},domProps:{"value":_vm.token}})])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f235c3c", __vue__options__)
  } else {
    hotAPI.reload("data-v-5f235c3c", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/EazzypayV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      invoice_number: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.set_total_amount();
    $("#eazzyPayModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"eazzyPayModal","tabindex":"-1","role":"dialog","aria-labelledby":"eazzyPayEquitelModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"tab-content",attrs:{"id":"nav-tabContent"}},[_c('div',{staticClass:"tab-pane fade show active",attrs:{"id":"nav-home","role":"tabpanel","aria-labelledby":"nav-home-tab"}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Equitel")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('ol',[_c('li',[_vm._v("From your Equitel SIM Card, Select My Money")]),_vm._v(" "),_c('li',[_vm._v("Select EazzyPay")]),_vm._v(" "),_c('li',[_vm._v("Select Paybill")]),_vm._v(" "),_c('li',[_vm._v("Select Account")]),_vm._v(" "),_c('li',[_vm._v("Select Enter Business Number and type 206206")]),_vm._v(" "),_c('li',[_vm._v("Enter Bill Account Number: "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("\n                          Enter the Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                        ")]),_vm._v(" "),_c('li',[_vm._v("Enter your Equitel PIN and send")]),_vm._v(" "),_c('li',[_vm._v("\n                          You will receive a transaction confirmation SMS from\n                          Equitel\n                        ")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                        After you receive a successful reply from Equitel,\n                        click the complete button below.\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"equity","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])]),_vm._v(" "),_c('div',{staticClass:"tab-pane fade",attrs:{"id":"nav-profile","role":"tabpanel","aria-labelledby":"nav-profile-tab"}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using EazzyBanking App")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('ol',[_c('li',[_vm._v("Log in to your EazzyBanking App")]),_vm._v(" "),_c('li',[_vm._v("\n                          Click on the fab icon (+) at the bottom right of the\n                          screen\n                        ")]),_vm._v(" "),_c('li',[_vm._v("Select EazzyPay")]),_vm._v(" "),_c('li',[_vm._v("Select Paybill")]),_vm._v(" "),_c('li',[_vm._v("Enter Paybill Number 206206")]),_vm._v(" "),_c('li',[_vm._v("Enter Bill Account Number: "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("\n                          Enter the Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                        ")]),_vm._v(" "),_c('li',[_vm._v("Confirm details and send")]),_vm._v(" "),_c('li',[_vm._v("\n                          You will receive a transaction confirmation SMS on\n                          your registered line\n                        ")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                        After you receive a successful reply from Equitel,\n                        click the complete button below.\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"eazzypay","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',[_c('div',{staticClass:"nav nav-tabs nav-tabs-sm",attrs:{"id":"nav-tab","role":"tablist"}},[_c('a',{staticClass:"nav-item nav-link active",attrs:{"id":"nav-home-tab","data-toggle":"tab","href":"#nav-home","role":"tab","aria-controls":"nav-home","aria-selected":"true"}},[_vm._v("Equitel")]),_vm._v(" "),_c('a',{staticClass:"nav-item nav-link",attrs:{"id":"nav-profile-tab","data-toggle":"tab","href":"#nav-profile","role":"tab","aria-controls":"nav-profile","aria-selected":"false"}},[_vm._v("EazzyBanking App")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e12f9a5", __vue__options__)
  } else {
    hotAPI.reload("data-v-3e12f9a5", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/EcoCash.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "EcoCash",
  props: ["xcsrftoken", "callback_url", "status_api_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      account_number: null,
      otp: null,
      loading: false,
      authorizing: false,
      proceedToAuthorize: false,
      authorized: false,
      account_input_has_error: false,
      otp_input_has_error: false,
      base_url: "",
      gateway: null,
      error_message: null,
      success_message: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gateway"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.gateway_id = this.$attrs["gid"];
    this.set_total_amount();
    $("#ecoCashModal").on("hidden.bs.modal", function () {
      _this.proceedToAuthorize = false;
      _this.account_number = null;
      _this.otp = null;
      _this.loading = false;
      _this.authorizing = false;
      _this.authorized = false;
      _this.error_message = null;
      _this.success_message = null;
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      if (this.$refs.timer) {
        this.$refs.timer.destroyTimer();
      }
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    },
    account_has_error: function account_has_error() {
      if (this.account_number && !this.account_number.match(/^\d+$/)) {
        this.account_input_has_error = true;
      } else {
        this.account_input_has_error = false;
      }
    },

    inititate_transaction: function inititate_transaction() {
      var _this2 = this;

      this.loading = true;
      this.error_message = null;
      var urlIs = this.base_url + "/api/payment/ecocash/checkout";
      var api_headers = {
        Authorization: ""
      };
      var params = {
        msisdn: this.account_number,
        gateway_id: this.gateway_id,
        amount: this.total_amount,
        invoice_number: this.invoice_number
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        _this2.loading = false;
        _this2.account_number = null;
        _this2.proceedToAuthorize = true;
        _this2.success_message = "We have sent payment instructions to your phone. Click 'Complete' button below after you pay";
      }).catch(function () {
        _this2.loading = false;
        _this2.account_number = null;
        _this2.error_message = "Processing failed ! Try again later";
      }).then(function () {
        _this2.loading = false;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"ecoCashModal","tabindex":"-1","role":"dialog","aria-labelledby":"ecoCashModallLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('form',[(_vm.error_message)?_c('p',{staticClass:"alert alert-danger"},[_vm._v("\n                        "+_vm._s(_vm.error_message)+"\n                      ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('p',{staticClass:"alert alert-success"},[_vm._v("\n                        "+_vm._s(_vm.success_message)+"\n                      ")]):_vm._e(),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("Phone Number\n                        "),(_vm.account_input_has_error)?_c('span',{staticClass:"error"},[_vm._v("Invalid: Numbers only*")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.account_number),expression:"account_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter your Phone Number","maxlength":"14","required":"true"},domProps:{"value":(_vm.account_number)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.account_number=$event.target.value},_vm.account_has_error]}})])]),_vm._v(" "),(!_vm.proceedToAuthorize)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"pull-left btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.loading && _vm.account_number)?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.inititate_transaction}},[_vm._v("Proceed")]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"}},[_vm._v("Please wait ...")]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.proceedToAuthorize)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"pull-left btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),(_vm.proceedToAuthorize)?_c('complete-button',{ref:"timer",attrs:{"gateway":"ecocash","poll_external":"true","gateway_id":_vm.gateway_id,"status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}}):_vm._e()],1):_vm._e()])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using EcoCash Account")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-035a5e76", __vue__options__)
  } else {
    hotAPI.reload("data-v-035a5e76", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/EquityCheckout.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "EquityCheckout",
  props: ["xcsrftoken", "callback_url", "status_api_url", "gateway_id", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      account_number: null,
      otp: null,
      loading: false,
      authorizing: false,
      proceedToAuthorize: false,
      authorized: false,
      account_input_has_error: false,
      otp_input_has_error: false,
      idno_input_has_error: false,
      id_number: null,
      base_url: "",
      gateway: null,
      error_message: null,
      success_message: null
    };
  },


  mounted: function mounted() {
    var _this = this;

    $("#equityCheckoutModal").on("hidden.bs.modal", function () {
      _this.proceedToAuthorize = false;
      _this.account_number = null;
      _this.id_number = null;
      _this.otp = null;
      _this.loading = false;
      _this.authorizing = false;
      _this.authorized = false;
      _this.error_message = null;
      _this.destroyTimer();
    });
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.gateway = this.$attrs["gid"];
    this.id_number = this.$attrs["id_number"];
    this.set_total_amount();
    $("#equityCheckoutModal").on("shown.bs.modal", function () {
      _this.proceedToAuthorize = false;
      _this.account_number = null;
      _this.otp = null;
      _this.loading = false;
      _this.authorizing = false;
      _this.authorized = false;
      _this.error_message = null;
    });
  },
  computed: {
    account_has_no_error: function account_has_no_error() {
      if (this.account_number) {
        if (this.account_number.match(/^\d+$/)) {
          this.account_input_has_error = true;
          return true;
        } else {
          this.account_input_has_error = false;
          return false;
        }
      } else {
        return false;
      }
    },
    id_has_no_error: function id_has_no_error() {
      if (this.id_number) {
        if (this.id_number.match(/^\d+$/)) {
          this.idno_input_has_error = true;
          return true;
        } else {
          this.idno_input_has_error = false;
          return false;
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    reset_errors: function reset_errors() {
      this.error_message = this.success_message = null;
    },
    otp_has_error: function otp_has_error() {
      if (this.otp && !this.otp.match(/^\d+$/)) {
        this.otp_input_has_error = true;
      } else {
        this.otp_input_has_error = false;
      }
    },
    destroyTimer: function destroyTimer() {
      if (this.$refs.timer) {
        this.$refs.timer.destroyTimer();
      }
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    },
    get_otp: function get_otp() {
      var _this2 = this;

      this.loading = true;
      this.error_message = null;
      this.success_message = null;
      var urlIs = this.base_url + "/api/payment/equity/checkout";
      var api_headers = {
        Authorization: ""
      };
      var params = {
        account_number: this.account_number,
        gateway_id: this.gateway,
        amount: this.total_amount,
        invoice_number: this.invoice_number,
        id_number: this.id_number
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (v) {
        _this2.loading = false;
        _this2.proceedToAuthorize = true;
      }).catch(function (v) {
        _this2.loading = false;
        _this2.account_number = null;
        _this2.error_message = "Processing failed ! Try again later";
      });
    },

    authorize_payment: function authorize_payment() {
      var _this3 = this;

      this.authorizing = true;
      this.error_message = null;
      this.success_message = null;
      var urlIs = this.base_url + "/api/payment/equity/checkout/authorize";
      var api_headers = {
        Authorization: ""
      };
      var params = {
        otp: this.otp,
        gateway_id: this.gateway,
        invoice_number: this.invoice_number
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (v) {
        _this3.authorizing = false;
        _this3.authorized = true;
        _this3.otp = null;
        _this3.error_message = null;
        _this3.success_message = "Transaction was Successful. Redirecting you in 2 sec(s), please wait...";

        setInterval(function () {
          _this3.redirect();
        }, 2500);
      }).catch(function (v) {
        _this3.success_message = null;
        _this3.error_message = "Processing failed ! Try again later";
        _this3.account_number = null;
        _this3.authorized = false;
        _this3.authorizing = false;
        _this3.otp = null;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"equityCheckoutModal","tabindex":"-1","role":"dialog","aria-labelledby":"equityCheckoutModallLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('form',[(_vm.error_message)?_c('p',{staticClass:"alert alert-danger"},[_vm._v("\n                        "+_vm._s(_vm.error_message)+"\n                      ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('p',{staticClass:"alert alert-success"},[_vm._v("\n                        "+_vm._s(_vm.success_message)+"\n                      ")]):_vm._e(),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("AccountNumber\n                        "),(!_vm.account_has_no_error)?_c('span',{staticClass:"error"},[_vm._v("Numbers only*")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.account_number),expression:"account_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter your Equity Account Number","pattern":"\\d*","maxlength":"14","required":""},domProps:{"value":(_vm.account_number)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.account_number=$event.target.value},function($event){return _vm.reset_errors()}]}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("ID Number\n                        "),(!_vm.id_has_no_error)?_c('span',{staticClass:"error"},[_vm._v("Numbers only*")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.id_number),expression:"id_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter your ID Number","pattern":"\\d*","maxlength":"14","required":""},domProps:{"value":(_vm.id_number)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.id_number=$event.target.value},function($event){return _vm.reset_errors()}]}}),_vm._v(" "),_c('br'),_vm._v(" "),(!_vm.otp_input_has_error && _vm.proceedToAuthorize)?_c('label',{attrs:{"for":"email"}},[_vm._v("OTP (One Time Pin)\n                        "),(_vm.otp && !_vm.account_has_no_error)?_c('span',{staticClass:"error"},[_vm._v("\n                          Numbers only*")]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.proceedToAuthorize)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.otp),expression:"otp"}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Enter your one time pin","required":""},domProps:{"value":(_vm.otp)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.otp=$event.target.value},function($event){return _vm.reset_errors()}]}}):_vm._e()])]),_vm._v(" "),(!_vm.proceedToAuthorize)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"pull-left btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.loading && !_vm.account_has_no_error)?_c('input',{staticClass:"btn btn-primary not-allowed",attrs:{"type":"submit","data-toggle":"modal","value":"Proceed","disabled":""}}):_vm._e(),_vm._v(" "),(!_vm.loading && _vm.account_has_no_error)?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.get_otp}},[_vm._v("Proceed")]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"}},[_vm._v("Please wait ...")]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.proceedToAuthorize)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"pull-left btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),(
                        _vm.otp &&
                        !_vm.authorized &&
                        !_vm.otp_input_has_error &&
                        !_vm.authorizing
                      )?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.authorize_payment}},[_vm._v("Authorize Payment")]):_vm._e(),_vm._v(" "),(_vm.authorizing)?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"}},[_vm._v("Authorizing...")]):_vm._e(),_vm._v(" "),(_vm.authorized)?_c('complete-button',{ref:"timer",attrs:{"gateway":"equitycheckout","poll_external":"false","gateway_id":_vm.gateway_id,"status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}}):_vm._e()],1):_vm._e()])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using Equity Account")])])}]
__vue__options__._scopeId = "data-v-7e282b89"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7e282b89", __vue__options__)
  } else {
    hotAPI.reload("data-v-7e282b89", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/EquitycashV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "bill_ref", "callback_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      service_name: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.service_name = this.$attrs["service_name"];
    this.set_total_amount();
    $("#equityCashModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"equityCashModal","tabindex":"-1","role":"dialog","aria-labelledby":"equityCashModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('div',{staticClass:"d-flex justify-content-between"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('a',{staticClass:"btn btn-white",attrs:{"href":""}},[_vm._v("Download Instructions")])]),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Equity Cash")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('p',{staticClass:"mb-0"},[_vm._v("Service: "+_vm._s(_vm.service_name))]),_vm._v(" "),_c('p',[_vm._v("Application No: "+_vm._s(_vm.bill_ref))]),_vm._v(" "),_c('ol',[_c('li',[_vm._v("Visit Equity Branch")]),_vm._v(" "),_c('li',[_vm._v("Ask to make "+_vm._s(_vm.service_name)+" Cash payment")]),_vm._v(" "),_c('li',[_vm._v("Bill Reference Number: "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                    Once you have made the deposit. Click complete below.\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"equitycash","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afcbad1c", __vue__options__)
  } else {
    hotAPI.reload("data-v-afcbad1c", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/FDH.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["status_api_url", "request_type", "callback_url", "payment_url", "bill_ref", "gateway"],
  name: "fdh-bank-gateway",
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      service_name: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      loading: false,
      invoice_number: null,
      msisdn: null,
      validated: false,
      changeset: {},
      payment: {}
    };
  },

  computed: {
    validDataAdded: function validDataAdded() {
      return this.msisdn && this.msisdn.length > 0;
    }
  },
  mounted: function mounted() {
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.service_name = this.$attrs["service_name"];
    this.invoice_number = this.$attrs["invoice_no"];
    this.set_total_amount();
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    },
    checkNumber: function checkNumber(number) {
      if (number.isValid) {
        this.msisdn = number.number.e164;
      }
    },
    submit_payment: function submit_payment() {
      var _this = this;

      var payload = {
        msisdn: this.msisdn,
        client_invoice_ref: this.bill_ref,
        amount: this.total_amount,
        gateway: this.gateway,
        invoice_number: this.invoice_number
      };
      _axios2.default.post(this.payment_url, payload).then(function (resp) {
        if (resp.data.status === "ok") {
          _this.loading = false;
          _this.validated = true;
          _this.payment = resp.data.payment;
          _sweetalert2.default.fire({
            icon: "info",
            text: "Use the code sent to your phone to authorize payment. \nClick 'Complete' button once paid."
          });
        } else {
          _this.changeset = {};
          _this.loading = false;
          _this.validated = false;
          _sweetalert2.default.fire({
            icon: "error",
            text: "Payment failed. Please try again later."
          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    },
    query_payment_status: function query_payment_status() {
      var _this2 = this;

      _axios2.default.post(this.status_api_url, {
        amountPaid: this.payment.amountPaid,
        msisdn: this.msisdn,
        gateway: this.gateway,
        code: this.payment.code,
        datetime: this.payment.datetime,
        client_invoice_ref: this.bill_ref,
        invoice_number: this.invoice_number
      }).then(function (response) {
        if (response.data.status === "ok") {
          _this2.loading = false;
          _this2.validated = true;
          _this2.translate(response.data);
        }
      }).catch(function (error) {
        console.log(error);
        _this2.loading = false;
        _sweetalert2.default.fire({
          icon: "error",
          text: "Your Payment has not been Received. \nIf money has been deducted from your account \nkindly wait for a few minutes then click 'complete'  again."
        });
      });
    },
    translate: function translate(response) {
      if (this.callback_url != null && this.callback_url.length > 0) {
        window.top.location.href = this.callback_url;
      } else {
        _sweetalert2.default.fire({
          icon: "success",
          title: "Payment Info",
          text: "Payment was successful."
        });
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"fdhModal","tabindex":"-1","role":"dialog","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using FDH Bank Smartpay")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("Amount: "+_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[(_vm.changeset.message != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(_vm._s(_vm.changeset.message))]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('div',[_c('span',{staticClass:"spinner-border",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v("Please wait, loading ...\n                  ")]):_vm._e(),_vm._v(" "),_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"msisdn"}},[_vm._v("Mobile Number")]),_vm._v(" "),_c('vue-tel-input',{staticClass:"form-control",class:{ 'is-invalid': 'msisdn' in _vm.changeset },on:{"validate":_vm.checkNumber},model:{value:(_vm.msisdn),callback:function ($$v) {_vm.msisdn=$$v},expression:"msisdn"}}),_vm._v(" "),('msisdn' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.msisdn))])]):_vm._e()],1),_vm._v(" "),(!_vm.validated)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-sm-6"},[_c('button',{staticClass:"btn btn-primary btn-block",attrs:{"type":"button","disabled":!_vm.validDataAdded},on:{"click":function($event){return _vm.submit_payment()}}},[_vm._v("Proceed")])]),_vm._v(" "),_vm._m(1)]):_vm._e()])]),_vm._v(" "),(_vm.validated)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",on:{"click":_vm.query_payment_status}},[_vm._v("Complete")])]):_vm._e()])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-sm-6"},[_c('a',{staticClass:"btn btn-light btn-block",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0211797c", __vue__options__)
  } else {
    hotAPI.reload("data-v-0211797c", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/KcbcashV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "bill_ref", "callback_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      service_name: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.service_name = this.$attrs["service_name"];
    this.set_total_amount();
    $("#kcbCashModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"kcbCashModal","tabindex":"-1","role":"dialog","aria-labelledby":"kcbCashModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('div',{staticClass:"d-flex justify-content-between"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('a',{staticClass:"btn btn-white",attrs:{"href":""}},[_vm._v("Download Instructions")])]),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using KCB Cash")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('p',{staticClass:"mb-0"},[_vm._v("Service: "+_vm._s(_vm.service_name))]),_vm._v(" "),_c('p',[_vm._v("Application No: "+_vm._s(_vm.bill_ref))]),_vm._v(" "),_c('ol',[_c('li',[_vm._v("Visit KCB Branch")]),_vm._v(" "),_c('li',[_vm._v("Ask to make E-Citizen cash payment")]),_vm._v(" "),_c('li',[_vm._v("Bill Reference Number: "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                    Once you have made the deposit. Click complete below.\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"kcbcash","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-674372ab", __vue__options__)
  } else {
    hotAPI.reload("data-v-674372ab", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Kcbmpesa.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      shortcode: null,
      gateway: null,
      stkOpen: false,
      stk_phone: null,
      initiating: false,
      base_url: "",
      success_message: null,
      error_message: null,
      div_id: null
    };
  },

  mounted: function mounted() {
    var _this = this;

    var id = this.$attrs["gid"];
    this.div_id = "mpesaModal" + id;
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gateway"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.set_total_amount();
    $("#" + this.div_id).on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  computed: {
    valid_phone: function valid_phone() {
      if (this.stk_phone) {
        if (this.stk_phone.match(/\+?(254|0)(70|71|72|74|79)\d{7}/g)) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    toggleStkOpen: function toggleStkOpen() {
      if (this.stkOpen) {
        this.stkOpen = false;
      } else {
        this.stkOpen = true;
      }
    },
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    stk_menu: function stk_menu() {
      var _this2 = this;

      this.initiating = true;
      this.error_message = null;
      this.success_message = null;
      var urlIs = this.base_url + "/api/payment/mpesa/stk/" + this.request_type;
      var api_headers = {
        Authorization: ""
      };
      var params = {
        req_ref: this.invoice_number,
        gateway: this.gateway,
        preferred_msisdn: this.stk_phone
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this2.initiating = false;
          _this2.error_message = "Unable to push STK Menu at this time. Try again later !";
        } else {
          _this2.initiating = false;
          _this2.success_message = "Please, check your phone for STK Menu";
        }
      }).catch(function () {
        _this2.initiating = false;
        _this2.error_message = "Unable to push STK Menu at this time. Try again later !";
      }).then(function () {
        _this2.initiating = false;
        _this2.toggleStkOpen();
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":_vm.div_id,"tabindex":"-1","role":"dialog","aria-labelledby":"mpesaModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using M-PESA")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[(_vm.error_message)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.error_message)+"\n                  ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.success_message)+"\n                  ")]):_vm._e(),_vm._v(" "),_c('ol',[_c('li',[_vm._v("\n                      Click\n                      "),_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":_vm.toggleStkOpen}},[_vm._v("here")]),_vm._v("\n                      to receive M-PESA Menu\n                      "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('label',[_vm._v("Phone Number\n                            "),(!_vm.valid_phone)?_c('span',{staticStyle:{"color":"red"}},[_vm._v("* required")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stk_phone),expression:"stk_phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter a valid safaricom number"},domProps:{"value":(_vm.stk_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stk_phone=$event.target.value}}})]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.valid_phone)?_c('div',{staticClass:"row"},[(_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n                            Processing ...\n                          ")]):_vm._e(),_vm._v(" "),(!_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary",attrs:{"type":"button"},on:{"click":_vm.stk_menu}},[_vm._v("\n                            Initiate Payment\n                          ")]):_vm._e()]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('li',[_vm._v("Enter your M-PESA PIN and click OK")]),_vm._v(" "),_c('li',[_vm._v("You will receive a confirmation SMS from M-PESA")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                    After you receive a successful reply from M-PESA, click\n                    the complete button below.\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"mpesa","status_api_url":_vm.url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6eaf16f8", __vue__options__)
  } else {
    hotAPI.reload("data-v-6eaf16f8", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/MpambaV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type", "return_url", "status_api_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      base_url: "",
      total_amount: 0,
      shortcode: null,
      gateway: null,
      stkOpen: false,
      stk_phone: null,
      show_uba_content: false,
      hide_proceed: false,
      initiating: false,
      iframe: null,
      iframeDoc: null,
      html: "",
      error: null,
      gateway_id: null,
      toggle_message: "Click here to proceed"
    };
  },

  computed: {
    valid_phone: function valid_phone() {
      if (this.stk_phone) {
        if (this.stk_phone.match(/\d{9}/g)) {
          return true;
        }
      }
      return false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    window.jQuery = _jquery2.default;
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gid"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.gateway_id = this.$attrs["gid"];
    this.set_total_amount();
    $("#mpambaProcessingModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },
    toggleMpambaStkOpen: function toggleMpambaStkOpen() {
      if (this.stkOpen) {
        this.stkOpen = false;
        this.toggle_message = "Click here to proceed";
      } else {
        this.toggle_message = "Click here to close";
        this.stkOpen = true;
      }
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    stk_menu: function stk_menu() {
      var _this2 = this;

      this.initiating = true;
      var urlIs = this.base_url + "/api/payment/mpamba/checkout";
      var api_headers = {
        Authorization: "****"
      };
      var params = {
        invoice_number: this.invoice_number,
        gateway_id: this.gateway,
        amount: this.total_amount,
        msisdn: this.stk_phone,
        callback_url: this.callback_url,
        return_url: this.return_url
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this2.initiating = false;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Request Failed (422). Try Later or Pay Directly to the bank"
          });
        } else {
          _this2.initiating = false;
          $("#mpambaProcessingModal .close").click();
          _this2.stk_phone = null;
          _this2.initiating = false;
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Check your phone for instructions",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _this2.initiating = false;
        _this2.show_uba_content = false;
        _this2.hide_proceed = false;
        $("#mpambalProcessingModal").hide();
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Request Failed. Try Later or Pay Directly to the bank"
        });
      }).then(function () {
        _this2.initiating != true;
        _this2.stk_phone = null;
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"mpambaProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"mpambaProcessingLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using MPamba")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.toggleMpambaStkOpen()}}},[_vm._v(_vm._s(_vm.toggle_message))]),_vm._v(" "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('label',[_vm._v("Phone Number\n                        "),(!_vm.valid_phone)?_c('span',{staticStyle:{"color":"red"}},[_vm._v("* required")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stk_phone),expression:"stk_phone"}],staticClass:"form-control",attrs:{"type":"tel","maxlength":"13","placeholder":"Enter a valid phone number e.g 09.."},domProps:{"value":(_vm.stk_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stk_phone=$event.target.value}}})]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.valid_phone)?_c('div',{staticClass:"row"},[(_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n                        Processing ...\n                      ")]):_vm._e(),_vm._v(" "),(!_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary",attrs:{"type":"button"},on:{"click":_vm.stk_menu}},[_vm._v("\n                        Initiate Payment\n                      ")]):_vm._e()]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"mpamba","poll_external":"true","gateway_id":_vm.gateway_id,"status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8539b3f0", __vue__options__)
  } else {
    hotAPI.reload("data-v-8539b3f0", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/MpesaV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      shortcode: null,
      gateway: null,
      stkOpen: false,
      stk_phone: null,
      initiating: false,
      base_url: "",
      payment_instructions: "",
      div_id: null,
      content_div: null,
      success_message: null,
      error_message: null
    };
  },

  created: function created() {
    var id = this.$attrs["gid"];
    this.payment_instructions = this.$attrs["instructions"];
    this.div_id = "mpesaModal" + id;
    this.content_div = "contentDiv" + id;
  },
  mounted: function mounted() {
    var _this = this;

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gateway"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    this.stk_phone = this.$attrs["msisdn"];

    this.write_instructions(this.content_div, this.payment_instructions);
    this.set_total_amount();
    $("#" + this.div_id).on("hidden.bs.modal", function () {
      _this.error_message = null;
      _this.success_message = null;
      _this.initiating = false;
      _this.destroyTimer();
    });
  },
  computed: {
    valid_phone: function valid_phone() {
      if (this.stk_phone) {
        if (this.stk_phone.match(/\+?(254|0)(70|71|72|74|79)\d{7}/g)) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    write_instructions: function write_instructions(div, instructions) {
      $("#" + div).html(instructions);
    },

    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    toggleStkOpen: function toggleStkOpen() {
      if (this.stkOpen) {
        this.stkOpen = false;
      } else {
        this.stkOpen = true;
      }
    },
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    stk_menu: function stk_menu() {
      var _this2 = this;

      this.initiating = true;
      this.error_message = null;
      this.success_message = null;
      var urlIs = this.base_url + "/api/payment/mpesa/stk/" + this.request_type;
      var api_headers = {
        Authorization: ""
      };
      var params = {
        req_ref: this.invoice_number,
        gateway: this.gateway,
        preferred_msisdn: this.stk_phone
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this2.initiating = false;
          _this2.error_message = "Unable to push STK Menu at this time. Try again later !";
        } else {
          _this2.initiating = false;
          _this2.success_message = "Please, check your phone for STK Menu";
        }
      }).catch(function () {
        _this2.initiating = false;
        _this2.error_message = "Unable to push STK Menu at this time. Try again later !";
      }).then(function () {
        _this2.initiating = false;
        _this2.toggleStkOpen();
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":_vm.div_id,"tabindex":"-1","role":"dialog","aria-labelledby":"mpesaModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using M-PESA")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                    "+_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount))+"\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[(_vm.error_message)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.error_message)+"\n                  ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.success_message)+"\n                  ")]):_vm._e(),_vm._v(" "),_c('ol',[_c('li',[_vm._v("\n                      Click\n                      "),_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":_vm.toggleStkOpen}},[_vm._v("here")]),_vm._v("\n                      to receive M-PESA Menu\n                      "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('label',[_vm._v("Phone Number\n                            "),(!_vm.valid_phone)?_c('span',{staticStyle:{"color":"red"}},[_vm._v("* required")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stk_phone),expression:"stk_phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter a valid safaricom number"},domProps:{"value":(_vm.stk_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stk_phone=$event.target.value}}})]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.valid_phone)?_c('div',{staticClass:"row"},[(_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n                            Processing ...\n                          ")]):_vm._e(),_vm._v(" "),(!_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary",attrs:{"type":"button"},on:{"click":_vm.stk_menu}},[_vm._v("\n                            Initiate Payment\n                          ")]):_vm._e()]):_vm._e()]):_vm._e()]),_vm._v(" "),_c('li',[_vm._v("Enter your M-PESA PIN and click OK")]),_vm._v(" "),_c('li',[_vm._v("You will receive a confirmation SMS from M-PESA")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("\n                    After you receive a successful reply from M-PESA, click\n                    the complete button below.\n                  ")])]),_vm._v(" "),(_vm.payment_instructions)?_c('div',{staticClass:"card-body"},[_c('p',[_vm._v("Or follow instructions below")]),_vm._v(" "),_c('div',{attrs:{"id":_vm.content_div}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"mpesa","status_api_url":_vm.url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e55d70c4", __vue__options__)
  } else {
    hotAPI.reload("data-v-e55d70c4", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/MpesaV3.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: "MpesaV3",
    props: ["callback_url", "request_type", "logo", "amount_net", "currency", "invoice_no", "status_api_url", "callback_url", "msisdn", "base_url", "gateway", "fetch_payment_url"],
    data: function data() {
        return {
            invoice_amount: null,
            agent_fee: 0,
            fee: 0,
            total_amount: 0,
            shortcode: null,
            stkOpen: false,
            initiating: false,
            payment_instructions: "",
            div_id: null,
            success_message: null,
            error_message: null,
            content_div: null,
            stkPhone: null,
            loading: false,
            step: 1,
            show_confirmation: true
        };
    },
    created: function created() {
        var id = this.$attrs["gid"];
        this.payment_instructions = this.$attrs["instructions"];
        this.div_id = "mpesaModal" + id;
        this.content_div = "contentDiv" + id;
    },
    mounted: function mounted() {
        this.write_instructions(this.content_div, this.payment_instructions);
        this.stkPhone = this.msisdn;
        if (this.$attrs["instructions"] == "") {
            this.stkOpen = true;
        } else {
            this.stkOpen = false;
        }
    },
    computed: {
        valid_phone: function valid_phone() {
            if (this.stk_phone) {
                if (this.stk_phone.match(/\+?(254|0)(70|71|72|74|79)\d{7}/g)) {
                    return true;
                }
            }
            return false;
        }
    },
    methods: {
        formatNumber: function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        },
        write_instructions: function write_instructions(div, instructions) {
            $("#" + div).html(instructions);
        },

        showTextInput: function showTextInput() {
            this.write_instructions(this.content_div, this.payment_instructions);
            this.stkOpen = !this.stkOpen;
            this.show_confirmation = false;
        },
        stkPush: function stkPush() {
            var _this = this;

            this.initiating = true;
            this.loading = true;
            var url = this.base_url + "/api/payment/mpesa/stk/" + this.request_type;
            var headers = { "Content-Type": "application/json", "Authorization": "" };
            var params = {
                req_ref: this.invoice_no,
                gateway: this.gateway,
                preferred_msisdn: this.stkPhone
            };
            Vue.axios.post(url, params, { headers: headers }).then(function (response) {
                _this.initiating = false;
                if (response.status == 200) {
                    _this.success_message = "Check your phone for STK Menu. Press Complete once done.";
                    _this.error_message = null;
                    _this.show_confirmation = true;
                    _this.write_instructions(_this.content_div, response.data.message);
                } else {
                    _this.error_message = "Unable to push STK Menu. Please try again later.";
                    _this.success_message = null;
                }
            }).catch(function (error) {
                _this.initiating = false;
                _this.loading = false;
                _this.error_message = "Unable to push STK Menu. Please try again later.";
                _this.success_message = null;
            });
        },
        destroyTimer: function destroyTimer() {
            this.$refs.timer.destroyTimer();
        },

        fetchPayment: function fetchPayment() {
            this.step = 2;
            this.error_message = null;
            this.success_message = null;
        },
        submit_payment: function submit_payment() {
            var _this2 = this;

            this.loading = true;
            var payload = {
                gateway_receipt_no: this.trx_ref,
                payment_gateway_id: this.gateway,
                ref_no: this.invoice_no
            };

            Vue.axios.post(this.fetch_payment_url, payload).then(function (resp) {
                _this2.loading = false;
                if (resp.status == 200) {
                    _this2.success_message = "Your payment has been received.";
                    _this2.error_message = null;
                    setTimeout(function () {
                        window.location.href = _this2.callback_url;
                    }, 5000);
                } else {
                    _this2.error_message = "Unable to fetch payment. Please try again later.";
                    _this2.success_message = null;
                }
            }).catch(function (error) {
                _this2.loading = false;
                _this2.error_message = "Unable to fetch payment. Please try again later.";
                _this2.success_message = null;
            });
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":_vm.div_id,"tabindex":"-1","role":"dialog","aria-labelledby":"mpesaModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[(_vm.step == 1)?_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using M-PESA")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.amount_net)))])]),_vm._v(" "),_c('div',{staticClass:"container"},[(_vm.error_message)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                                        "+_vm._s(_vm.error_message)+"\n                                    ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                                        "+_vm._s(_vm.success_message)+"\n                                    ")]):_vm._e(),_vm._v(" "),(!_vm.stkOpen)?_c('div',[(_vm.content_div)?_c('div',{staticClass:"card-body"},[_c('div',{attrs:{"id":_vm.content_div}}),_vm._v(" "),_c('div',{staticClass:"mt-5"},[_vm._v("\n                                                Make payment through the steps shown above and click Complete. If you wish to use STK click\n                                                "),_c('a',{attrs:{"href":"#"},on:{"click":_vm.showTextInput}},[_vm._v(" here")])])]):_vm._e()]):_vm._e()]),_vm._v(" "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"container"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"form-group col-12"},[_c('label',[_vm._v("Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stkPhone),expression:"stkPhone"}],staticClass:"form-control",attrs:{"type":"text","required":""},domProps:{"value":(_vm.stkPhone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stkPhone=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"form-group col-md-6"},[_c('button',{staticClass:"btn btn-outline-secondary btn-block mt-3 text-center",on:{"click":function($event){return _vm.window.location.reload()}}},[_vm._v("Cancel")])]),_vm._v(" "),_c('div',{staticClass:"form-group col-md-6"},[_c('button',{staticClass:"btn btn-outline-primary btn-block mt-3 text-center",attrs:{"disabled":_vm.loading},on:{"click":_vm.stkPush}},[_vm._v("Send STK")])])])])])]):_vm._e(),_vm._v(" "),(_vm.show_confirmation)?_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('button',{staticClass:"btn btn-link text-dark px-5",attrs:{"data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"mpesa","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1):_vm._e()])])])]):_vm._e(),_vm._v(" "),(_vm.step ==2)?_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_vm._m(1),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"container"},[_c('form',{on:{"submit":function($event){$event.preventDefault();return _vm.submit.apply(null, arguments)}}},[(_vm.success_message)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                                                "+_vm._s(_vm.success_message)+"\n                                            ")]):_vm._e(),_vm._v(" "),(_vm.error_message)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                                                "+_vm._s(_vm.error_message)+"\n                                            ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"form-group col-12"},[_c('label',[_vm._v("Transaction Reference")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.trx_ref),expression:"trx_ref"}],staticClass:"form-control",attrs:{"type":"text","required":""},domProps:{"value":(_vm.trx_ref)},on:{"input":function($event){if($event.target.composing){ return; }_vm.trx_ref=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"form-group col-md-6"},[_c('button',{staticClass:"btn btn-outline-secondary btn-block text-center",on:{"click":function($event){return _vm.window.location.reload()}}},[_vm._v("Cancel")])]),_vm._v(" "),_c('div',{staticClass:"form-group col-md-6"},[_c('button',{staticClass:"btn btn-outline-primary btn-block text-center",attrs:{"disabled":_vm.loading},on:{"click":_vm.submit_payment}},[_vm._v("Submit")])])])])])])])])])]):_vm._e()])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}},[_vm._v("x")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header d-flex justify-content-between text-center"},[_c('p',{staticClass:"mb-0 lead"},[_vm._v("Fetch Payment")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e54141c2", __vue__options__)
  } else {
    hotAPI.reload("data-v-e54141c2", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/OrangeMoneyV2.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#orangeCardProcessingModal .modal-body[data-v-05296640] {\n  height: 65vh;\n  overflow-y: auto;\n}\n\n#orange_card_page[data-v-05296640] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: none;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      mpgs_url: null,
      currency: null,
      logo: null,
      invoice_amount: 0,
      agent_fee: 0,
      fee: 0,
      total_amount: 0,
      bill_ref: null,
      service_id: null,
      loaded: false,
      has_error: false,
      iframe_loading: false,
      gateway_id: null,
      base_url: ""
    };
  },


  mounted: function mounted() {
    var _this = this;

    $("#orangeMoneyProcessingModal").on("shown.bs.modal", function () {});

    $("#orangeCardProcessingModal").on("shown.bs.modal", function () {});

    $("#orangeCardProcessingModal").on("hidden.bs.modal", function () {
      var ifr = window.top.$("#card_page");
      ifr.attr("src", "about:blank");
      _this.mpgs_url = null;
      _this.$refs.timer.destroyTimer();
    });

    $("#orangeMoneyProcessingModal").on("hidden.bs.modal", function () {
      _this.mpgs_url = null;
    });
    this.mpgs_url = this.$attrs["mpgs_api_url"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.bill_ref = this.$attrs["bill_ref"];
    this.service_id = this.$attrs["service_id"];
    this.gateway_id = this.$attrs["gid"];
    this.base_url = this.$attrs["base_url"];
    this.set_total_amount();
  },
  methods: {
    load_iframe: function load_iframe() {
      $("#orangeMoneyProcessingModal .close").click();
      $("#orangeCardProcessingModal").modal("show");
    },

    ensure_closed: function ensure_closed() {
      $("#orangecardProcessingModal").modal("hide");
      $("#orangecardProcessingModal .close").click();
    },


    getPaymentUrl: function getPaymentUrl() {
      var _this2 = this;

      this.iframe_loading = true;
      var url = this.base_url + "/api/payment/orange/checkout";
      var payload = {
        invoice_number: this.invoice_no,
        amount: this.total_amount,
        return_url: this.callback_url,
        gateway_id: this.gateway_id
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.mpgs_url = response.data.payment_url;
        _this2.loaded = true;
        window.top.location.href = _this2.mpgs_url;
      }).catch(function (error) {
        _this2.has_error = true;
        _this2.iframe_loading = false;
      }).then(function () {
        _this2.iframe_loading = false;
      });
    },

    getOauthToken: function getOauthToken() {
      var _this3 = this;

      var url = this.base_url + "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this3.api_token = response.data.token;
      }).catch(function (error) {}).then(function () {});
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },

    destroy: function destroy(e) {
      $("#cardProcessingModal").modal("hide");
      this.$refs.timer.destroyTimer();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[_c('div',{staticClass:"modal fade",attrs:{"id":"orangeCardProcessingModal","aria-labelledby":"orangeCardProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body"},[(_vm.iframe_loading)?_c('span',[_vm._v("Loading , please wait ....")]):_vm._e(),_vm._v(" "),(_vm.iframe_loading)?_c('div',{staticClass:"d-flex align-items-center"},[_c('div',{staticClass:"spinner-border ms-auto",attrs:{"role":"status","aria-hidden":"true"}})]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_vm._m(1)]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('complete-button',{ref:"timer",attrs:{"gateway":"cards","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url},on:{"click":_vm.destroy}}),_vm._v(" "),_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Close")])],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"orangeMoneyProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"orangeMoneyProcessingModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('form',{ref:"orangesform",attrs:{"action":_vm.mpgs_url,"method":"GET","target":"orange_card_page"}},[_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using OrangeMoney")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Total Due*")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                        "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount)+"\n                      ")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":function($event){return _vm.ensure_closed()}}},[_vm._v("Cancel")]),_vm._v(" "),(!_vm.iframe_loading)?_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","data-toggle":"modal","value":"Proceed to pay","data-target":".orangecardProcessingModal"},on:{"click":_vm.getPaymentUrl}}):_vm._e(),_vm._v(" "),(_vm.iframe_loading)?_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","disabled":""}},[_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v(" "),_c('span',{staticClass:"visually-hidden"},[_vm._v("One moment...")])]):_vm._e()])])])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title"},[_vm._v("Authorise Payment")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('iframe',{staticStyle:{"background":"#fff"},attrs:{"id":"orange_card_page","width":"80%","height":"100%","name":"orange_card_page","frameborder":"0"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
__vue__options__._scopeId = "data-v-05296640"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05296640", __vue__options__)
  } else {
    hotAPI.reload("data-v-05296640", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Pay.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["customer_id", "service_id", "agent_id", "agent_spending_api"],
  data: function data() {
    return {
      account_id: null,
      amount: null,
      invoice_no: null,
      url: null,
      current_bal: null,
      account_bal: 0,
      internal_pesaflow_gateway: null,
      con_secret: null,
      con_key: null,
      base_url: ""
    };
  },

  mounted: function mounted() {
    this.invoice_no = this.$attrs["invoice_no"];
    this.amount = this.$attrs["amount"];
    this.internal_pesaflow_gateway = this.$attrs["internal_pesaflow_gateway"];
    this.account_id = this.$attrs["account_id"];
    this.current_bal = this.$attrs["account_bal"];
    this.account_bal = this.$attrs["num_acc_bal"];
    this.url = this.$attrs["pay_url"];
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.base_url = this.$attrs["base_url"];
  },
  methods: {
    authorize_and_execute_payment: function authorize_and_execute_payment() {
      var _this = this;

      var url = this.base_url + "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this.api_token = response.data.token;

        var payload = {
          client_invoice_ref: _this.invoice_no,
          amount: _this.amount,
          pesaflow_account_id: _this.account_id,
          payment_gateway_id: _this.internal_pesaflow_gateway
        };
        var api_headers = { Authorization: "Bearer " + _this.api_token };
        Vue.axios.post(_this.url, payload, {
          headers: api_headers
        }).then(function (response) {
          this.sync_agent_spending();
        }).catch(function (error) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Contact support for assistance"
          });
        });
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Contact support for assistance"
        });
      }).then(function () {});
    },
    make_payment: function make_payment() {
      if (this.account_id == null || this.account_id === "") {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "It seems your agent account is not activated. Contact support for assistance"
        });
        return;
      }
      if (parseFloat(this.account_bal) < parseFloat(this.amount)) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Insufficient funds to carry out this transaction"
        });
        return;
      }

      this.authorize_and_execute_payment();
    },
    sync_agent_spending: function sync_agent_spending() {
      var payload = {
        agent_id: this.agent_id,
        user_msisdn: this.customer_id,
        service_id: this.service_id,
        trx_ref: this.invoice_no,
        amount: this.amount
      };
      Vue.axios.post(this.agent_spending_api, payload).then(function (response) {}).catch(function (error) {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-primary",attrs:{"href":"#","data-toggle":"modal","data-target":"#pay-modal"}},[_vm._v("Pay")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"pay-modal","tabindex":"-1","role":"dialog","aria-labelledby":"pay-modal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"id":"pay-modal","role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Ref")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.invoice_no),expression:"invoice_no"}],staticClass:"form-control",attrs:{"type":"text","readonly":"true"},domProps:{"value":(_vm.invoice_no)},on:{"input":function($event){if($event.target.composing){ return; }_vm.invoice_no=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Pay Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],staticClass:"form-control",attrs:{"type":"number","readonly":"true"},domProps:{"value":(_vm.amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Make payment"},on:{"click":_vm.make_payment}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Pay from Account")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-473ed3ba", __vue__options__)
  } else {
    hotAPI.reload("data-v-473ed3ba", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/PaymentInstructions.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      payment_instructions: null,
      div_id: null,
      content_div: null
    };
  },

  created: function created() {
    var id = this.$attrs["gid"];
    this.div_id = "pesaflowInstructionModal" + id;
    this.content_div = "contentDiv" + id;
  },
  mounted: function mounted() {
    var _this = this;

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.payment_instructions = this.$attrs["instructions"];
    this.set_total_amount();
    this.write_instructions(this.content_div, this.payment_instructions);
    $("#" + this.div_id).on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },
    write_instructions: function write_instructions(div, instructions) {
      $("#" + this.content_div).html(instructions);
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":_vm.div_id,"tabindex":"-1","role":"dialog","aria-labelledby":"pesaflowInstructionModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body",attrs:{"id":_vm.content_div}}),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"pesaflow-internal","status_api_url":_vm.url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4258785d", __vue__options__)
  } else {
    hotAPI.reload("data-v-4258785d", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Pesaflow.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#pesaflowProcessingModal .modal-body[data-v-871036e2] {\n  height: 75vh;\n  overflow-y: auto;\n}\n\n#card_page .page[data-v-871036e2] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: 1px #666;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pesaflow",
  props: ["xcsrftoken", "callback_url", "request_type", "agency_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      username: null,
      password: null,
      loading: true
    };
  },

  mounted: function mounted() {
    var _this = this;

    $("#pesaflowProcessingModal").on("hidden.bs.modal", function () {
      if (this.error == false) {
        var card = document.getElementById("card_pagev2");
        var c = $("#card_pagev2").find("iframe")[0];
        card.removeChild(c);
      }
      this.iframe = null;
      this.iframeDoc = null;
      this.loading = false;
    });
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.set_total_amount();
    $("#pesaflowProcessingModal").on("shown.bs.modal", function () {
      _this.load_pesaflow_iframe();
    });
  },
  methods: {
    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    },
    signin: function signin() {
      $("#pesaflowModal").modal("hide");
      $("#pesaflowProcessingModal").modal("show");
    },
    load_pesaflow_iframe: function load_pesaflow_iframe(e) {
      var _this2 = this;

      var data = {};

      var options = {
        headers: { "x-csrf-token": this.xcsrftoken }
      };
      $("#card_pagev2").show();

      this.iframe = document.createElement("iframe");

      document.getElementById("card_pagev2").appendChild(this.iframe);
      this.iframe.setAttribute("style", "width:100%;");

      this.iframe.style.height = document.getElementById("card_pagev2").scrollHeight + 25 + "px";

      Vue.axios.get(this.agency_url, data, options).then(function (response) {
        if (_this2.iframe.contentWindow) {
          _this2.iframeDoc = _this2.iframe.contentWindow;
        } else if (_this2.iframe.contentDocument.document) {
          _this2.iframeDoc = _this2.iframe.contentDocument.document;
        } else if (_this2.iframe.contentDocument) {
          _this2.iframeDoc = _this2.iframe.contentDocument;
        } else {
          _this2.error = true;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "We are unable to process this request at this time."
          });
          return;
        }

        _this2.iframeDoc.document.open();
        _this2.iframeDoc.document.write(response.data);
        _this2.iframeDoc.document.close();
      }).catch(function (error) {});
      this.loading = false;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"pesaflowProcessingModal",staticClass:"modal fade",attrs:{"id":"pesaflowProcessingModal","aria-labelledby":"pesaflowProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-xl modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('span',[_vm._v("Do not close this window until you are done !")]),_vm._v(" \n          "),(_vm.loading)?_c('div',{staticClass:"spinner-border"}):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticStyle:{"height":"100%"},attrs:{"id":"card_pagev2"}}),_vm._v(" "),_c('br')]),_vm._v(" "),_c('br'),_vm._v(" "),_vm._m(1)])])]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"pesaflowModal","tabindex":"-1","role":"dialog","aria-labelledby":"pesaflowModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(2),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('form',[_c('label',{attrs:{"for":"email"}},[_vm._v("Username")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.username),expression:"username"}],staticClass:"form-control",attrs:{"type":"email","placeholder":"Enter your email"},domProps:{"value":(_vm.username)},on:{"input":function($event){if($event.target.composing){ return; }_vm.username=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Enter your password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"pull-left btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")]),_vm._v(" "),_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.signin}},[_vm._v("Sign In")])])])])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title",attrs:{"id":"pesaflowProcessingModal"}},[_vm._v("Processing your request, please wait...")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using Pesaflow Agent Account")])])}]
__vue__options__._scopeId = "data-v-871036e2"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-871036e2", __vue__options__)
  } else {
    hotAPI.reload("data-v-871036e2", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/PesaflowInternal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _methods;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type", "customer_allowed"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      total_amount: 0,
      pin: null,
      msisdn: null,
      accounts: [],
      type: "none",
      error_message: null,
      processing: false,
      selected_account: null,
      sys_name: null,
      can_view_accounts: false,
      show_otp_page: false,
      one_time_pin_code: null,
      success_message: null,
      hide_account_page: false,
      base_url: "",
      customer_allowed_to_transact: false,
      part_payment: false,
      balance: 0,
      payment_type: null,
      payment_mode_amount: null
    };
  },

  mounted: function mounted() {
    var window = this;
    $("#pesaflowAccountProcessingModal").on("shown.bs.modal", function () {
      $("#account_page").hide();
      $("#main_page").show();
      window.msisdn = null;
      window.pin = null;
      window.processing = false;
      window.error_message = null;
      window.selected_account = null;
      window.accounts = [];
      window.can_view_accounts = false;
      window.hide_account_page = true;
      window.success_message = null;
      window.one_time_pin_code = null;
      window.show_otp_page = false;
    });

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.sys_name = this.$attrs["sys_name"];
    this.base_url = this.$attrs["base_url"];
    this.set_total_amount();
    if (this.customer_allowed == "false" || this.customer_allowed == false) {
      this.type = "agent";
      this.customer_allowed_to_transact = false;
    } else {
      window.type = null;
      this.customer_allowed_to_transact = true;
    }

    this.partial_payment_allowed = this.$attrs["partial_payment_allowed"];

    if (this.partial_payment_allowed == "false" || this.partial_payment_allowed == false) {
      this.part_payment = false;
      this.payment_type = "full";
      this.setPaymentModeAmount("full");
    } else {
      this.part_payment = true;
    }
  },
  methods: (_methods = {
    setPaymentModeAmount: function setPaymentModeAmount(type) {
      if (type == 'full') this.payment_mode_amount = this.total_amount;
      if (type == 'partial') this.payment_mode_amount = null;
    },

    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    authenticate: function authenticate() {
      var _this = this;

      this.error_message = null;
      this.processing = false;
      if (!this.msisdn || !this.pin) {
        this.error_message = "Phone number and/or PIN is missing!";
        return;
      }

      if (!this.validate_msisdn(this.msisdn)) {
        this.error_message = "Provide a valid phone number";
        return;
      }

      if (!this.type) {
        this.error_message = "Please specify a Customer or Agent account";
        return;
      }
      var auth_url = this.base_url + "/api/" + this.type + "/co/authenticate";
      var payload = {
        msisdn: this.msisdn,
        pin: this.pin,
        invoice_number: this.invoice_number
      };
      this.loading = true;

      Vue.axios.post(auth_url, payload).then(function (response) {
        _this.loading = false;
        _this.accounts = response.data.filter(function (v) {
          return v.currency == _this.currency;
        });
        _this.balance = Number(_this.accounts[0].balance);
        _this.can_view_accounts = true;
        _this.agent_fee = Number(_this.agent_fee) + Number(_this.accounts[0].agent_fee) || 0;
        _this.total_amount = Number(_this.total_amount) + Number(_this.agent_fee);

        $("#main_page").hide();
        $("#account_page").show();
      }).catch(function () {
        _this.loading = false;
        _this.error_message = "Authentication failed. Please check that your PIN or PhoneNumber is correct !";
      });
    },
    validate_msisdn: function validate_msisdn(msisdn) {
      var found = msisdn.match(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g);
      if (found != null && found.length > 0) return true;
      return false;
    }
  }, (0, _defineProperty3.default)(_methods, "formatNumber", function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }), (0, _defineProperty3.default)(_methods, "request_otp", function request_otp() {
    var _this2 = this;

    var otp_url = this.base_url + "/api/" + this.type + "/otp/request";

    var payload = {
      msisdn: this.msisdn
    };
    Vue.axios.post(otp_url, payload).then(function (response) {
      $("#account_page").hide();
      _this2.show_otp_page = true;
    }).catch(function () {
      _this2.loading = false;
      _this2.error_message = "An error occurred. Try again later !";
    });
  }), (0, _defineProperty3.default)(_methods, "authorize_payment", function authorize_payment() {
    var _this3 = this;

    this.error_message = null;
    var authorize_url = this.base_url + "/api/" + this.type + "/co/make/payment";

    var found = this.accounts.filter(function (v) {
      return v.id == _this3.selected_account;
    });

    if (!this.one_time_pin_code) {
      this.error_message = "Enter the code received on your phone/email";
      return;
    }

    if (!this.selected_account) {
      this.error_message = "Select an account to pay from !";
      return;
    }

    if (parseFloat(found[0].balance) <= 0) {
      this.error_message = "Account has insufficient funds !";
      return;
    }

    if (parseFloat(found[0].balance) < parseFloat(this.payment_mode_amount)) {
      this.error_message = "Account has insufficient funds !";
      return;
    }

    this.processing = true;
    var payload = {
      otp: this.one_time_pin_code,
      invoice_number: this.invoice_number,
      authorized_amount: this.payment_mode_amount,
      pesaflow_account_id: this.selected_account,
      msisdn: this.msisdn
    };
    Vue.axios.post(authorize_url, payload).then(function () {
      _this3.processing = false;
      _this3.can_view_accounts = false;
      _this3.show_otp_page = false;
      _this3.type = null;
      _this3.msisdn = null;
      _this3.pin = null;
      _this3.one_time_pin_code = null;
      _this3.success_message = "Your payment of " + _this3.currency + "." + _this3.payment_mode_amount + " for invoice " + _this3.invoice_number + " was successful. Redirecting you ...";
      $("#main_page").show();
      $("#account_page").hide();

      setInterval(function () {
        _this3.redirect();
      }, 2500);
    }).catch(function () {
      _this3.processing = false;
      _this3.error_message = "Payment failed. Try again Later !";
    });
  }), (0, _defineProperty3.default)(_methods, "redirect", function redirect() {
    if (this.callback_url != null && this.callback_url.length > 0) {
      window.top.location.href = this.callback_url;
    }
  }), _methods)
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"pesaflowAccountProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"pesaflowAccountProcessingModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using "+_vm._s(_vm.sys_name)+" Account")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v("\n                    "+_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount))+"\n                  ")])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[(_vm.error_message)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.error_message)+"\n                  ")]):_vm._e(),_vm._v(" "),(_vm.success_message)?_c('div',{staticClass:"alert alert-success",attrs:{"role":"alert"}},[_vm._v("\n                    "+_vm._s(_vm.success_message)+"\n                  ")]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('div',[_c('span',{staticClass:"spinner-border spinner-border",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v("\n                    Please wait, loading ...\n                  ")]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('br'):_vm._e(),_vm._v(" "),(!_vm.can_view_accounts && !_vm.success_message)?_c('div',{attrs:{"id":"main_page"}},[_c('form',[_c('label',{attrs:{"for":"email"}},[_vm._v("Mobile Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Enter your phone number"},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("PIN")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.pin),expression:"pin"}],staticClass:"form-control",attrs:{"type":"password","placeholder":"Enter your PIN","maxlength":"4"},domProps:{"value":(_vm.pin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.pin=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.customer_allowed_to_transact)?_c('div',{staticClass:"form-check form-check-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.type),expression:"type"}],staticClass:"form-check-input",attrs:{"type":"radio","id":"inlineCheckbox1","value":"customer"},domProps:{"checked":_vm._q(_vm.type,"customer")},on:{"change":function($event){_vm.type="customer"}}}),_vm._v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"inlineCheckbox1"}},[_vm._v("Customer")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-check form-check-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.type),expression:"type"}],staticClass:"form-check-input",attrs:{"type":"radio","id":"inlineCheckbox2","value":"agent"},domProps:{"checked":_vm._q(_vm.type,"agent")},on:{"change":function($event){_vm.type="agent"}}}),_vm._v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"inlineCheckbox2"}},[_vm._v(_vm._s(_vm.sys_name)+" Agent")])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-end"},[_c('a',{staticClass:"btn btn-sm btn-outline-primary lift",attrs:{"href":"#"},on:{"click":_vm.authenticate}},[_vm._v("Proceed")])])])]):_vm._e(),_vm._v(" "),(_vm.processing)?_c('div',[_c('span',{staticClass:"spinner-border spinner-border",attrs:{"role":"status","aria-hidden":"true"}}),_vm._v("\n                    Please wait, processing payment ...\n                  ")]):_vm._e(),_vm._v(" "),(_vm.processing)?_c('br'):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"display":"none"},attrs:{"id":"account_page"}},[(_vm.balance <= 0)?_c('p',[_vm._v("\n                      You have insufficient balance. Toup up your account to\n                      proceed\n                    ")]):_vm._e(),_vm._v(" "),_c('label',{attrs:{"for":"email"}},[_vm._v("Select Account to pay from")]),_vm._v(" "),_c('div',[_vm._l((_vm.accounts),function(account,index){return _c('ul',{key:index},[_c('div',{staticClass:"form-check"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_account),expression:"selected_account"}],staticClass:"form-check-input",attrs:{"type":"radio","name":account.name,"id":index},domProps:{"value":account.id,"checked":_vm._q(_vm.selected_account,account.id)},on:{"change":function($event){_vm.selected_account=account.id}}}),_vm._v(" "),_c('label',{staticClass:"form-check-label",attrs:{"for":"exampleRadios1"}},[_vm._v("\n                            "+_vm._s(account.name)+"(\n                            "),_c('b',[_vm._v("Bal. "+_vm._s(account.currency)+"\n                              "+_vm._s(_vm.formatNumber(account.balance)))]),_vm._v(")\n                          ")])])])}),_vm._v(" "),_c('br')],2),_vm._v(" "),(_vm.selected_account)?_c('div',[_c('label',{attrs:{"for":"email"}},[_vm._v("Select Payment Mode")]),_vm._v(" "),_c('ul',[_c('div',{staticClass:"row"},[(_vm.partial_payment_allowed)?_c('div',{staticClass:"col-6"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.payment_type),expression:"payment_type"}],staticClass:"form-check-input",attrs:{"type":"radio","value":"Partial"},domProps:{"checked":_vm._q(_vm.payment_type,"Partial")},on:{"click":function($event){return _vm.setPaymentModeAmount('partial')},"change":function($event){_vm.payment_type="Partial"}}}),_vm._v(" "),_c('label',{staticClass:"form-check-label"},[_vm._v(" Partial ")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-6"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.payment_type),expression:"payment_type"}],staticClass:"form-check-input",attrs:{"type":"radio","value":"full"},domProps:{"checked":_vm._q(_vm.payment_type,"full")},on:{"click":function($event){return _vm.setPaymentModeAmount('full')},"change":function($event){_vm.payment_type="full"}}}),_vm._v(" "),_c('label',{staticClass:"form-check-label"},[_vm._v(" Full ")])])])]),_vm._v(" "),(_vm.part_payment)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.payment_mode_amount),expression:"payment_mode_amount"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"amount"},domProps:{"value":(_vm.payment_mode_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.payment_mode_amount=$event.target.value}}}):_vm._e(),_vm._v(" "),(!_vm.part_payment)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.payment_mode_amount),expression:"payment_mode_amount"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"amount","readonly":""},domProps:{"value":(_vm.payment_mode_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.payment_mode_amount=$event.target.value}}}):_vm._e(),_vm._v(" "),_c('br')]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-end"},[(!_vm.processing &&
                          _vm.can_view_accounts &&
                          _vm.selected_account &&
                          _vm.payment_mode_amount &&
                          _vm.balance > 0
                          )?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"#"},on:{"click":_vm.request_otp}},[_vm._v("Proceed")]):_vm._e()])]),_vm._v(" "),(_vm.show_otp_page)?_c('div',[_c('label',{attrs:{"for":"email"}},[_vm._v("Enter One Time Pin sent to your phone")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.one_time_pin_code),expression:"one_time_pin_code"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter Code Received","maxlength":"8"},domProps:{"value":(_vm.one_time_pin_code)},on:{"input":function($event){if($event.target.composing){ return; }_vm.one_time_pin_code=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-end"},[(!_vm.processing &&
                          _vm.can_view_accounts &&
                          _vm.selected_account &&
                          _vm.show_otp_page
                          )?_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"#"},on:{"click":_vm.authorize_payment}},[_vm._v("Confirm Payment")]):_vm._e()])]):_vm._e()]),_vm._v(" "),_vm._m(1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10c51c28", __vue__options__)
  } else {
    hotAPI.reload("data-v-10c51c28", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/PesalinkV2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "cards",
  props: ["status_api_url", "invoice_no", "callback_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      total_amount: 0
    };
  },

  mounted: function mounted() {
    var _this = this;

    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.logo = this.$attrs["logo"];
    this.set_total_amount();
    $("#pesalinkModal").on("hidden.bs.modal", function () {
      _this.destroyTimer();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"pesalinkModal","tabindex":"-1","role":"dialog","aria-labelledby":"pesalinkModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"alert alert-warning mt-4"},[_vm._v("Service currently available for Credit Bank, DTB, KWFT and BOA. Other banks to join soon.")]),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay using Pesalink")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+"."+_vm._s(_vm.total_amount))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('ol',[_c('li',[_vm._v("Log in to your Bank App or USSD")]),_vm._v(" "),_c('li',[_vm._v("Select Pesalink")]),_vm._v(" "),_c('li',[_vm._v("Go to “Send to Phone” option")]),_vm._v(" "),_c('li',[_vm._v("Type 206206 as the phone number.")]),_vm._v(" "),_c('li',[_vm._v("Select Bank")]),_vm._v(" "),_c('li',[_vm._v("Enter the Amount. "+_vm._s(_vm.currency)+" "+_vm._s(_vm.total_amount))]),_vm._v(" "),_c('li',[_vm._v("Reason for payment enter : "+_vm._s(_vm.invoice_no))]),_vm._v(" "),_c('li',[_vm._v("Complete the transaction")]),_vm._v(" "),_c('li',[_vm._v("\n                      You will receive an SMS confirmation from Pesalink (if your number is linked) and also from\n                      your bank.\n                    ")])]),_vm._v(" "),_c('p',{staticClass:"mb-0"},[_vm._v("After you receive a successful reply, click the complete button below.")])]),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"pesalink","status_api_url":_vm.status_api_url,"invoice_no":_vm.invoice_no,"callback_url":_vm.callback_url}})],1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e97f592", __vue__options__)
  } else {
    hotAPI.reload("data-v-4e97f592", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/Topup.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Topup",
  data: function data() {
    return {
      invoice_id: null,
      account_id: null,
      amount: null,
      topup_url: null,
      phone: null
    };
  },

  mounted: function mounted() {
    this.topup_url = this.$attrs["topup_url"];
    this.account_id = this.$attrs["account_id"];
    this.phone = this.$attrs["msisdn"];
    this.invoice_id = this.$attrs["invoice_id"];
  },
  methods: {
    request_topup: function request_topup() {
      if (this.account_id == null || this.account_id === "") {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "It seems your agent account is not activated. Contact support for assistance"
        });
        return;
      }
      if (this.amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount !"
        });
        return;
      }
      if (this.phone == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter/contact support to set your agent phone number !"
        });
        return;
      }
      if (this.amount <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount greater than 0"
        });
        return;
      }

      window.location.href = this.topup_url + "?amount=" + this.amount + "&account_id=" + this.account_id + "&msisdn=" + this.phone + "&invoice=" + this.invoice_id;
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-primary",attrs:{"href":"#","data-toggle":"modal","data-target":"#topup-modal"}},[_vm._v("Top up")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"topup-modal","tabindex":"-1","role":"dialog","aria-labelledby":"topup-modal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"id":"topup-modal","role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Topup Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","placeholder":"e.g 30"},domProps:{"value":(_vm.amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right"}},[_vm._v("Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.phone),expression:"phone"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"e.g 254.........","readonly":""},domProps:{"value":(_vm.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.phone=$event.target.value}}})])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Submit"},on:{"click":_vm.request_topup}})])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Topup Account")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ed67742", __vue__options__)
  } else {
    hotAPI.reload("data-v-0ed67742", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/UBAV2.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#unionpayCardProcessingModal .modal-body[data-v-71f135a2] {\n  height: 75vh;\n  overflow-y: auto;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "Pay",
  props: ["callback_url", "request_type", "return_url"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      base_url: "",
      total_amount: 0,
      shortcode: null,
      gateway: null,
      stkOpen: false,
      stk_phone: null,
      show_uba_content: false,
      hide_proceed: false,
      initiating: false,
      iframe: null,
      iframeDoc: null,
      html: "",
      error: null
    };
  },

  computed: {
    valid_phone: function valid_phone() {
      if (this.stk_phone) {
        if (this.stk_phone.match(/\d{9}/g)) {
          return true;
        }
      }
      return false;
    }
  },
  mounted: function mounted() {
    window.jQuery = _jquery2.default;
    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.shortcode = this.$attrs["shortcode"];
    this.gateway = this.$attrs["gid"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.base_url = this.$attrs["base_url"];
    console.log("Return URL is ", this.return_url);
    this.set_total_amount();
  },
  methods: {
    formatNumber: function formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    toggleStkOpen: function toggleStkOpen() {
      if (this.stkOpen) {
        this.stkOpen = false;
      } else {
        this.stkOpen = true;
      }
    },

    set_total_amount: function set_total_amount() {
      this.total_amount = Math.ceil(parseFloat(this.invoice_amount) + parseFloat(this.fee) + parseFloat(this.agent_fee));
    },
    stk_menu: function stk_menu() {
      var _this = this;

      this.initiating = true;
      var urlIs = this.base_url + "/api/payment/uba/checkout";
      var api_headers = {
        Authorization: "****"
      };
      var params = {
        invoice_number: this.invoice_number,
        gateway_id: this.gateway,
        amount: this.total_amount,
        callback_url: this.callback_url,
        return_url: this.return_url
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _this.initiating = false;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Request Failed (422). Try Later or Pay Directly to the bank"
          });
        } else {
          _this.initiating = false;
          $("#ubaProcessingModal .close").click();
          _this.load_uba_content(response.data.html);
        }
      }).catch(function (error) {
        _this.initiating = false;
        _this.show_uba_content = false;
        _this.hide_proceed = false;
        $("#ubaCardProcessingModal").hide();
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Request Failed. Try Later or Pay Directly to the bank"
        });
      }).then(function () {
        _this.initiating != true;
        _this.stk_phone = null;
      });
    },
    load_uba_content: function load_uba_content(winHtml) {
      window.top.location.href = URL.createObjectURL(new Blob([winHtml], { type: "text/html" }));
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"ubaProcessingModal","tabindex":"-1","role":"dialog","aria-labelledby":"ubaModalLabel","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-full",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body d-flex align-items-center"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6 mx-auto"},[_c('img',{staticClass:"navbar-brand-img",attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('div',{staticClass:"card mt-3"},[_c('div',{staticClass:"card-header d-flex justify-content-between"},[_c('p',{staticClass:"mb-0"},[_vm._v("Pay Using UBA")]),_vm._v(" "),_c('p',{staticClass:"mb-0 lead"},[_vm._v(_vm._s(_vm.currency)+" "+_vm._s(_vm.formatNumber(_vm.total_amount)))])]),_vm._v(" "),_c('div',{staticClass:"card-body"},[_c('a',{attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.toggleStkOpen()}}},[_vm._v("Click here to proceed")]),_vm._v(" "),(_vm.stkOpen)?_c('div',{staticClass:"card-body"},[_c('div',{staticClass:"row"},[_c('label',[_vm._v("Phone Number\n                        "),(!_vm.valid_phone)?_c('span',{staticStyle:{"color":"red"}},[_vm._v("* required")]):_vm._e()]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.stk_phone),expression:"stk_phone"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Enter a valid phone number e.g 09.."},domProps:{"value":(_vm.stk_phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.stk_phone=$event.target.value}}})]),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.valid_phone)?_c('div',{staticClass:"row"},[(_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary"},[_c('span',{staticClass:"spinner-grow spinner-grow-sm"}),_vm._v("\n                        Processing ...\n                      ")]):_vm._e(),_vm._v(" "),(!_vm.initiating)?_c('button',{staticClass:"btn btn-sm btn-primary",attrs:{"type":"button"},on:{"click":_vm.stk_menu}},[_vm._v("\n                        Initiate Payment\n                      ")]):_vm._e()]):_vm._e()]):_vm._e()]),_vm._v(" "),_vm._m(1)])])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header d-flex align-items-center"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{staticClass:"fe fe-x text-dark",attrs:{"aria-hidden":"true"}})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center"},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"}},[_vm._v("Cancel")])])}]
__vue__options__._scopeId = "data-v-71f135a2"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71f135a2", __vue__options__)
  } else {
    hotAPI.reload("data-v-71f135a2", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/UnionpayV2.vue", function(exports, require, module) {
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert("#unionpayCardProcessingModal .modal-body[data-v-10cf6233] {\n  height: 75vh;\n  overflow-y: auto;\n}\n\n#card_page .page[data-v-10cf6233] {\n  position: absolute;\n  height: 100%;\n  width: 94.4%;\n  border: 1px #666;\n}")
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: "UPay",
  props: ["callback_url", "request_type"],
  data: function data() {
    return {
      currency: null,
      logo: null,
      invoice_amount: null,
      agent_fee: 0,
      fee: 0,
      invoice_number: null,
      url: null,
      due_amount: null,
      merId: null,
      trxtime: null,
      loader: null,
      iframe: null,
      iframeDoc: null,
      error: false
    };
  },

  mounted: function mounted() {
    var _this = this;

    $("#unionpayCardProcessingModal").on("hidden.bs.modal", function () {
      if (this.error == false) {
        var card = document.getElementById("card_pagev2");
        var c = $("#card_pagev2").find("iframe")[0];
        card.removeChild(c);
      }
      this.iframe = null;
      this.iframeDoc = null;
      this.destroyTimer();
    });

    this.invoice_number = this.$attrs["invoice_no"];
    this.invoice_amount = this.$attrs["amount_net"];
    this.currency = this.$attrs["currency"];
    this.fee = this.$attrs["fee"];
    this.agent_fee = this.$attrs["agent_fee"];
    this.url = this.$attrs["status_api_url"];
    this.logo = this.$attrs["logo"];
    this.mpgs_url = this.$attrs["mpgs_url"];
    this.merId = this.$attrs["merchant_id"];
    this.trxtime = this.$attrs["trxtime"];
    this.loader = this.$attrs["loader"];
    this.calculate_due();

    $("#unionpayCardProcessingModal").on("shown.bs.modal", function () {
      _this.load_union_pay();
    });
  },
  methods: {
    destroyTimer: function destroyTimer() {
      this.$refs.timer.destroyTimer();
    },

    calculate_due: function calculate_due(event) {
      var flAmnt = parseFloat(this.invoice_amount);
      var flFee = parseFloat(this.fee);
      var agFee = parseFloat(this.agent_fee);
      this.due_amount = (flAmnt + flFee + agFee) * 100;
    },

    load_union_pay: function load_union_pay(e) {
      var _this2 = this;

      $("#card_pagev2").show();

      this.iframe = document.createElement("iframe");

      document.getElementById("card_pagev2").appendChild(this.iframe);
      this.iframe.setAttribute("style", "width:100%;");

      this.iframe.style.height = document.getElementById("card_pagev2").scrollHeight + 25 + "px";

      var data = {
        txnTime: this.trxtime,
        txnAmt: this.due_amount,
        merId: this.merId,
        orderId: this.invoice_number + "PN",
        currency: this.currency
      };
      var options = {
        headers: { "Content-Type": "application/json" }
      };
      Vue.axios.post(this.mpgs_url, data, options).then(function (response) {
        if (_this2.iframe.contentWindow) {
          _this2.iframeDoc = _this2.iframe.contentWindow;
        } else if (_this2.iframe.contentDocument.document) {
          _this2.iframeDoc = _this2.iframe.contentDocument.document;
        } else if (_this2.iframe.contentDocument) {
          _this2.iframeDoc = _this2.iframe.contentDocument;
        } else {
          _this2.error = true;
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "We are unable to process this payment at this time. Try other payment options provided"
          });
          return;
        }

        _this2.iframeDoc.document.open();
        _this2.iframeDoc.document.write(response.data);
        _this2.iframeDoc.document.close();
      }).catch(function (error) {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"unionpayCardProcessingModal",staticClass:"modal fade",attrs:{"id":"unionpayCardProcessingModal","aria-labelledby":"unionpayCardProcessingModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-xl modal-dialog-centered"},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('div',{staticClass:"card-footer d-flex justify-content-end align-items-center",attrs:{"id":"option_buttons"}},[_c('a',{staticClass:"btn btn-link text-dark px-5",attrs:{"href":"#","data-dismiss":"modal"},on:{"click":_vm.destroyTimer}},[_vm._v("Cancel")]),_vm._v(" "),_c('complete-button',{ref:"timer",attrs:{"gateway":"unionpay","status_api_url":_vm.url,"invoice_no":_vm.invoice_number,"callback_url":_vm.callback_url}})],1)])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h3',{staticClass:"modal-title",attrs:{"id":"unionpayCardProcessingModal"}},[_vm._v("\n            Processing your payment, please wait...\n          ")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-body"},[_c('span',[_vm._v("Do not close this window until your payment processing is\n            complete.")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticStyle:{"height":"100%"},attrs:{"id":"card_pagev2"}}),_vm._v(" "),_c('br')])}]
__vue__options__._scopeId = "data-v-10cf6233"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10cf6233", __vue__options__)
  } else {
    hotAPI.reload("data-v-10cf6233", __vue__options__)
  }
})()}
});

;require.register("js/components/iframev2/stepupForm.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ["stepupURL", "token", "md", "origin"],
    mounted: function mounted() {
        this.submitForm();
        window.addEventListener("message", this.handleMessage, false);
    },

    methods: {
        submitForm: function submitForm() {
            this.$refs.stepupForm.submit();
        },

        handleMessage: function handleMessage(event) {
            if (event.origin === this.origin) {
                this.$emit("stepupChecked", event.data);
            }
        }
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener("message", this.handleMessage, false);
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('iframe',{attrs:{"name":"step-up-iframe","width":"400","height":"400"}}),_vm._v(" "),_c('form',{ref:"stepupForm",attrs:{"target":"step-up-iframe","method":"POST","action":_vm.stepupURL}},[_c('input',{attrs:{"type":"hidden","name":"JWT"},domProps:{"value":_vm.token}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":"MD"},domProps:{"value":_vm.md}})])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71486f09", __vue__options__)
  } else {
    hotAPI.reload("data-v-71486f09", __vue__options__)
  }
})()}
});

;require.register("js/components/index.js", function(exports, require, module) {
'use strict';

var _vue = require('vue/dist/vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.component('vue-select', require('vue-select').default);
_vue2.default.component('modal', require('./Modal.vue'));
_vue2.default.component('prompt', require('./Prompt.vue'));
_vue2.default.component('user-form', require('./user/user_form.vue'));
_vue2.default.component('select2', require('./multiselect2.vue'));
_vue2.default.component('role-form', require('./role.vue'));
_vue2.default.component('edit-service-form', require('./service_form').default);
_vue2.default.component('vue-datepicker', require('vue2-datepicker').default);
_vue2.default.component('owner-type-selector', require('./owner-type-selector'));
_vue2.default.component('service-bank-config', require('./admin/ServiceBankConfig.vue'));

//Agency components
_vue2.default.component('agent-float-balance', require('./agency/AgentFloatBalance.vue'));
_vue2.default.component('agent-dashboard', require('./agency/AgentDashboard.vue'));
_vue2.default.component('agent-money-tools', require('./agency/DWComponent.vue'));
_vue2.default.component('agent-revenue-30day-chart', require('./agency/RevenueChart.vue'));
_vue2.default.component('agent-customer-30day-chart', require('./agency/CustomerChart.vue'));
_vue2.default.component('customer-modal', require('./agency/CustomerModal.vue'));
_vue2.default.component('bank-account-modal', require('./agency/BankAccountModal.vue'));
_vue2.default.component('add-agent-service-modal', require('./agency/AddAgentServiceModal.vue'));
_vue2.default.component('customer-service-invoice-modal', require('./agency/CustomerServiceInvoiceModal.vue'));
_vue2.default.component('change-pwd-modal', require('./agency/ChangePwdModal.vue'));
_vue2.default.component('change-pin-modal', require('./agency/ChangePin.vue'));

_vue2.default.component('withdrawals-list', {
    props: ['date-range'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            if (this.date_range && this.date_range[0] && this.date_range[1]) {
                return this.date_range.join(' - ');
            }
            return '';
        }
    },
    mounted: function mounted() {
        if (this.dateRange) {
            this.date_range = this.dateRange.split(' - ');
        }
    },

    methods: {
        applyFilter: function applyFilter() {
            this.$nextTick(function () {
                document.getElementById('filter-form').submit();
            });
        }
    }
});

_vue2.default.component('ledgers-list', {
    props: ['date-range'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            if (this.date_range && this.date_range[0] && this.date_range[1]) {
                return this.date_range.join(' - ');
            }
            return '';
        }
    },
    mounted: function mounted() {
        if (this.dateRange) {
            this.date_range = this.dateRange.split(' - ');
        }
    },

    methods: {
        applyFilter: function applyFilter() {
            this.$nextTick(function () {
                document.getElementById('filter-form').submit();
            });
        }
    }
});

_vue2.default.component('transactions-list', {
    props: ['date-range'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            if (this.date_range && this.date_range[0] && this.date_range[1]) {
                return this.date_range.join(' - ');
            }
            return '';
        }
    },
    mounted: function mounted() {
        if (this.dateRange) {
            this.date_range = this.dateRange.split(' - ');
        }
    },

    methods: {
        applyFilter: function applyFilter() {
            this.$nextTick(function () {
                document.getElementById('filter-form').submit();
            });
        }
    }
});

_vue2.default.component('self-signup', require('./agency/SelfSignUp.vue'));
_vue2.default.component('topup-button', require('./iframev2/Topup.vue'));
_vue2.default.component('pay-from-account-button', require('./iframev2/Pay.vue'));
_vue2.default.component('complete-button', require('./iframev2/Complete.vue'));
_vue2.default.component('mpesa-v2', require('./iframev2/MpesaV2.vue'));
_vue2.default.component('mpesa-v3', require('./iframev2/MpesaV3.vue'));
_vue2.default.component('card-v2', require('./iframev2/CardV2.vue'));
_vue2.default.component('card-v3', require('./iframev2/CardV3.vue'));
_vue2.default.component('eazzypay-v2', require('./iframev2/EazzypayV2.vue'));
_vue2.default.component('airtel-v2', require('./iframev2/AirtelmoneyV2.vue'));
_vue2.default.component('kcbcash-v2', require('./iframev2/KcbcashV2.vue'));
_vue2.default.component('kcb-mpesa', require('./iframev2/Kcbmpesa.vue'));
_vue2.default.component('equitycash-v2', require('./iframev2/EquitycashV2.vue'));
_vue2.default.component('pesalink-v2', require('./iframev2/PesalinkV2.vue'));
_vue2.default.component('capitalpay-v2', require('./iframev2/CapitalPayV2.vue'));
_vue2.default.component('pesaflow-account-v2', require('./iframev2/PesaflowInternal.vue'));
_vue2.default.component('payment-instructions', require('./iframev2/PaymentInstructions.vue'));
_vue2.default.component('fdh-bank-gateway', require('./iframev2/FDH.vue'));
_vue2.default.component('orangemoney-v2', require('./iframev2/OrangeMoneyV2.vue'));
_vue2.default.component('afrimoney-v2', require('./iframev2/AfriMoneyV2.vue'));
_vue2.default.component('uba-v2', require('./iframev2/UBAV2.vue'));
_vue2.default.component('equitycheckout', require('./iframev2/EquityCheckout.vue'));
_vue2.default.component('ecocash', require('./iframev2/EcoCash.vue'));
_vue2.default.component('cybersource', require('./iframev2/Cybersource.vue'));
_vue2.default.component('airtel-v2', require('./iframev2/AirtelV2.vue'));
_vue2.default.component('mpamba-v2', require('./iframev2/MpambaV2.vue'));
_vue2.default.component('agency-rev-share-form', require('./agency/AgencyServiceRevShare.vue'));
_vue2.default.component('business-metadata-form', require('./agency/BusinessMetadataForm.Vue'));
_vue2.default.component('unionpay-v2', require('./iframev2/UnionpayV2.vue'));
_vue2.default.component('admin-dashboard', require('./admin/AdminDashboard.vue'));
_vue2.default.component('admin-service-leader-board', require('./admin/AdminServiceLeaderBoard.vue'));
_vue2.default.component('admin-applications-per-gateway', require('./admin/AdminApplicationsPerGateway.vue'));
_vue2.default.component('admin-applications-customer-revenue', require('./admin/AdminApplicationCustomersRevenue.vue'));
_vue2.default.component('admin-invoice-tracker', require('./admin/AdminInvoiceTracker.vue'));
_vue2.default.component('pesaflow-gateway', require('./iframev2/Pesaflow.vue'));
_vue2.default.component('withdrawal-tool', require('./shared/WithdrawalTool.vue'));
_vue2.default.component('payment-notification-reset-modal', require('./admin/AdminPaymentNotificationsReset.vue'));
_vue2.default.component('service-rev-share-form', require('./admin/AdminServicesRevShare.vue'));
_vue2.default.component('admin-create-account-form', require('./admin/AdminAccountModalForms.vue'));
_vue2.default.component('self-signup-wizard', require('./web/SelfSignUpWizard.vue'));
_vue2.default.component('business-signup-wizard', require('./web/SelfSignUpBusinessWizard.vue'));
_vue2.default.component('excel-exporter', require('./shared/excel-exporter.vue'));
//Vue.component('business-signup-wizard', require('./web/business_signup.vue'))
//merchant
_vue2.default.component('merchant-invoice-create-form', require('./merchant/InvoiceCreateForm.vue'));
_vue2.default.component('service-invoice-template-form', require('./admin/ServiceInvoiceTemplateForm.vue'));
_vue2.default.component('mark-as-used-button', require('./admin/AdminMarkInvoiceAsUsedButton.vue'));
_vue2.default.component('login-form', require('./user/login.vue'));
_vue2.default.component('new-login-form', require('./user/loginV2.vue'));
_vue2.default.component('TimerComponent', require('./user/TimerComponent.vue'));
_vue2.default.component('lazy-load-list', require('./admin/AdminLazyLoadList.vue'));

//Vue.component('lazy-loaded-invoice', require('./shared/invoices.vue'))

_vue2.default.component('payment-gateway-form', require('./payment_gateway_form').default);

//settlement dashboard
_vue2.default.component('settlement-dashboard', require('./admin/SettlementDashboard.vue'));
_vue2.default.component('settlement-details', require('./admin/SettlementDetails.vue'));
_vue2.default.component('settlement-modal', require('./shared/SettlementModal.vue'));
_vue2.default.component('agency-dashboard', require('./admin/AgencyDashboard.vue'));
_vue2.default.component("agency-revenue-30day-chart", require('./agency/AgencyRevenue.vue'));
_vue2.default.component("agency-customer-30day-chart", require('./agency/AgencyCustomers.vue'));
_vue2.default.component("service-form", require('./admin/ServiceForm.vue'));
_vue2.default.component('batch-withdraw-form', require('./admin/BatchWithdrawForm.vue'));
_vue2.default.component('manual-recon', require('./admin/ManualRecon.vue'));
_vue2.default.component('download-report', require('./admin/DownloadReport.vue'));
_vue2.default.component('device-data-collection', require('./iframev2/DeviceDataCollection.vue'));
_vue2.default.component('maker-checker', require('./admin/MakerChecker.vue'));
_vue2.default.component('show-task', require('./admin/ShowTask.vue'));
_vue2.default.component('payment-date-picker', {
    props: ['daterange'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            return this.date_range;
        }
    },
    mounted: function mounted() {
        this.date_range = this.daterange;
    },

    methods: {
        disableFutureDates: function disableFutureDates(date) {
            return date > new Date();
        },
        applyFilter: function applyFilter() {
            this.$nextTick(function () {
                var gateway = $("#gateway").val();
                var ref_no = $("#ref_no").val();
                var name = $("#name").val();
                var source = $("#source").val();
                var amount = $("#amount").val();
                var type = $("#type").val();
                var date = $("#payment_date").val();
                var gateway_transaction_id = $("#gateway_transaction_id").val();

                window.top.location.href = "/payments/new?query[gateway]=" + gateway + "&query[name]=" + name + "&query[gateway_transaction_date]=" + date + "&query[gateway_transaction_id]=" + gateway_transaction_id + "&query[ref_no]=" + ref_no + "&query[amount]=" + amount + "&query[source]=" + source + "&query[type]=" + type + "&query[notification_attachment]=";
            });
        }
    }
});

_vue2.default.component('invoice-date-picker', {
    props: ['daterange'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            return this.date_range;
        }
    },
    mounted: function mounted() {
        this.date_range = this.daterange;
    },

    methods: {
        disableFutureDates: function disableFutureDates(date) {
            return date > new Date();
        },
        applyFilter: function applyFilter() {
            var _this = this;

            this.$nextTick(function () {
                window.top.location.href = "/invoices?query[date_range]=" + _this.date_range;
            });
        }
    }

});

_vue2.default.component('audit_log_date_picker', {
    props: ['daterange'],
    data: function data() {
        return {
            date_range: null
        };
    },

    computed: {
        current_range: function current_range() {
            return this.date_range;
        }
    },
    mounted: function mounted() {
        this.date_range = this.daterange;
    },

    methods: {
        disableFutureDates: function disableFutureDates(date) {
            return date > new Date();
        },
        applyFilter: function applyFilter() {
            var _this2 = this;

            this.$nextTick(function () {
                window.top.location.href = "/audit-logs?filter[date_range]=" + _this2.date_range;
            });
        }
    }

});
});

;require.register("js/components/merchant/InvoiceCreateForm.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vue2Datepicker = require("vue2-datepicker");

var _vue2Datepicker2 = _interopRequireDefault(_vue2Datepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: { DatePicker: _vue2Datepicker2.default },
  data: function data() {
    return {
      customer_verified: false,
      is_validating: false,
      merchant_name: null,
      merchant_email: null,
      merchant_phone: null,
      merchant_address: null,
      merchant_website: null,
      merchant_id: null,
      account_id: null,
      avatar: null,
      logo: null,
      republic: null,
      surname: null,
      first_name: null,
      last_name: null,
      id_number: null,
      msisdn: null,
      invoice_items: [],
      item_desc: null,
      item_name: null,
      item_cost: null,
      item_quantity: null,
      merchants: [],
      merchant_services: [],
      service_currencies: [],
      selected_service: null,
      selected_merchant: null,
      metadata: null,
      verification_failed: false,
      verification_failed_error: null,
      due_date: null,
      api_token: "None",
      invoice_created: false,
      client_invoice_ref: null,
      consumer_secret: null,
      consumer_key: null,
      currency: null,
      default_currency: null,
      is_service_variable: false,
      all_services: [],
      allowed_merchants: [],
      notification_url: null,
      country_code: null,
      selected_invoice_type: "Select an invoice type",
      is_resident_invoice: false,
      is_foreigner_invoice: false,
      is_business_invoice: false,
      enable_invoice_id_validation: false,
      enable_invoice_passport_validation: false,
      enable_invoice_business_validation: false,
      display_service_verified: false,
      show_avatar: false,
      business_verified: false,
      can_process_invoice: false,
      service_utility_account_id: null,
      selected_utility_service_id: null,
      tax_date_period: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.consumer_secret = this.$attrs["con_secret"];
    this.consumer_key = this.$attrs["con_key"];
    this.client_invoice_ref = this.generate_req_ref();
    this.default_currency = this.$attrs["default_currency"];
    this.notification_url = this.$attrs["notification_url"];
    this.country_code = this.$attrs["country_code"];
    this.due_date = this.$attrs["duedate"];
    this.logo = this.$attrs["logo"];
    this.republic = this.$attrs["republic"];
    this.allowed_merchants = JSON.parse(this.$attrs["merchant_list"]);
    this.allowed_merchants.forEach(function (item) {
      var services = item.services;
      services.forEach(function (n) {
        var x = _this.service_currencies.indexOf(n.currency.symbol);
        if (x < 0) {
          _this.service_currencies.push(n.currency.symbol);
        }
      });
    });
  },

  methods: {
    applyFilter: function applyFilter(value) {
      if (typeof value == "undefined") {
        this.tax_date_period = null;
      } else {
        if (value[0].length <= 0 || value[1].length <= 0) {
          this.tax_date_period = null;
        } else {
          this.tax_date_period = "FROM " + value.join(" TO ");
        }
      }
    },
    set_invoice_id_validation_state: function set_invoice_id_validation_state(flag) {
      switch (flag) {
        case "false":
          this.enable_invoice_id_validation = false;
          this.customer_verified = false;
          this.avatar = this.$attrs["avatar"];
          this.display_service_verified = true;
          this.can_process_invoice = true;
          break;
        default:
          this.enable_invoice_id_validation = true;
          this.customer_verified = false;
          this.display_service_verified = false;
          this.can_process_invoice = !true;
          break;
      }
    },
    set_invoice_passport_validation_state: function set_invoice_passport_validation_state(flag) {
      switch (flag) {
        case "false":
          this.enable_invoice_passort_validation = false;
          this.customer_verified = false;
          this.avatar = this.$attrs["avatar"];
          this.display_service_verified = true;
          this.can_process_invoice = true;
          break;
        default:
          this.enable_invoice_passport_validation = true;
          this.display_service_verified = false;
          this.customer_verified = false;
          this.can_process_invoice = !true;
          break;
      }
    },
    set_invoice_business_validation_state: function set_invoice_business_validation_state(flag) {
      switch (flag) {
        case "false":
          this.enable_invoice_business_validation = false;
          this.customer_verified = false;
          this.avatar = this.$attrs["avatar"];
          this.display_service_verified = true;
          this.can_process_invoice = true;
          break;
        default:
          this.enable_invoice_business_validation = true;
          this.display_service_verified = false;
          this.customer_verified = false;
          this.can_process_invoice = !true;
          break;
      }
    },
    switchValidation: function switchValidation() {
      this.invalidate();
      switch (this.selected_invoice_type) {
        case "resident":
          this.is_resident_invoice = true;
          this.is_business_invoice = false;
          this.is_foreigner_invoice = false;
          this.set_invoice_id_validation_state(this.$attrs["enable_invoice_id_validation"]);
          break;
        case "foreigner":
          this.is_foreigner_invoice = true;
          this.is_resident_invoice = false;
          this.is_business_invoice = false;
          this.set_invoice_passport_validation_state(this.$attrs["enable_invoice_passport_validation"]);
          break;
        default:
          this.is_business_invoice = true;
          this.is_resident_invoice = false;
          this.is_foreigner_invoice = false;
          this.set_invoice_business_validation_state(this.$attrs["enable_invoice_business_validation"]);
          break;
      }
    },
    update_key_parameters: function update_key_parameters() {
      var _this2 = this;

      this.currency = null;
      this.service_currencies = [];
      if (this.selected_merchant != null) {
        this.merchant_id = this.selected_merchant.id;
        this.merchant_name = this.selected_merchant.name;
        this.merchant_email = this.selected_merchant.email;
        this.merchant_phone = this.selected_merchant.phone;
        var addr = this.selected_merchant.metadata.filter(function (m) {
          return m.item == "business_address";
        });
        if (addr.length > 0) {
          this.merchant_address = addr[0].value;
        } else {
          this.merchant_address = null;
        }
        var web = this.selected_merchant.metadata.filter(function (m) {
          return m.item == "business_url";
        });
        if (web.length > 0) {
          this.merchant_website = web[0].value;
        } else {
          this.merchant_website = null;
        }
        this.all_services = this.selected_merchant.services;
        this.all_services.forEach(function (n) {
          var x = _this2.service_currencies.indexOf(n.currency.symbol);
          if (x < 0) {
            _this2.service_currencies.push(n.currency.symbol);
          }
        });
      } else {
        this.selected_merchant = null;
      }
    },
    update_merchant_services: function update_merchant_services() {
      var _this3 = this;

      this.selected_service = null;
      this.invoice_items = [];

      if (this.selected_merchant != null) {
        this.merchant_services = this.all_services.filter(function (m) {
          return m.currency.symbol == _this3.currency;
        });
      }
    },
    set_cost_type: function set_cost_type() {
      this.item_quantity = this.item_cost = null;
      if (this.selected_service != null) {
        if (this.selected_service.cost_type == "variable") {
          this.is_service_variable = true;
        } else if (this.selected_service.cost_type == "fixed") {
          this.is_service_variable = false;
          this.item_cost = this.selected_service.cost;
        } else {
          this.is_service_variable = false;
        }
      } else {
        this.item_cost = null;
        this.is_service_variable = false;
      }
    },
    getOauthTokenAndCreateInvoice: function getOauthTokenAndCreateInvoice() {
      var _this4 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this4.api_token = response.data.token;
        _this4.create_invoice(_this4.api_token);
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred, if this persist, kindly contact customer support. Otherwise try again"
        });
      }).then(function () {});
    },
    validate_business: function validate_business() {
      var _this5 = this;

      this.is_validating = true;
      var url = "/api/business/lookup";

      if (this.id_number == null) {
        this.is_validating = !true;
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing Registration Number"
        });
        return;
      }
      if (this.first_name == null) {
        this.is_validating = !true;
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing Business Name"
        });
        return;
      }

      var payload = {
        registration_number: this.id_number
      };
      Vue.axios.post(url, payload).then(function (response) {
        var status = response.data.status;
        if (status == "ok") {
          var business_data = response.data.business;
          if (business_data.verified) {
            _this5.can_process_invoice = true;
            _this5.display_service_verified = true;
            _this5.customer_verified = true;
            _this5.first_name = business_data.business_name;
            _this5.business_verified = true;
            _this5.is_validating = false;
          } else {
            _this5.is_validating = !true;
            _sweetalert2.default.fire({
              icon: "error",
              text: "We are unable to verify your business details. Please check if business registration is valid !"
            });
          }
        }
      }).catch(function (error) {
        _this5.is_validating = !true;
        _sweetalert2.default.fire({
          icon: "error",
          text: "We are unable to verify your business details. Please try again later."
        });
      });
    },
    validate: function validate() {
      var _this6 = this;

      if (this.id_number == null) {
        this.is_validating = !true;
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing ID Number"
        });
        return;
      }
      if (this.first_name == null) {
        this.is_validating = !true;
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Missing first name as provided in ID"
        });
        return;
      }
      this.is_validating = true;

      var url = "/api/customer/verification/validate";
      var payload = {
        first_name: this.first_name,
        id_number: this.id_number,
        last_name: "n/a"
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this6.is_validating = false;
        _this6.customer_verified = response.data.verified;
        if (_this6.customer_verified) {
          _this6.display_service_verified = true;
          _this6.can_process_invoice = true;
          if (_this6.country_code.toLowerCase() == "ssd") {
            _this6.first_name = response.data.customer_data.last_name.toUpperCase();
            _this6.last_name = response.data.customer_data.other_names.toUpperCase();
            _this6.show_avatar = true;
            _this6.avatar = "data:image/png;base64," + response.data.customer_data.avatar;
          } else {
            _this6.first_name = response.data.customer_data.first_name.toUpperCase();
            _this6.last_name = response.data.customer_data.other_name.toUpperCase();
            _this6.avatar = _this6.$attrs["avatar"];
            _this6.show_avatar = true;
          }
        } else {
          _this6.can_process_invoice = !true;
          _this6.verification_failed = true;
          _this6.verification_failed_error = "ID Verification Failed";
        }
      }).catch(function (error) {
        _this6.can_process_invoice = !true;
        _this6.is_validating = false;
        _this6.verification_failed = true;
        _this6.verification_failed_error = "Something went wrong. Try again later";
      }).then(function () {
        _this6.is_validating = false;
      });
    },
    invalidate: function invalidate() {
      this.customer_verified = false;
      this.invoice_items = [];
      this.surname = null;
      this.first_name = null;
      this.last_name = null;
      this.msisdn = null;
      this.id_number = null;
      this.is_service_variable = false;
      this.item_quantity = null;
      this.selected_service = null;
      this.item_cost = null;
      this.selected_merchant = null;
      this.currency = null;
      this.item_desc = null;
      this.merchant_name = null;
      this.merchant_email = null;
      this.merchant_address = null;
      this.merchant_phone = null;
      this.merchant_website = null;
      this.client_invoice_ref = this.generate_req_ref();
      this.show_avatar = false;
      if (this.is_resident_invoice) {
        if (this.enable_invoice_id_validation) {
          this.can_process_invoice = !true;
        } else {
          this.can_process_invoice = true;
        }
      }
      if (this.is_foreigner_invoice) {
        if (this.enable_invoice_passort_validation) {
          this.can_process_invoice = !true;
        } else {
          this.can_process_invoice = true;
        }
      }

      if (this.is_business_invoice) {
        if (this.enable_invoice_business_validation) {
          this.can_process_invoice = !true;
        } else {
          this.can_process_invoice = true;
        }
      }
      this.selected_utility_service_id = null;
      this.service_utility_account_id = null;
      this.verification_failed_error = null;
    },
    remove: function remove(index) {
      this.item_quantity = null;
      this.selected_service = null;
      this.item_cost = null;
      this.invoice_items.splice(index, 1);
    },
    add_invoice_item: function add_invoice_item() {
      if (this.currency == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a currency !"
        });
        return;
      }
      if (this.selected_service == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a service to charge"
        });
        return;
      }

      this.service_utility_account_id = this.selected_service.account_id;
      this.selected_utility_service_id = this.selected_service.id;
      var service_desc = this.selected_service.name;
      if (this.is_service_variable) {
        if (this.item_desc == null || this.item_desc.length <= 0) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Please add a description"
          });
          return;
        }
        service_desc = service_desc + "-" + this.item_desc;
      }
      if (this.item_quantity <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a quantity value"
        });
        return;
      }
      if (this.item_cost <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Cost specified. Should be greater than 0 !"
        });
        return;
      }
      this.invoice_items.push({
        item_name: service_desc,
        unit_price: this.item_cost,
        item_cost: parseFloat(this.item_cost) * this.item_quantity,
        item_quantity: this.item_quantity,
        service_id: this.selected_service.id
      });
      this.item_quantity = null;
      this.selected_service = null;
      this.item_cost = null;
    },

    generate_req_ref: function generate_req_ref() {
      var length = 6;
      var result = "";
      var characters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result.toUpperCase();
    },
    prepare_invoice_items: function prepare_invoice_items() {
      var _this7 = this;

      var new_items = [];
      var index = 1;
      this.invoice_items.forEach(function (item) {
        new_items.push({
          desc: item.item_name,
          price: item.unit_price,
          quantity: item.item_quantity,
          item_ref: _this7.client_invoice_ref + "_" + index,
          tax_class: null,
          service_id: item.service_id,
          settlements: [],
          require_settlements: true,
          agent_user_id: null
        });
        index++;
      });
      return new_items;
    },

    process_invoice: function process_invoice() {
      var _this8 = this;

      if (this.first_name == null || this.id_number == null) {
        _sweetalert2.default.fire({
          icon: "warning",
          title: "Oops...",
          text: "Please fill in all the invoice details !"
        });
        return;
      }

      if (this.invoice_items.length <= 0) {
        _sweetalert2.default.fire({
          icon: "warning",
          title: "Oops...",
          text: "Invoice must have valid items !"
        });
        return;
      }
      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed",
        showLoaderOnConfirm: true,
        preConfirm: function preConfirm(login) {
          return _this8.getOauthTokenAndCreateInvoice();
        },
        allowOutsideClick: function allowOutsideClick() {
          return !_sweetalert2.default.isLoading();
        }
      }).then(function (result) {});
    },
    clean_null_entries: function clean_null_entries(v) {
      if (v == null) return "";
      return v;
    },
    verify_msisdn: function verify_msisdn(msisdn) {
      if (msisdn == null || msisdn === "") {
        return "N/A";
      }
      return msisdn;
    },
    create_invoice: function create_invoice(token) {
      var _this9 = this;

      if (this.currency == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "You haven't selected a currency !"
        });
        return;
      }

      var api_url = "/api/invoice/ui/create";
      var payload = {
        name: this.clean_null_entries(this.first_name) + " " + this.clean_null_entries(this.last_name),
        client_invoice_ref: this.client_invoice_ref,
        meta_data: {
          customer_msisdn: this.verify_msisdn(this.msisdn),
          tax_period: this.tax_date_period
        },
        msisdn: null,
        merchant_id: this.merchant_id,
        id_number: this.id_number,
        amount_expected: this.total,
        currency: this.currency,
        items: this.prepare_invoice_items(this.invoice_items),
        notification_url: this.notification_url,
        amount_settled_offline: 0
      };
      var api_headers = { Authorization: "Bearer " + token };
      var result = false;
      Vue.axios.post(api_url, payload, { headers: api_headers }).then(function (response) {
        if (response.data.status == 200) {
          _this9.invalidate();
          window.location.href = "/invoice/" + response.data.invoice.id;
        } else {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Unable to submit invoice. Contact Support for further assistance"
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Contact Support for further assistance"
        });
      }).then(function () {});

      return result;
    }
  },
  computed: {
    total: function total() {
      var sum = 0;
      return this.invoice_items.reduce(function (sum, item) {
        return sum + item.item_cost;
      }, 0);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row justify-content-center"},[_c('div',{staticClass:"col-12 col-lg-12 col-xl-12"},[_c('div',{staticClass:"header mt-md-5"},[_c('div',{staticClass:"header-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"header-pretitle"},[_vm._v("Invoices")]),_vm._v(" "),_c('h1',{staticClass:"header-title"},[_vm._v("\n                Invoice #INV-"+_vm._s(_vm.client_invoice_ref)+"\n              ")])]),_vm._v(" "),_c('div',{staticClass:"col-6"},[_c('v-select',{attrs:{"options":_vm.allowed_merchants,"label":"name","placeholder":"Select Merchant"},on:{"change":_vm.update_key_parameters},model:{value:(_vm.selected_merchant),callback:function ($$v) {_vm.selected_merchant=$$v},expression:"selected_merchant"}})],1),_vm._v(" "),_c('div',{staticClass:"col-2"},[_c('v-select',{attrs:{"options":_vm.service_currencies,"placeholder":"Select Currency"},on:{"change":_vm.update_merchant_services},model:{value:(_vm.currency),callback:function ($$v) {_vm.currency=$$v},expression:"currency"}})],1)])])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-xl-3"},[_c('div',{staticClass:"col-12"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_invoice_type),expression:"selected_invoice_type"}],staticClass:"form-control",attrs:{"tabindex":"-1"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected_invoice_type=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.switchValidation]}},[_c('option',{attrs:{"disabled":""}},[_vm._v("Whom is the Invoice For ?")]),_vm._v(" "),_c('option',{attrs:{"value":"foreigner"}},[_vm._v("Foreigner")]),_vm._v(" "),_c('option',{attrs:{"value":"resident"}},[_vm._v("Resident")]),_vm._v(" "),_c('option',{attrs:{"value":"business"}},[_vm._v("Business")])]),_vm._v(" "),_c('hr')]),_vm._v(" "),(_vm.show_avatar)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body text-center"},[_c('a',{staticClass:"avatar avatar-xl mb-3",attrs:{"href":"#"}},[_c('img',{staticClass:"avatar-img rounded-circle border border-4 border-card",attrs:{"src":_vm.avatar,"alt":"..."}})]),_vm._v(" "),_c('h2',{staticClass:"card-title"},[_vm._v(_vm._s(_vm.first_name)+" "+_vm._s(_vm.last_name))]),_vm._v(" "),_c('p',{staticClass:"small text-muted mb-3"},[_vm._v("\n            +"+_vm._s(_vm.msisdn)+" "),_c('br'),_vm._v("\n            "+_vm._s(_vm.id_number)+"\n          ")])]),_vm._v(" "),_c('div',{staticClass:"card-body py-3"},[_c('div',{staticClass:"list-group list-group-flush"},[_c('div',{staticClass:"list-group-item border-top"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col text-right"},[_c('a',{staticClass:"btn btn-sm btn-danger",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.invalidate}},[_vm._v("Remove")])])])])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-12"},[(_vm.verification_failed)?_c('p',{staticClass:"alert alert-danger"},[_vm._v("\n          "+_vm._s(_vm.verification_failed_error)+"\n        ")]):_vm._e()]),_vm._v(" "),(!_vm.customer_verified && _vm.is_resident_invoice)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Enter Mobile Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Mobile Number","maxlength":"20"},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Enter Personal/ID Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.id_number),expression:"id_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"ID Number","maxlength":"20"},domProps:{"value":(_vm.id_number)},on:{"input":function($event){if($event.target.composing){ return; }_vm.id_number=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("First Name (As in ID)")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.first_name),expression:"first_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"First name as in ID","maxlength":"20"},domProps:{"value":(_vm.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.first_name=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("Period (Tax Only)")]),_vm._v(" "),_c('date-picker',{attrs:{"type":"date","placeholder":"Select Date","lang":"en","range-separator":"-","input-class":"form-control","format":"DD/MMM/YYYY","value-type":"format","shortcuts":false,"confirm":true,"range":true},on:{"confirm":_vm.applyFilter,"clear":_vm.applyFilter},model:{value:(_vm.tax_date_period),callback:function ($$v) {_vm.tax_date_period=$$v},expression:"tax_date_period"}})],1),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-4"},[(_vm.enable_invoice_id_validation)?_c('a',{staticClass:"btn btn-sm btn-outline-primary lift",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate}},[_vm._v("Validate")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-4"},[(_vm.is_validating)?_c('span',{staticClass:"fa fa-spinner fa-spin"}):_vm._e()])])])]),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.customer_verified && _vm.is_foreigner_invoice)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Enter Mobile Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Mobile Number","maxlength":"20","required":""},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Enter Passport Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.id_number),expression:"id_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"ID Number","maxlength":"20","required":""},domProps:{"value":(_vm.id_number)},on:{"input":function($event){if($event.target.composing){ return; }_vm.id_number=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("Full Name (As in Passport)")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.first_name),expression:"first_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Full Name","maxlength":"20","required":""},domProps:{"value":(_vm.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.first_name=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("Period (Tax Only)")]),_vm._v(" "),_c('date-picker',{attrs:{"type":"date","placeholder":"Select Date","lang":"en","range-separator":"-","input-class":"form-control","format":"DD/MMM/YYYY","value-type":"format","shortcuts":false,"confirm":true,"range":true},on:{"confirm":_vm.applyFilter,"clear":_vm.applyFilter},model:{value:(_vm.tax_date_period),callback:function ($$v) {_vm.tax_date_period=$$v},expression:"tax_date_period"}})],1),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-4"},[(_vm.enable_invoice_passport_validation)?_c('a',{staticClass:"btn btn-sm btn-outline-primary lift",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate}},[_vm._v("Validate")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-4"},[(_vm.is_validating)?_c('span',{staticClass:"fa fa-spinner fa-spin"}):_vm._e()])])])]),_vm._v(" "),_vm._m(1)]):_vm._e(),_vm._v(" "),(!_vm.customer_verified && _vm.is_business_invoice)?_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Enter Mobile Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.msisdn),expression:"msisdn"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Mobile Number","maxlength":"20","required":""},domProps:{"value":(_vm.msisdn)},on:{"input":function($event){if($event.target.composing){ return; }_vm.msisdn=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"message-text"}},[_vm._v("Business Registration Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.id_number),expression:"id_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Registration Number","maxlength":"20"},domProps:{"value":(_vm.id_number)},on:{"input":function($event){if($event.target.composing){ return; }_vm.id_number=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("Business Name")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.first_name),expression:"first_name"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Name","maxlength":"20"},domProps:{"value":(_vm.first_name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.first_name=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{staticClass:"col-form-label",attrs:{"for":"recipient-name"}},[_vm._v("Period (Tax Only)")]),_vm._v(" "),_c('date-picker',{attrs:{"type":"date","placeholder":"Select Date","lang":"en","range-separator":"-","input-class":"form-control","format":"DD/MMM/YYYY","value-type":"format","shortcuts":false,"confirm":true,"range":true},on:{"confirm":_vm.applyFilter,"clear":_vm.applyFilter},model:{value:(_vm.tax_date_period),callback:function ($$v) {_vm.tax_date_period=$$v},expression:"tax_date_period"}})],1),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-4"},[(_vm.enable_invoice_business_validation)?_c('a',{staticClass:"btn btn-sm btn-outline-primary lift",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate_business}},[_vm._v("Validate")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-4"},[(_vm.is_validating)?_c('span',{staticClass:"fa fa-spinner fa-spin"}):_vm._e()])])])]),_vm._v(" "),_vm._m(2)]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-xl-9"},[_c('div',{staticClass:"card card-body p-5"},[_vm._m(3),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col text-center"},[_c('img',{attrs:{"src":_vm.logo,"alt":"..."}}),_vm._v(" "),_c('h2',{staticClass:"mb-2"},[_vm._v("\n              "+_vm._s(_vm.republic)+"\n            ")])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12 col-md-6"},[_c('h6',{staticClass:"text-uppercase text-muted"},[_vm._v("Invoiced from")]),_vm._v(" "),_c('p',{staticClass:"text-muted mb-4"},[_c('strong',{staticClass:"text-body"},[_vm._v(_vm._s(_vm.merchant_name))]),_vm._v(" "),_c('br'),_vm._v("\n              "+_vm._s(_vm.merchant_address)+" "),_c('br'),_vm._v("\n              +"+_vm._s(_vm.merchant_phone)+" "),_c('br'),_vm._v("\n              "+_vm._s(_vm.merchant_email)+" "),_c('br'),_vm._v("\n              "+_vm._s(_vm.merchant_website)+"\n            ")]),_vm._v(" "),_c('h6',{staticClass:"text-uppercase text-muted"},[_vm._v("Invoiced ID")]),_vm._v(" "),_c('p',{staticClass:"mb-4"},[_vm._v("#INV-"+_vm._s(_vm.client_invoice_ref))]),_vm._v(" "),(_vm.tax_date_period)?_c('h6',{staticClass:"text-uppercase text-muted"},[_vm._v("Period")]):_vm._e(),_vm._v(" "),(_vm.tax_date_period)?_c('p',{staticClass:"mb-4"},[_vm._v(_vm._s(_vm.tax_date_period))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-12 col-md-6 text-md-right"},[_c('h6',{staticClass:"text-uppercase text-muted"},[_vm._v("Invoiced to")]),_vm._v(" "),_c('p',{staticClass:"text-muted mb-4"},[_c('strong',{staticClass:"text-body"},[_vm._v(_vm._s(_vm.first_name)+" "+_vm._s(_vm.last_name))]),_vm._v(" "),_c('br'),_vm._v("\n              +"+_vm._s(_vm.msisdn)+" "),_c('br'),_vm._v("\n              "+_vm._s(_vm.id_number)+"\n            ")]),_vm._v(" "),_c('h6',{staticClass:"text-uppercase text-muted"},[_vm._v("Due date")]),_vm._v(" "),_c('p',{staticClass:"mb-4"},[_c('time',{attrs:{"datetime":"2018-04-23"}},[_vm._v(_vm._s(_vm.due_date))])])])]),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table my-4"},[_vm._m(4),_vm._v(" "),_c('tbody',[_vm._l((_vm.invoice_items),function(q,key){return _c('tr',{key:key},[_c('td',{staticClass:"px-0"},[_vm._v(_vm._s(q.item_name))]),_vm._v(" "),_c('td',{staticClass:"px-0"},[_vm._v(_vm._s(q.item_quantity))]),_vm._v(" "),_c('td',{staticClass:"px-0 text-right"},[_vm._v(_vm._s(q.unit_price))]),_vm._v(" "),_c('td',{staticClass:"px-0 text-right"},[_vm._v(_vm._s(q.item_cost))]),_vm._v(" "),_c('td',{staticClass:"px-0 text-right"},[_c('button',{on:{"click":function($event){return _vm.remove(key)}}},[_vm._v("X")])])])}),_vm._v(" "),_c('tr',[_vm._m(5),_vm._v(" "),_c('td',{attrs:{"colspan":"2"}}),_vm._v(" "),_c('td',{staticClass:"px-0 text-right border-top border-top-2",attrs:{"colspan":"2"}},[_c('span',{staticClass:"h3"},[_vm._v(" "+_vm._s(_vm.total)+" ")])])])],2)])])])]),_vm._v(" "),_c('hr'),_vm._v(" "),(_vm.display_service_verified)?_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-7"},[_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"col-auto"},[_c('label',[_vm._v("Select Service")]),_vm._v(" "),_c('v-select',{attrs:{"options":_vm.merchant_services,"label":"name"},on:{"change":_vm.set_cost_type},model:{value:(_vm.selected_service),callback:function ($$v) {_vm.selected_service=$$v},expression:"selected_service"}})],1)])]),_vm._v(" "),_c('div',{staticClass:"col-2"},[_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"col-auto"},[_c('label',[_vm._v("Quantity")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.item_quantity),expression:"item_quantity"}],staticClass:"form-control",attrs:{"type":"number","min":"1","placeholder":"1"},domProps:{"value":(_vm.item_quantity)},on:{"input":function($event){if($event.target.composing){ return; }_vm.item_quantity=$event.target.value}}})])])]),_vm._v(" "),_c('div',{staticClass:"col-2"},[_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"col-auto"},[_c('label',[_vm._v("Unit.Cost")]),_vm._v(" "),(_vm.is_service_variable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.item_cost),expression:"item_cost"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"1","min":"1"},domProps:{"value":(_vm.item_cost)},on:{"input":function($event){if($event.target.composing){ return; }_vm.item_cost=$event.target.value}}}):_vm._e(),_vm._v(" "),(!_vm.is_service_variable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.item_cost),expression:"item_cost"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"1","min":"1","readonly":""},domProps:{"value":(_vm.item_cost)},on:{"input":function($event){if($event.target.composing){ return; }_vm.item_cost=$event.target.value}}}):_vm._e()])])]),_vm._v(" "),_c('div',{staticClass:"d-flex justify-content-end align-items-center"},[_c('button',{staticClass:"btn btn-primary",on:{"click":_vm.add_invoice_item}},[_vm._v("\n              Add\n            ")])])]):_vm._e(),_vm._v(" "),(_vm.is_service_variable)?_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-12"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.item_desc),expression:"item_desc"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter item description","required":""},domProps:{"value":(_vm.item_desc)},on:{"input":function($event){if($event.target.composing){ return; }_vm.item_desc=$event.target.value}}})])]):_vm._e()]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"d-flex flex-row-reverse"},[(_vm.can_process_invoice)?_c('button',{staticClass:"p-2 btn btn-primary",on:{"click":_vm.process_invoice}},[_vm._v("\n          Create Invoice\n        ")]):_vm._e()]),_vm._v(" "),_c('hr')])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body py-3"},[_c('div',{staticClass:"list-group list-group-flush"},[_c('div',{staticClass:"list-group-item border-top"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body py-3"},[_c('div',{staticClass:"list-group list-group-flush"},[_c('div',{staticClass:"list-group-item border-top"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card-body py-3"},[_c('div',{staticClass:"list-group list-group-flush"},[_c('div',{staticClass:"list-group-item border-top"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row"},[_c('div',{staticClass:"col text-right"})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',{staticClass:"px-0 bg-transparent border-top-0"},[_c('span',{staticClass:"h6"},[_vm._v("Description")])]),_vm._v(" "),_c('th',{staticClass:"px-0 bg-transparent border-top-0"},[_c('span',{staticClass:"h6"},[_vm._v("Quantity")])]),_vm._v(" "),_c('th',{staticClass:"px-0 bg-transparent border-top-0 text-right"},[_c('span',{staticClass:"h6"},[_vm._v("Price")])]),_vm._v(" "),_c('th',{staticClass:"px-0 bg-transparent border-top-0 text-right"},[_c('span',{staticClass:"h6"},[_vm._v("Total Cost")])]),_vm._v(" "),_c('th',{staticClass:"px-0 bg-transparent border-top-0 text-right"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"px-0 border-top border-top-2"},[_c('strong',[_vm._v("Total amount due")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65204da7", __vue__options__)
  } else {
    hotAPI.reload("data-v-65204da7", __vue__options__)
  }
})()}
});

;require.register("js/components/multiselect2.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    model: {
        event: 'change'
    },
    props: ["options", "value", "url", "prompt", "process-results-fun"],
    data: function data() {
        return {};
    },

    methods: {
        createSelect2: function createSelect2(options) {
            var vm = this;
            var opts = {};

            $(this.$el).select2({ data: options }).val(this.value).trigger('change').on('change', function () {
                vm.$emit('change', $(this).val());
            });
        }
    },
    mounted: function mounted() {
        this.createSelect2(this.options);
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{staticClass:"form-control"},[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d44f204", __vue__options__)
  } else {
    hotAPI.reload("data-v-5d44f204", __vue__options__)
  }
})()}
});

;require.register("js/components/owner-type-selector.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["default-type", "default-id", "type-field", "id-field", "search-url"],
  data: function data() {
    return {
      currentType: "merchant",
      currentId: this.defaultId,
      currentOwner: {},
      typeFieldName: this.typeField || "owner_type",
      idFieldName: this.idField || "owner_id",
      types: {
        merchant: "Merchant"
      },
      ownersList: []
    };
  },

  watch: {
    currentType: function currentType(t) {
      if (t) {
        this.ownersList = [];
        this.currentOwner = {};
      }
    },
    currentOwner: function currentOwner(o) {
      if (o) {
        this.currentId = o.id;
      } else {
        this.currentId = "";
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.doSearch(this.currentType, this.defaultId).done(function (data) {
      _this.currentOwner = data.results[0];
    });
  },

  methods: {
    loadOwners: function loadOwners(name, loading) {
      if (!(name && this.currentType)) {
        return false;
      }

      loading(true);
      this.doSearch(this.currentType, name).always(function () {
        loading(false);
      });
    },
    doSearch: function doSearch(type, term) {
      var _this2 = this;

      return $.ajax({
        url: this.searchUrl,
        method: "get",
        data: {
          type: type,
          name: term
        },
        success: function success(data) {
          _this2.ownersList = data.results;
          console.log(_this2.ownersList);
        },
        error: function error(xhr) {},
        complete: function complete() {}
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"form-group"},[_vm._t("type-label",function(){return [_c('label',[_vm._v("Select Owner Type")])]}),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentType),expression:"currentType"}],staticClass:"form-control",attrs:{"name":_vm.typeFieldName},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.currentType=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},function($event){return _vm.doSearch($event.target.value, '*')}]}},[_c('option',{attrs:{"value":""}},[_vm._v("Select owner type...")]),_vm._v(" "),_vm._l((_vm.types),function(v,k){return _c('option',{domProps:{"value":k}},[_vm._v(_vm._s(v))])})],2),_vm._v(" "),_vm._t("type-error")],2),_vm._v(" "),_c('div',{staticClass:"form-group"},[_vm._t("id-label",function(){return [_vm._v(" s\n      "),_c('label',[_vm._v("Select Owner")])]}),_vm._v(" "),_c('vue-select',{attrs:{"filterable":false,"placeholder":"Type here to search","label":"name","options":_vm.ownersList,"name":_vm.idFieldName,"on-search":_vm.loadOwners},model:{value:(_vm.currentOwner),callback:function ($$v) {_vm.currentOwner=$$v},expression:"currentOwner"}}),_vm._v(" "),_c('input',{attrs:{"type":"hidden","name":_vm.idFieldName},domProps:{"value":_vm.currentId}}),_vm._v(" "),_vm._t("id-error")],2)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b671cb32", __vue__options__)
  } else {
    hotAPI.reload("data-v-b671cb32", __vue__options__)
  }
})()}
});

;require.register("js/components/payment_gateway_form.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: ['banks-list', 'current-selected-bank-id', 'assoc-banks'],
    data: function data() {
        return {
            selected_bank: {},
            selected_banks: [],
            selected_bank_ids: [],
            selected_bank_id: null
        };
    },
    mounted: function mounted() {
        var _this = this;

        if (this.currentSelectedBankId) {
            this.selected_bank = this.banksList.filter(function (v) {
                return v.id == _this.currentSelectedBankId;
            });
            this.selected_bank_id = this.currentSelectedBankId;
        }
        this.selected_banks = this.assocBanks;
    },

    methods: {
        getSelected: function getSelected() {
            this.selected_bank_id;
        },
        updateSelection: function updateSelection(v) {
            if (v[0]) {
                this.selected_bank_id = v[0].id;
            }
            if (v.id) {
                this.selected_bank_id = v.id;
            }
        },

        setSelected: function setSelected(v) {
            this.selected_bank_id = v.id;
        },
        setSelectedIds: function setSelectedIds(v) {
            this.selected_bank_ids = v.map(function (v) {
                return v.id;
            });
        }
    }
};
});

;require.register("js/components/role.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["initial-merchant", "initial-merchants", "initial-services", "initial-perms", "permissions", "fetchServicesUrl", "merchantsUrl", "merchantslist", "initial-agency"],
  data: function data() {
    return {
      merchantId: this.initialMerchant,
      merchantIds: this.initialMerchants,
      serviceIds: this.initialServices,
      availablePermissions: this.permissions.admin.concat(this.permissions.basic),
      selectedPerms: this.initialPerms,
      merchants: [],
      ml: this.merchantslist,
      agencyId: this.initialAgency,
      show_merchants_input: true,
      show_agency_input: true,
      show_gateways_input: true
    };
  },
  computed: {
    agency: function agency() {
      return this.agencyId;
    }
  },
  methods: {
    on_add_merchant: function on_add_merchant(value) {
      this.merchants.push(value[0]);
      var selectedMerchantIds = encodeURIComponent((0, _stringify2.default)(value));
      $.getJSON(this.fetchServicesUrl.replace("merchant_ids", selectedMerchantIds), function (data) {
        data.map(function (v) {
          return $("#services").multiSelect("addOption", {
            value: v.id,
            text: v.name
          });
        });
      });
    },
    on_remove_merchant: function on_remove_merchant(value) {
      var x = value[0].toString();
      var index = this.merchantIds.indexOf(parseInt(x));
      if (index > -1) {
        this.merchantIds.splice(index, 1);
      }
      var selectedMerchantIds = encodeURIComponent((0, _stringify2.default)(value));
      $.getJSON(this.fetchServicesUrl.replace("merchant_ids", selectedMerchantIds), function (data) {});
    },
    deselectperms: function deselectperms(value) {
      var index = this.selectedPerms.indexOf(parseInt(value));
      if (index > -1) {
        this.selectedPerms.splice(index, 1);
      }
    },

    onMerchantChange: function onMerchantChange(evt) {
      this.availableServices = [];
      this.selectedPerms = [];
      this.loadServicesForMerchants();
      if (this.merchantId !== "none") {
        this.show_agency_input = false;
        this.show_gateways_input = false;
      }
    },

    onMerchantsChange: function onMerchantsChange(evt) {
      this.loadServicesForMerchants();
    },

    onAgencyChange: function onAgencyChange() {
      this.show_gateways_input = false;
      this.show_merchants_input = false;
    },

    loadServicesForMerchants: function loadServicesForMerchants() {
      var selectedMerchantIds = null;
      this.serviceIds = this.initialServices;

      if (this.merchantId == "none") {
        selectedMerchantIds = this.merchantIds;
        this.ml.map(function (v) {
          return $("#merchantlist").multiSelect("addOption", {
            value: v.id,
            text: v.name
          });
        });

        $("#services option:selected").prop("selected", false);
        $("#services option").remove();
        $("#services").multiSelect("refresh");

        this.ml.map(function (v) {
          return $("#merchantlist").multiSelect("addOption", {
            value: v.id,
            text: v.name
          });
        });

        $("#services option:selected").prop("selected", false);
        $("#services option").remove();
        $("#services").multiSelect("refresh");

        this.availablePermissions = this.permissions.admin.concat(this.permissions.basic);

        $("#permissions option:selected").prop("selected", false);
        $("#permissions option").remove();
        $("#permissions").multiSelect("refresh");
        this.availablePermissions.map(function (v) {
          return $("#permissions").multiSelect("addOption", {
            value: v.value,
            text: v.label
          });
        });
      } else if (!!this.merchantId) {
        $("#merchantlist option:selected").prop("selected", false);
        $("#merchantlist option").remove();
        $("#merchantlist").multiSelect("refresh");

        selectedMerchantIds = [this.merchantId];
        this.availablePermissions = this.permissions.basic;
        $("#permissions option:selected").prop("selected", false);
        $("#permissions option").remove();
        $("#permissions").multiSelect("refresh");
        this.availablePermissions.map(function (v) {
          return $("#permissions").multiSelect("addOption", {
            value: v.value,
            text: v.label
          });
        });
      }

      if (selectedMerchantIds && selectedMerchantIds.length > 0) {
        selectedMerchantIds = encodeURIComponent((0, _stringify2.default)(selectedMerchantIds));

        $.getJSON(this.fetchServicesUrl.replace("merchant_ids", selectedMerchantIds), function (data) {
          var _this = this;

          this.availableServices = data;

          $("#services option:selected").prop("selected", false);
          $("#services option").remove();
          $("#services").multiSelect("refresh");

          this.availableServices.map(function (v) {
            return $("#services").multiSelect("addOption", {
              value: v.id,
              text: v.name
            });
          });
          data.forEach(function (v) {
            if (_this.initialServices.includes(v.id)) {
              $("#services option[value='" + v.id + "']").attr("selected", true);
              $("#services option[value='" + v.name + "']").attr("selected", true);
              $("#services").multiSelect("refresh");
            }
          });
        }.bind(this));
      } else {}
    },
    loadMerchants: function loadMerchants() {
      $.getJSON(this.merchantsUrl, function (data) {
        this.merchants = [{
          name: "None",
          id: "none"
        }].concat(data);
      });
    }
  },

  created: function created() {
    this.loadServicesForMerchants();
    this.loadMerchants();
  },

  mounted: function mounted() {
    var vm = this;

    $("#permissions").multiSelect({
      selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Available'>",
      selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Selected'>",
      afterInit: function afterInit(ms) {
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = "#" + that.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)",
            selectionSearchString = "#" + that.$container.attr("id") + " .ms-elem-selection.ms-selected";

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on("keydown", function (e) {
          if (e.which === 40) {
            that.$selectableUl.focus();
            return false;
          }
        });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on("keydown", function (e) {
          if (e.which == 40) {
            that.$selectionUl.focus();
            return false;
          }
        });
      },
      afterSelect: function afterSelect(value) {
        this.qs1.cache();
        this.qs2.cache();
      },
      afterDeselect: function afterDeselect(value) {
        this.qs1.cache();
        this.qs2.cache();
        vm.deselectperms(value);
      }
    });

    $("#merchantlist").multiSelect({
      selectableHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Available'>",
      selectionHeader: "<input type='text' class='form-control search-input' autocomplete='off' placeholder='Selected'>",
      afterInit: function afterInit(ms) {
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = "#" + that.$container.attr("id") + " .ms-elem-selectable:not(.ms-selected)",
            selectionSearchString = "#" + that.$container.attr("id") + " .ms-elem-selection.ms-selected";

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString).on("keydown", function (e) {
          if (e.which === 40) {
            that.$selectableUl.focus();
            return false;
          }
        });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString).on("keydown", function (e) {
          if (e.which == 40) {
            that.$selectionUl.focus();
            return false;
          }
        });
      },
      afterSelect: function afterSelect(value) {
        this.qs1.cache();
        this.qs2.cache();
        vm.on_add_merchant(value);
      },
      afterDeselect: function afterDeselect(value) {
        this.qs1.cache();
        this.qs2.cache();
        vm.on_remove_merchant(value);
      }
    });
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6690ed2", __vue__options__)
  } else {
    hotAPI.reload("data-v-e6690ed2", __vue__options__)
  }
})()}
});

;require.register("js/components/service_form.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["selected-merchant-id", 'merchants-list', 'selected-service-id', 'selected-agency-id', 'selected-agent-id', 'services-list', 'agencies-list', 'agents-list', 'agent-margin', 'commission'],
  data: function data() {
    return {
      merchant: {},
      service: {},
      agency: {},
      agent: {},
      agency_id: null,
      merchant_id: null,
      selectedAgency: {},
      agent_margin: null,
      agent_commission: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    if (this.agentMargin) {
      this.agent_margin = this.agentMargin;
    }
    if (this.commission) {
      this.agent_commission = this.commission;
    }
    if (this.selectedMerchantId) {
      this.merchant = this.merchantsList.find(function (m) {
        return m.value == _this.selectedMerchantId;
      }) || {};
    }
    if (this.selectedServiceId) {
      this.service = this.servicesList.find(function (s) {
        return s.value == _this.selectedServiceId;
      }) || {};
    }
    if (this.selectedAgencyId) {
      this.agency = this.agenciesList.find(function (s) {
        return s.value == _this.selectedAgencyId;
      }) || {};
    }

    if (this.selectedAgentId) {
      this.agent = this.agentsList.find(function (s) {
        return s.value == _this.selectedAgentId;
      }) || {};
    }
  },

  methods: {
    setSelected: function setSelected(v) {
      this.agency_id = v.agency;
      this.merchant_id = v.merchant;
      this.$emit("mainmerchant", this.merchant_id);
      this.$emit("mainagency", this.agency_id);
    },
    resetSelectedAgency: function resetSelectedAgency(v) {
      this.agency = v;
    },
    setMargin: function setMargin(value) {
      this.$emit("margin", this.agent_margin);
    },
    setCommissionType: function setCommissionType(value) {
      this.$emit("commission", this.agent_commission);
    }
  }
};
});

;require.register("js/components/shared/SettlementModal.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ["settlement_id", "account_id", "current_user"],
  data: function data() {
    return {
      loading: false,
      error_message: null,
      selected_bank_account: null,
      filtered_bank_accounts: [],
      original_bank_accounts: [],
      creating: false,
      item: null,
      redirect_url: "/settlements/" + this.settlement_id + "/details",
      id: null,
      banks: [],
      selected_bank: null
    };
  },
  created: function created() {
    this.item = this.$attrs["item"];
    this.id = this.item.id;
  },
  mounted: function mounted() {
    var _this = this;

    $(this.get_modal_name()).on("shown.bs.modal", function () {
      _this.error_message = null;
      _this.selected_bank_account = null;
      _this.selected_bank = null;
      _this.banks = [];
      _this.filtered_bank_accounts = [];
      _this.original_bank_accounts = [];
      _this.load_bank_accounts(_this.item.gateway);
    });

    $(this.get_modal_name()).on("hidden.bs.modal", function () {
      _this.error_message = null;
      _this.selected_bank = null;
      _this.selected_bank_account = null;
      _this.creating = false;
      _this.banks = [];
      _this.filtered_bank_accounts = [];
      _this.original_bank_accounts = [];
    });
  },

  methods: {
    filter_bank_accounts: function filter_bank_accounts() {
      var _this2 = this;

      this.filtered_bank_accounts = this.original_bank_accounts.filter(function (v) {
        return v.bank == _this2.selected_bank;
      });
    },
    get_modal_name: function get_modal_name() {
      return "#exampleModal" + this.item.id;
    },
    get_modal_id: function get_modal_id() {
      return "exampleModal" + this.item.id;
    },

    load_bank_accounts: function load_bank_accounts(gateway) {
      var _this3 = this;

      var url = "/api/settlements/gateway/" + gateway + "/account/" + this.account_id;
      Vue.axios.get(url, {
        params: {
          current_user: this.current_user
        }
      }).then(function (response) {
        _this3.original_bank_accounts = response.data;
        var all_banks = _this3.original_bank_accounts.map(function (v) {
          return v.bank;
        });
        _this3.banks = all_banks.filter(function (x, y) {
          return all_banks.indexOf(x) == y;
        });
      }).catch(function () {
        _this3.bank_accounts = [];
      });
    },
    store: function store(item, list) {
      if (!list.includes(item)) {
        list.push(item);
      }
      return list;
    },
    initiate_settlement: function initiate_settlement() {
      var _this4 = this;

      var msel_bank_account = this.original_bank_accounts.filter(function (v) {
        return v.account_name == _this4.selected_bank_account;
      });
      this.creating = true;
      var payload = {
        account_id: this.account_id,
        bank_account_id: msel_bank_account[0].id,
        destination: msel_bank_account[0].account_number,
        amount: this.item.amount
      };
      var url = "/api/gateway/settlements/" + this.id + "/initiate";

      Vue.axios.post(url, payload).then(function () {
        _this4.creating = false;
        $(_this4.get_modal_name() + " .close").click();
        window.top.location.href = _this4.redirect_url;
      }).catch(function () {
        _this4.creating = false;
        _this4.error_message = "Error initiating Settlement ! Try again later";
      });
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('a',{staticClass:"btn btn-sm btn-white",attrs:{"href":"#!","data-toggle":"modal","data-target":_vm.get_modal_name()}},[_vm._v("\n    Settle\n  ")]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":_vm.get_modal_id(),"tabindex":"-1","role":"dialog","aria-labelledby":"exampleModalCenterTitle","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body"},[(_vm.error_message)?_c('div',{staticClass:"alert alert-warning alert-dismissible fade show text-left",attrs:{"role":"alert"}},[_c('strong',[_vm._v(" "+_vm._s(_vm.error_message))])]):_vm._e(),_vm._v(" "),_c('div',[_c('label',{staticClass:"text-left",attrs:{"for":"bnk"}},[_vm._v("Select Bank")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_bank),expression:"selected_bank"}],staticClass:"form-control",attrs:{"id":"bnk"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected_bank=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},function($event){return _vm.filter_bank_accounts()}]}},_vm._l((_vm.banks),function(item,index){return _c('option',{key:index,domProps:{"value":item}},[_vm._v("\n                "+_vm._s(item)+"\n              ")])}),0)]),_vm._v(" "),_c('div',[_c('label',{staticClass:"text-left",attrs:{"for":"bnk"}},[_vm._v("Select Account")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_bank_account),expression:"selected_bank_account"}],staticClass:"form-control",attrs:{"id":"bnk"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selected_bank_account=$event.target.multiple ? $$selectedVal : $$selectedVal[0]}}},_vm._l((_vm.filtered_bank_accounts),function(data,index){return _c('option',{key:index,domProps:{"value":data.account_name}},[_vm._v("\n                "+_vm._s(data.account_name)+"\n              ")])}),0)])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n            Close\n          ")]),_vm._v(" "),(!_vm.creating && _vm.selected_bank_account)?_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"},on:{"click":function($event){return _vm.initiate_settlement()}}},[_vm._v("\n            Settle\n          ")]):_vm._e(),_vm._v(" "),(_vm.creating)?_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button"}},[_vm._v("\n            Please wait...\n          ")]):_vm._e()])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title",attrs:{"id":"exampleModalCenterTitle"}},[_vm._v("\n            Settle to Bank Account\n          ")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ae8cf1b", __vue__options__)
  } else {
    hotAPI.reload("data-v-5ae8cf1b", __vue__options__)
  }
})()}
});

;require.register("js/components/shared/WithdrawalTool.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["syncbal"],
  data: function data() {
    return {
      bank_accounts: [],
      selectedAccount: null,
      withdrawTo: null,
      mpesaAccount: null,
      withdrawal_amount: null,
      merchant_id: null,
      current_account_balance: 0,
      api_token: null,
      con_key: null,
      con_secret: null
    };
  },

  watch: {
    syncbal: function syncbal(val) {
      this.current_account_balance = val;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.current_account_balance = this.$attrs["currentaccountbalance"];
    this.merchant_id = this.$attrs["merchantid"];
    this.con_key = this.$attrs["conkey"];
    this.con_secret = this.$attrs["consecret"];

    $("#withdrawalModal").on("hidden.bs.modal", function () {
      _this.withdrawal_amount = null;
    });
    $("#withdrawalModal").on("shown.bs.modal", function () {
      _this.getOauthToken();
    });
  },

  methods: {
    getOauthToken: function getOauthToken() {
      var _this2 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.con_secret,
        key: this.con_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this2.api_token = response.data.token;
        _this2.loadBankAccounts();
      }).catch(function (error) {}).then(function () {});
    },
    loadBankAccounts: function loadBankAccounts() {
      var _this3 = this;

      var url = "/api/banks/accounts/filtered?merchant_ids=[" + this.merchant_id + "]";
      var api_headers = { Authorization: "Bearer " + this.api_token };
      Vue.axios.get(url, {
        headers: api_headers
      }).then(function (response) {
        _this3.bank_accounts = response.data.bank_accounts;
      }).catch(function (error) {}).then(function () {});
    },
    validateWithdrawal: function validateWithdrawal() {
      if (!this.selectedAccount && !this.mpesaAccount) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid Safaricom Phone Number or Chose an account number"
        });
        return;
      }

      if (!this.selectedAccount) {
        var re = /^(25471|25470|25472|25479|25474)\d{7}$/;
        if (!re.test(this.mpesaAccount)) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a valid Safaricom Phone Number"
          });
          return;
        }
      }
      if (this.withdrawal_amount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount!"
        });
        return false;
      }
      if (parseFloat(this.withdrawal_amount) <= 0) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount not less than 1 !"
        });
        return false;
      }

      if (parseFloat(this.withdrawal_amount) > parseFloat(this.current_account_balance)) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter an amount not greater than " + this.current_account_balance
        });
        return false;
      }

      if (this.selectedAccount == null && this.mpesaAccount == null) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select either a bank account or mobile money account !"
        });
        return false;
      }

      this.executeWithdrawal();
    },
    resetAccounts: function resetAccounts() {
      this.selectedAccount = null;
      this.mpesaAccount = null;
    },
    resetWithdrawalForm: function resetWithdrawalForm() {
      this.selectedAccount = null;
      this.mpesaAccount = null;
      this.withdrawal_amount = null;
      this.withdrawTo = null;
    },
    executeWithdrawal: function executeWithdrawal() {
      var _this4 = this;

      var bankAccountId = null;
      var gateway = "mpesa-b2c";
      if (this.selectedAccount != null) {
        bankAccountId = this.selectedAccount.id;
        gateway = "mpesa";
      }
      var params = {
        bank_account_id: bankAccountId,
        destination: this.mpesaAccount,
        amount: this.withdrawal_amount,
        account_id: this.account_id,
        gateway: gateway
      };

      this.resetWithdrawalForm();
      _sweetalert2.default.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, withdraw funds"
      }).then(function (result) {
        if (result.value) {
          _this4.authorizeWithdrawal(params);
        }
      });
    },
    authorizeWithdrawal: function authorizeWithdrawal(params) {
      var _this5 = this;

      var url = "/api/oauth/generate/token";
      var payload = {
        secret: this.consumer_secret,
        key: this.consumer_key
      };
      Vue.axios.post(url, payload).then(function (response) {
        _this5.api_token = response.data.token;
        _this5._make_withdrawal(_this5.api_token, params);
      }).catch(function (error) {}).then(function () {});
    },
    _make_withdrawal: function _make_withdrawal(token, params) {
      var urlIs = "/api/payment/withdraw";
      var api_headers = {
        Authorization: "Bearer " + token
      };
      Vue.axios.post(urlIs, params, {
        headers: api_headers
      }).then(function (response) {
        if (response.data.status == 422) {
          _sweetalert2.default.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        } else {
          $("#withdrawalModal .close").click();
          _sweetalert2.default.fire({
            position: "top-end",
            icon: "success",
            title: "Withdrawal Inititated !",
            showConfirmButton: false,
            timer: 2500
          });
        }
      }).catch(function (error) {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!"
        });
      }).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"id":"withdrawalModal","tabindex":"-1","role":"dialog","aria-labelledby":"withdrawalModal","aria-hidden":"true"}},[_c('div',{staticClass:"modal-dialog modal-dialog-centered",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('form',{attrs:{"id":"frmWIthdraw","name":"frmWIthdraw","onsubmit":"return false;"}},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"modal-body",staticStyle:{"overflow":"auto"}},[_c('div',{staticClass:"md-form mb-5"},[_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Amount")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.withdrawal_amount),expression:"withdrawal_amount"}],staticClass:"form-control",attrs:{"type":"number","min":"1","max":_vm.current_account_balance},domProps:{"value":(_vm.withdrawal_amount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.withdrawal_amount=$event.target.value}}}),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Withdraw To")]),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.withdrawTo),expression:"withdrawTo"}],staticClass:"form-control list-gateways",attrs:{"tabindex":"-1","aria-hidden":"true"},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.withdrawTo=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.resetAccounts]}},[_c('option'),_vm._v(" "),_c('option',{attrs:{"value":"MPESA"}},[_vm._v("DIRECT TO MPESA")]),_vm._v(" "),_c('option',{attrs:{"value":"BANK"}},[_vm._v("DIRECT TO BANK")])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('label',{attrs:{"data-error":"wrong","data-success":"right","for":"amount"}},[_vm._v("Account")]),_vm._v(" "),(_vm.withdrawTo === 'BANK')?_c('v-select',{attrs:{"label":"account_number","options":_vm.bank_accounts,"reduce":function (name) { return name.id; }},model:{value:(_vm.selectedAccount),callback:function ($$v) {_vm.selectedAccount=$$v},expression:"selectedAccount"}}):_vm._e(),_vm._v(" "),(_vm.withdrawTo === 'MPESA')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.mpesaAccount),expression:"mpesaAccount"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Enter Mpesa Number e.g 254711WWWPPP","max":"12"},domProps:{"value":(_vm.mpesaAccount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.mpesaAccount=$event.target.value}}}):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-secondary",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("\n            Close\n          ")]),_vm._v(" "),_c('input',{staticClass:"btn btn-primary",attrs:{"type":"button","value":"Withdraw"},on:{"click":_vm.validateWithdrawal}})])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal-header"},[_c('h5',{staticClass:"modal-title"},[_vm._v("Withdraw Funds")]),_vm._v(" "),_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e292d6b4", __vue__options__)
  } else {
    hotAPI.reload("data-v-e292d6b4", __vue__options__)
  }
})()}
});

;require.register("js/components/shared/excel-exporter.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    dataList: Array,
    filename: String
  },
  computed: {
    uri: function uri() {
      if (this.dataList.length < 1) {
        return "#";
      }
      var csvString = this.buildCsvString();
      csvString = "data:text/csv;charset=utf-8," + csvString;
      return csvString;
    }
  },
  methods: {
    buildCsvString: function buildCsvString() {
      var _this = this;

      var result = "";
      var columnDelimiter = ",";
      var lineDelimiter = "\n";
      var cols = (0, _keys2.default)(this.dataList[0]).sort(function (a, b) {
        a = parseInt(a.split(".")[0]) || 0;
        b = parseInt(b.split(".")[0]) || 0;

        return a - b;
      });

      var headers = cols.map(function (col) {
        return _this.removeOrdering(col);
      });

      result += headers.join(columnDelimiter);
      result += encodeURI(lineDelimiter);

      this.dataList.forEach(function (row) {
        cols.forEach(function (col) {
          result += ("" + (encodeURIComponent(row[col]) || "null")).replace(/,/g, " ") + columnDelimiter;
        });
        result += encodeURI(lineDelimiter);
      });
      return result;
    },
    removeOrdering: function removeOrdering(col) {
      var colNum = parseInt(col.split(".")[0]) || null;

      if (colNum) {
        colNum = colNum + ".";
        var index = col.indexOf(colNum);

        col = col.slice(0, index) + col.slice(index + colNum.length);
        return col.trim();
      } else {
        return col;
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{attrs:{"href":_vm.uri,"download":this.uri == '#' ? false : _vm.filename || 'data.csv'}},[_vm._t("default")],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aa258560", __vue__options__)
  } else {
    hotAPI.reload("data-v-aa258560", __vue__options__)
  }
})()}
});

;require.register("js/components/shared/invoices.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      invoices: [],
      total_pages: 0,
      total_entries: 0,
      current_page: 1,
      page_size: 0,
      loading: false,

      gateways: [],
      merchants: [],
      services: [],
      status: "pending",
      merchant_id: "",
      service_id: "",
      period: "",
      confirmed: "",
      invoice_number: "",
      id_number: "",
      tquery: ""
    };
  },
  mounted: function mounted() {
    this.services = this.$attrs["services"];

    this.merchants = this.$attrs["merchants"];
    this.gateways = this.$attrs["gateways"];
    this.fetch_invoices(this.current_page, this.merchant_id, this.service_id, this.invoice_number, this.id_number, this.status, this.confirmed, this.period, this.tquery);
  },

  methods: {
    format_date: function format_date(date) {
      if (date == null) {
        return "";
      }
      return (0, _moment2.default)(date).format("ddd Do MMMM, YYYY HH:mm:ss a");
    },
    get_view_url: function get_view_url(id) {
      return "/invoices/" + id;
    },
    get_download_url: function get_download_url(id) {
      return "/invoice/" + id;
    },

    search: function search() {
      this.fetch_invoices(this.current_page, this.merchant_id, this.service_id, this.invoice_number, this.id_number, this.status, this.confirmed, this.period, this.tquery);
    },
    fetch_invoices: function fetch_invoices(page, merchant_id, service_id, invoice_number, id_number, status, confirmed, period, tquery) {
      var _this = this;

      var url = "/invoices/filter?query[q]=" + tquery + "&query[invoice_number]=" + invoice_number + "&query[id_number]=" + id_number + "&query[status]=" + status + "&query[merchant_id]=" + merchant_id + "&query[service_id]=" + service_id + "&query[period]=" + period + "&query[confirmed]=" + confirmed;
      this.current_page = page;
      var query = {
        params: {
          page: page
        }
      };
      Vue.axios.get(url, query).then(function (response) {
        _this.total_pages = response.data.total_pages;
        _this.invoices = response.data.entries;
        _this.total_entries = response.data.total_entries;
        _this.page_size = response.data.page_size;
      }).catch(function (error) {}).then(function () {});
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container-fluid"},[_c('div',{staticClass:"row justify-content-center"},[_c('div',{staticClass:"col-12"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"card",attrs:{"data-toggle":"lists"}},[_c('div',{staticClass:"card-header"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(1),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tquery),expression:"tquery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Search Invoices ...."},domProps:{"value":(_vm.tquery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.tquery=$event.target.value},_vm.search]}})])]),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.merchant_id),expression:"merchant_id"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.merchant_id=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},_vm._l((_vm.merchants),function(m){return _c('option',{key:m.id,domProps:{"value":m.id}},[_vm._v("\n                  "+_vm._s(m.name)+"\n                ")])}),0)]),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.service_id),expression:"service_id"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.service_id=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},_vm._l((_vm.services),function(s){return _c('option',{key:s.id,domProps:{"value":s.id}},[_vm._v("\n                  "+_vm._s(s.name)+"\n                ")])}),0)]),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.status),expression:"status"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.status=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},[_c('option',{attrs:{"value":""}},[_vm._v("Select status")]),_vm._v(" "),_c('option',{attrs:{"value":"pending"}},[_vm._v("Pending")]),_vm._v(" "),_c('option',{attrs:{"value":"partial"}},[_vm._v("Partial")]),_vm._v(" "),_c('option',{attrs:{"value":"complete"}},[_vm._v("Complete")]),_vm._v(" "),_c('option',{attrs:{"value":"settled"}},[_vm._v("Settled")]),_vm._v(" "),_c('option',{attrs:{"value":"settled_sending_ipn"}},[_vm._v("Sending IPN")])])]),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.confirmed),expression:"confirmed"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.confirmed=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},[_c('option',{attrs:{"value":""}},[_vm._v("Confirmed?")]),_vm._v(" "),_c('option',{attrs:{"value":"true"}},[_vm._v("Yes")]),_vm._v(" "),_c('option',{attrs:{"value":"false"}},[_vm._v("No")])])]),_vm._v(" "),_c('div',{staticClass:"form-group form-group mb-0 col-sm-2"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.period),expression:"period"}],staticClass:"form-control",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.period=$event.target.multiple ? $$selectedVal : $$selectedVal[0]},_vm.search]}},[_c('option',{attrs:{"value":""}},[_vm._v("Filter Date")]),_vm._v(" "),_c('option',{attrs:{"value":"today"}},[_vm._v("Today")]),_vm._v(" "),_c('option',{attrs:{"value":"yesterday"}},[_vm._v("Yesterday")]),_vm._v(" "),_c('option',{attrs:{"value":"1 week"}},[_vm._v("Last 1 Week")]),_vm._v(" "),_c('option',{attrs:{"value":"1 month"}},[_vm._v("Last 1 Month")]),_vm._v(" "),_c('option',{attrs:{"value":"1 year"}},[_vm._v("Last 1 Year")])])])])]),_vm._v(" "),_c('div',{staticClass:"card-header advancedSearch"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(2),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tquery),expression:"tquery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Client Ref No."},domProps:{"value":(_vm.tquery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.tquery=$event.target.value},_vm.search]}})])]),_vm._v(" "),_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(3),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tquery),expression:"tquery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"ID No."},domProps:{"value":(_vm.tquery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.tquery=$event.target.value},_vm.search]}})])]),_vm._v(" "),_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(4),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.tquery),expression:"tquery"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Phone Number"},domProps:{"value":(_vm.tquery)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.tquery=$event.target.value},_vm.search]}})])]),_vm._v(" "),_c('div',{staticClass:"col"},[_c('div',{staticClass:"input-group input-group-flush"},[_vm._m(5),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.invoice_number),expression:"invoice_number"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Invoice Number."},domProps:{"value":(_vm.invoice_number)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.invoice_number=$event.target.value},_vm.search]}})])])])])])]),_vm._v(" "),_c('div',{staticClass:"table-responsive"},[_c('table',{staticClass:"table table-sm table-hover table-nowrap card-table"},[_vm._m(6),_vm._v(" "),_vm._l((_vm.invoices),function(invoice){return _c('tbody',{key:invoice.id},[_c('tr',[_c('td',[_vm._v(_vm._s(invoice.id))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(_vm.format_date(_vm.Pesaflow.Helpers.convert_to_tz(invoice.inserted_at))))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.invoice_number))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.name))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.currency)+" "+_vm._s(invoice.amount_expected))]),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice.currency)+" "+_vm._s(invoice.amount_paid))]),_vm._v(" "),(invoice.payment_gateway)?_c('td',[_vm._v("\n              "+_vm._s(invoice.payment_gateway.name)+"\n            ")]):_vm._e(),_vm._v(" "),(!invoice.payment_gateway)?_c('td'):_vm._e(),_vm._v(" "),(invoice.status == 'settled')?_c('td',[_c('span',{staticClass:"badge badge-pill badge-success"},[_c('i',{staticClass:"fa fa-check-circle",attrs:{"aria-hidden":"true"}}),_vm._v("\n                "+_vm._s(invoice.status.toUpperCase()))])]):_vm._e(),_vm._v(" "),(invoice.status != 'settled')?_c('td',[_c('span',{staticClass:"badge badge-pill badge-warning"},[_c('i',{staticClass:"fa fa-check-circle",attrs:{"aria-hidden":"true"}}),_vm._v("\n                "+_vm._s(invoice.status.toUpperCase()))])]):_vm._e(),_vm._v(" "),_c('td',[_vm._v(_vm._s(invoice["confirmed?"]))]),_vm._v(" "),_c('td',[_c('a',{attrs:{"href":_vm.get_view_url(invoice.id)}},[_vm._v("View")]),_vm._v("\n               \n              "),_c('a',{attrs:{"href":_vm.get_download_url(invoice.id)}},[_vm._v("Download")])])])])})],2),_vm._v(" "),_c('div',{staticClass:"card-footer d-flex justify-content-between"},[_c('nav',{attrs:{"aria-label":"Page navigation example"}},[_c('ul',{staticClass:"pagination"},[(_vm.total_pages > 1 && _vm.current_page > 1)?_c('li',{staticClass:"page-item"},[_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.fetch_invoices(
                    _vm.current_page - 1,
                    _vm.merchant_id,
                    _vm.service_id,
                    _vm.invoice_number,
                    _vm.id_number,
                    _vm.status,
                    _vm.confirmed,
                    _vm.period,
                    _vm.tquery
                  )}}},[_vm._v("Previous")])]):_vm._e(),_vm._v(" "),_c('li',{staticClass:"page-item"},[(_vm.total_pages > 1 &&
                  _vm.current_page > 0 &&
                  _vm.current_page < _vm.total_pages
                  )?_c('a',{staticClass:"page-link",attrs:{"href":"javascript:void(0)"},on:{"click":function($event){return _vm.fetch_invoices(
                    _vm.current_page + 1,
                    _vm.merchant_id,
                    _vm.service_id,
                    _vm.invoice_number,
                    _vm.id_number,
                    _vm.status,
                    _vm.confirmed,
                    _vm.period,
                    _vm.tquery
                  )}}},[_vm._v("Next")]):_vm._e()])])])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"header mt-md-5"},[_c('div',{staticClass:"header-body"},[_c('div',{staticClass:"row align-items-center"},[_c('div',{staticClass:"col"},[_c('h6',{staticClass:"header-pretitle"},[_vm._v("Overview")]),_vm._v(" "),_c('h1',{staticClass:"header-title"},[_vm._v("Invoices")]),_vm._v(" "),_c('p',{staticClass:"text-muted"},[_vm._v("\n                A list of invoices that have been made by various clients\n              ")])]),_vm._v(" "),_c('div',{staticClass:"col-auto"},[_c('a',{staticClass:"btn btn-primary lift",attrs:{"href":"/invoice/new"}},[_vm._v("New Invoice")])])])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-group-prepend"},[_c('span',{staticClass:"input-group-text"},[_c('i',{staticClass:"fe fe-search"})])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-date"}},[_vm._v("\n                Log\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-trxref"}},[_vm._v("\n                Date\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-desc"}},[_vm._v("\n                Account No.\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-credit"}},[_vm._v("\n                Client\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Amount Due\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Amount Paid\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Gateway\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Status\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Confirmed\n              ")])]),_vm._v(" "),_c('th',[_c('a',{staticClass:"text-muted sort",attrs:{"href":"#","data-sort":"account-floatbalance"}},[_vm._v("\n                Action\n              ")])])])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44dd93bf", __vue__options__)
  } else {
    hotAPI.reload("data-v-44dd93bf", __vue__options__)
  }
})()}
});

;require.register("js/components/user/TimerComponent.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  data: function data() {
    return {
      minutes: "",
      seconds: "",
      timerRunning: false
    };
  },
  mounted: function mounted() {
    this.startTimer();
  },


  computed: {
    startTimer: function startTimer() {
      var _this = this;

      var expiryTime = new Date().getTime() + 120000;
      setInterval(function () {
        var currentTime = new Date().getTime();
        var timeLeft = expiryTime - currentTime;
        _this.minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
        _this.seconds = Math.floor(timeLeft % (1000 * 60) / 1000);
        if (timeLeft < 0) {
          clearInterval();
          _this.timerRunning = false;
          _this.$emit("update:timer", false);
        }
      }, 1000);
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._v("OTP expires in "+_vm._s(_vm.minutes)+":"+_vm._s(_vm.seconds))])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4910170b", __vue__options__)
  } else {
    hotAPI.reload("data-v-4910170b", __vue__options__)
  }
})()}
});

;require.register("js/components/user/login.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _TimerComponent = require('./TimerComponent.vue');

var _TimerComponent2 = _interopRequireDefault(_TimerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: { TimerComponent: _TimerComponent2.default },
    props: ["csrf_token", "send_otp_url", "api_login_url", "agent_login_url"],
    data: function data() {
        return {
            step: 1,
            selected_user: {},
            changeset: {},
            timerRunning: false,
            minutes: "",
            seconds: ""
        };
    },
    methods: {
        updateTimer: function updateTimer(val) {
            this.timerRunning = val;
        },
        reset_view: function reset_view() {
            this.step = 1;
        },
        admin_signin: function admin_signin() {
            var self = this;
            if (!this.selected_user.email) {
                self.changeset = {
                    message: "Oops, something went wrong.",
                    email: "Can't be blank"
                };
            } else {
                _axios2.default.post(self.send_otp_url, {
                    _csrf_token: self.csrf_token,
                    email: self.selected_user.email,
                    type: "admin"
                }).then(function (response) {
                    if (response.data.status === "ok") {
                        self.step = 2;
                        self.timerRunning = true;
                        self.selected_user = response.data.user;
                    } else {
                        self.step == 1;
                        self.timerRunning = false;
                        self.changeset = response.data.errors;
                    }
                }).catch(function (error) {
                    console.log(error);
                    self.changeset = { message: error };
                });
            }
        },
        agent_signin: function agent_signin() {
            var self = this;
            if (!this.selected_user.email) {
                self.changeset = {
                    message: "Oops, something went wrong.",
                    email: "Can't be blank"
                };
            } else {
                _axios2.default.post(self.send_otp_url, {
                    _csrf_token: self.csrf_token,
                    email: self.selected_user.email,
                    type: "agent"
                }).then(function (response) {
                    if (response.data.status === "ok") {
                        self.step = 3;
                        self.timerRunning = true;
                        self.selected_user = response.data.user;
                    } else {
                        self.timerRunning = false;
                        self.changeset = response.data.errors;
                    }
                }).catch(function (error) {
                    self.changeset = { message: error };
                });
            }
        },
        verify_login: function verify_login() {
            var self = this;
            _axios2.default.post(self.api_login_url, {
                otp: self.selected_user.otp,
                email: self.selected_user.email
            }).then(function (response) {
                if (response.data.status === "ok") {
                    location.assign(response.data.redirect);
                } else {
                    self.step = 2;
                    self.changeset = response.data.changeset;
                }
            }).catch(function (error) {
                self.changeset = { message: error };
            });
        },
        verify_agent_login: function verify_agent_login() {
            var self = this;
            _axios2.default.post(self.agent_login_url, {
                pin: self.selected_user.pin,
                otp: self.selected_user.otp,
                email: self.selected_user.email
            }).then(function (response) {
                if (response.data.status === "ok") {
                    location.assign(response.data.redirect);
                } else {
                    self.step = 3;
                    self.changeset = response.data.changeset;
                }
            }).catch(function (error) {
                self.changeset = error;
            });
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form',{attrs:{"method":"POST"},on:{"submit":function($event){$event.preventDefault();return _vm.onSubmit.apply(null, arguments)}}},[(_vm.step == 1)?_c('div',[(_vm.changeset.message != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(_vm._s(_vm.changeset.message))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"email"}},[_vm._v("Email or Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.email),expression:"selected_user.email"}],staticClass:"form-control",class:{ 'is-invalid': 'email' in _vm.changeset },attrs:{"type":"text","name":"email","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "email", $event.target.value)}}}),_vm._v(" "),('email' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.email))])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"row mb-3"},[_c('div',{staticClass:"col-6"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button"},on:{"click":_vm.admin_signin}},[_vm._v("Admin Signin")])]),_vm._v(" "),_c('div',{staticClass:"col-6"},[_c('button',{staticClass:"btn btn-block btn-outline-success",attrs:{"type":"button"},on:{"click":_vm.agent_signin}},[_vm._v("Agent Signin")])])])]):_vm._e(),_vm._v(" "),(_vm.step == 2)?_c('div',[_c('div',{staticClass:"form-group"},[_c('div',{staticClass:"d-flex justify-content-between align-items-center"},[_c('label',{attrs:{"for":"otp"}},[_vm._v("Enter OTP")]),_vm._v(" "),(_vm.step == 2 && _vm.timerRunning)?_c('p',[_c('TimerComponent',{on:{"update:timer":_vm.updateTimer}})],1):_c('a',{attrs:{"href":"#"},on:{"click":_vm.reset_view}},[_vm._v("OTP expired. Resend OTP?")])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.otp),expression:"selected_user.otp"}],staticClass:"form-control",class:{ 'is-invalid': 'otp' in _vm.changeset },attrs:{"type":"text","name":"otp","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.otp)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "otp", $event.target.value)}}}),_vm._v(" "),('otp' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.otp))])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button"},on:{"click":_vm.verify_login}},[_vm._v("Submit")])])]):_vm._e(),_vm._v(" "),(_vm.step == 3)?_c('div',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"pin"}},[_vm._v("Enter PIN")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.pin),expression:"selected_user.pin"}],staticClass:"form-control",class:{ 'is-invalid': 'pin' in _vm.changeset },attrs:{"type":"password","name":"pin","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.pin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "pin", $event.target.value)}}}),_vm._v(" "),('pin' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.pin))])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"otp"}},[_vm._v("Enter OTP")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.otp),expression:"selected_user.otp"}],staticClass:"form-control",class:{ 'is-invalid': 'otp' in _vm.changeset },attrs:{"type":"text","name":"otp","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.otp)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "otp", $event.target.value)}}}),_vm._v(" "),(_vm.step == 3 && _vm.timerRunning)?_c('p',[_c('TimerComponent',{on:{"update:timer":_vm.updateTimer}})],1):_vm._e(),_vm._v(" "),('otp' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.pin))])]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button"},on:{"click":_vm.verify_agent_login}},[_vm._v("Submit")])])]):_vm._e()])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ef99a06", __vue__options__)
  } else {
    hotAPI.reload("data-v-3ef99a06", __vue__options__)
  }
})()}
});

;require.register("js/components/user/loginV2.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _TimerComponent = require('./TimerComponent.vue');

var _TimerComponent2 = _interopRequireDefault(_TimerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    props: ["csrf_token", "send_otp_url", "api_login_url", "login_type"],
    data: function data() {
        return {
            selected_user: {},
            changeset: {},
            timerRunning: false,
            showLoginButtons: true,
            minutes: "",
            seconds: "",
            admin: false,
            agent: false,
            otpInput: false,
            login: false
        };
    },
    methods: {
        updateTimer: function updateTimer(val) {
            this.timerRunning = val;
        },
        reset_view: function reset_view() {
            if (this.selected_user.email) this.send_otp();
        },
        admin_signin: function admin_signin() {
            if (this.selected_user.email) {
                this.admin = true;
                this.agent = false;
                this.showLoginButtons = false;
                if (this.login_type == "otp") this.send_otp();
            } else {
                this.changeset = {
                    message: "Please enter your email or phone number"
                };
            }
        },
        agent_signin: function agent_signin() {
            if (this.selected_user.email) {
                this.admin = false;
                this.agent = true;
                this.showLoginButtons = false;
            } else {
                this.changeset = {
                    message: "Please enter your email or phone number"
                };
            }
        },
        send_otp: function send_otp() {
            if (!this.selected_user.email && !this.selected_user.password || !this.selected_user.email && !this.selected_user.pin) {
                this.changeset = {
                    message: "Please enter your credentials"
                };
            } else if (!this.selected_user.email && this.selected_user.password || !this.selected_user.email && this.selected_user.pin) {
                this.changeset = {
                    message: "Please enter your email or phone number"
                };
            } else {
                this.changeset = {};
                var self = this;
                var payload = {};
                if (this.admin) {
                    payload = {
                        email: this.selected_user.email,
                        password: this.selected_user.password,
                        type: "admin",
                        login_type: this.login_type,
                        csrf_token: this.csrf_token
                    };
                } else if (this.agent) {
                    payload = {
                        email: this.selected_user.email,
                        pin: this.selected_user.pin,
                        type: "agent",
                        csrf_token: this.csrf_token
                    };
                }
                _axios2.default.post(this.send_otp_url, payload).then(function (response) {
                    if (response.data.status == "success") {
                        self.showLoginButtons = false;
                        self.timerRunning = true;
                        self.otpInput = true;
                        self.login = true;
                        self.selected_user = response.data.user;
                    } else {
                        self.timerRunning = false;
                        self.changeset = response.data.errors;
                    }
                }).catch(function (error) {
                    console.log(error);
                    self.changeset = error;
                });
            }
        },
        validate_otp: function validate_otp() {
            this.changeset = {};
            var self = this;
            var payload = {};
            if (this.admin) {
                payload = {
                    email: this.selected_user.email,
                    password: this.selected_user.password,
                    type: "admin",
                    login_type: this.login_type,
                    otp: this.selected_user.otp,
                    csrf_token: this.csrf_token
                };
            }
            if (this.agent) {
                payload = {
                    email: this.selected_user.email,
                    pin: this.selected_user.pin,
                    type: "agent",
                    otp: this.selected_user.otp,
                    csrf_token: this.csrf_token
                };
            }

            _axios2.default.post(this.api_login_url, payload).then(function (response) {
                if (response.data.status == "success") {
                    location.assign(response.data.redirect_url);
                } else {
                    self.changeset = response.data.errors;
                }
            }).catch(function (error) {
                console.log(error);
                self.changeset = error;
            });
        }
    }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form',[_c('div',[(_vm.changeset.message != null)?_c('div',{staticClass:"alert alert-danger",attrs:{"role":"alert"}},[_vm._v(_vm._s(_vm.changeset.message))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"email"}},[_vm._v("Email or Phone Number")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.email),expression:"selected_user.email"}],staticClass:"form-control",class:{ 'is-invalid': 'email' in _vm.changeset },attrs:{"type":"text","name":"email","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "email", $event.target.value)}}}),_vm._v(" "),('email' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.email))])]):_vm._e()]),_vm._v(" "),(_vm.admin && _vm.login_type == 'password')?_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"pin"}},[_vm._v("Enter Password")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.password),expression:"selected_user.password"}],staticClass:"form-control",class:{ 'is-invalid': 'password' in _vm.changeset },attrs:{"type":"password","name":"pin","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "password", $event.target.value)}}}),_vm._v(" "),('password' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.password))])]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.agent)?_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"pin"}},[_vm._v("Enter PIN")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.pin),expression:"selected_user.pin"}],staticClass:"form-control",class:{ 'is-invalid': 'pin' in _vm.changeset },attrs:{"type":"password","name":"pin","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.pin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "pin", $event.target.value)}}}),_vm._v(" "),('pin' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.pin))])]):_vm._e()]):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.otpInput),expression:"otpInput"}],staticClass:"form-group"},[_c('div',{staticClass:"d-flex justify-content-between align-items-center"},[_c('label',{attrs:{"for":"otp"}},[_vm._v("Enter OTP")]),_vm._v(" "),(_vm.timerRunning)?_c('p',[_c('TimerComponent',{on:{"update:timer":_vm.updateTimer}})],1):_c('a',{attrs:{"href":"#"},on:{"click":_vm.reset_view}},[_vm._v("OTP expired. Resend OTP?")])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selected_user.otp),expression:"selected_user.otp"}],staticClass:"form-control",class:{ 'is-invalid': 'otp' in _vm.changeset },attrs:{"type":"text","name":"otp","required":"","autofocus":""},domProps:{"value":(_vm.selected_user.otp)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.selected_user, "otp", $event.target.value)}}}),_vm._v(" "),('otp' in _vm.changeset)?_c('div',{staticClass:"invalid-feedback"},[_c('span',[_vm._v(_vm._s(_vm.changeset.otp))])]):_vm._e()]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showLoginButtons),expression:"showLoginButtons"}],staticClass:"row mb-3"},[_c('div',{staticClass:"col-6"},[_c('button',{staticClass:"btn btn-block btn-outline-primary",attrs:{"type":"button"},on:{"click":_vm.admin_signin}},[_vm._v("Admin Signin")])]),_vm._v(" "),_c('div',{staticClass:"col-6"},[_c('button',{staticClass:"btn btn-block btn-outline-success",attrs:{"type":"button"},on:{"click":_vm.agent_signin}},[_vm._v("Agent Signin")])])]),_vm._v(" "),(!_vm.showLoginButtons && !_vm.login)?_c('div',[_c('button',{staticClass:"btn btn-block btn-outline-success mb-3",attrs:{"type":"button"},on:{"click":_vm.send_otp}},[_vm._v("\n                    Proceed "),_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("→")])])]):_vm._e(),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.login),expression:"login"}]},[_c('button',{staticClass:"btn btn-block btn-outline-success mb-3",attrs:{"type":"button"},on:{"click":_vm.validate_otp}},[_vm._v("\n                    Sign in "),_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("→")])])])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b14259bc", __vue__options__)
  } else {
    hotAPI.reload("data-v-b14259bc", __vue__options__)
  }
})()}
});

;require.register("js/components/user/user_form.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: ["initial-id-type", "initial-id-number", "initial-first-name", "initial-validated", "id-lookup-path"],
  data: function data() {
    return {
      isVerificationRequired: null,
      enableVerify: false,
      isCitizen: false,
      isResident: false,
      isForeigner: false,
      idType: this.initialIdType,
      idNumber: this.initialIdNumber,
      validationFirstName: this.initialFirstName,
      isValidating: false,
      validated: this.initialValidated,
      firstName: this.validationFirstName,
      lastName: null,
      otherName: null,
      dob: null,
      gender: null,
      nationality: null,
      error: null,
      country_of_nationality: null,
      email: null,
      primary_phone: null,
      secondary_phone: null,
      address_line_one: null,
      address_line_two: null,
      city: null,
      state: null,
      country_of_residence: null,
      password: null,
      checkedData: true
    };
  },
  methods: {
    changeType: function changeType(type) {
      this.invalidate();

      if (type == 1) {
        this.idType = "citizen";
        this.isCitizen = true;
        this.isResident = false;
        this.isForeigner = false;
      }
      if (type == 2) {
        this.isCitizen = false;
        this.isResident = true;
        this.isForeigner = false;
      }
      if (type == 3) {
        this.isCitizen = false;
        this.isResident = false;
        this.isForeigner = true;
      }
    },
    validateIdNumber: function validateIdNumber(evt) {
      this.isValidating = true;
      this.error = null;

      if (!this.isVerificationRequired) {
        return;
      }
      if (this.idNumber == null || this.idNumber == "" || this.validationFirstName == null || this.validationFirstName == "") {
        _sweetalert2.default.fire({
          icon: "error",
          title: "Oops...",
          text: "We are missing either your ID Number or First Name. Please check !"
        });

        return;
      }

      $.ajax(this.idLookupPath, {
        data: {
          id_type: this.idType,
          id_number: this.idNumber,
          first_name: this.validationFirstName
        },
        success: function (response) {
          if (response.status === "ok") {
            this.validated = true;
            this.idNumber = response.data.id_number;
            this.firstName = response.data.first_name;
            this.lastName = response.data.surname;
            this.otherName = response.data.surname;
            this.dob = response.data.dob;
            this.gender = response.data.gender;
            this.nationality = response.data.citizenship;
          } else {
            this.error = response.message;
          }
        }.bind(this),
        error: function () {}.bind(this),
        complete: function () {
          this.isValidating = false;
        }.bind(this)
      });
    },
    invalidate: function invalidate() {
      this.validated = false;
      this.firstName = null;
      this.lastName = null;
      this.id_number = null;
      this.first_name = null;
      this.last_name = null;
      this.gender = null;
      this.nationality = null;
      this.otherName = null;
      this.country_of_nationality = null;
      this.email = null;
      this.primary_phone = null;
      this.secondary_phone = null;
      this.address_line_one = null;
      this.address_line_two = null;
      this.city = null;
      this.state = null;
      this.country_of_residence = null;
      this.password = null;
    }
  },
  mounted: function mounted() {
    this.isVerificationRequired = this.$attrs["is-verification-required"];
    if (this.isVerificationRequired === "true") {
      this.enableVerify = true;
    }
    this.isCitizen = true;
    this.changeType(1);

    if (this.validationFirstName && this.idNumber && this.idType) this.validateIdNumber();
  },

  computed: {},
  validated: {
    validated: function validated() {
      $("#user_role_ids").select2();
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-157b2155", __vue__options__)
  } else {
    hotAPI.reload("data-v-157b2155", __vue__options__)
  }
})()}
});

;require.register("js/components/web/SelfSignUpBusinessWizard.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueFormWizard = require("vue-form-wizard");

var _vueFormWizard2 = _interopRequireDefault(_vueFormWizard);

var _vuelidate = require("vuelidate");

var _vuelidate2 = _interopRequireDefault(_vuelidate);

var _validators = require("vuelidate/lib/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vuelidate2.default);
Vue.use(_vueFormWizard2.default);
exports.default = {
  data: function data() {
    return {
      email_already_taken: true,
      idno_already_taken: true,
      phone_already_taken: true,
      merchant_name_already_taken: true,
      business_verified: null,
      business_verifying: null,
      business: null,
      services: null,
      selected_service: [],
      fname_error: null,
      lname_error: null,
      idno_error: null,
      phone_error: null,
      email_error: null,
      errorMsg: null,
      iprs_details: null,
      iprs_verifying: null,
      iprs_details_verified: null,
      customerForm: {
        fname: null,
        lname: null,
        idno: null,
        phone: null,
        email: null
      },
      businessForm: {
        bname: "",
        bregno: null,
        baddr: null,
        btaxpin: null,
        bphone: null
      },
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      merchant_id: null,
      agent_type: "Yes",
      retrieved_business_data: null
    };
  },

  validations: {
    customerForm: {
      fname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(2)
      },
      lname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(2)
      },
      idno: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfIdnoAlreadyTaken(value);
        }
      },
      phone: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(3),

        onlyDigitsAllowed: function onlyDigitsAllowed(value) {
          if (value === "" || value == null) return true;
          return this.confirmOnlyDigits(value);
        },
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfPhoneAlreadyTaken(value);
        }
      },
      email: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        isValidEmail: function isValidEmail(value) {
          if (value === "" || value == null) return true;
          return this.validEmail(value);
        },
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfEmailAlreadyTaken(value);
        }
      }
    },
    businessForm: {
      bname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmMerchantNameAlreadyTaken(value);
        }
      },
      bregno: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(6)
      },
      baddr: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4)
      },
      btaxpin: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(9)
      },
      bphone: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(12),
        isValidPhone: function isValidPhone(value) {
          if (value === "" || value == null) return true;
          return this.confirmOnlyDigits(value);
        }
      }
    }
  },
  mounted: function mounted() {
    this.set_explanation("none");
  },
  methods: {
    set_explanation: function set_explanation(xtype) {
      if (xtype == "none") {
        this.explanation = "Creates a merchant account, so you can transact as a merchant";
      } else if (xtype == "pesaflow") {
        this.explanation = "Creates a merchant and agent account, so you can transact as a merchant as well as an agent, accessing all services from Pesaflow";
      } else {
        this.explanation = "Creates a merchant and agent account, so you can transact as a merchant as well as an agent";
      }
    },
    reset_verified: function reset_verified() {
      this.iprs_details_verified = false;
      this.business_verified = false;
    },
    validateCustomerDetailsStep: function validateCustomerDetailsStep() {
      if (this.$v.customerForm.$invalid) {
        return false;
      }
      return true;
    },


    validEmail: function validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validPhone: function validPhone(phone) {
      var re = /^(254)\d{9}$/;
      return re.test(phone);
    },

    confirmOnlyDigits: function confirmOnlyDigits(phone) {
      var re = /^\d+$/;
      return re.test(phone);
    },

    validPhoneLength: function validPhoneLength(phone) {
      var re = /d{9}$/;
      return re.test(phone);
    },

    validateBusinesDetailsStep: function validateBusinesDetailsStep() {
      if (this.$v.businessForm.$invalid) {
        return false;
      }
      return true;
    },
    invalidate_business_details: function invalidate_business_details() {
      this.businessForm.bname = null;
      this.businessForm.email = null;
      this.businessForm.btaxpin = null;
      this.businessForm.bphone = null;
      this.businessForm.baddr = null;
      this.businessForm.bregno = null;
    },
    validate_business: function validate_business() {
      var _this = this;

      if (this.businessForm.bregno == null || this.businessForm.bname == null || this.businessForm.bname === "") {
        _sweetalert2.default.fire({
          icon: "error",
          text: "Please provide business name and business registration number!"
        });
        return;
      }
      var url = "/api/business/lookup";
      var payload = {
        registration_number: this.businessForm.bregno
      };
      this.business_verifying = true;
      Vue.axios.post(url, payload).then(function (response) {
        var status = response.data.status;
        if (status == "ok") {
          var business_data = response.data.business;

          if (business_data.verified) {
            if (_this.businessForm.bname.toLowerCase() == business_data.business_name.toLowerCase()) {
              _this.businessForm.bname = business_data.business_name;
              _this.businessForm.email = business_data.email;
              _this.businessForm.btaxpin = business_data.kra_pin;
              _this.businessForm.bphone = business_data.phone_number;
              _this.businessForm.baddr = business_data.postal_address;
              _this.businessForm.bregno = business_data.registration_number;
              _this.business_verified = true;
            } else {
              _this.business_verified = false;
              _this.invalidate_business_details();
              _sweetalert2.default.fire({
                icon: "error",
                text: "Verification failed!. Please check your business details !"
              });
            }
          } else {
            _this.business_verified = false;
            _this.invalidate_business_details();
            _sweetalert2.default.fire({
              icon: "error",
              text: "We are unable to verify your business details. Please check if business registration is valid !"
            });
          }
        } else {
          _this.business_verified = false;
          _this.invalidate_business_details();
          _sweetalert2.default.fire({
            icon: "error",
            text: response.data.message
          });
        }
        _this.business_verifying = !true;
      }).catch(function (error) {
        _this.business_verified = false;
        _this.business_verifying = !true;
        _this.invalidate_business_details();
        _sweetalert2.default.fire({
          icon: "error",
          text: "We are unable to verify your business details. Please try again later."
        });
      });
    },

    validate_iprs: function validate_iprs() {
      var _this2 = this;

      if (this.customerForm.idno == null || this.customerForm.fname == null) {
        _sweetalert2.default.fire({
          icon: "error",
          text: "Some details that are required may be missing !"
        });
      }
      var url = "/api/customer/verification/validate";
      var payload = {
        id_number: this.customerForm.idno,
        first_name: this.customerForm.fname,
        last_name: this.customerForm.lname
      };
      this.iprs_verifying = true;
      Vue.axios.post(url, payload).then(function (response) {
        var status = response.data.verified;
        if (status) {
          _this2.iprs_details_verified = true;
        } else {
          _this2.iprs_details_verified = false;
        }
        _this2.iprs_verifying = !true;
      }).catch(function (error) {
        _this2.iprs_details_verified = false;
        _this2.iprs_verifying = !true;
        _sweetalert2.default.fire({
          icon: "error",
          text: "We are unable to perform ID verification at the moment. Please try again later. If this error persists, contact customer support"
        });
      });
    },

    confirmIfIdnoAlreadyTaken: function confirmIfIdnoAlreadyTaken(value) {
      var _this3 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: "search"
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this3.idno_already_taken = false;
        } else {
          _this3.idno_already_taken = true;
        }
      }).catch(function (error) {
        _this3.idno_already_taken = true;
      });
      return this.idno_already_taken;
    },
    confirmIfEmailAlreadyTaken: function confirmIfEmailAlreadyTaken(value) {
      var _this4 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: this.agent_type
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this4.email_already_taken = false;
        } else {
          _this4.email_already_taken = true;
        }
      }).catch(function (error) {
        _this4.email_already_taken = true;
      });
      return this.email_already_taken;
    },
    confirmIfPhoneAlreadyTaken: function confirmIfPhoneAlreadyTaken(value) {
      var _this5 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: this.agent_type
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this5.phone_already_taken = false;
        } else {
          _this5.phone_already_taken = true;
        }
      }).catch(function (error) {
        _this5.phone_already_taken = true;
      });
      return this.phone_already_taken;
    },
    confirmMerchantNameAlreadyTaken: function confirmMerchantNameAlreadyTaken(value) {
      var _this6 = this;

      var url = "/api/merchant/find";
      var payload = {
        search: value
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this6.merchant_name_already_taken = false;
        } else {
          _this6.merchant_name_already_taken = true;
        }
      }).catch(function (error) {
        _this6.merchant_name_already_taken = true;
      });
      return this.merchant_name_already_taken;
    },
    onComplete: async function onComplete() {
      var api_url = "/api/self/signup";
      var data = {
        business_name: this.businessForm.bname,
        business_ra_pin: this.businessForm.btaxpin,
        business_reg_no: this.businessForm.bregno,
        dob: "",
        email: this.customerForm.email,
        first_name: this.customerForm.fname,
        gender: "",
        id_number: this.customerForm.idno,
        id_type: "citizen",
        last_name: this.customerForm.lname,
        msisdn: this.customerForm.phone,
        nationality: "",
        other_name: "",
        password: "",
        services: [],

        agent_type: this.agent_type
      };
      var payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: (0, _stringify2.default)(data)
      };
      var result = [];

      var _ref = await _sweetalert2.default.fire({
        title: "Terms and conditions",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: "I agree with the terms and conditions",
        confirmButtonText: 'Continue&nbsp;<i class="fa fa-arrow-right"></i>',
        showLoaderOnConfirm: true,
        inputValidator: function inputValidator(result) {
          return !result && "You need to agree with T&C";
        },
        preConfirm: function preConfirm() {
          return fetch(api_url, payload).then(function (response) {
            return response.json();
          }).then(function (data) {
            return result.push(data.status);
          }).catch(function () {
            _sweetalert2.default.insertQueueStep({
              icon: "error",
              title: "Unable to process your request"
            });
          });
        }
      }),
          accept = _ref.value;

      if (accept) {
        if (result.toString() == "200") {
          var timerInterval = void 0;
          _sweetalert2.default.fire({
            title: "Registration Sent",
            html: "Please wait, page will be redirected in a few seconds",
            timer: 2500,
            timerProgressBar: true,
            allowOutsideClick: false,
            willOpen: function willOpen() {
              _sweetalert2.default.showLoading();
              timerInterval = setInterval(function () {
                var content = _sweetalert2.default.getContent();
                if (content) {
                  var b = content.querySelector("b");
                  if (b) {
                    b.textContent = _sweetalert2.default.getTimerLeft();
                  }
                }
              }, 100);
            },
            onClose: function onClose() {
              clearInterval(timerInterval);
            }
          }).then(function (result) {
            if (result.dismiss === _sweetalert2.default.DismissReason.timer) {
              window.top.location.href = "/";
            }
          });
        } else {
          _sweetalert2.default.fire({
            icon: "error",
            text: "We are unable to process your request at the moment. If this error persists, kindly contact customer support for further assistance"
          });
        }
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form-wizard',{attrs:{"color":"#3498db","error-color":"#ff4949","shape":"tab"},on:{"on-complete":_vm.onComplete}},[_c('h2',{attrs:{"slot":"title"},slot:"title"},[_vm._v("To create an account, complete this wizard")]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Business Details","icon":"ti-settings","before-change":_vm.validateBusinesDetailsStep}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',{ref:_vm.businessRuleForm,attrs:{"model":_vm.businessForm,"rules":_vm.rules}},[_c('div',{staticClass:"form-row",class:{ 'form-group--error': _vm.$v.businessForm.bname.$error }},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Business Name")]),_vm._v(" "),(!_vm.$v.businessForm.bname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bname),expression:"businessForm.bname"}],staticClass:"form-control text-uppercase",attrs:{"type":"text","placeholder":"Business Name","maxlength":"30"},domProps:{"value":(_vm.businessForm.bname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bname", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.bname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Name must have at least\n                  "+_vm._s(_vm.$v.businessForm.bname.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputPassword4"}},[_vm._v("UBI")]),_vm._v(" "),(!_vm.$v.businessForm.bregno.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bregno),expression:"businessForm.bregno"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Registration Number","maxlength":"30"},domProps:{"value":(_vm.businessForm.bregno)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bregno", $event.target.value)},_vm.reset_verified]}}),_vm._v(" "),(!_vm.$v.businessForm.bregno.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Reg must have at least\n                  "+_vm._s(_vm.$v.businessForm.bregno.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),(!_vm.business_verified && _vm.$v.businessForm.bname.alreadyTaken)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12 text-center"},[(_vm.business_verifying)?_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}):_vm._e(),_vm._v("\n                  \n                "),_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate_business}},[_vm._v("VERIFY BUSINESS")])])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.business_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Address")]),_vm._v(" "),(!_vm.$v.businessForm.baddr.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.baddr),expression:"businessForm.baddr"}],staticClass:"form-control text-uppercase",attrs:{"type":"text","maxlength":"40","placeholder":"1234 Nairobi, Kenya"},domProps:{"value":(_vm.businessForm.baddr)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "baddr", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.baddr.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Address must have at least\n                  "+_vm._s(_vm.$v.businessForm.baddr.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.business_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Business Tax PIN")]),_vm._v(" "),(!_vm.$v.businessForm.btaxpin.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.btaxpin),expression:"businessForm.btaxpin"}],staticClass:"form-control text-uppercase",attrs:{"type":"text","maxlength":"30","placeholder":"A2903XXXXXXXXXH"},domProps:{"value":(_vm.businessForm.btaxpin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "btaxpin", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.btaxpin.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Tax must have at least\n                  "+_vm._s(_vm.$v.businessForm.btaxpin.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.business_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Business Phone No.")]),_vm._v(" "),(!_vm.$v.businessForm.bphone.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bphone),expression:"businessForm.bphone"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Phone Number","maxlength":"15"},domProps:{"value":(_vm.businessForm.bphone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bphone", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.bphone.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone must have at least\n                  "+_vm._s(_vm.$v.businessForm.bphone.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(_vm.$v.businessForm.bphone.onlyDigitsAllowed)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Only digits allowed*\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.business_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Create Agency ?")])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"yes","value":"Yes"},domProps:{"checked":_vm._q(_vm.agent_type,"Yes")},on:{"change":function($event){_vm.agent_type="Yes"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"yes"}},[_vm._v("Yes")])]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"no","value":"no"},domProps:{"checked":_vm._q(_vm.agent_type,"no")},on:{"change":function($event){_vm.agent_type="no"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"no"}},[_vm._v("No")])])])]):_vm._e()])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Admin Account Details","icon":"ti-user","before-change":_vm.validateCustomerDetailsStep}},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',{ref:"ruleForm",attrs:{"model":_vm.customerForm,"rules":_vm.rules}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("First Name")]),_vm._v(" "),(!_vm.$v.customerForm.fname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.fname),expression:"customerForm.fname"}],staticClass:"form-control",attrs:{"type":"text","maxlength":"15","placeholder":"First name"},domProps:{"value":(_vm.customerForm.fname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "fname", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.fname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Name must have at least\n                  "+_vm._s(_vm.$v.customerForm.fname.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Last Name")]),_vm._v(" "),(!_vm.$v.customerForm.lname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.lname),expression:"customerForm.lname"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Last Name","maxlength":"15"},domProps:{"value":(_vm.customerForm.lname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "lname", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.lname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Name must have at least\n                  "+_vm._s(_vm.$v.customerForm.lname.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Id Number")]),_vm._v(" "),(!_vm.$v.customerForm.idno.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.idno),expression:"customerForm.idno"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Id Number","maxlength":"10"},domProps:{"value":(_vm.customerForm.idno)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "idno", $event.target.value)},_vm.reset_verified]}}),_vm._v(" "),(!_vm.$v.customerForm.idno.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  ID Number must have at least\n                  "+_vm._s(_vm.$v.customerForm.idno.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.idno.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  ID Number already taken\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),(
                !_vm.iprs_details_verified && _vm.$v.customerForm.idno.alreadyTaken
              )?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12 text-center"},[(_vm.iprs_verifying)?_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}):_vm._e(),_vm._v("  \n                "),_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate_iprs}},[_vm._v("\n                  VERIFY TO PROCEED\n                ")])])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Phone Number")]),_vm._v(" "),(!_vm.$v.customerForm.phone.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.phone),expression:"customerForm.phone"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Phone number","maxlength":"12"},domProps:{"value":(_vm.customerForm.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "phone", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.phone.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone number must have at least\n                  "+_vm._s(_vm.$v.customerForm.phone.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.phone.onlyDigitsAllowed)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Only digits allowed*\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.phone.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone already registered\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Email")]),_vm._v(" "),(!_vm.$v.customerForm.email.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.email),expression:"customerForm.email"}],staticClass:"form-control",attrs:{"type":"email","placeholder":"Email Address","maxlength":"30"},domProps:{"value":(_vm.customerForm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "email", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.email.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email must have at least\n                  "+_vm._s(_vm.$v.customerForm.email.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.email.isValidEmail)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Invalid email should contain an '@'\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.email.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email already taken\n                ")]):_vm._e()])]):_vm._e()])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Confirm Details","icon":"ti-thumb-up"}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('h5',{staticClass:"card-title"},[_vm._v("Verify Account Details")]),_vm._v(" "),_c('form',[_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("First Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.fname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Last Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.lname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("ID Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.idno}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Phone Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.phone}})])])])])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('h5',{staticClass:"card-title"},[_vm._v("Verify Business Details")]),_vm._v(" "),_c('form',[_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Registration Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bregno}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Address")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.baddr}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Tax PIN")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.btaxpin}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Phone Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bphone}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Agent Type")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.agent_type}})])])])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Complete Registration","icon":"ti-check"}},[_c('div',{staticClass:"jumbotron jumbotron-fluid"},[_c('div',{staticClass:"container"},[_c('h1',{staticClass:"display-2"},[_vm._v("Hi "+_vm._s(_vm.customerForm.fname)+",")]),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n            Click finish to complete the process. Once submitted, you will\n            receive a confirmation email within 24 hrs to activate and be able\n            to use your new account.\n            "),_c('br'),_vm._v("\n            The Pesaflow Team\n          ")])])])])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8eaf38aa", __vue__options__)
  } else {
    hotAPI.reload("data-v-8eaf38aa", __vue__options__)
  }
})()}
});

;require.register("js/components/web/SelfSignUpWizard.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueFormWizard = require("vue-form-wizard");

var _vueFormWizard2 = _interopRequireDefault(_vueFormWizard);

var _vuelidate = require("vuelidate");

var _vuelidate2 = _interopRequireDefault(_vuelidate);

var _validators = require("vuelidate/lib/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vuelidate2.default);
Vue.use(_vueFormWizard2.default);
exports.default = {
  data: function data() {
    return {
      explanation: null,
      email_already_taken: true,
      idno_already_taken: true,
      phone_already_taken: true,
      services: null,
      selected_service: [],
      fname_error: null,
      lname_error: null,
      idno_error: null,
      phone_error: null,
      email_error: null,
      errorMsg: null,
      iprs_details: null,
      iprs_verifying: null,
      iprs_details_verified: null,
      customerForm: {
        fname: null,
        lname: null,
        idno: null,
        phone: null,
        email: null,
        kra_pin: null
      },
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      merchant_id: null,
      agent_type: "Yes"
    };
  },

  validations: {
    customerForm: {
      fname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(2)
      },
      lname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(2)
      },
      kra_pin: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(9)
      },
      idno: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfIdnoAlreadyTaken(value);
        }
      },
      phone: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(3),
        onlyDigitsAllowed: function onlyDigitsAllowed(value) {
          if (value === "" || value == null) return true;
          return this.confirmOnlyDigits(value);
        },
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfPhoneAlreadyTaken(value);
        }
      },
      email: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        isValidEmail: function isValidEmail(value) {
          if (value === "" || value == null) return true;
          return this.validEmail(value);
        },
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfEmailAlreadyTaken(value);
        }
      }
    }
  },
  mounted: function mounted() {
    this.set_explanation("none");
  },
  methods: {
    set_explanation: function set_explanation(xtype) {
      if (xtype == "none") {
        this.explanation = "Creates a merchant account, so you can transact as a merchant";
      } else if (xtype == "pesaflow") {
        this.explanation = "Creates a merchant and agent account, so you can transact as a merchant as well as an agent, accessing all services from Pesaflow";
      } else {
        this.explanation = "Creates a merchant and agent account, so you can transact as a merchant as well as an agent";
      }
    },
    reset_verified: function reset_verified() {
      this.iprs_details_verified = false;
    },
    validateCustomerDetailsStep: function validateCustomerDetailsStep() {
      if (this.$v.customerForm.$invalid) {
        return false;
      }
      return true;
    },


    validEmail: function validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validPhone: function validPhone(phone) {
      var re = /^(254)\d{9}$/;
      return re.test(phone);
    },

    confirmOnlyDigits: function confirmOnlyDigits(phone) {
      var re = /^\d+$/;
      return re.test(phone);
    },

    validPhoneLength: function validPhoneLength(phone) {
      var re = /d{9}$/;
      return re.test(phone);
    },

    validate_iprs: function validate_iprs() {
      var _this = this;

      if (this.customerForm.idno == null || this.customerForm.fname == null) {
        _sweetalert2.default.fire({
          icon: "error",
          text: "Some details that are required may be missing !"
        });
      }

      var url = "/api/customer/verification/validate";
      var payload = {
        id_number: this.customerForm.idno,
        first_name: this.customerForm.fname,
        last_name: this.customerForm.lname
      };
      this.iprs_verifying = true;
      Vue.axios.post(url, payload).then(function (response) {
        var status = response.status;
        if (status == 200) {
          var kra_payload = { taxpayer_id: _this.customerForm.idno };
          Vue.axios.post("/api/kra/lookup", kra_payload).then(function (response) {
            if (response.data.status == "ok") {
              _this.customerForm.kra_pin = response.data.user.pin;
              _this.iprs_details_verified = true;
            } else {
              _sweetalert2.default.fire({
                icon: "error",
                text: response.data.message
              });
            }
          }).catch(function (error) {
            _this.iprs_details_verified = false;
            _sweetalert2.default.fire({
              icon: "error",
              text: error
            });
          });
        } else {
          _this.iprs_details_verified = false;
        }
        _this.iprs_verifying = !true;
      }).catch(function (error) {
        _this.iprs_details_verified = false;
        _this.iprs_verifying = !true;
        _sweetalert2.default.fire({
          icon: "error",
          text: "We are unable to perform ID verification at the moment. Please try again later. If this error persists, contact customer support"
        });
      });
    },

    confirmIfIdnoAlreadyTaken: function confirmIfIdnoAlreadyTaken(value) {
      var _this2 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: "search"
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this2.idno_already_taken = false;
        } else {
          _this2.idno_already_taken = true;
        }
      }).catch(function (error) {
        _this2.idno_already_taken = true;
      });
      return this.idno_already_taken;
    },
    confirmIfEmailAlreadyTaken: function confirmIfEmailAlreadyTaken(value) {
      var _this3 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: this.agent_type
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this3.email_already_taken = false;
        } else {
          _this3.email_already_taken = true;
        }
      }).catch(function (error) {
        _this3.email_already_taken = true;
      });
      return this.email_already_taken;
    },
    confirmIfPhoneAlreadyTaken: function confirmIfPhoneAlreadyTaken(value) {
      var _this4 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: this.agent_type
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this4.phone_already_taken = false;
        } else {
          _this4.phone_already_taken = true;
        }
      }).catch(function (error) {
        _this4.phone_already_taken = true;
      });
      return this.phone_already_taken;
    },
    onComplete: async function onComplete() {
      var api_url = "/api/self/signup";
      var data = {
        dob: "",
        email: this.customerForm.email,
        first_name: this.customerForm.fname,
        gender: "",
        id_number: this.customerForm.idno,
        id_type: "citizen",
        last_name: this.customerForm.lname,
        msisdn: this.customerForm.phone,
        nationality: "",
        other_name: "",
        password: "",
        services: [],
        kra_pin: this.customerForm.kra_pin,

        agent_type: this.agent_type
      };
      var payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: (0, _stringify2.default)(data)
      };
      var result = [];

      var _ref = await _sweetalert2.default.fire({
        title: "Terms and conditions",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: "I agree with the terms and conditions",
        confirmButtonText: 'Continue&nbsp;<i class="fa fa-arrow-right"></i>',
        showLoaderOnConfirm: true,
        inputValidator: function inputValidator(result) {
          return !result && "You need to agree with T&C";
        },
        preConfirm: function preConfirm() {
          return fetch(api_url, payload).then(function (response) {
            return response.json();
          }).then(function (data) {
            return result.push(data.status);
          }).catch(function () {
            _sweetalert2.default.insertQueueStep({
              icon: "error",
              title: "Unable to process your request"
            });
          });
        }
      }),
          accept = _ref.value;

      if (accept) {
        if (result.toString() == "200") {
          var timerInterval = void 0;
          _sweetalert2.default.fire({
            title: "Registration Sent",
            html: "Please wait, page will be redirected in a few seconds",
            timer: 2500,
            timerProgressBar: true,
            allowOutsideClick: false,
            willOpen: function willOpen() {
              _sweetalert2.default.showLoading();
              timerInterval = setInterval(function () {
                var content = _sweetalert2.default.getContent();
                if (content) {
                  var b = content.querySelector("b");
                  if (b) {
                    b.textContent = _sweetalert2.default.getTimerLeft();
                  }
                }
              }, 100);
            },
            onClose: function onClose() {
              clearInterval(timerInterval);
            }
          }).then(function (result) {
            if (result.dismiss === _sweetalert2.default.DismissReason.timer) {
              window.top.location.href = "/";
            }
          });
        } else {
          _sweetalert2.default.fire({
            icon: "error",
            text: "We are unable to process your request at the moment. If this error persists, kindly contact customer support for further assistance"
          });
        }
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form-wizard',{attrs:{"color":"#3498db","error-color":"#ff4949","shape":"tab"},on:{"on-complete":_vm.onComplete}},[_c('h2',{attrs:{"slot":"title"},slot:"title"},[_vm._v("To create an account, complete this wizard")]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Personal details","icon":"ti-user","before-change":_vm.validateCustomerDetailsStep}},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',{ref:"ruleForm",attrs:{"model":_vm.customerForm,"rules":_vm.rules}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Id Number")]),_vm._v(" "),(!_vm.$v.customerForm.idno.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.idno),expression:"customerForm.idno"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Id Number","maxlength":"10"},domProps:{"value":(_vm.customerForm.idno)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "idno", $event.target.value)},_vm.reset_verified]}}),_vm._v(" "),(!_vm.$v.customerForm.idno.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  ID Number must have at least\n                  "+_vm._s(_vm.$v.customerForm.idno.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.idno.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  ID Number already taken\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("First Name")]),_vm._v(" "),(!_vm.$v.customerForm.fname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.fname),expression:"customerForm.fname"}],staticClass:"form-control text-uppercase",attrs:{"type":"text","maxlength":"15","placeholder":"First name"},domProps:{"value":(_vm.customerForm.fname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "fname", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.fname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Name must have at least\n                  "+_vm._s(_vm.$v.customerForm.fname.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Last Name")]),_vm._v(" "),(!_vm.$v.customerForm.lname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.lname),expression:"customerForm.lname"}],staticClass:"form-control text-uppercase",attrs:{"type":"text","placeholder":"Last Name","maxlength":"15"},domProps:{"value":(_vm.customerForm.lname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "lname", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.lname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Name must have at least\n                  "+_vm._s(_vm.$v.customerForm.lname.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),(
                !_vm.iprs_details_verified && _vm.$v.customerForm.idno.alreadyTaken
              )?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-12 text-center"},[(_vm.iprs_verifying)?_c('span',{staticClass:"spinner-border spinner-border-sm",attrs:{"role":"status","aria-hidden":"true"}}):_vm._e(),_vm._v("  \n                "),_c('a',{staticClass:"btn btn-sm btn-outline-primary",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.validate_iprs}},[_vm._v("\n                  VERIFY TO PROCEED\n                ")])])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Create Agency ?")])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"yes","value":"Yes"},domProps:{"checked":_vm._q(_vm.agent_type,"Yes")},on:{"change":function($event){_vm.agent_type="Yes"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"yes"}},[_vm._v("Yes")])]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"no","value":"no"},domProps:{"checked":_vm._q(_vm.agent_type,"no")},on:{"change":function($event){_vm.agent_type="no"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"no"}},[_vm._v("No")])])])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Phone Number")]),_vm._v(" "),(!_vm.$v.customerForm.phone.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.phone),expression:"customerForm.phone"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Phone number","maxlength":"12"},domProps:{"value":(_vm.customerForm.phone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "phone", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.phone.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone number must have at least\n                  "+_vm._s(_vm.$v.customerForm.phone.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.phone.onlyDigitsAllowed)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Only digits allowed*\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.phone.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone already registered\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Email")]),_vm._v(" "),(!_vm.$v.customerForm.email.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.email),expression:"customerForm.email"}],staticClass:"form-control",attrs:{"type":"email","placeholder":"Email Address","maxlength":"30"},domProps:{"value":(_vm.customerForm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "email", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.email.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email must have at least\n                  "+_vm._s(_vm.$v.customerForm.email.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.email.isValidEmail)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Invalid email should contain an '@'\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.customerForm.email.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email already taken\n                ")]):_vm._e()])]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.iprs_details_verified)?_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputPassword4"}},[_vm._v("KRA Number\n                  "),(!_vm.$v.customerForm.kra_pin.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.customerForm.kra_pin),expression:"customerForm.kra_pin"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Personal KRA PIN Number","maxlength":"30","readonly":""},domProps:{"value":(_vm.customerForm.kra_pin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.customerForm, "kra_pin", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.customerForm.kra_pin.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  PIN must have at least\n                  "+_vm._s(_vm.$v.customerForm.kra_pin.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]):_vm._e()])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Confirm details","icon":"ti-thumb-up"}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('h5',{staticClass:"card-title"},[_vm._v("Verify Personal Details")]),_vm._v(" "),_c('form',[_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("First Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.fname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("Last Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.lname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("ID Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.idno}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("Phone Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.phone}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("KRA PIN Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.customerForm.kra_pin}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-3 col-form-label"},[_vm._v("Agent")]),_vm._v(" "),_c('div',{staticClass:"col-sm-9"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.agent_type}})])])])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Complete Registration","icon":"ti-check"}},[_c('div',{staticClass:"jumbotron jumbotron-fluid"},[_c('div',{staticClass:"container"},[_c('h1',{staticClass:"display-2"},[_vm._v("Hi "+_vm._s(_vm.customerForm.fname)+",")]),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n            Click finish to complete the process. Once submitted, you will\n            receive a confirmation email and/or Pin (if you selected create\n            agency as 'Yes') within 24 hrs to activate and be able to use your\n            new account.\n            "),_c('br'),_vm._v("\n            The Pesaflow Team\n          ")])])])])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56d43fcb", __vue__options__)
  } else {
    hotAPI.reload("data-v-56d43fcb", __vue__options__)
  }
})()}
});

;require.register("js/components/web/business_signup.vue", function(exports, require, module) {
;(function(){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _sweetalert = require("sweetalert2");

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _vueFormWizard = require("vue-form-wizard");

var _vueFormWizard2 = _interopRequireDefault(_vueFormWizard);

var _vuelidate = require("vuelidate");

var _vuelidate2 = _interopRequireDefault(_vuelidate);

var _validators = require("vuelidate/lib/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vuelidate2.default);
Vue.use(_vueFormWizard2.default);
exports.default = {
  data: function data() {
    return {
      email_already_taken: true,
      phone_already_taken: true,
      merchant_name_already_taken: true,
      services: null,
      selected_service: [],
      phone_error: null,
      email_error: null,
      errorMsg: null,
      businessForm: {
        bname: "",
        bregno: null,
        baddr: null,
        btaxpin: null,
        bphone: null,
        email: null
      },
      consumer_secret: null,
      consumer_key: null,
      api_token: null,
      merchant_id: null,
      agent_type: null
    };
  },

  validations: {
    businessForm: {
      bname: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmMerchantNameAlreadyTaken(value);
        }
      },
      bregno: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(6)
      },
      baddr: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4)
      },
      btaxpin: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(9)
      },
      bphone: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(12)
      },
      email: {
        required: _validators.required,
        minLength: (0, _validators.minLength)(4),
        isValidEmail: function isValidEmail(value) {
          if (value === "" || value == null) return true;
          return this.validEmail(value);
        },
        alreadyTaken: function alreadyTaken(value) {
          if (value === "" || value == null) return true;
          return this.confirmIfEmailAlreadyTaken(value);
        }
      }
    }
  },
  methods: {
    validEmail: function validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validPhone: function validPhone(phone) {
      var re = /^(254)\d{9}$/;
      return re.test(phone);
    },

    confirmOnlyDigits: function confirmOnlyDigits(phone) {
      var re = /^\d+$/;
      return re.test(phone);
    },

    validPhoneLength: function validPhoneLength(phone) {
      var re = /d{9}$/;
      return re.test(phone);
    },

    validateBusinesDetailsStep: function validateBusinesDetailsStep() {
      if (this.$v.businessForm.$invalid) {
        return false;
      }
      return true;
    },

    confirmIfEmailAlreadyTaken: function confirmIfEmailAlreadyTaken(value) {
      var _this = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: "search"
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this.email_already_taken = false;
        } else {
          _this.email_already_taken = true;
        }
      }).catch(function (error) {
        _this.email_already_taken = true;
      });
      return this.email_already_taken;
    },
    confirmIfPhoneAlreadyTaken: function confirmIfPhoneAlreadyTaken(value) {
      var _this2 = this;

      var url = "/api/users/all";
      var payload = {
        search: value,
        type: "search"
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this2.phone_already_taken = false;
        } else {
          _this2.phone_already_taken = true;
        }
      }).catch(function (error) {
        _this2.phone_already_taken = true;
      });
      return this.phone_already_taken;
    },
    confirmMerchantNameAlreadyTaken: function confirmMerchantNameAlreadyTaken(value) {
      var _this3 = this;

      var url = "/api/merchant/find";
      var payload = {
        search: value
      };
      Vue.axios.get(url, { params: payload }).then(function (response) {
        var data = response.data.items;
        if (data.length > 0) {
          _this3.merchant_name_already_taken = false;
        } else {
          _this3.merchant_name_already_taken = true;
        }
      }).catch(function (error) {
        _this3.merchant_name_already_taken = true;
      });
      return this.merchant_name_already_taken;
    },
    onComplete: async function onComplete() {
      var api_url = "/api/self/signup";
      var data = {
        business_name: this.businessForm.bname,
        business_ra_pin: this.businessForm.btaxpin,
        business_reg_no: this.businessForm.bregno,
        email: this.businessForm.email,
        msisdn: this.businessForm.bphone,
        password: "",
        services: [],

        agent_type: this.agent_type
      };
      var payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: (0, _stringify2.default)(data)
      };
      var result = [];

      var _ref = await _sweetalert2.default.fire({
        title: "Terms and conditions",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: "I agree with the terms and conditions",
        confirmButtonText: 'Continue&nbsp;<i class="fa fa-arrow-right"></i>',
        showLoaderOnConfirm: true,
        inputValidator: function inputValidator(result) {
          return !result && "You need to agree with T&C";
        },
        preConfirm: function preConfirm() {
          return fetch(api_url, payload).then(function (response) {
            return response.json();
          }).then(function (data) {
            return result.push(data.status);
          }).catch(function () {
            _sweetalert2.default.insertQueueStep({
              icon: "error",
              title: "Unable to process your request"
            });
          });
        }
      }),
          accept = _ref.value;

      if (accept) {
        if (result.toString() == "200") {
          var timerInterval = void 0;
          _sweetalert2.default.fire({
            title: "Registration Sent",
            html: "Please wait, page will be redirected in a few seconds",
            timer: 2500,
            timerProgressBar: true,
            allowOutsideClick: false,
            willOpen: function willOpen() {
              _sweetalert2.default.showLoading();
              timerInterval = setInterval(function () {
                var content = _sweetalert2.default.getContent();
                if (content) {
                  var b = content.querySelector("b");
                  if (b) {
                    b.textContent = _sweetalert2.default.getTimerLeft();
                  }
                }
              }, 100);
            },
            onClose: function onClose() {
              clearInterval(timerInterval);
            }
          }).then(function (result) {
            if (result.dismiss === _sweetalert2.default.DismissReason.timer) {
              window.top.location.href = "/";
            }
          });
        } else {
          _sweetalert2.default.fire({
            icon: "error",
            text: "We are unable to process your request at the moment. If this error persists, kindly contact customer support for further assistance"
          });
        }
      }
    }
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('form-wizard',{attrs:{"color":"#3498db","error-color":"#ff4949","shape":"tab"},on:{"on-complete":_vm.onComplete}},[_c('h2',{attrs:{"slot":"title"},slot:"title"},[_vm._v("To create an account, complete this wizard")]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Business Info","icon":"ti-settings","before-change":_vm.validateBusinesDetailsStep}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('form',{ref:_vm.businessRuleForm,attrs:{"model":_vm.businessForm,"rules":_vm.rules}},[_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Business Name\n                  "),(!_vm.$v.businessForm.bname.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bname),expression:"businessForm.bname"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Name","maxlength":"30"},domProps:{"value":(_vm.businessForm.bname)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bname", $event.target.value)}}})]),_vm._v(" "),(!_vm.$v.businessForm.bname.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                Name must have at least\n                "+_vm._s(_vm.$v.businessForm.bname.$params.minLength.min)+" letters.\n              ")]):_vm._e()]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputPassword4"}},[_vm._v("Business Registration Number\n                  "),(!_vm.$v.businessForm.bregno.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bregno),expression:"businessForm.bregno"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Business Registration Number","maxlength":"30"},domProps:{"value":(_vm.businessForm.bregno)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bregno", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.bregno.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Reg must have at least\n                  "+_vm._s(_vm.$v.businessForm.bregno.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Email Address")]),_vm._v(" "),(!_vm.$v.businessForm.email.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  *\n                ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.email),expression:"businessForm.email"}],staticClass:"form-control",attrs:{"type":"email","placeholder":"Email Address","maxlength":"30"},domProps:{"value":(_vm.businessForm.email)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "email", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.email.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email must have at least\n                  "+_vm._s(_vm.$v.businessForm.email.$params.minLength.min)+" letters.\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.businessForm.email.isValidEmail)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Invalid email should contain an '@'\n                ")]):_vm._e(),_vm._v(" "),(!_vm.$v.businessForm.email.alreadyTaken)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Email already taken\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Address\n                  "),(!_vm.$v.businessForm.baddr.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.baddr),expression:"businessForm.baddr"}],staticClass:"form-control",attrs:{"type":"text","maxlength":"40","placeholder":"1234 Nairobi, Kenya"},domProps:{"value":(_vm.businessForm.baddr)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "baddr", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.baddr.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Address must have at least\n                  "+_vm._s(_vm.$v.businessForm.baddr.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Business Tax PIN\n                  "),(!_vm.$v.businessForm.btaxpin.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.btaxpin),expression:"businessForm.btaxpin"}],staticClass:"form-control",attrs:{"type":"text","maxlength":"30","placeholder":"A2903XXXXXXXXXH"},domProps:{"value":(_vm.businessForm.btaxpin)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "btaxpin", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.btaxpin.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Tax must have at least\n                  "+_vm._s(_vm.$v.businessForm.btaxpin.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',{attrs:{"for":"inputAddress"}},[_vm._v("Business Tel Number\n                  "),(!_vm.$v.businessForm.bphone.required)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                    *\n                  ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-9"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.businessForm.bphone),expression:"businessForm.bphone"}],staticClass:"form-control",attrs:{"type":"number","placeholder":"Phone Number","maxlength":"15"},domProps:{"value":(_vm.businessForm.bphone)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.businessForm, "bphone", $event.target.value)}}}),_vm._v(" "),(!_vm.$v.businessForm.bphone.minLength)?_c('small',{staticClass:"text-danger",attrs:{"id":"passwordHelp"}},[_vm._v("\n                  Phone number must be at least\n                  "+_vm._s(_vm.$v.businessForm.bphone.$params.minLength.min)+" letters.\n                ")]):_vm._e()])]),_vm._v(" "),_c('br'),_vm._v(" "),_c('div',{staticClass:"form-row"},[_c('div',{staticClass:"col-3"},[_c('label',[_vm._v("Agent Type")])]),_vm._v("\n                \n              "),_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"independent","value":"independent"},domProps:{"checked":_vm._q(_vm.agent_type,"independent")},on:{"change":function($event){_vm.agent_type="independent"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"independent"}},[_vm._v("Independent Agent")])]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"pesaflow","value":"pesaflow"},domProps:{"checked":_vm._q(_vm.agent_type,"pesaflow")},on:{"change":function($event){_vm.agent_type="pesaflow"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"pesaflow"}},[_vm._v("Pesaflow Agent")])]),_vm._v(" "),_c('div',{staticClass:"custom-control custom-radio custom-control-inline"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.agent_type),expression:"agent_type"}],staticClass:"custom-control-input",attrs:{"type":"radio","id":"none","value":"none"},domProps:{"checked":_vm._q(_vm.agent_type,"none")},on:{"change":function($event){_vm.agent_type="none"}}}),_vm._v(" "),_c('label',{staticClass:"custom-control-label",attrs:{"for":"none"}},[_vm._v("None Agent")])])])])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Confirm details","icon":"ti-thumb-up"}},[_c('br'),_vm._v(" "),_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-body"},[_c('h5',{staticClass:"card-title"},[_vm._v("Verify Business Details")]),_vm._v(" "),_c('form',[_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Name")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bname}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Registration Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bregno}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Email")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.email}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Address")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.baddr}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Tax PIN")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.btaxpin}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Business Phone Number")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.businessForm.bphone}})])]),_vm._v(" "),_c('div',{staticClass:"form-group row"},[_c('label',{staticClass:"col-sm-5 col-form-label"},[_vm._v("Agent Type")]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('input',{staticClass:"form-control",attrs:{"type":"text","readonly":""},domProps:{"value":_vm.agent_type}})])])])])])]),_vm._v(" "),_c('tab-content',{attrs:{"title":"Complete Registration","icon":"ti-check"}},[_c('div',{staticClass:"jumbotron jumbotron-fluid"},[_c('div',{staticClass:"container"},[_c('h1',{staticClass:"display-2"},[_vm._v("Hi "+_vm._s(_vm.businessForm.bname)+",")]),_vm._v(" "),_c('p',{staticClass:"lead"},[_vm._v("\n            Click finish to complete the process. Once submitted, you will\n            receive a confirmation email within 24 hrs to activate and be able\n            to use your new account.\n            "),_c('br'),_vm._v("\n            The Pesaflow Team\n          ")])])])])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f766d2aa", __vue__options__)
  } else {
    hotAPI.reload("data-v-f766d2aa", __vue__options__)
  }
})()}
});

;require.register("js/socket.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var socket = new _phoenix.Socket("/socket", {
  params: {
    token: window.userToken
  }
});

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":
socket.connect();

// Now that you are connected, you can join channels with a topic:
// let channel = socket.channel("topic:subtopic", {})
// channel.join()
//   .receive("ok", resp => { console.log("Joined successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join", resp) })

exports.default = socket;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jQuery = require("jquery");
window.Vue = require("vue/dist/vue");
window.VueSelect = require("vue-select/dist/vue-select.js");


});})();require('___globals___');

require('js/app');
//# sourceMappingURL=app.js.map