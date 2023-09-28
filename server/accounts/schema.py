import graphene
from django.shortcuts import get_object_or_404

from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class UserPaginatedType(graphene.ObjectType):
    page = graphene.Int()
    pages = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()
    objects = graphene.List(UserType)


class Query:
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.ID())
    paginated_users = graphene.Field(UserPaginatedType, page=graphene.Int())

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info, id):
        return get_object_or_404(User, id=id)