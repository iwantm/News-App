from django import forms
from news.models import Feed


class NewFeed(forms.ModelForm):
    class Meta:
        model = Feed
        fields = '__all__'
