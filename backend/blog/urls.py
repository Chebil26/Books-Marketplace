from django.urls import path
from .views import PostViewSet, CommentViewSet,createPost

post_list = PostViewSet.as_view({'get': 'list', 'post': 'create'})
post_detail = PostViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})
comment_list = CommentViewSet.as_view({'get': 'list', 'post': 'create'})
comment_detail = CommentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})

urlpatterns = [
    path('posts/', post_list, name='post-list'),
    path('create/',createPost, name='create-post'),
    path('posts/<int:pk>/', post_detail, name='post-detail'),
    path('comments/', comment_list, name='comment-list'),
    path('comments/<int:pk>/', comment_detail, name='comment-detail'),
]