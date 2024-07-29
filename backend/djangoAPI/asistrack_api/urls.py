from django.urls import path, include
from .views import (
    fetch_device_data,
    fetch_device_data_with_date,
    EmpleadoByCedulaView,
    ValidarCredenciales,
)
from rest_framework.routers import DefaultRouter
from .views import (
    DepartamentoViewSet,
    EmpleadoViewSet,
    ReporteMensualViewSet,
    UsuarioListCreate,
    UsuarioRetrieveUpdateDestroy,
)

router = DefaultRouter()
router.register(r"departamentos", DepartamentoViewSet)
router.register(r"empleados", EmpleadoViewSet)
router.register(r"reportes-mensuales", ReporteMensualViewSet)


urlpatterns = [
    path("fetch-device-data/", fetch_device_data, name="fetch_device_data"),
    path(
        "fetch-device-data-with-date/<int:year>/<int:month>/",
        fetch_device_data_with_date,
        name="fetch_device_data_with_date",
    ),
    path(
        "empleados/cedula/<str:cedula>/",
        EmpleadoByCedulaView.as_view(),
        name="empleado_por_cedula",
    ),
    path("usuarios/", UsuarioListCreate.as_view(), name="usuario-list-create"),
    path(
        "usuarios/<int:pk>/",
        UsuarioRetrieveUpdateDestroy.as_view(),
        name="usuario-detail",
    ),
    path(
        "usuarios/validar/", ValidarCredenciales.as_view(), name="validar-credenciales"
    ),
    path("", include(router.urls)),
]
