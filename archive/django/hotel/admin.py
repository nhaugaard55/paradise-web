from django.contrib import admin

from .models import Room


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("name_es", "capacity", "price_from_ars")
    prepopulated_fields = {"slug": ("name_es",)}
