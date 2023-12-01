from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def handle_chat_message():
    try:
        data = request.get_json()

        #clé json
        if 'sender' in data and 'message' in data and 'timestamp' in data:
            # Récupérez les informations du message
            sender = data['sender']
            message = data['message']
            timestamp = data['timestamp']

            print(f"Message reçu de {sender} à {timestamp}: {message}")

            # JSON renvoit
            return jsonify({"status": "success", "message": "Message received and processed successfully"})
        else:
            return jsonify({"status": "error", "message": "Invalid JSON data. Missing required keys."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
