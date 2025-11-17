from django.db import models


class MenuSection(models.Model):
    title_es = models.CharField(max_length=120)
    title_en = models.CharField(max_length=120, blank=True)
    slug = models.SlugField(unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.title_es


class MenuItem(models.Model):
    section = models.ForeignKey(MenuSection, related_name="items", on_delete=models.CASCADE)
    name_es = models.CharField(max_length=160)
    name_en = models.CharField(max_length=160, blank=True)
    desc_es = models.TextField(blank=True)
    desc_en = models.TextField(blank=True)
    price_ars = models.DecimalField(max_digits=10, decimal_places=2)
    diet_flags = models.JSONField(default=list, blank=True, help_text="Arreglo de etiquetas como ['vegan','gluten-free']")

    class Meta:
        ordering = ["section", "name_es"]

    def __str__(self):
        return f"{self.name_es} ({self.section})"
