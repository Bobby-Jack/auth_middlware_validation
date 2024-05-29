from django.db import models
from django.contrib.auth.models import AbstractUser

from django.core.validators import RegexValidator

# Create your models here.


class Role(models.Model):
    name = models.CharField(max_length=20)


class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True)


class Validation(models.Model):
    username = models.CharField(max_length=24, validators=[RegexValidator('[+-/%\s]', message='username cant have special caracter', inverse_match=True)])
    first_name = models.CharField(max_length=32, validators=[RegexValidator('^(?!.*[a-z][A-Z])(?!.*[A-Z][a-z]+[A-Z]).*')])
    last_name = models.CharField(max_length=32, validators=[RegexValidator('^(?!.*[a-z][A-Z])(?!.*[A-Z][a-z]+[A-Z]).*')])
    email = models.EmailField(validators=[RegexValidator(regex='^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com|molengeek\.com|bona\.com)$')])
    password = models.CharField(max_length=128, validators=[RegexValidator('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$')])
    phone = models.CharField(max_length=20)
    postal = models.CharField(max_length=4)
    url_img = models.CharField(max_length=255, validators=[RegexValidator(regex='^[A-Za-z0-9._%+-]+@(\.png|\.jpg|\.jpeg|\.gif)$')])




















# username = models.CharField( max_length=24,validators=RegexValidator('[&"()-_+=°]~#|`^@]', inverse_match=True))
# first_name = models.CharField(max_length=32,validators=RegexValidator('^(?!.*[a-z][A-Z])(?!.*[A-Z][a-z]+[A-Z]).*'))
# last_name = models.CharField(max_length=32,validators=RegexValidator('^(?!.*[a-z][A-Z])(?!.*[A-Z][a-z]+[A-Z]).*'))