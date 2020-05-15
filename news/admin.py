from django.contrib import admin
from news.models import Article,Feed, UserProfile
# Register your models here.
admin.site.register(Article)
admin.site.register(Feed)
admin.site.register(UserProfile)