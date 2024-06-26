from rest_framework import serializers
from .models import User, Friend

class FriendSerializer(serializers.ModelSerializer):
    friend_name = serializers.CharField(source='friend.name', read_only=True)

    class Meta:
        model = Friend
        fields = ['friend', 'friend_name' , 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'friends' ,'created_at', 'updated_at']

class UserCreateUpdateSerializer(serializers.ModelSerializer):
    friend_ids = serializers.ListField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'friend_ids' , 'created_at', 'updated_at']

    def create(self, validated_data):
        friend_ids = validated_data.pop('friend_ids', [])
        user = User.objects.create(**validated_data)
        for friend_id in friend_ids:
            Friend.objects.create(user=user, friend_id=friend_id)
        return user

    def update(self, instance, validated_data):
        friend_ids = validated_data.pop('friend_ids', [])
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        instance.friends.all().delete()
        for friend_id in friend_ids:
            Friend.objects.create(user=instance, friend_id=friend_id)
        return instance
