# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-30 22:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_auto_20160530_1809'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cycle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, unique=True)),
                ('number', models.IntegerField(unique=True)),
                ('description', django_mysql.models.SizedTextField(blank=True, size_class=2)),
                ('image', models.ImageField(blank=True, upload_to='')),
            ],
        ),
        migrations.AlterField(
            model_name='article',
            name='cycle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Cycle'),
        ),
        migrations.AlterField(
            model_name='article',
            name='slug',
            field=models.CharField(blank=True, editable=False, max_length=255),
        ),
        migrations.AlterField(
            model_name='comment',
            name='status',
            field=django_mysql.models.EnumField(choices=[('pending', 'pending'), ('reviewed', 'reviewed')], default='pending'),
        ),
        migrations.AddField(
            model_name='cycle',
            name='articles',
            field=models.ManyToManyField(related_name='cycles', related_query_name='rotation', to='dashboard.Article'),
        ),
    ]