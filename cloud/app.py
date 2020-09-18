import os
from flask import Flask
from flask_restful import Api
from flask_graphql import GraphQLView
from routes.home import HomeRest
from schema import schema

app = Flask(__name__)
app.config["DEBUG"] = os.environ.get('DEVELOPMENT', True)
api = Api(app)

api.add_resource(HomeRest, '/rest/')

app.add_url_rule(
    '/graphql/',
    view_func=GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=os.environ.get('DEVELOPMENT', True)
    )
)


if __name__ == '__main__':
    app.run(debug=True)
