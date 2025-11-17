from django.views.generic import ListView

from .models import MenuSection


class MenuView(ListView):
    model = MenuSection
    template_name = "menu/menu.html"
    context_object_name = "sections"

    def get_queryset(self):
        return MenuSection.objects.prefetch_related("items").order_by("order")
