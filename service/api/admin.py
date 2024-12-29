from django.contrib import admin
from .models import (
    UserPlaceholder,
    Post,
    Comment,
    Todo,
    Album,
    Photo,
)

# User Placeholder
admin.site.register(UserPlaceholder)
# Post
admin.site.register(Post)
admin.site.register(Comment)
# Todo
admin.site.register(Todo)
# Album
admin.site.register(Album)
admin.site.register(Photo)
