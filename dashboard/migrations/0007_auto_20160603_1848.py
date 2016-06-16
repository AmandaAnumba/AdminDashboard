# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-03 22:48
from __future__ import unicode_literals

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0006_auto_20160530_1855'),
    ]

    operations = [
        migrations.CreateModel(
            name='Topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('subcategory', django_mysql.models.ListCharField(models.CharField(max_length=15), max_length=80, size=5)),
                ('image', django_mysql.models.SizedTextField(blank=True, size_class=2)),
                ('descrtiption', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.RemoveField(
            model_name='article',
            name='category',
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='topics', related_query_name='category', to='dashboard.Topic'),
        ),
    ]
