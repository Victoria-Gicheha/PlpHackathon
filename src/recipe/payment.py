import requests
import json
import os
from django.shortcuts import get_object_or_404
from . models import Subscription


def initiate_intasend_payment(subscription_id: int):
    """
    Initiates a payment request with the IntaSend API.

    Args:
        amount (float): The amount to be paid.
        currency (str): The currency code (e.g., 'KES', 'USD').
        phone_number (str): The customer's mobile number.
        api_ref (str): Your unique transaction reference.
        public_api_key (str): Your IntaSend public API key.
        redirect_url (str): The URL to redirect the user after payment.
        live_mode (bool): Set to True for the live environment, False for sandbox.

    Returns:
        dict: The JSON response from the IntaSend API.

    Raises:
        requests.exceptions.RequestException: If the request fails.
    """

    # 🔗 Use the correct API URL based on the environment
    subscription = get_object_or_404(
        Subscription, id=subscription_id)
    user = subscription.user
    base_url = "https://sandbox.intasend.com/api/v1/"
    # if not live_mode else "https://payment.intasend.com/api/v1/"
    api_endpoint = "payment/mpesa-stk-push/"
    full_url = f"{base_url}{api_endpoint}"
    public_api_key = 'ISSecretKey_test_f188593e-8cbe-4320-a810-7a6ac4d8fd9c'

    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {public_api_key}"
    }

    # 📦 Construct the payload
    payload = {
        "amount": subscription.category.price,
        "currency": 'KES',
        "phone_number": user.phone_number,
        "api_ref": subscription.api_ref,
        "redirect_url": 'https://127.0.0.1:8000/payment-confirmarion/',
        "comment": "Payment for "+str(subscription.category.name)
    }

    try:
        response = requests.post(
            full_url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()  # 🚨 Raise an HTTPError for bad responses (4xx or 5xx)
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}
    except json.JSONDecodeError as e:
        print(f"Failed to decode JSON response: {e}")
        return {"error": "Invalid JSON response"}
