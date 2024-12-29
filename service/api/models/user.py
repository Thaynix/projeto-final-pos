from django.db import models


class UserPlaceholder(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=255, blank=True)

    address_street = models.CharField(max_length=255, blank=True)
    address_suite = models.CharField(max_length=255, blank=True)
    address_city = models.CharField(max_length=255, blank=True)
    address_zip_code = models.CharField(max_length=10, blank=True)
    address_geo_lat = models.CharField(max_length=255, blank=True)
    address_geo_lng = models.CharField(max_length=255, blank=True)

    phone = models.CharField(max_length=255, blank=True)
    website = models.CharField(max_length=255, blank=True)

    company_name = models.CharField(max_length=255, blank=True)
    company_catch_phrase = models.CharField(max_length=255, blank=True)
    company_bs = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "User Placeholder"
        verbose_name_plural = "Users Placeholder"
