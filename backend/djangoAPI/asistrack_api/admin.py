from django.contrib import admin
from .models import Empleado, Departamento, Usuario


# Register your models here.
@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = (
        "nombre_completo",
        "cedula",
        "departamento",
        "sueldo",
        "salario_hora",
    )


@admin.register(Departamento)
class DepartamentoAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "nombre_departamento",
    )


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "nombre_usuario",
        "clave",
    )
