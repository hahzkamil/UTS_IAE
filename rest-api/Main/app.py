from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["GET"])
def receive_and_send_data():
    data_to_send = [
        {
            "name": "ijan",
            "email": "ijan@gemail.com",
            "phone_number": "99011234"
        },
        {
            "name": "aryo",
            "email": "aryo@gemail.com",
            "phone_number": "12345678"
        }
    ]

    return jsonify(data_to_send)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=2500)
