from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Feed, Article


class FeedSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ('id', 'title', 'url')

class ArticleSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('headline', 'description', 'url', 'image_url', 'category', 'source', 'objects')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('follows_entertainment', 'follows_business', 'follows_crime', 'follows_culture',
                  'follows_education',
                  'follows_fooddrink',
                  'follows_honeliving',
                  'follows_parenting',
                  'follows_politics',
                  'follows_religion',
                  'follows_sciencetech',
                  'follows_sport',
                  'follows_style',
                  'follows_travel',
                  'follows_weddings')


class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )

        profile_data = validated_data.pop('profile')
        profile = UserProfile.objects.create(
            user=user,
            follows_entertainment=profile_data['follows_entertainment'],
            follows_business=profile_data['follows_business'],
            follows_crime=profile_data['follows_crime'],
            follows_culture=profile_data['follows_culture'],
            follows_education=profile_data['follows_education'],
            follows_environment=profile_data['follows_environment'],
            follows_fooddrink=profile_data['follows_fooddrink'],
            follows_honeliving=profile_data['follows_honeliving'],
            follows_parenting=profile_data['follows_parenting'],
            follows_politics=profile_data['follows_politics'],
            follows_religion=profile_data['follows_religion'],
            follows_sciencetech=profile_data['follows_sciencetech'],
            follows_sport=profile_data['follows_sport'],
            follows_style=profile_data['follows_style'],
            follows_travel=profile_data['follows_travel'],
            follows_weddings=profile_data['follows_weddings'],

        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
