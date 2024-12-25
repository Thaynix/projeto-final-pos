from django.db import models


class Geo(models.Model):
    lat = models.CharField(max_length=255)
    lng = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.lat}, {self.lng}"


class Address(models.Model):
    street = models.CharField(max_length=255)
    suite = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    geo = models.ForeignKey(Geo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.street}, {self.suite}, {self.city}, {self.zip_code}"


class Company(models.Model):
    name = models.CharField(max_length=255)
    catch_phrase = models.CharField(max_length=255)
    bs = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class UserPlaceholder(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255)
    website = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "User Placeholder"
        verbose_name_plural = "Users Placeholder"
