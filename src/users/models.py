import uuid

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core.validators import RegexValidator
from django.db import models

# from institutions.models import Constituency, County, Ward
from src.validators import validate_file_extension


class Country(models.Model):
    name = models.CharField(max_length=100, null=True)
    iso = models.CharField(max_length=300, blank=True, null=True)
    nicename = models.CharField(max_length=300, blank=True, null=True)
    iso3 = models.CharField(max_length=300, blank=True, null=True)
    numcode = models.CharField(max_length=300, blank=True, null=True)
    phonecode = models.CharField(max_length=300, blank=True, null=True)

    # buildings = models.CharField(max_length=200,null=True,blank=True,default=0)
    # suites = models.CharField(max_length=200,null=True,blank=True,default=0)
    # businesses = models.CharField(max_length=200,null=True,blank=True,default=0)
    # branches = models.CharField(max_length=200,null=True,blank=True,default=0)
    # is_active=models.BooleanField(default=True)
    # is_deleted=models.BooleanField(default=False)
    # status = models.CharField(max_length=300,blank=True, null=True)
    def __str__(self):
        return str(self.name)


class County(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=300, blank=True, null=True)
    status = models.CharField(max_length=300, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.name)


class Constituency(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=300, blank=True, null=True)
    county = models.ForeignKey(County, blank=True, on_delete=models.CASCADE)
    status = models.CharField(max_length=300, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.name)


class Ward(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    code = models.CharField(max_length=300, blank=True, null=True)
    constituency = models.ForeignKey(
        Constituency, blank=True, on_delete=models.CASCADE)
    status = models.CharField(max_length=300, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.name)


class MaritalStatus(models.Model):
    name = models.CharField(max_length=300, verbose_name="Status")
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Marital Status"
        verbose_name_plural = "Marital Status"


class Age(models.Model):
    name = models.CharField(max_length=300, verbose_name="Age Group")
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Age Groups"


class Gender(models.Model):
    name = models.CharField(max_length=300, verbose_name="Gender")
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class CustomUserManager(BaseUserManager):

    def create_user(self, email, phone_number=None, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            phone_number=phone_number, username=self.normalize_email(email)
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email,  password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=200, null=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=200, null=True, blank=True)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200, null=True, blank=True)
    national_id = models.CharField(max_length=200, null=True, blank=True)
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    gender = models.ForeignKey(
        Gender, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(
        validators=[phone_regex], max_length=17, null=True, blank=True)
    age_group = models.ForeignKey(
        Age, null=True, blank=True, on_delete=models.CASCADE)
    birth_date = models.CharField(
        max_length=100, null=True, blank=True, verbose_name="Date of Birth")
    birth_certificate = models.CharField(
        max_length=200, null=True, blank=True, verbose_name="Birth Certificate Number")
    # institution = models.ForeignKey(Institution,null=True,blank=True,on_delete=models.CASCADE)
    marital_status = models.ForeignKey(
        MaritalStatus, null=True, blank=True, on_delete=models.CASCADE)
    county = models.ForeignKey(
        County, null=True, blank=True, on_delete=models.CASCADE)
    country = models.ForeignKey(
        Country, null=True, blank=True, on_delete=models.CASCADE)
    constituency = models.ForeignKey(
        Constituency, null=True, blank=True, on_delete=models.CASCADE)
    new_ward = models.CharField(
        max_length=200, null=True, blank=True, verbose_name='Ward')
    age = models.CharField(max_length=200, null=True,
                           blank=True, verbose_name='Age')
    data_file = models.CharField(max_length=200, null=True, blank=True)
    disability = models.CharField(
        max_length=200, null=True, blank=True, verbose_name='disability')
    is_disabled = models.BooleanField(default=False)
    ward = models.ForeignKey(
        Ward, null=True, blank=True, on_delete=models.CASCADE)
    profile = models.FileField(
        blank=True, null=True, upload_to='user_profiles/users')
    banner = models.FileField(blank=True, null=True, upload_to='banners/users')
    background = models.FileField(
        blank=True, null=True, upload_to='background/users')
    next_of_kin_name = models.CharField(
        max_length=500, null=True, blank=True, verbose_name="Next of kin's name")
    next_of_kin_email = models.CharField(
        max_length=500, null=True, blank=True, verbose_name="Next of kin's email")
    next_of_kin_phone = models.CharField(
        max_length=500, null=True, blank=True, verbose_name="Next of kin's phone")
    is_active = models.BooleanField(default=True)
    is_banned = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    banned_by = models.CharField(max_length=300, null=True, blank=True)
    deleted_by = models.CharField(max_length=300, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_special_user = models.BooleanField(default=False)

    is_organization_staff = models.BooleanField(default=False)
    is_ict_admin = models.BooleanField(default=False, verbose_name="ICT Admin")
    is_admin = models.BooleanField(default=False)
    is_graduate = models.BooleanField(
        default=False, verbose_name="Is Graduate")
    is_employer = models.BooleanField(
        default=False, verbose_name="Is employer")
    is_caretaker = models.BooleanField(
        default=False, verbose_name="Is Caretaker")
    is_agent = models.BooleanField(default=False, verbose_name="Is agent")
    is_landlord = models.BooleanField(
        default=False, verbose_name="Is landlord")

    # is_institution = models.BooleanField(default=False, verbose_name="Is a Training Institution")
    is_trainee = models.BooleanField(
        default=False, verbose_name="Is a  Trainee")
    is_customer = models.BooleanField(
        default=False, verbose_name="Is a  customer")
    is_executive = models.BooleanField(
        default=False, verbose_name="Is a  Executive")
    is_trainer = models.BooleanField(
        default=False, verbose_name="Is a Trainer")
    is_lead_secretariat = models.BooleanField(
        default=False, verbose_name="Is a Lead secretariat")
    is_secretariat = models.BooleanField(
        default=False, verbose_name="Is a secretariat")
    is_evaluator = models.BooleanField(
        default=False, verbose_name="Is an evaluator")
    is_manager = models.BooleanField(
        default=False, verbose_name="Is a manager")
    is_supervisor = models.BooleanField(
        default=False, verbose_name="Is a supervisor")
    is_director = models.BooleanField(
        default=False, verbose_name="Is a director")
    is_coordinator = models.BooleanField(
        default=False, verbose_name="Is a regional coordinator")
    is_institution = models.BooleanField(
        default=False, verbose_name="Is a institution coordinator")
    is_default_password = models.BooleanField(
        default=True, verbose_name="Default_password")
    date_created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True, blank=True)
    last_updated = models.DateTimeField(
        auto_now_add=False, auto_now=True, null=True, blank=True)
    # date_created = models.DateTimeField(auto_now_add=True, auto_now=False)
    # last_updated = models.DateTimeField(auto_now_add=False, auto_now=True)

    # date_joined = models.DateTimeField(auto_now_add=True)
    objects = CustomUserManager()

    def __str__(self):
        return self.email
