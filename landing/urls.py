from django.urls import path
from . import views

app_name = "landing"

urlpatterns = [
    path("", views.home, name="home"),
    path("nosotros/", views.about, name="about"),
    path("hosteria/", views.hosteria, name="hosteria"),
    path("restaurante/", views.restaurant, name="restaurant"),
    path("excursiones/", views.excursions, name="excursions"),
    path("contacto/", views.contact, name="contact"),
]
