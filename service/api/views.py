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

    def get_queryset(self):
        user_pk = self.kwargs.get("user_pk")
        if user_pk:
            return super().get_queryset().filter(userId__pk=user_pk)
        return super().get_queryset()


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_pk = self.kwargs.get("post_pk")
        if post_pk:
            return super().get_queryset().filter(postId__pk=post_pk)
        return super().get_queryset()


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    def get_queryset(self):
        user_pk = self.kwargs.get("user_pk")
        if user_pk:
            return super().get_queryset().filter(userId__pk=user_pk)
        return super().get_queryset()


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_queryset(self):
        user_pk = self.kwargs.get("user_pk")
        if user_pk:
            return super().get_queryset().filter(userId__pk=user_pk)
        return super().get_queryset()


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer

    def get_queryset(self):
        album_pk = self.kwargs.get("album_pk")
        if album_pk:
            return super().get_queryset().filter(albumId__pk=album_pk)
        return super().get_queryset()
