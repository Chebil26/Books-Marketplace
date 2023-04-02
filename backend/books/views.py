from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializers import BookSerializer

class BookList(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)



class BookDetail(APIView):
    def get(self, request, pk):
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        print(book.cover)
        return Response(serializer.data)