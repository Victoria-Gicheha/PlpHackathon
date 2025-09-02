# import datetime
import re
import html
from .payment import initiate_intasend_payment
import string
import secrets
from django.http import (FileResponse, Http404, HttpResponse,
                         HttpResponseRedirect, JsonResponse)
from django.apps import apps
from users.forms import UserProfileForm, profileForm
from users.models import Constituency, County, Ward, Country
from .models import *
# from .forms import *
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.conf import settings
from datetime import timedelta
from datetime import datetime
import requests
import json
from math import radians, sin, cos, sqrt, atan2
import cohere
import importlib
from django.contrib.auth import get_user_model
from .models import *
from .forms import *
User = get_user_model()
today = datetime.now()
# Cohere setup
COHERE_API_KEY = "38jiyjjDdoyZe7byoKXi8nFn4rlA8ewOWF30o5Mq"
co = cohere.Client(COHERE_API_KEY)


@login_required
def account_check(request):
    user = request.user

    # training_link = request.session.get('registration_link')
    # print('redirect url is '+str(training_link))
    if request.method == "GET":
        if user.is_authenticated:
            if user.is_organization_staff:
                return HttpResponseRedirect('/dashboard/')
            elif user.is_admin and user.is_staff or user.is_superuser and user.is_staff:
                return HttpResponseRedirect('/dashboard/')
            else:
                # raise Http404
                return HttpResponseRedirect('/account/')
        else:
            return HttpResponseRedirect('/')


def haversine(lat1, lon1, lat2, lon2):
    """Calculate distance (km) between two points using Haversine formula"""
    R = 6371
    dlat = radians(float(lat2) - float(lat1))
    dlon = radians(float(lon2) - float(lon1))
    a = sin(dlat/2)**2 + cos(radians(float(lat1))) * \
        cos(radians(float(lat2))) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c


def get_institutions(lat, lon):
    """ Use OpenStreetMap Overpass API to find nearby clinics """
    try:
        overpass_url = "http://overpass-api.de/api/interpreter"
        query = f"""
            [out:json];
            (
            node["amenity"="university"](around:15000,{lat},{lon});
            node["amenity"="college"](around:15000,{lat},{lon});
            node["training"="technical"](around:15000,{lat},{lon});
            );
            out;
            """
        response = requests.get(overpass_url, params={'data': query})
        data = response.json()
        # print(data)
        institutions = ''
        for element in data.get('elements', []):
            name = element.get('tags', {}).get('name', "Unnamed Clinic")
            # print(name)
            if name:
                if institutions:
                    institutions = institutions+","+str(name)
                else:
                    institutions = name
        # print(institutions[:50])
        # return institutions[:50]
    except Exception as e:
        # print("Error fetching Institutions:", e)
        return None


def get_nearby_institutions(lat, lon):
    """ Use OpenStreetMap Overpass API to find nearby clinics """
    try:
        overpass_url = "http://overpass-api.de/api/interpreter"
        query = f"""
            [out:json];
            (
            node["amenity"="university"](around:15000,{lat},{lon});
            node["amenity"="college"](around:15000,{lat},{lon});
            node["amenity"="school"](around:15000,{lat},{lon});
            node["training"="technical"](around:15000,{lat},{lon});
            );
            out;
            """
        response = requests.get(overpass_url, params={'data': query})
        data = response.json()
        # print(data)
        institutions = []
        for element in data.get('elements', []):
            name = element.get('tags', {}).get('name', "Unnamed Clinic")
            phone = element.get('tags', {}).get('contact:phone', "")
            email = element.get('tags', {}).get('contact:email', "")
            emergency = element.get('tags', {}).get(
                'medical_service:basic_emergency_obsteric_care', "No")

            cl_lat, cl_lon = element["lat"], element["lon"]
            distance = haversine(lat, lon, cl_lat, cl_lon)
            # print(name)
            if name and phone and email:
                result = {
                    "name": str(name),
                    "phone": str(phone),
                    "email": str(email),
                    "emergency": str(emergency),
                    "lat": str(cl_lat),
                    "lon": str(cl_lon),
                    "distance": str(round(distance, 2))
                }
                institutions.append(result)
        # print(institutions[:50])
        return institutions[:50]
    except Exception as e:
        print("Error fetching Institutions:", e)
        return []


