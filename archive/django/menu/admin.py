from django.contrib import admin

from .models import MenuSection, MenuItem


class MenuItemInline(admin.TabularInline):
    model = MenuItem
    extra = 1


@admin.register(MenuSection)
class MenuSectionAdmin(admin.ModelAdmin):
    list_display = ("title_es", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("title_es",)}
    inlines = [MenuItemInline]


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name_es", "section", "price_ars")
    list_filter = ("section",)
