from django.urls import path

from .views import HomeView, AboutView, ContactView

app_name = "core"

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("nosotros/", AboutView.as_view(), name="about"),
    path("contacto/", ContactView.as_view(), name="contact"),
]
