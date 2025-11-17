from django.db import models


class Activity(models.Model):
    class Category(models.TextChoices):
        TREKKING = "trekking", "Trekking"
        MTB = "mtb", "Mountain Bike"
        SPECIAL = "special", "Eventos especiales"

    slug = models.SlugField(unique=True)
    title_es = models.CharField(max_length=160)
    title_en = models.CharField(max_length=160, blank=True)
    desc_es = models.TextField()
    desc_en = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=Category.choices)
    duration = models.CharField(max_length=120)
    difficulty = models.CharField(max_length=120)
    season = models.CharField(max_length=120)
    external_url = models.URLField(blank=True)
    photo_url = models.URLField(blank=True)

    class Meta:
        ordering = ["category", "title_es"]

    def __str__(self):
        return self.title_es
