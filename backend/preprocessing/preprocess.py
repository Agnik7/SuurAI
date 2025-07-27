from genai.llm import LLM
class Preprocessing:
    def __init__(self):
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
        processed_user_mood = self.LLM.generate_categories(user_mood)
        print(processed_user_mood)
        return processed_user_mood