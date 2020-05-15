from datetime import datetime

from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
import cuid


# Create your models here.
class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#    image_url = models.CharField(max_length=1000)
    follows_entertainment = models.BooleanField(default=False)
    follows_business = models.BooleanField(default=False)
    follows_crime = models.BooleanField(default=False)
    follows_culture = models.BooleanField(default=False)
    follows_education = models.BooleanField(default=False)
    follows_environment = models.BooleanField(default=False)
    follows_fooddrink = models.BooleanField(default=False)
    follows_honeliving = models.BooleanField(default=False)
    follows_parenting = models.BooleanField(default=False)
    follows_politics = models.BooleanField(default=False)
    follows_religion = models.BooleanField(default=False)
    follows_sciencetech = models.BooleanField(default=False)
    follows_sport = models.BooleanField(default=False)
    follows_style = models.BooleanField(default=False)
    follows_travel = models.BooleanField(default=False)
    follows_weddings = models.BooleanField(default=False)

    @classmethod
    def get(cls, user):
        try:
            profile = cls.objects.get(user=user)
            return profile
        except Exception as e:
            return cls.objects.create(user=user)


class Feed(models.Model):
    title = models.CharField(max_length=256)
    url = models.CharField(max_length=256, unique=True)


class ArticleManager(models.Manager):
    def add_article(self, headline, description, url, image_url, source, category):
        article = self.create(headline=headline, description=description, url=url, image_url=image_url, source=source,
                              category=category)
        return article


class Article(models.Model):
    headline = models.CharField(max_length=256)
    description = models.CharField(max_length=1000)
    url = models.CharField(max_length=256, unique=True, default=" ")
    image_url = models.CharField(max_length=1000)
    category = models.CharField(max_length=20, default=" ")
    source = models.CharField(max_length=20)
    date = models.DateField(default=datetime.now)
    objects = ArticleManager()
