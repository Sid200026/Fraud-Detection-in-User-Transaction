from routes.home import HomeGraphQL
from graphene import ObjectType

class Query(HomeGraphQL, ObjectType):
    pass
