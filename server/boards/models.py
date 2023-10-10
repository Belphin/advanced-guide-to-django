from django.db import models
from django.db.models import Count
from accounts.models import User
from django.utils.text import Truncator
from django.utils.html import mark_safe
from markdown import markdown

class Board(models.Model):
    name = models.CharField(max_length=30, unique=True)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    @property
    def topics_count(self):
        return self.topics.count()

    @property
    def posts_count(self):
        return self.topics.aggregate(posts_count=Count('posts'))['posts_count']

    def get_latest_post(self):
        latest_topic = self.topics.order_by('-last_updated').first()
        if latest_topic:
            return latest_topic.posts.order_by('-created_at').first()
        return None


class Topic(models.Model):
    subject = models.CharField(max_length=255)
    last_updated = models.DateTimeField(auto_now_add=True)
    board = models.ForeignKey(Board, related_name='topics', on_delete=models.CASCADE,)
    starter = models.ForeignKey(User, null=True, related_name='topics', on_delete=models.CASCADE,)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.subject

    @property
    def posts_count(self):
        return self.posts.count()


class Post(models.Model):
    message = models.TextField(max_length=4000)
    topic = models.ForeignKey(Topic, related_name='posts', on_delete=models.CASCADE,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True)
    created_by = models.ForeignKey(User, null=True, related_name='posts', on_delete=models.CASCADE,)
    updated_by = models.ForeignKey(User, null=True, related_name='+', on_delete=models.CASCADE,)

    def __str__(self):
        truncated_message = Truncator(self.message)
        return truncated_message.chars(30)

    def get_message_as_markdown(self):
        return mark_safe(markdown(self.message, safe_mode='escape'))