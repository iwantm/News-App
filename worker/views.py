from __future__ import absolute_import, unicode_literals

import time

import feedparser
import urlcanon

from news.models import Feed as FeedModel, Article
import datetime
from opengraph import OpenGraph
from sklearn.externals import joblib
from celery.schedules import crontab
import celery
from celery.utils.log import get_task_logger

# Create your views here.


model = joblib.load("worker/model.file")
logger = get_task_logger(__name__)


@celery.task(name='articles')
def add_articles():
    Article.objects.delete(date__gte=(datetime.datetime.now() - datetime.timedelta(days=2)))
    idk = FeedModel.objects.all()

    for bar in idk:
        print(bar.url)
        foo = feedparser.parse(bar.url)
        for post in foo.entries:
            time.sleep(10)
            parsed_url = urlcanon.parse_url(post.link)
            og = OpenGraph(url=post.link)
            try:
                category = model.predict([post.title])
                Article.objects.add_article(post.title, post.description, parsed_url, og.image, bar.title, category)
                logger.info("Article Added")
            except:
                logger.info("Did Not Work")
                continue
