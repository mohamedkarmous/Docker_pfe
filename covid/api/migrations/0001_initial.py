# Generated by Django 3.0.5 on 2021-02-16 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='test',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('image', models.ImageField(upload_to='')),
                ('valide', models.BooleanField(null=True)),
            ],
        ),
    ]