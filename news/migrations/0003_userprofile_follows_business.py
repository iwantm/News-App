# Generated by Django 3.0.3 on 2020-04-14 12:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='follows_business',
            field=models.BooleanField(default=False),
        ),
    ]
