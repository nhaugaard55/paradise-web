from django.urls import path

from .views import ActivityListView, ActivityDetailView

app_name = "activities"

urlpatterns = [
    path("", ActivityListView.as_view(), name="list"),
    path("<slug:slug>/", ActivityDetailView.as_view(), name="detail"),
]
