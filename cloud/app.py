import os
from flask import Flask
from flask_restful import Api
from routes.home import Home

app = Flask(__name__)
app.config["DEBUG"] = os.environ.get('DEVELOPMENT', True)
api = Api(app)


api.add_resource(Home, '/rest/')

if __name__ == '__main__':
    app.run(debug=True)
