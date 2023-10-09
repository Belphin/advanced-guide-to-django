import graphene
from django.core.paginator import Paginator
from graphene_django.types import DjangoObjectType
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from graphql import GraphQLError

from .models import Board, Topic, Post


class BoardType(DjangoObjectType):
    topicsCount = graphene.Int()

    class Meta:
        model = Board
        
    def resolve_topicsCount(self, info):
        return self.topics_count


class BoardListType(graphene.ObjectType):
    items = graphene.List(BoardType)
    total_elements = graphene.Int()
    total_pages = graphene.Int()


class TopicType(DjangoObjectType):
    postsCount = graphene.Int()

    class Meta:
        model = Topic

    def resolve_postsCount(self, info):
        return self.posts_count


class TopicListType(graphene.ObjectType):
    items = graphene.List(TopicType)
    total_elements = graphene.Int()
    total_pages = graphene.Int()


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query:
    boards = graphene.Field(BoardListType, page=graphene.Int(), per_page=graphene.Int())
    topics = graphene.Field(TopicListType, page=graphene.Int(), per_page=graphene.Int(), board_name=graphene.String())
    # posts = graphene.List(PostType, page=graphene.Int(), per_page=graphene.Int(), board_name=graphene.String(), topic_name=graphene.String())


    def resolve_boards(self, info, page=None, per_page=None):
        try:
            queryset = Board.objects.annotate(topics_count=Count("topics")).order_by("id")

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
                board = Board.objects.get(name=board_name)
                queryset = board.topics.annotate(posts_count=Count("posts")).order_by("id")
            else:
                queryset = Topic.objects.annotate(posts_count=Count("posts")).order_by("id")
    
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
