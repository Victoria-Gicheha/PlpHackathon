from django.core.validators import (MaxValueValidator, MinValueValidator,
                                    RegexValidator)
from django.core.exceptions import ValidationError
from functools import partial
from src.validators import *
from django import forms
from django.contrib.auth import get_user_model
from django.forms import ModelForm
from django.utils.translation import gettext_lazy as _

User = get_user_model()


DateInput = partial(forms.DateInput, {'class': 'datepicker'})


class SignupForm(forms.Form):
    def __init__(self, *args, **kwargs):
        super(SignupForm, self).__init__(*args, **kwargs)
        self.fields['username'].label = False
    first_name = forms.CharField(max_length=35, label='First Name')
    # middle_name = forms.CharField(max_length=35, label='Middle Name', required=False )
    last_name = forms.CharField(max_length=35, label='Last Name')

    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_number = forms.CharField(
        validators=[phone_regex], max_length=17, label='Phone Number')
    # Password = forms.CharField(max_length=35, label='Last Name')

    def signup(self, request, user):
        user.email = self.cleaned_data['email']
        user.username = self.cleaned_data['email']
        user.last_name = self.cleaned_data['last_name']
        user.first_name = self.cleaned_data['first_name']
        user.phone_number = self.cleaned_data['phone_number']
        user.is_trainee = True
        user.save()


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('first_name', 'middle_name', 'last_name',
                  'gender', 'national_id', 'phone_number', 'country')


class profileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('profile', )
