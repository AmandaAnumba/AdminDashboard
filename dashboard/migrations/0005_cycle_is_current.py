# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 22:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0004_auto_20160530_1848'),
    ]

    operations = [
        migrations.AddField(
            model_name='cycle',
            name='is_current',
            field=models.BooleanField(default=False),
        ),
    ]