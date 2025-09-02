
from functools import partial

from django import forms


from .models import *

DateInput = partial(forms.DateInput, {'class': 'datepicker'})


class SearchForm(forms.ModelForm):
    class Meta:
        model = Search
        fields = ('information', )


class SubscriptionCategoryForm(forms.ModelForm):
    class Meta:
        model = SubscriptionCategory
        fields = ('name', 'description', 'price', 'duration_days')


class PaymentForm(forms.ModelForm):
    class Meta:
        model = Payment
        fields = ('payment_method', 'amount')
