# Generated by Django 5.0.6 on 2024-05-29 14:50

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_validation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='validation',
            name='password',
            field=models.CharField(max_length=128, validators=[django.core.validators.RegexValidator('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
        ),
    ]
