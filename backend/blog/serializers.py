from rest_framework import serializers

from base.models import Store
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    author = serializers.PrimaryKeyRelatedField(queryset=Store.objects.all())

    class Meta:
        model = Post
        fields = '__all__'