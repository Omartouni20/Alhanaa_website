# Generated by Django 5.2.1 on 2025-06-14 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alhana', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.GenericIPAddressField()),
                ('user_agent', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
