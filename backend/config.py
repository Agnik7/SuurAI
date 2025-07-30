import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """
    Centralized configuration class for managing all environment variables.
    
    This class provides a single point of access to all configuration values
    needed by the application, including API keys, URLs, and Flask settings.
    All values are loaded from environment variables using python-dotenv.
    
    Args:
        None
        
    Returns:
        None
    """
    
    # Spotify Configuration
    SPOTIFY_BASE_URL = os.getenv('SPOTIFY_BASE_URL')
    SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
    SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')
    
    # Gemini AI Configuration
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    SYSTEM_PROMPT = os.getenv('SYSTEM_PROMPT')
    
    # QLOO API Configuration
    QLOO_API_URI = os.getenv('QLOO_API_URI')
    QLOO_API_KEY = os.getenv('QLOO_API_KEY')
    
    # Flask Configuration
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    HOST = os.getenv('HOST', '127.0.0.1')
    PORT = int(os.getenv('PORT', 5000))
    
    @classmethod
    def validate(cls):
        """
        Validates that all required environment variables are properly set.
        
        Checks if all necessary environment variables for Spotify, Gemini AI,
        and QLOO API are configured. Raises an exception if any are missing.
        
        Args:
            cls: The Config class itself
            
        Returns:
            bool: True if all required variables are set
            
        Raises:
            ValueError: If any required environment variables are missing
        """
        required_vars = [
            'SPOTIFY_CLIENT_ID',
            'SPOTIFY_CLIENT_SECRET', 
            'SPOTIFY_BASE_URL',
            'GEMINI_API_KEY',
            'SYSTEM_PROMPT',
            'QLOO_API_URI',
            'QLOO_API_KEY'
        ]
        
        missing_vars = []
        for var in required_vars:
            if not getattr(cls, var):
                missing_vars.append(var)
        
        if missing_vars:
            raise ValueError(f"Missing required environment variables: {', '.join(missing_vars)}")
        
        return True