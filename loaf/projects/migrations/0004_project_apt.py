# Generated by Django 2.0.8 on 2018-09-08 09:03

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20180908_1750'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='apt',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=1000), default=list, size=None),
        ),
    ]
