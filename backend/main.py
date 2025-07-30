from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from preprocessing.preprocess import Preprocessing
from services.recommender import PodcastRecommender
from services.spotify import Spotify
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE"]
    }
})
preprocessor = Preprocessing()
recommender = PodcastRecommender()
spotify=Spotify()
@app.route('/health', methods=['GET'])
def health():
    """
    Basic health check endpoint for monitoring application status.
    
    Provides a simple endpoint to verify that the Flask application
    is running and responsive.
    
    Args:
        None
        
    Returns:
        tuple: JSON response with status and HTTP status code 200
    """
    return jsonify({"status": "healthy"}), 200

@app.route('/podcasts', methods=['GET'])
def podcasts():
    """
    Gets podcast recommendations based on user mood.
    
    Processes user mood through the following pipeline:
    1. User mood -> LLM category mapping
    2. Mapped categories -> QLOO API recommendations
    3. Returns podcast recommendations
    
    Args:
        user_mood (str): Query parameter describing user's current mood
        
    Returns:
        tuple: JSON response with podcast recommendations and HTTP status code 200
    """
    user_mood = request.args.get('user_mood')
    preprocessed_data = preprocessor.preprocess_user_data(user_mood)
    podcasts_details = recommender.recommend(preprocessed_data)
    return jsonify({"data":podcasts_details}), 200
@app.route('/podcasts/episodes', methods=['GET'])
def podcasts_episodes():
    """
    Retrieves episodes for a specific podcast from Spotify.
    
    Searches Spotify for the specified podcast and returns detailed
    information including episodes, description, and publisher details.
    
    Args:
        podcast_name (str): Query parameter with the name of the podcast to search for
        
    Returns:
        tuple: JSON response with podcast details and episodes, HTTP status code 200
    """
    podcast_name = request.args.get('podcast_name')
    podcast_episodes = spotify.get_podcast(podcast_name)
    return jsonify({"data":podcast_episodes}), 200
if __name__ == '__main__':
    # Validate configuration before starting the app
    Config.validate()
    app.run(debug=Config.DEBUG, host=Config.HOST, port=Config.PORT)