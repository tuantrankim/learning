```
Building a REST API using Python and Flask | Flask-RESTful
https://www.youtube.com/watch?v=s_ht4AKnWZg
```

### Install Flask and Flask-RESTful

>pip install Flask

>pip install Flask-RESTful

### Flask basic

```
from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/")
def hello():
    return jsonify({"about": "Hello World!"})

if __name__ == '__main__':
    app.run(debug=True)

```
### Testing the API below
```
>curl http://localhost:5000
>curl http://localhost:5000/multi/5

LINUX
>curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz", "address":"address xyz"}' http://localhost:5000

WINDOWS
>curl -H "Content-Type: application/json" -X POST -d "{\"address\": \"xyz\"}" http://localhost:5000
```

### Rest API using Flask

```

from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if (request.method == 'POST'):
        some_json = request.get_json()
        return jsonify({'you sent': some_json}), 201
    else:
        return jsonify({"about": "Hello world!"})

@app.route('/multi/<int:num>', methods=['GET'])
def get_multiply10(num):
    return jsonify({"result": num*10})

if __name__ == '__main__':
    app.run(debug=True)

```

### Rest API using Flask_RESTful

```
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
```
