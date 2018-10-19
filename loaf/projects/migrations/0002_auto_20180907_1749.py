# Generated by Django 2.0.8 on 2018-09-07 08:49

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AptitudeScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField()),
                ('name', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='apt',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=1000), default=list, size=None),
        ),
        migrations.AddField(
            model_name='aptitudescore',
            name='project_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='aptitude', to='projects.Project'),
        ),
    ]