@login_required
def index(request):
    return render(request, "frontend/index.html")


@login_required
def subscription_categories(request):
    user = request.user
    if user.is_authenticated:
        categories = SubscriptionCategory.objects.filter(is_active=True)
        context = {
            'list': categories
        }
        return render(request, 'frontend/packages.html', context)
    else:
        return HttpResponseRedirect('/')


def generate_unique_api_ref(length=12):
    while True:
        # Generate a random string
        new_ref = ''.join(secrets.choice(string.ascii_letters +
                                         string.digits) for _ in range(length))
        new_ref = 'MG-'+str(new_ref)
        # Check if it already exists in Subscription
        if not Subscription.objects.filter(api_ref=new_ref).exists():
            return new_ref


def initiate_payment(subscription_id):
    # Retrieve the subscription details
    subscription = get_object_or_404(
        Subscription, id=subscription_id)
    user = subscription.user
    # Prepare the payment data
    payment_data = {
        "amount": int(subscription.category.price),
        "currency": "KES",  # Kenyan Shilling
        "email": user.email,
        "phone_number": user.phone_number,
        "callback": "https://127.0.0.1:8000/payment-confirmarion/",
    }
    url = "https://sandbox.intasend.com/api/v1/payment-requests/"
    print(payment_data)
    # Send the payment request to IntaSend
    response = requests.post(
        url,
        data=payment_data,
        auth=('ISPubKey_test_f1103727-4680-4c8c-afdd-af490d7a7b8e',
              'ISSecretKey_test_f188593e-8cbe-4320-a810-7a6ac4d8fd9c'),
    )

    print(response)
    if response.status_code == 200:
        payment_url = response.json().get("payment_url")
        return redirect(payment_url)
    else:
        # messages.error("Payment initiation failed. Please try again.")
        return HttpResponse('Payment initiation failed. Please try again.')


def payment_callback(request):
    # Extract payment details from the request
    payment_status = request.POST.get("status")
    transaction_id = request.POST.get("transaction_id")

    # Verify the payment status
    if payment_status == "success":
        # Update the subscription status in your database
        subscription = get_object_or_404(
            Subscription, transaction_id=transaction_id)
        subscription.is_active = True
        subscription.save()

        return JsonResponse({"status": "success", "message": "Payment successful"})
    else:
        return JsonResponse({"status": "failed", "message": "Payment failed"})


@login_required
def make_subscription(request, pk):
    user = request.user
    if user.is_authenticated:
        subscription_categories = Subscription.objects.filter(
            user=user).update(expired=True, confirmed=True, is_active=False, new=False)
        category = SubscriptionCategory.objects.get(id=pk)
        if float(category.price) > 0:
            new_key = generate_unique_api_ref()
            subscription = Subscription.objects.create(
                user=user, category=category, new=True, api_ref=new_key, expired=False, expiry_date=timezone.now() + timedelta(days=int(category.duration_days)))

            payment = initiate_intasend_payment(subscription.id)
        else:
            try:
                subscription = Subscription.objects.get(
                    user=user, expired=False, new=False)
            except:
                new_key = generate_unique_api_ref()
                subscription = Subscription.objects.create(
                    user=user, category=category, new=True, api_ref=new_key, pending=False, confirmed=True, expired=False, expiry_date=timezone.now() + timedelta(days=int(category.duration_days)))
        return redirect('/subscriptions')
    else:
        return HttpResponseRedirect('/')


