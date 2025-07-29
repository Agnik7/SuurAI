from genai.llm import LLM

class Preprocessing:
    """
    Handles preprocessing of user data for podcast recommendation pipeline.
    
    This class manages the transformation of raw user mood inputs into
    structured category mappings using AI-powered analysis through the LLM class.
    
    Args:
        None
        
    Returns:
        None
    """
    def __init__(self):
        """
        Initializes the preprocessing pipeline with predefined categories.
        
        Sets up the available podcast categories and initializes the LLM
        instance for intelligent category mapping.
        
        Args:
            None
            
        Returns:
            None
        """
        self.existing_categories = [
            "arts",
            "books",
            "comedy",
            "comedy_interviews",
            "documentary",
            "football",
            "history",
            "news",
            "personal_journals",
            "podcasts",
            "politics",
            "society_culture",
            "sports",
            "technology",
            "true_crime"
        ]
        self.LLM = LLM(self.existing_categories)
    def preprocess_user_data(self, user_mood):
        """
        Preprocesses user mood input into mapped podcast categories.
        
        Takes raw user mood description and uses the LLM to intelligently
        map it to relevant podcast categories from the predefined list.
        
        Args:
            user_mood (str): Raw user mood or preference description
            
        Returns:
            list: List of mapped podcast categories that align with the user's mood
        """
        processed_user_mood = self.LLM.generate_categories(user_mood)
        print(processed_user_mood)
        return processed_user_mood