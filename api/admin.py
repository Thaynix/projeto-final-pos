from django.contrib import admin
from .models import (
    UserPlaceholder,
    Company,
    Geo,
    Address,
    Post,
    Comment,
    Todo,
    Album,
    Photo,
)

# User Placeholder
admin.site.register(UserPlaceholder)
admin.site.register(Company)
admin.site.register(Geo)
admin.site.register(Address)
# Post
admin.site.register(Post)
admin.site.register(Comment)
# Todo
admin.site.register(Todo)
# Album
admin.site.register(Album)
admin.site.register(Photo)