@login_required
def cancel_subscription(request, pk):
    user = request.user
    if user.is_authenticated:
        subscription = Subscription.objects.get(id=pk)
        subscription.expired = True
        subscription.new = False
        subscription.save()
        # if float(category.price) > 0:

        #     pass
        # else:
        #     try:
        #         subscription = Subscription.objects.get(
        #             user=user, expired=False, new=False)
        #     except:
        #         subscription = Subscription.objects.create(
        #             user=user, category=category, new=True, expired=False, expiry_date=timezone.now() + timedelta(days=int(category.duration_days)))
        return redirect('/subscriptions')
    else:
        return HttpResponseRedirect('/')


# @login_required
# def subscriptions(request):
#     user = request.user
#     if user.is_authenticated:
#         subscription = Subscription.objects.filter(user=user)
#         context = {
#             'list': subscription
#         }
#         return render(request, 'frontend/subscriptions.html', context)
#     else:
#         return HttpResponseRedirect('/')


# def login_view(request):
#     if request.method == 'POST':
#         form = LoginForm(request.POST)
#         # if form.is_valid():
#         email = request.POST['email']
#         password = request.POST['password']
#         print(email)
#         user = authenticate(request, username=email, password=password)
#         if user:
#             login(request, user)
#             messages.success(request, "Logged in successfully!")
#             return redirect('dashboard')
#         else:
#             messages.error(request, "Invalid email or password.")
#     else:
#         form = LoginForm()
#     print(request.method)
#     messages.info(request, "Logged in to proceed!")
#     return render(request, 'prescribe/login.html', {'form': form})
# def login_view(request):
#     if request.method == "POST":
#         form = LoginForm(request, data=request.POST)
#         if form.is_valid():
#             user = form.get_user()
#             login(request, user)
#             messages.success(request, "Logged in successfully!")
#             return redirect("dashboard")
#         else:
#             messages.error(request, "Invalid email or password.")
#     else:
#         form = LoginForm()
#     return render(request, "frontend/login.html", {"form": form})


@login_required
def logout_view(request):
    logout(request)
    messages.info(request, "You have been logged out.")
    return redirect("login")


@login_required
def manage_constants(request, pk):
    user = request.user
    if user.is_authenticated:
        url = str(level)+'.html'
        input_string = pk
        output_string = input_string.replace('-', ' ')
        Title = str(output_string).title()

        last_digit = input_string[-1]
        if last_digit.lower() == "y":
            modified_str = input_string[:-1]
            modified_stred = str(modified_str)+'ies'
        else:
            modified_stred = str(input_string)+'s'
        level = Title.replace(' ', '')
        titleb = modified_stred.replace('-', ' ')

        Title = titleb.title()
        model_name = apps.get_model('prescribe', level)
        if user.is_admin or user.is_superuser:
            level_list = model_name.objects.filter(
                is_deleted=False).order_by('-is_active')
        else:
            level_list = model_name.objects.filter(
                is_deleted=False, is_active=True).order_by('-is_active')

        context = {
            'list': level_list,
            'Title': Title,
            'level': pk,
        }
        return render(request, url, context)
    else:
        return HttpResponseRedirect('/')


