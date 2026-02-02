from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic import TemplateView, FormView

from activities.models import Activity
from hotel.models import Room
from menu.models import MenuItem, MenuSection

from .forms import ContactForm


class HomeView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["featured_rooms"] = Room.objects.all()[:3]
        context["featured_menu_items"] = MenuItem.objects.select_related("section").all()[:3]
        context["featured_activities"] = Activity.objects.all()[:3]
        context["menu_sections"] = MenuSection.objects.order_by("order")[:2]
        return context


class AboutView(TemplateView):
    template_name = "core/about.html"


class ContactView(FormView):
    template_name = "core/contact.html"
    form_class = ContactForm
    success_url = reverse_lazy("core:contact")

    def form_valid(self, form):
        messages.success(self.request, "Gracias por escribirnos, te contactaremos a la brevedad.")
        return super().form_valid(form)
