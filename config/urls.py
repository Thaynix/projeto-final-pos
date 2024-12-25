from django.contrib import admin
from django.urls import path, include
from rest_framework_nested import routers
from api import views

# Rotas
router = routers.DefaultRouter()
router.register(r"users", views.UserPlaceholderViewSet)
router.register(r"posts", views.PostViewSet)
router.register(r"comments", views.CommentViewSet)
router.register(r"todos", views.TodoViewSet)
router.register(r"albums", views.AlbumViewSet)
router.register(r"photos", views.PhotoViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include(router.urls)),
]

urlpatterns += router.urls
