from django.urls import path, include
from .views import fetch_device_data
from rest_framework.routers import DefaultRouter
from .views import (
    DepartamentoViewSet,
    EmpleadoViewSet,
    ReporteMensualViewSet,
)

router = DefaultRouter()
router.register(r"departamentos", DepartamentoViewSet)
router.register(r"empleados", EmpleadoViewSet)
router.register(r"reportes-mensuales", ReporteMensualViewSet)


urlpatterns = [
    # path("reportemensual/", views.index, name="index"),
    path("fetch-device-data/", fetch_device_data, name="fetch_device_data"),
    path("", include(router.urls)),
]
