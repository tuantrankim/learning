>curl http://localhost:500/multi/5

LINUX
>curl -H "Content-Type: application/json" -X POST -d '{"name":"xyz", "address":"address xyz"}' http://localhost:5000

WINDOWS
>curl -H "Content-Type: application/json" -X POST -d "{\"address\": \"xyz\"}" http://localhost:5000
'''

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
