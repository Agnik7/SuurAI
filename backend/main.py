from flask import Flask, jsonify, request
from flask_cors import CORS
from preprocessing.preprocess import Preprocessing
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE"]
    }
})
@app.route('/health', methods=['GET'])
def health():
    """Basic health check
    Returns:
        200
    """
    return jsonify({"status": "healthy"}), 200
@app.route('/preprocess', methods=['POST'])
def preprocess():
    preprocessor = Preprocessing()
    user_mood = request.json['user_mood']
    preprocessed_data = preprocessor.preprocess_user_data(user_mood)
    return jsonify({"data":preprocessed_data}), 200


@app.route('/podcasts', methods=['GET'])
def podcasts():
    return jsonify({"data":"Get Podcast details"}), 200
if __name__ == '__main__':
    app.run(debug=True)