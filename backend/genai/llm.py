import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

class LLM:
    def __init__(self, categories):
        self.GEMINI_API = os.getenv('GEMINI_API_KEY')
        self.model = 'gemini-2.5-flash'
        self.categories = categories
        self.system_prompt = os.getenv('SYSTEM_PROMPT')
        self.client = genai.Client(api_key=self.GEMINI_API)
        self.config = types.GenerateContentConfig(
            system_instruction = self.system_prompt
        )
    def generate_categories(self, user_mood):

        print(self.system_prompt)
        prompt = f"User mood: {user_mood}\n Categories: {self.categories}"
        llm_response = self.client.models.generate_content(
            model=self.model,
            config=self.config,
            contents=prompt
        )
        mapped_categories = eval(llm_response.text)
        return mapped_categories
