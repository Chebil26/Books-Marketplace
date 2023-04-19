from rest_framework import serializers
from base.serializers import StoreSerializer

from base.models import Store
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    store = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Store.objects.all()
    )
    store_id = serializers.PrimaryKeyRelatedField(source='store', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_store(self, obj):
        store = obj.store
        if store is not None:
            serializer = StoreSerializer(store)
            return serializer.data
        return None