# Generated by Django 2.0.8 on 2018-09-08 12:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_apt_score'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='apt_score',
        ),
    ]