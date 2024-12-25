from rest_framework import viewsets
from .models import UserPlaceholder, Post, Comment, Todo, Album, Photo
from .serializers import (
    UserPlaceholderSerializer,
    PostSerializer,
    CommentSerializer,
    TodoSerializer,
    AlbumSerializer,
    PhotoSerializer,
)


class UserPlaceholderViewSet(viewsets.ModelViewSet):
    queryset = UserPlaceholder.objects.all()
    serializer_class = UserPlaceholderSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
