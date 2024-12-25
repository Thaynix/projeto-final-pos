from django.db import models
from .user import UserPlaceholder


class Album(models.Model):
    userId = models.ForeignKey(UserPlaceholder, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.title} - {self.userId.username}"


class Photo(models.Model):
    albumId = models.ForeignKey(Album, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    url = models.URLField()
    thumbnailUrl = models.URLField()

    def __str__(self):
        return f"{self.title} from {self.albumId.title}"
