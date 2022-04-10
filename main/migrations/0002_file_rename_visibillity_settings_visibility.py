# Generated by Django 4.0.3 on 2022-04-08 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file_name', models.CharField(max_length=30)),
                ('file', models.FileField(upload_to='')),
            ],
        ),
        migrations.RenameField(
            model_name='settings',
            old_name='visibillity',
            new_name='visibility',
        ),
    ]