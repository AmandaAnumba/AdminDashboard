# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 17:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='emailVerified',
            new_name='verified',
        ),
        migrations.AddField(
            model_name='user',
            name='instagram',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name='user',
            name='linkedin',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AddField(
            model_name='user',
            name='pinterest',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('F', 'Founder'), ('M', 'Member'), ('C', 'Contributor'), ('W', 'Staff Writer')], default='M', editable=False, max_length=1),
        ),
    ]
