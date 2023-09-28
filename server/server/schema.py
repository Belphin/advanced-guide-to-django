import graphene
import accounts.mutations as ac_mutation

from accounts.schema import Query as AccountsQuery


class Query(AccountsQuery, graphene.ObjectType):pass

class Mutation(graphene.ObjectType):
    login = ac_mutation.LoginMutation.Field()
    register = ac_mutation.RegisterMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)