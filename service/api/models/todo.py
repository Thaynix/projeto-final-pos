from django.db import models
from .user import UserPlaceholder


class Todo(models.Model):
    userId = models.ForeignKey(UserPlaceholder, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    completed = models.BooleanField()

    def __str__(self):
        if self.completed:
            return f"[x] {self.title}"
        else:
            return f"[ ] {self.title}"
