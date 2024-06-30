from django.urls import path

from . import views

urlpatterns = [
    path("reportemensual/", views.index, name="index"),
]