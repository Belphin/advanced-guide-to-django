import graphene
from graphql_jwt.shortcuts import get_token
from serious_django_graphene import FormMutation, ValidationErrors

from .schema import UserType
from .forms import AuthForm, UserRegisterForm


class LoginMutation(FormMutation):
    class Meta:
        form_class = AuthForm

    token = graphene.String()
    user = graphene.Field(lambda: UserType)

    @classmethod
    def perform_mutate(cls, form, info):
        user = form.get_user()
        token = get_token(user)
        return cls(user=user, token=token)


class RegisterMutation(FormMutation):
    class Meta:
        form_class = UserRegisterForm

    success = graphene.Boolean()

    @classmethod
    def perform_mutate(cls, form, info):
        success = False
        if form.is_valid():
            form.save()
            success = True
        return cls(
            error=ValidationErrors(validation_errors=[]), success=success)