"""untitled3 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path
import news.views as views
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('feed/', views.Feed.request),
    # path('feed/add', views.Feed.post),
    # path('articles/', views.Article.request),
    url(r'^api/articles/$', views.Article.as_view()),
    url(r'^api/feeds/$', views.Feed.as_view()),
    # url('api/user/get', views.GetUser.as_view()),
    url('api/user/register', views.RegisterUser.as_view()),
    url('api/user/login', views.LoginUser.as_view()),
    url('api/user/get', views.User.as_view()),


    url('api/obtain_auth', obtain_auth_token, name='api_token_auth'),
]
