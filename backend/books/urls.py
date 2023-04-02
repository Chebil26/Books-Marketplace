from django.urls import path
from .views import BookList, BookDetail


urlpatterns = [
    path('api/books/', BookList.as_view(), name='book_list'),
    path('api/books/<int:pk>/', BookDetail.as_view(), name='book_detail'),
    
]