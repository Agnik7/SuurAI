import requests
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import Config

class PodcastRecommender:
    """
    Handles podcast recommendations using the QLOO API.
    
    This class manages communication with the QLOO recommendation service
    to fetch podcast suggestions based on mapped user categories.
    
    Args:
        None
        
    Returns:
        None
    """
    def __init__(self):
        """
        Initializes the podcast recommender with QLOO API configuration.
        
        Sets up the API URI and authentication key for communicating
        with the QLOO recommendation service.
        
        Args:
            None
            
        Returns:
            None
        """
        self.qloo_api_uri = Config.QLOO_API_URI
        self.qloo_api_key = Config.QLOO_API_KEY
    def recommend(self, preprocessed_data):
        """
        Fetches podcast recommendations from QLOO API based on categories.
        
        Takes the preprocessed user categories and queries the QLOO API
        to get relevant podcast recommendations matching those categories.
        
        Args:
            preprocessed_data (list): List of mapped podcast categories from user mood
            
        Returns:
            dict: JSON response from QLOO API containing podcast recommendations
            
        Raises:
            requests.HTTPError: If the API request fails
        """
        mapped_categories = ','.join(preprocessed_data)
        
        headers = {
            'x-api-key': self.qloo_api_key
        }
        
        response = requests.get(f"{self.qloo_api_uri}{mapped_categories}", headers=headers)
        response.raise_for_status()
        
        return response.json()