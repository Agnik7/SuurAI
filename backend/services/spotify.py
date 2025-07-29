import base64
import requests
import time
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import Config
class Spotify:
    """
    Handles Spotify API integration for podcast data retrieval.
    
    This class manages authentication with Spotify's API and provides
    methods to search for podcasts and retrieve episode information.
    
    Args:
        None
        
    Returns:
        None
    """
    def __init__(self):
        """
        Initializes the Spotify API client with configuration and token management.
        
        Sets up Spotify API credentials and initializes token-related attributes
        for managing OAuth2 client credentials flow.
        
        Args:
            None
            
        Returns:
            None
        """
        self.spotify_base_url = Config.SPOTIFY_BASE_URL
        self.spotify_client_id = Config.SPOTIFY_CLIENT_ID
        self.spotify_client_secret = Config.SPOTIFY_CLIENT_SECRET
        self.access_token=None
        self.expires_in=None
        self.token_obtained_at=None
    def get_access_token(self):
        """
        Obtains a new access token from Spotify using client credentials flow.
        
        Authenticates with Spotify API using base64-encoded client credentials
        and retrieves an access token for API requests.
        
        Args:
            None
            
        Returns:
            str: The access token for Spotify API requests
            
        Raises:
            RuntimeError: If token request fails or no access token is returned
        """
        credentials = f"{self.spotify_client_id}:{self.spotify_client_secret}"
        encoded_credentials = base64.b64encode(credentials.encode('utf-8')).decode('utf-8')
        headers = {
            'Authorization': f'Basic {encoded_credentials}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        data = {
            'grant_type': 'client_credentials'
        }
        response = requests.post(self.spotify_base_url, headers=headers, data=data)
        print(response.json())
        try:
            response.raise_for_status()
        except requests.HTTPError as http_err:
            raise RuntimeError(f"Spotify token request failed: {http_err} — Response body: {response.text}")
        token_response = response.json()
        access_token = token_response.get('access_token')
        if not access_token:
            raise RuntimeError(f"No access token found in response: {token_response}")
        self.access_token = access_token
        self.expires_in = token_response.get('expires_in', 3600)
        self.token_obtained_at = time.time()
        return access_token
    
    def refresh_token(self):
        """
        Refreshes the current access token by obtaining a new one.
        
        Simply calls get_access_token() to obtain a fresh token since
        client credentials flow doesn't use refresh tokens.
        
        Args:
            None
            
        Returns:
            str: The new access token
        """
        return self.get_access_token()
    
    def is_token_expired(self):
        """
        Checks if the current access token has expired.
        
        Determines token expiration based on the time it was obtained
        and its expiration duration.
        
        Args:
            None
            
        Returns:
            bool: True if token is expired or doesn't exist, False otherwise
        """
        if not self.access_token or not self.token_obtained_at:
            return True
        return time.time() - self.token_obtained_at >= self.expires_in
    
    def get_podcast(self, podcast_name):
        """
        Searches for a podcast and retrieves its episodes from Spotify.
        
        Searches Spotify for the specified podcast name, gets the first result,
        and then fetches up to 50 episodes for that podcast.
        
        Args:
            podcast_name (str): Name of the podcast to search for
            
        Returns:
            dict: Dictionary containing podcast information and episodes with keys:
                - name: Podcast name
                - description: Podcast description  
                - publisher: Podcast publisher
                - podcast_episodes: List of episode data
                
        Raises:
            requests.HTTPError: If any API request fails
        """
        if self.is_token_expired():
            self.refresh_token()        
        print(f"Access Token: {self.access_token}")
        headers = {
            'Authorization': f'Bearer {self.access_token}'
        }
        print(f"Podcast Name: {podcast_name}")
        response = requests.get(f"https://api.spotify.com/v1/search?q={podcast_name}&type=show&limit=1", headers=headers)
        response.raise_for_status()
        podcast_data = response.json().get('shows').get('items')[0]
        print(podcast_data)
        podcast_id = podcast_data.get('id')
        print(f"Podcast ID: {podcast_id}")
        podcast_episode_response = requests.get(f"https://api.spotify.com/v1/shows/{podcast_id}/episodes?limit=50&offset=0", headers=headers)
        podcast_episode_response.raise_for_status()
        podcast_episodes = podcast_episode_response.json().get('items')
        
        return {
            'name': podcast_data.get('name'),
            'description': podcast_data.get('description'),
            'publisher': podcast_data.get('publisher'),
            'podcast_episodes': podcast_episodes
        }

