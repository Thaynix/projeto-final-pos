from django.db import models
from .user import UserPlaceholder


class Post(models.Model):
    userId = models.ForeignKey(UserPlaceholder, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    body = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.title} by {self.userId.username}"


class Comment(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    body = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.name} - {self.email}"
