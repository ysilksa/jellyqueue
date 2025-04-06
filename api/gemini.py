from flask import Flask, request, jsonify
from google.oauth2 import service_account
from googleapiclient.discovery import build
from dotenv import load_dotenv
from flask_cors import CORS
import os
import requests
from google import genai


# Load environment variables from .env file
load_dotenv()
api_key = os.getenv('GOOGLE_API_KEY')
#print(api_key)

client = genai.Client(api_key=api_key)

# Flask app
app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])

def generate():
    data = request.get_json()
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400
    
    try:
        response = client.models.generate_content(model="gemini-2.0-flash", 
                                                  contents=prompt)
        #print(response.text)
        generated_content = response.text if hasattr(response, 'text') else 'No content generated'
        #print("THIS IS THE GENERATED CONTENT: ", generated_content)

        return jsonify({'response': generated_content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)

# This will run the Flask app in debug mode, which is useful for development.
# In production, you would want to set debug=False and use a production server.
# Note: Make sure to set the environment variable GOOGLE_API_KEY with your actual API key.
# You can do this in your terminal or command prompt:
# export GOOGLE_API_KEY='your_api_key_here'
# or on Windows:
# set GOOGLE_API_KEY='your_api_key_here'
# To run the server, use the command:
# python server.py
# This will start the Flask server, and you can send POST requests to /generate with a JSON body containing the prompt.
# Example of a JSON request body: