# Generated by Django 3.0.5 on 2021-03-03 16:16

import api.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210216_1637'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30)),
                ('email', models.EmailField(max_length=30)),
                ('passwrod', models.CharField(max_length=30)),
            ],
        ),
        migrations.DeleteModel(
            name='test',
        ),
        migrations.AddField(
            model_name='patient',
            name='date_added',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date_added'),
        ),
        migrations.AddField(
            model_name='patient',
            name='date_updated',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date_updated'),
        ),
        migrations.AddField(
            model_name='patient',
            name='picture',
            field=models.ImageField(default='C:/Users/bibou/Desktop/projet/covid/pictures/patient/default.png', upload_to=api.models.upload_location_patient),
        ),
    ]
