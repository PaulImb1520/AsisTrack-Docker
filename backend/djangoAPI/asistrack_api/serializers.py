from rest_framework import serializers
from .models import Departamento, Empleado, ReporteMensual, Usuario


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = ["nombre_departamento"]


class EmpleadoSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Empleado
        fields = [
            "id",
            "nombre_completo",
            "cedula",
            "sueldo",
            "salario_hora",
            "departamento_nombre",
        ]

    def get_departamento_nombre(self, obj):
        return obj.departamento.nombre_departamento if obj.departamento else None


class ReporteMensualSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteMensual
        fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id", "nombre_usuario", "clave"]
