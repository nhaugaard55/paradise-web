from django.views.generic import DetailView, ListView

from .models import Room


class RoomListView(ListView):
    model = Room
    template_name = "hotel/room_list.html"
    context_object_name = "rooms"


class RoomDetailView(DetailView):
    model = Room
    template_name = "hotel/room_detail.html"
    context_object_name = "room"
