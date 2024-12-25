from django.contrib import admin
from django.urls import path, include
from rest_framework_nested import routers
from api import views

router = routers.DefaultRouter()

# Users
router.register(r"users", views.UserPlaceholderViewSet)

user_router = routers.NestedDefaultRouter(router, r"users", lookup="user")
user_router.register(r"posts", views.PostViewSet)
user_router.register(r"comments", views.CommentViewSet)
user_router.register(r"todos", views.TodoViewSet)
user_router.register(r"albums", views.AlbumViewSet)

# Posts
router.register(r"posts", views.PostViewSet)

post_router = routers.NestedDefaultRouter(router, r"posts", lookup="post")
post_router.register(r"comments", views.CommentViewSet)

# Albums
router.register(r"albums", views.AlbumViewSet)

album_router = routers.NestedDefaultRouter(router, r"albums", lookup="album")
album_router.register(r"photos", views.PhotoViewSet)

# Others
router.register(r"comments", views.CommentViewSet)
router.register(r"todos", views.TodoViewSet)
router.register(r"photos", views.PhotoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path(r"", include(router.urls)),
    path(r"", include(user_router.urls)),
    path(r"", include(post_router.urls)),
    path(r"", include(album_router.urls)),
]

urlpatterns += router.urls + user_router.urls + post_router.urls + album_router.urls
