from django.db import models


class SiteSettings(models.Model):
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    whatsapp_url = models.URLField(help_text="Enlace completo a WhatsApp API")
    instagram_url = models.URLField()
    maps_url = models.URLField()
    address_es = models.CharField(max_length=255)
    address_en = models.CharField(max_length=255)

    def __str__(self):
        return "Configuración general del sitio"

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"
