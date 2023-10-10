import graphene
from django.core.paginator import Paginator
from graphene_django.types import DjangoObjectType
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from graphql import GraphQLError

from .models import Board, Topic, Post


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class TopicType(DjangoObjectType):
    posts_count = graphene.Int()

    class Meta:
        model = Topic
        fields = ("id", "subject", "last_updated", "board", "starter", "views", "posts_count")


class BoardType(DjangoObjectType):
    topics_count = graphene.Int()
    posts_count = graphene.Int()
    latest_post = graphene.Field(PostType)

    class Meta:
        model = Board
        fields = ("id", "name", "description", "topics_count", "posts_count", "latest_post")

    def resolve_latest_post(self, info):
        return self.get_latest_post()


class BoardListType(graphene.ObjectType):
    items = graphene.List(BoardType)
    total_elements = graphene.Int()
    total_pages = graphene.Int()


class TopicListType(graphene.ObjectType):
    items = graphene.List(TopicType)
    total_elements = graphene.Int()
    total_pages = graphene.Int()


class Query:
    boards = graphene.Field(BoardListType, page=graphene.Int(), per_page=graphene.Int())
    topics = graphene.Field(TopicListType, page=graphene.Int(), per_page=graphene.Int(), board_name=graphene.String())
    # posts = graphene.List(PostType, page=graphene.Int(), per_page=graphene.Int(), board_name=graphene.String(), topic_name=graphene.String())


    def resolve_boards(self, info, page=None, per_page=None):
        try:
            queryset = Board.objects.order_by("id")

            paginator = Paginator(queryset, per_page) if per_page else None

            total_elements = paginator.count if per_page else queryset.count()
            total_pages = paginator.num_pages if per_page else 1

            if page > total_pages:
                items = []
            else:
                items = paginator.get_page(page) if per_page else queryset

            return {"items": list(items), "total_elements": total_elements, "total_pages": total_pages}
        except Exception as e:
            raise GraphQLError("Boards fetch failed!")


    def resolve_topics(self, info, page=None, per_page=None, board_name=None):
        try:
            if board_name:
                queryset = Board.objects.get(name=board_name).topics.order_by("id")
            else:
                queryset = Topic.objects.order_by("id")
    
            paginator = Paginator(queryset, per_page) if per_page else None
    
            total_elements = paginator.count if per_page else queryset.count()
            total_pages = paginator.num_pages if per_page else 1
    
            if page > total_pages:
                items = []
            else:
                items = paginator.get_page(page) if per_page else queryset
    
            return {"items": list(items), "total_elements": total_elements, "total_pages": total_pages}
        except ObjectDoesNotExist:
            raise GraphQLError("Board not found!")
        except Exception as e:
            raise GraphQLError("Topics fetch failed!")
