# Generated by Django 4.2.5 on 2023-10-17 10:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='topic',
            name='message',
        ),
    ]
