from flask_restful import Resource, Api
from graphene import ObjectType, List, String, Field

INFORMATION = {
    'project': "Fraudulent Transaction Detection",
    'authors': "Rajlaxmi Roy ( 18BCE1080 ) and Siddharth Singha Roy ( 18BCE1065 )",
    'university': "Vellore Institute of Technology",
    'domain': "Data Science, Restful Services, GraphQL Services, Cloud Services, Web Development",
    'period': "August 2020 - October 2020",
    'github': "https://github.com/Sid200026/Fraud-Detection-in-User-Transaction",
    'techStack': {
        'dataScience': "Scikit Learn, Tensorflow, Keras, Numpy, Pandas, Matplotlib, R, Seaborn",
        'restfulServices': "flask_restful",
        'graphQLServices': "flask_graphql",
        'cloudServices': "AWS",
        'webDevelopment': {
            "backend": "Flask, CubeJS",
            "frontend": "ReactJS",
            "database":  "Any, for sample we use MongoDB",
        }
    }
}


class HomeRest(Resource):
    def get(self):
        return INFORMATION


class WebDevObjectType(ObjectType):
    backend = String()
    frontend = String()
    database = String()


class TechStackObjectType(ObjectType):
    dataScience = String()
    restfulServices = String()
    graphQLServices = String()
    cloudServices = String()
    webDevelopment = Field(WebDevObjectType)


class InformationObjectType(ObjectType):
    project = String()
    authors = String()
    university = String()
    domain = String()
    period = String()
    github = String()
    techStack = Field(TechStackObjectType)


class HomeGraphQL(ObjectType):
    info = Field(InformationObjectType)

    def resolve_info(self, info, **kwargs):
        return INFORMATION
