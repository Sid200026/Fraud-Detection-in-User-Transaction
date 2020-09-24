from graphene import ObjectType
from routes.fraud import Mutation as fraudMutation


class Mutation(fraudMutation, ObjectType):
    pass
