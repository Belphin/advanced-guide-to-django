import graphene
from graphene_django.types import DjangoObjectType

from .models import Board, Topic, Post


class BoardType(DjangoObjectType):
    class Meta:
        model = Board


class TopicType(DjangoObjectType):
    class Meta:
        model = Topic


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query:
    boards = graphene.List(BoardType, page=graphene.Int(), per_page=graphene.Int())
    topics = graphene.List(TopicType, page=graphene.Int(), per_page=graphene.Int(), board_id=graphene.Int())
    # posts = graphene.List(PostType, page=graphene.Int(), per_page=graphene.Int(), topic_id=graphene.Int())

    def resolve_boards(self, info, page=None, per_page=None):
        queryset = Board.objects.all()

        if per_page:
            queryset = queryset[(page - 1) * per_page:page * per_page]

        return queryset

    def resolve_topics(self, info, page=None, per_page=None, board_id=None):
        queryset = Topic.objects.filter(board__pk=board_id) if board_id else Topic.objects.all()

        if per_page:
            queryset = queryset[(page - 1) * per_page:page * per_page]

        return queryset