from django.db import models
from django.contrib.auth.hashers import make_password


# Create your models here.
class Departamento(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=30)

    def __str__(self):
        return self.nombre_departamento


class Empleado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=100)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    cedula = models.CharField(max_length=10)
    sueldo = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    salario_hora = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True, editable=False
    )

    def __str__(self):
        return self.nombre_completo

    def save(self, *args, **kwargs):
        if self.sueldo:
            valor_dia = float(self.sueldo) / 30
            self.salario_hora = valor_dia / 8
        super().save(*args, **kwargs)


class ReporteMensual(models.Model):
    id = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha = models.DateField()

    def __str__(self):
        return f"Reporte {self.id} - {self.empleado.nombre_completo}"


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=100, unique=True)
    clave = models.CharField(max_length=100)

    def save(self, *args, **kwargs):
        if not self.pk:  # Solo encriptar la clave al crear un nuevo usuario
            self.clave = make_password(self.clave)
        super(Usuario, self).save(*args, **kwargs)