def create_constants(request):
    user = request.user
    if user.is_authenticated:
        level_name = request.POST['level_name']
        level = request.POST['level']
        output_string = level.replace('-', ' ')
        Title = 'CREATE NEW '+str(output_string).upper()
        levelnew = output_string.title().replace(' ', '')
        success_url = '/create-constants/'
        not_success_url = '/create-constants/'
        active_level_form = str(levelnew)+'Form'
        if level == 'payment-status-check':
            Title = 'CHECK PAYMENT STATUS'
        elif level == 'wallet-top-up':
            Title = 'WALLET TOP-UP'
        else:
            pass
        ActionPage = '/create-constants/'
        form_module = "prescribe.forms"
        form_module = importlib.import_module(form_module)
        form_class = getattr(form_module, active_level_form, None)
        new_url = level.lower()

        if level_name == "POST":
            form = form_class(request.POST, request.FILES)
            if form.is_valid():
                if level == 'payment':
                    currency = Payment.objects.get(name="KES", is_active=True)
                    wallets = Payment.objects.filter(user=user, is_incomplete=True, is_current=True).update(
                        is_incomplete=False, is_current=False, is_active=False, is_deleted=True)
                    wallets = Payment.objects.filter(user=user, is_previous=True, is_complete=True).update(
                        is_past=True, is_previous=False)
                    wallets = Payment.objects.filter(user=user, is_current=True, is_complete=True).update(
                        is_previous=True, is_current=False)
                    f = form.save(commit=False)
                    amount = request.POST['top_up_amount']
                    # print(amount)
                    f.is_active = True
                    f.is_current = True
                    f.is_incomplete = True
                    f.user = user
                    f.top_up_amount = amount
                    if f.currency == "USD":
                        f.currency_symbol = "$"
                    else:
                        f.currency_symbol = "KES:"
                    # currency=f.currency
                    f.save()
                    # try:
                    #     previous=Wallet.objects.get(user=user,is_current=True)
                    # except:
                    #     previous=''
                    # # wallets=Wallet.objects.filter(user=user,is_current=True).update(is_current=False)
                    # wallets=Wallet.objects.filter(user=user,is_previous=True).update(is_past=True,is_previous=False)
                    # wallets=Wallet.objects.filter(user=user,is_current=True).update(is_previous=True,is_current=False)

                    # try:
                    #     my_wallet=Wallet.objects.get(user=user,is_active=True)
                    # except:
                    #     my_wallet=Wallet.objects.create(user=user,is_active=True)
                    # # print(f.amount)
                    # if previous:
                    #     my_wallet.amount_available=int(previous.amount_available)+int(f.top_up_amount)
                    #     my_wallet.amount_used=previous.amount_used
                    # else:
                    #     my_wallet.amount_available=int(my_wallet.amount_available)+int(f.top_up_amount)
                    #     # my_wallet.amount_used=previous.amount_used
                    # my_wallet.last_topup=f.top_up_amount
                    # my_wallet.total_top_up=int(my_wallet.total_top_up)+int(f.top_up_amount)
                    # my_wallet.is_current=True
                    # my_wallet.save()

                    bill_reference = generate_unique_main_code_top()
                    print(bill_reference)
                    f.bill_reference = bill_reference
                    f.save()
                    # try:
                    #     new_top_up=WalletTopUp.objects.get(user=user,bill_reference=bill_reference,is_incomplete=True)
                    # except:
                    #     new_top_up=WalletTopUp.objects.create(user=user,bill_reference=bill_reference,is_incomplete=True)
                    sample_string = bill_reference
                    sample_string_bytes = sample_string.encode("ascii")

                    base64_bytes = base64.b64encode(sample_string_bytes)
                    new_bill = base64_bytes.decode("ascii")
                    new_string = "ORANGE-COURT-II"+str(today)+str(user.email)
                    new_string_bytes = new_string.encode("ascii")

                    bytes_b = base64.b64encode(new_string_bytes)
                    new_action = bytes_b.decode("ascii")
                    # context={
                    #     # 'items':shopitems,
                    #     # 'cart':cart,
                    #     # 'total_price':total_price,
                    #     # 'vat':vat,
                    #     # 'currency':currency,
                    #     # 'currency_symbol':currency_symbol,
                    #     # 'grand_total':grand_total,
                    #     'bill_reference':new_bill,
                    #     'reference':bill_reference,
                    #     'action':new_action,
                    #     # 'rate':rate,
                    #     'today':today,
                    # }
                    # print(bill_reference)
                    # return JsonResponse({"responce_type":"payment","bill":new_bill,"action":new_action},safe=False)
                    # return HttpResponseRedirect('/topup-payment/'+str(new_bill)+"/"+str(new_action))
                    page = initiate_stk_push(request)
                    # return HttpResponse(page)

                    cohorts = Maintenance.objects.filter(
                        is_previous=True).update(is_previous=False, is_past=True)
                    cohorts = Maintenance.objects.filter(is_current=True).update(
                        is_current=False, is_previous=True)
                    f = form.save(commit=False)
                else:
                    f = form.save(commit=False)
                f.is_active = True
                f.save()
                if level == 'wallet-top-up':
                    messages.add_message(
                        request, messages.WARNING, 'Mpesa Payment Initiated, check your phone!')
                    return HttpResponseRedirect('/')
                else:
                    return HttpResponse('redirect')
            else:
                return HttpResponse('not_succeess')
        else:
            form = form_class()
            context = {
                'form': form,
                'PageAction': ActionPage,
                'level': level,
                'Title': Title,
                'level_name': 'POST',
                'success_url': success_url,
                'not_success_url': not_success_url,
            }
        return render(request, 'fontend/partial_create.html', context)
    else:
        return HttpResponseRedirect('/')


