from flask import Flask, render_template, jsonify, request, session
from dotenv import load_dotenv
import os


load_dotenv()
secret_key = os.getenv("SECRET_KEY")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/endpoint', methods=['POST'])
def handle_request():
    try:
        data = request.get_json()
        name = data['name']
        email = data['email']
        sendInfo(name, email)
        result = {"message": "JSON received", "data": data}
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)})


def sendInfo(name, email):
    print(f'Name: {name} Email: {email}')

if __name__ == "__main__":
    app.run(debug = True)