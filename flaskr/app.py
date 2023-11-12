from flask import Flask, render_template, jsonify, request
from random import randrange

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/endpoint', methods=['POST'])
def handle_request():
    try:
        data = request.get_json()
        senders = list(data.keys())
        recievers = senders.copy()
        shuffle(recievers)

        giftPairs = makePairs(senders, recievers, data)

        result = {"message": "JSON received", "data": data}
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)})
    
def makePairs(senders, recievers, data):
    giftPairs = {}
    for i, sender in enumerate(senders):
        giftPairs[sender] = (recievers[i], data[recievers[i]])
    
    return giftPairs

def shuffle(items):
    i = len(items)
    while i > 1:
        i = i - 1
        j = randrange(i)
        items[j], items[i] = items[i], items[j]

if __name__ == "__main__":
    app.run(debug = True)