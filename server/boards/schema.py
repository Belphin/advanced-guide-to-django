import graphene
from django.core.paginator import Paginator
from graphene_django.types import DjangoObjectType
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
    class Meta:
        model = Topic


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class Query:
    boards = graphene.Field(BoardListType, page=graphene.Int(), per_page=graphene.Int())
    topics = graphene.List(TopicType, page=graphene.Int(), per_page=graphene.Int(), board_id=graphene.Int())
    # posts = graphene.List(PostType, page=graphene.Int(), per_page=graphene.Int(), topic_id=graphene.Int())

    def resolve_boards(self, info, page=None, per_page=None):
        try:
            queryset = Board.objects.annotate(topics_count=Count('topics'))

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

    def resolve_topics(self, info, page=None, per_page=None, board_id=None):
        try:
            queryset = Topic.objects.filter(board__pk=board_id) if board_id else Topic.objects.all()

            if per_page:
                queryset = queryset[(page - 1) * per_page:page * per_page]

            return queryset
        except Exception as e:
            raise GraphQLError("Topics fetch failed!")