from django.shortcuts import render
import requests
from requests.auth import HTTPDigestAuth
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Departamento, Empleado, ReporteMensual
from .serializers import (
    DepartamentoSerializer,
    EmpleadoSerializer,
    ReporteMensualSerializer,
)


# Create your views here.
@csrf_exempt
@require_POST
def fetch_device_data(request):
    url = "https://192.168.200.102/ISAPI/AccessControl/LocalAttendance/SearchSummarySheet?format=json"

    auth = HTTPDigestAuth("admin", "uio01matriz")

    body = {
        "searchID": "e34fdabee1014c7bbcb6b3981c91a7e0",
        "searchResultPosition": 1,
        "maxResults": 10,
        "statisticalTime": "month",
        "month": "2024-06",
    }

    headers = {"Content-Type": "application/json"}

    try:
        response = requests.post(
            url, auth=auth, json=body, headers=headers, verify=False
        )
        response.raise_for_status()
        data = response.json()
        return JsonResponse(data)
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)


class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer


class ReporteMensualViewSet(viewsets.ModelViewSet):
    queryset = ReporteMensual.objects.all()
    serializer_class = ReporteMensualSerializer


class CrearEmpleados(APIView):
    def post(self, request, format=None):
        if isinstance(request.data, list):
            empleados_creados = []
            errores = []

            for empleado_data in request.data:
                serializer = EmpleadoSerializer(data=empleado_data)
                if serializer.is_valid():
                    serializer.save()
                    empleados_creados.append(serializer.data)
                else:
                    errores.append(serializer.errors)

            if errores:
                return Response(errores, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(empleados_creados, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"detail": "Se esperaba una lista de objetos JSON"},
                status=status.HTTP_400_BAD_REQUEST,
            )
