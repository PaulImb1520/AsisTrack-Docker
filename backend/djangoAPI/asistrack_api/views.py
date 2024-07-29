from django.shortcuts import render
import requests
from requests.auth import HTTPDigestAuth
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Departamento, Empleado, ReporteMensual, Usuario
from datetime import datetime
from .serializers import (
    DepartamentoSerializer,
    EmpleadoSerializer,
    ReporteMensualSerializer,
    UsuarioSerializer,
)
from django.db import transaction
from django.contrib.auth.hashers import check_password


# Create your views here.
@csrf_exempt
@require_POST
def fetch_device_data(request):
    url = "https://192.168.200.102/ISAPI/AccessControl/LocalAttendance/SearchSummarySheet?format=json"

    auth = HTTPDigestAuth("admin", "uio01matriz")
    current_month = datetime.now().strftime("%Y-%m")

    body = {
        "searchID": "e34fdabee1014c7bbcb6b3981c91a7e0",
        "searchResultPosition": 1,
        "maxResults": 10,
        "statisticalTime": "month",
        "month": current_month,
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


@csrf_exempt
@require_POST
def fetch_device_data_with_date(request, year, month):
    url = "https://192.168.200.102/ISAPI/AccessControl/LocalAttendance/SearchSummarySheet?format=json"
    auth = HTTPDigestAuth("admin", "uio01matriz")
    formatted_month = f"{year}-{month:02d}"
    search_result_position = 1
    max_results = 10
    all_results = []

    while True:
        body = {
            "searchID": "e34fdabee1014c7bbcb6b3981c91a7e0",
            "searchResultPosition": search_result_position,
            "maxResults": max_results,
            "statisticalTime": "month",
            "month": formatted_month,
        }

        headers = {"Content-Type": "application/json"}

        try:
            response = requests.post(
                url, auth=auth, json=body, headers=headers, verify=False
            )
            response.raise_for_status()
            data = response.json()
            all_results.extend(data["matchResults"])

            if data["responseStatus"] == "OK":
                break

            search_result_position += max_results

        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)

    # Guardar todos los resultados en la base de datos
    try:
        with transaction.atomic():
            for match in all_results:
                cedula = match["employeeNo"]
                nombre_completo = match["name"]
                departamento_name = match["groupName"]

                departamento, _ = Departamento.objects.get_or_create(
                    nombre_departamento=departamento_name
                )

                Empleado.objects.update_or_create(
                    cedula=cedula,
                    defaults={
                        "nombre_completo": nombre_completo,
                        "departamento": departamento,
                    },
                )

        return JsonResponse({"status": "success", "data": all_results})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


class EmpleadoByCedulaView(generics.RetrieveAPIView):
    lookup_field = "cedula"
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

    def get(self, request, *args, **kwargs):
        cedula = self.kwargs.get(self.lookup_field)
        try:
            empleado = self.queryset.get(cedula=cedula)
            serializer = self.serializer_class(empleado)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Empleado.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class ValidarCredenciales(APIView):
    def post(self, request):
        nombre_usuario = request.data.get("nombre_usuario")
        clave = request.data.get("clave")

        try:
            usuario = Usuario.objects.get(nombre_usuario=nombre_usuario)
            if check_password(clave, usuario.clave):
                return Response(
                    {"valido": True, "mensaje": "Credenciales válidas"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"valido": False, "mensaje": "Clave incorrecta"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Usuario.DoesNotExist:
            return Response(
                {"valido": False, "mensaje": "Usuario no encontrado"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class DepartamentoViewSet(viewsets.ModelViewSet):
    queryset = Departamento.objects.all()
    serializer_class = DepartamentoSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer


class ReporteMensualViewSet(viewsets.ModelViewSet):
    queryset = ReporteMensual.objects.all()
    serializer_class = ReporteMensualSerializer


class UsuarioListCreate(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class UsuarioRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
