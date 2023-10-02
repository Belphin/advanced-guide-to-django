import graphene

from django.shortcuts import get_object_or_404
from graphene_django.types import DjangoObjectType

from .models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query:
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.ID())

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info, id):
        return get_object_or_404(User, id=id)