@login_required
def dashboard(request):
    user = request.user
    if user.is_authenticated:
        if user.is_superuser:
            pass
        else:
            return redirect('/account')
        return render(request, "frontend/index.html")
    else:
        return HttpResponseRedirect('/')


def recipes_text_to_html(text: str) -> str:
    """
    Convert recipe text into nested HTML list:
    - Super bullet for recipe title
      - Child bullets for each sentence in description
    """

    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text.strip())

    # Split into recipe blocks
    parts = re.split(r'(?=\-\s*\*\*[^*]+?\:\*\*)', text)

    items = []
    for part in parts:
        part = part.strip()
        if not part:
            continue

        # Extract title and description
        m = re.match(r'^\-\s*\*\*(.+?)\:\*\*\s*(.+)$', part)
        if not m:
            continue
        title = html.escape(m.group(1).strip())
        desc = m.group(2).strip()

        # Split sentences by full stop
        sentences = [s.strip()
                     for s in re.split(r'(?<=\.)\s+', desc) if s.strip()]

        # Re-add missing period
        child_html = "\n".join([
            f"      <li>{html.escape(s if s.endswith('.') else s + '.')}</li>"
            for s in sentences
        ])

        recipe_html = f"""
  <li>
    🍲 {title}
    <ul>
{child_html}
    </ul>
  </li>
""".rstrip()
        items.append(recipe_html)

    return "<ul>\n" + "\n".join(items) + "\n</ul>"


def generate_education(information: str, lat: str, lon: str):
    """Generate information advice using Cohere"""
    search_info = """
    With this information: {information}.
    """
    try:
        # institutions_text = get_institutions(
        #     lat, lon) if lat and lon else []
        response = co.generate(
            model="command-r-plus",
            prompt=f"""
                {search_info}
               Generate recipes based on the ingredients provided, provide menus and cooking methods.  

            Based on this information:  
            1. Provide precise recipes that can be prepared with the given ingredients take note of the ingredients.  
            2. Suggest other complementary ingredients (if they exist) that can enhance or expand the recipe options.  
            3. Suggest cooking tips or variations that improve flavor, nutrition, or presentation.  

            Return your answer in this exact format if possible return well structured html content in unordered list and titles or bullets:  

            # RESULTS  
            - (list results here)  

            # SUGGESTIONS  
            - (list suggestions here)  
             """,)
        generated_text = response.generations[0].text.strip()
        generated_text = generated_text.strip()

        # Normalize case for searching
        text_lower = generated_text.lower()

        results_idx = text_lower.find("# results")
        suggestions_idx = text_lower.find("# suggestions")

        results, suggestions = "", ""

        if results_idx != -1 and suggestions_idx != -1:
            results = generated_text[results_idx:suggestions_idx].strip()
            suggestions = generated_text[suggestions_idx:].strip()

            # Remove the section headers
            results = results.replace("# RESULTS", "").replace(
                "# results", "").strip()
            suggestions = suggestions.replace(
                "# SUGGESTIONS", "").replace("# suggestions", "").strip()

        elif results_idx != -1:  # only results found
            results = generated_text[results_idx:].strip()
            results = results.replace("# RESULTS", "").replace(
                "# results", "").strip()

        elif suggestions_idx != -1:  # only suggestions found
            suggestions = generated_text[suggestions_idx:].strip()
            suggestions = suggestions.replace(
                "# SUGGESTIONS", "").replace("# suggestions", "").strip()

        else:  # fallback: everything is "results"
            results = generated_text

        results = recipes_text_to_html(results)
        suggestions = recipes_text_to_html(suggestions)
        return results, suggestions
        # results, suggestions = "", ""
        # if "### RESULTS" in generated_text and "### SUGGESTIONS" in generated_text:
        #     parts = generated_text.split("### SUGGESTIONS")
        #     results = parts[0].replace("### RESULTS", "").strip()
        #     suggestions = parts[1].strip()
        # else:
        #     results = generated_text
        #     suggestions = "No specific suggestions generated."
        # return results, suggestions
    except Exception as e:
        print("Cohere API Error:", e)
        return "Unable to generate information at this time.", ""
        # generated_text = response.generations[0].text.strip()

    #     results, suggestions = "", ""
    #     if "results" in generated_text:
    #         parts = generated_text.split("results")
    #         results = parts[0].replace("results", "").strip()
    #         suggestions = "suggestions" + parts[1].strip()
    #     else:
    #         results = generated_text
    #         suggestions = "No specific results generated."
    #     return results, suggestions
    # except Exception as e:
    #     print("Cohere API Error:", e)
    #     return "Unable to generate information at this time.", ""


