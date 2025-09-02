from django.contrib import admin
from django.apps import apps
from .models import (User)
from django.db.models import BooleanField, ForeignKey, CharField, TextField
post_models = apps.get_app_config('users').get_models()


class UserAdmin(admin.ModelAdmin):
    search_fields = ['email', 'first_name', 'last_name']
    list_filter = ('is_staff', 'is_superuser', 'is_graduate',
                   'is_institution', 'is_employer')


admin.site.register(User, UserAdmin)
# admin.site.register(Gender)
# admin.site.register(Age)
# admin.site.register(MaritalStatus)
# admin.site.register(County)
# admin.site.register(Constituency)
# admin.site.register(Ward)


# for model in post_models:
#     try:
#         admin.site.register(model)
#     except admin.sites.AlreadyRegistered:
#         pass
for model in post_models:
    model_name = model.__name__

    if model_name == 'User':
        continue  # Skip User model if needed

    try:
        search_fields = [
            field.name for field in model._meta.get_fields()
            if isinstance(field, (CharField, TextField)) and not isinstance(field, ForeignKey)
        ]

        # Set list filter (boolean fields only)
        list_filter = [
            field.name for field in model._meta.get_fields()
            if isinstance(field, BooleanField)
        ]

        # Create admin class dynamically
        class ModelAdmin(admin.ModelAdmin):
            search_fields = search_fields
            list_filter = list_filter

        admin.site.register(model, ModelAdmin)

    except admin.sites.AlreadyRegistered:
        pass
