from django.urls import path

from .views import RoomListView, RoomDetailView

app_name = "hotel"

urlpatterns = [
    path("", RoomListView.as_view(), name="list"),
    path("<slug:slug>/", RoomDetailView.as_view(), name="detail"),
]