@login_required
def update_constants(request):
    user = request.user
    if user.is_authenticated:
        level_name = request.POST['level_name']
        instanceid = request.POST['instance']

        level = request.POST['level']
        output_string = level.replace('-', ' ')
        Title = 'UPDATE '+str(output_string).upper()
        levelnew = output_string.title().replace(' ', '')
        # print(levelnew)
        try:
            model_name = apps.get_model('institutions', levelnew)
            instance = model_name.objects.get(id=instanceid)
        except:
            model_name = apps.get_model('registrations', levelnew)
            instance = model_name.objects.get(id=instanceid)
        active_level_form = str(levelnew)+'Form'
        ActionPage = '/update-constants/'
        form_module = "institutions.forms"
        form_module = importlib.import_module(form_module)
        form_class = getattr(form_module, active_level_form, None)
        input_string = level_name
        output_string = input_string.replace('-', ' ')
        if level == 'institution':
            success_url = '/manage-data/institution/tertiary'
            not_success_url = '/create-new-level/'
        else:
            success_url = '/management/'+str(level)
            not_success_url = '/create-new-level/'

        if level_name == "POST":
            # success_file=request.POST['success_url']
            form = form_class(request.POST, request.FILES, instance=instance)
            # print(form)
            if form.is_valid():
                f = form.save(commit=False)
                if level == 'institution':
                    contact_email = f.contact_email
                    f.email = contact_email
                    try:
                        accountp = User.objects.get(email=contact_email)
                    except User.DoesNotExist:
                        password = 'P@ssword123'
                        password2 = make_password(password)
                        accountp = User.objects.create(
                            email=contact_email, password=password2, is_institution=True)
                    f.user = accountp
                    account = accountp

                    try:
                        new_institution_user = InstitutionUser.objects.get(
                            user=account, institution=f, is_active=True)
                    except:
                        new_institution_user = InstitutionUser.objects.filter(
                            user=account, is_previous=True).update(is_previous=False, is_past=False)
                        new_institution_user = InstitutionUser.objects.filter(
                            user=account, is_active=True).update(is_previous=True, is_active=False)
                        new_institution_user = InstitutionUser.objects.create(
                            user=account, institution=f, is_active=True)
                        # f.trainers=int(f.trainers)+1
                        # f.save()
                    # print(f.county)
                    county_region = RegionalCounty.objects.get(county=f.county)
                    f.region = county_region.region
                    f.save()

                else:
                    pass

                f.is_active = True
                f.save()
                if level == 'region':
                    reagional = RegionalCounty.objects.filter(
                        is_active=True, region=f).count()
                    f.counties = reagional
                    f.save()
                return HttpResponse('redirect')
            else:
                return HttpResponse('not_succeess')
        else:
            form = form_class(instance=instance)
            context = {
                'form': form,
                'PageAction': ActionPage,
                'level': level,
                'Title': Title,
                'level_name': 'POST',
                'success_url': success_url,
                'not_success_url': not_success_url,
                'instance': instance,
            }
        return render(request, 'dashboard/constants/partial_create.html', context)
    else:
        return HttpResponseRedirect('/')


