from rest_framework import serializers
from .models import Departamento, Empleado, ReporteMensual


class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = "__all__"


class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = "__all__"


class ReporteMensualSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteMensual
        fields = "__all__"
