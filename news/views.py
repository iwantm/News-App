from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.generics import RetrieveAPIView

from news.models import Article as ArticleModel, Feed as FeedModel, UserProfile
from django.shortcuts import render, get_object_or_404, redirect
from news.forms import NewFeed
from worker.views import add_articles
from rest_framework.response import Response
from rest_framework.decorators import APIView
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated, AllowAny  # <-- Here
import datetime
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *
import random


# Create your views here.

class Feed(APIView):
    def get(self, request):
        feed = FeedModel.objects.all()
        serialiser = FeedSerialiser(feed, many=True)
        return Response({"feed": serialiser.data})

    def post(self, request):
        serialiser = FeedSerialiser(data=request.data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)


class Article(APIView):
    permission_classes = (AllowAny,)  # <-- And here

    def get(self, request):

        feed = ArticleModel.objects.none()
        if request.user.is_authenticated:
            user = self.request.user
            profile = UserProfile.get(user=user)
            if profile.follows_entertainment:
                feed = ArticleModel.objects.filter(category="['ENTERTAINMENT']")
            if profile.follows_business:
                feed = feed | ArticleModel.objects.filter(category="['BUSINESS']")
            if profile.follows_crime:
                feed = feed | ArticleModel.objects.filter(category="['CRIME']")
            if profile.follows_culture:
                feed = feed | ArticleModel.objects.filter(category="['CULTURE']")
            if profile.follows_education:
                feed = feed | ArticleModel.objects.filter(category="['EDUCATION']")

            if profile.follows_environment:
                feed = feed | ArticleModel.objects.filter(category="['ENVIRONMENT']")

            if profile.follows_fooddrink:
                feed = feed | ArticleModel.objects.filter(category="['FOOD & DRINK']")

            if profile.follows_honeliving:
                feed = feed | ArticleModel.objects.filter(category="['HOME & LIVING']")

            if profile.follows_parenting:
                feed = feed | ArticleModel.objects.filter(category="['PARENTING']")

            if profile.follows_politics:
                feed = feed | ArticleModel.objects.filter(category="['POLITICS']")

            if profile.follows_religion:
                feed = feed | ArticleModel.objects.filter(category="['RELIGION']")

            if profile.follows_sciencetech:
                feed = feed | ArticleModel.objects.filter(category="['SCIENCE & TECH']")

            if profile.follows_sport:
                feed = feed | ArticleModel.objects.filter(category="['SPORTS']")

            if profile.follows_style:
                feed = feed | ArticleModel.objects.filter(category="['STYLE']")

            if profile.follows_travel:
                feed = feed | ArticleModel.objects.filter(category="['TRAVEL']")

            if profile.follows_weddings:
                feed = feed | ArticleModel.objects.filter(category="['WEDDINGS']")
        else:
            feed = ArticleModel.objects.all()

        # feed = feed.filter(date__gte=(datetime.datetime.now() - datetime.timedelta(days=2)))
        feed = feed.order_by('?')

        data = []
        nextPage = 1
        previousPage = 1
        page = request.GET.get('page', 1)
        paginator = Paginator(feed, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
            print("KO")
        except EmptyPage:
            data = []

        serializer = ArticleSerialiser(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/articles/?page=' + str(nextPage),
                         'prevlink': '/api/articles/?page=' + str(previousPage)})


class RegisterUser(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        print(user)
        # up = UserProfile.objects.create(user=user)
        token = Token.objects.create(user=user)

        print(type(token))
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key,
        })


class User(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            user = self.request.user
            profile = UserProfile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            idk = UserSerializer(user)
            return Response({"user": idk.data, "profile": serializer.data})

    def put(self, request):
        if request.user.is_authenticated:
            user = self.request.user
            profile = UserProfile.objects.get(user=user)
            serializer = ProfileSerializer(profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = Token.objects.get(user=user)
        print(token.key)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        })
