# Generated by Django 4.2.5 on 2024-07-22 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('asistrack_api', '0002_empleado_sueldo'),
    ]

    operations = [
        migrations.AddField(
            model_name='empleado',
            name='salario_hora',
            field=models.DecimalField(blank=True, decimal_places=2, editable=False, max_digits=5, null=True),
        ),
    ]
