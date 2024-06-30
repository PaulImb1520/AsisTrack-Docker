from django.db import models

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

    def __str__(self):
        return self.nombre_completo

class ReporteMensual(models.Model):
    id = models.AutoField(primary_key=True)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha = models.DateField()

    def __str__(self):
        return f'Reporte {self.id} - {self.empleado.nombre_completo}'
