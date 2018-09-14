# Generated by Django 2.0.8 on 2018-09-08 12:20

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_project_apt'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='members',
        ),
        migrations.AddField(
            model_name='project',
            name='apt_score',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), default=list, size=50),
        ),
        migrations.AlterField(
            model_name='project',
            name='max_member',
            field=models.IntegerField(default=1),
        ),
    ]
