# Generated by Django 2.0.8 on 2018-09-08 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20180901_1736'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='apt_score',
            field=models.IntegerField(null=True),
        ),
    ]