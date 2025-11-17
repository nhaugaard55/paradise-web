from django.db import models


class Room(models.Model):
    slug = models.SlugField(unique=True)
    name_es = models.CharField(max_length=140)
    name_en = models.CharField(max_length=140, blank=True)
    desc_es = models.TextField()
    desc_en = models.TextField(blank=True)
    capacity = models.PositiveSmallIntegerField()
    price_from_ars = models.DecimalField(max_digits=10, decimal_places=2)
    photo_url = models.URLField(blank=True)

    class Meta:
        ordering = ["name_es"]

    def __str__(self):
        return self.name_es
