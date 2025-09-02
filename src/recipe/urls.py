from django.urls import path
from . views import *

urlpatterns = [
    path("", index, name="index"),
    path('account/', account, name="account"),
    path("logout/", logout_view, name="logout"),
    path("dashboard/", dashboard, name="dashboard"),
    path('account_check/', account_check, name="account_check"),
    path("search/", search, name="search"),
    path("results/<int:prescription_id>/", results, name="results"),
    path("clinics/<str:lat>/<str:lon>/", clinics, name="clinics"),
    path('management/<str:pk>', manage_constants, name='management'),
    path("subscriptions/", subscriptions, name="subscriptions"),
    path("subscribe/<int:category_id>/", subscribe, name="subscribe"),
    path('create-constants/', create_constants, name='create_constants'),
    path('update-constants/', update_constants, name='update-constants'),
    path('subscription-categories/', subscription_categories,
         name='subscription-categories'),
    path('subscriptions/', subscriptions,
         name='subscriptions'),
    path('make-subscription/<int:pk>', make_subscription,
         name='make-subscription'),
    path('cancel-subscription/<int:pk>', cancel_subscription,
         name='cancel-subscription'),
    path('payment-confirmation/<int:pk>', payment_callback,
         name='payment-confirmation'),
    path("information/", information_list, name="information"),




]
