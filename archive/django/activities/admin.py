from django.contrib import admin

from .models import Activity


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ("title_es", "category", "duration")
    list_filter = ("category",)
    prepopulated_fields = {"slug": ("title_es",)}
