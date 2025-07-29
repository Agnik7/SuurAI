from google import genai
from google.genai import types
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import Config

class LLM:
    """
    Large Language Model interface for category mapping and content generation.
    
    This class provides an interface to Google's Gemini AI model for processing
    user mood inputs and mapping them to predefined podcast categories.
    
    Args:
        None
        
    Returns:
        None
    """
    
    def __init__(self, categories):
        """
        Initializes the LLM instance with Gemini AI configuration.
        
        Sets up the Gemini AI client with API key, model configuration,
        and system prompts for category mapping functionality.
        
        Args:
            categories (list): List of available podcast categories for mapping
            
        Returns:
            None
        """
        self.GEMINI_API = Config.GEMINI_API_KEY
        self.model = 'gemini-2.5-flash'
        self.categories = categories
        self.system_prompt = Config.SYSTEM_PROMPT
        self.client = genai.Client(api_key=self.GEMINI_API)
        self.config = types.GenerateContentConfig(
            system_instruction = self.system_prompt
        )
    def generate_categories(self, user_mood):
        """
        Maps user mood to relevant podcast categories using Gemini AI.
        
        Takes a user's mood description and uses the LLM to intelligently
        map it to appropriate podcast categories from the predefined list.
        
        Args:
            user_mood (str): Description of the user's current mood or preferences
            
        Returns:
            list: List of mapped podcast categories that match the user's mood
        """
        prompt = f"User mood: {user_mood}\n Categories: {self.categories}"
        llm_response = self.client.models.generate_content(
            model=self.model,
            config=self.config,
            contents=prompt
        )
        mapped_categories = eval(llm_response.text)
        return mapped_categories
