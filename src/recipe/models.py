from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class Search(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    information = models.TextField()
    results = models.TextField(blank=True, null=True)
    suggestions = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Search {self.id} for {self.user.first_name}"

    class Meta:
        verbose_name = "Search"


class SubscriptionCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField(default=0)
    duration_days = models.PositiveIntegerField(default=30)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Subscription(models.Model):
    user = models.ForeignKey(
        User, related_name='subscriptions', on_delete=models.CASCADE)
    category = models.ForeignKey(
        SubscriptionCategory, related_name='subscriptions', on_delete=models.CASCADE)
    start_date = models.DateTimeField(default=timezone.now)
    expiry_date = models.DateTimeField()
    created_at = models.DateTimeField(default=timezone.now)
    api_ref = models.CharField(max_length=50, null=True, blank=True)
    expired = models.BooleanField(default=True)
    new = models.BooleanField(default=True)
    confirmed = models.BooleanField(default=False)
    pending = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.first_name} - {self.category.name}"


class Payment(models.Model):
    PAYMENT_METHODS = [("mpesa", "Mpesa"), ("card", "Card"),
                       ("paypal", "PayPal"),]
    STATUS_CHOICES = [("pending", "Pending"), ("completed",
                                               "Completed"), ("failed", "Failed"),]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    payment_date = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHODS)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="pending")

    def __str__(self):
        return f"Payment {self.id} - {self.user.username} - {self.status}"
