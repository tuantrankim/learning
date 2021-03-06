'''
>pip install Flask
>pip install Flask-RESTful

>curl http://localhost:500/multi/5

LINUX
>curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz", "address":"address xyz"}' http://localhost:5000

WINDOWS
>curl -H "Content-Type: application/json" -X POST -d "{\"address\": \"xyz\"}" http://localhost:5000
'''

from flask import Flask, request
from flask_restful import Resource, Api 

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return{'about': 'Hello world!'}

    def post(self):
        some_json = request.get_json()
        return {'you sent': some_json}, 201

class Multi(Resource):
    def get(self, num):
        return {'result': num*10}

api.add_resource(HelloWorld, '/')
api.add_resource(Multi, '/multi/<int:num>')

if __name__ == '__main__':
    app.run(debug=True)