@login_required
def search(request):
    user = request.user
    try:
        subscription = Subscription.objects.filter(user=user, is_active=True, is_deleted=False, expired=False).latest(
            "expiry_date")  # get the latest subscription
    except:
        return redirect('/subscription-categories')
    if timezone.now() < subscription.expiry_date:
        if request.method == "POST":
            form = SearchForm(request.POST)
            if form.is_valid():
                lat = request.POST.get("latitude")
                lon = request.POST.get("longitude")
                results, suggestion = generate_education(
                    form.cleaned_data["information"], lat, lon)
                # print(results, suggestion)
                found = Search.objects.create(
                    user=request.user,
                    information=form.cleaned_data["information"],
                    results=results,
                    suggestions=suggestion
                )

                # institutions = get_nearby_institutions(
                #     lat, lon) if lat and lon else []
                institutions = []
                messages.success(
                    request, "Results successfully generated!")
                return render(
                    request,
                    "frontend/data_result.html",
                    {"results": found,
                     "institutions": json.dumps(institutions),
                     "institutions_list": institutions,
                        "user_location": {"lat": lat, "lon": lon}}
                )
        else:
            form = SearchForm()
        return render(request, "frontend/information_form.html", {"form": form})
    else:
        return redirect('/subscription-categories')


@login_required
def results(request, prescription_id):
    results = get_object_or_404(Search, pk=prescription_id)
    institutions = []
    # institutions = MedicalCenter.objects.all()[:5]
    return render(request, "frontend/data_result.html", {"results": results, "institutions": institutions})


@login_required
def clinics(request, lat, lon):
    clinics_data = get_nearby_institutions(lat, lon)
    return render(request, "frontend/clinics.html", {"clinics": clinics_data, "user_location": {"lat": lat, "lon": lon}})


@login_required
def subscriptions(request):
    subscriptions = Subscription.objects.all()
    active_sub = Subscription.objects.filter(
        user=request.user, expiry_date__gte=timezone.now()
    ).first()
    return render(request, "frontend/subscriptions.html", {"list": subscriptions, "active_sub": active_sub})


@login_required
def information_list(request):
    list = Search.objects.all()
    return render(request, "frontend/data.html", {"list": list})


@login_required
def subscribe(request, category_id):
    category = get_object_or_404(SubscriptionCategory, pk=category_id)
    start = timezone.now()
    # Example: 30 days, adjust to category field if exists
    expiry = start + timedelta(days=30)

    subscription = Subscription.objects.create(
        user=request.user,
        category=category,
        start_date=start,
        expiry_date=expiry
    )

    Payment.objects.create(
        user=request.user,
        amount=100.0,  # TODO: replace with category.price if you add it
        payment_method="mpesa",
        status="completed"
    )

    messages.success(
        request, f"Subscribed to {category.name} until {expiry.strftime('%Y-%m-%d')}")
    return redirect("subscriptions")


def account(request):
    user = request.user
    if user.is_authenticated:
        subscription = Subscription.objects.filter(user=user, is_active=True)
        total_payments = 0.0
        for item in subscription:
            total_payments = float(item.category.price)+total_payments
        context = {
            'list': subscription,
            'prescriptions': Search.objects.filter(is_active=True, user=user).count(),
            'total_payments': total_payments,
        }
        # print(context)
        return render(request, 'frontend/index.html', context)
    else:
        return HttpResponseRedirect('/')
