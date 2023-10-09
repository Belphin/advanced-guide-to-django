import graphene

from django.shortcuts import get_object_or_404
from graphene_django.types import DjangoObjectType
from graphql import GraphQLError

from .models import User
from .constants import UserRoleChoice


class UserType(DjangoObjectType):
    class Meta:
        model = User


class RoleType(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()


class Query:
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.ID())
    roles = graphene.List(RoleType)

    def resolve_users(self, info):
        return User.objects.all() if info.context.user.is_authenticated else []

    def resolve_user(self, info, id):
        return get_object_or_404(User, id=id) if info.context.user.is_authenticated else []


    def resolve_roles(self, info):
        roles = [
            RoleType(id=value, name=name)
            for name, value in UserRoleChoice.__members__.items()
        ]
        return roles
