# Generated by Django 4.2.4 on 2023-08-30 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_alter_userinfo_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userbook',
            name='book',
            field=models.CharField(max_length=100),
        ),
    ]
