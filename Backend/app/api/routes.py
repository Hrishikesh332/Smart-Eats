import os
import re
import json
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import google.generativeai as genai
from . import api, generate_meal_plan, post, get_meal_nutrition  # Assuming these are defined in your project

app = Flask(__name__)

# Allow specific origins only
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:4200",
    "https://smarteats-e3e08.firebaseapp.com",
    "https://se7.firebaseapp.com",
    "https://smarteats-e3e08.web.app",
    "https://se7.web.app",
    "https://smarteats.onrender.com"
]}})

@app.route('/hello', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(origins=[
    "http://localhost:4200",
    "https://smarteats-e3e08.firebaseapp.com",
    "https://se7.firebaseapp.com",
    "https://smarteats-e3e08.web.app",
    "https://se7.web.app",
    "https://smarteats.onrender.com"
], allow_headers=['Content-Type'], supports_credentials=True)
def home():
    if request.method == 'POST':
        return jsonify({"message": "POST request received!"})
    
    return jsonify({"message": "GET request received!"})

@api.route('/generate', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin(origins=[
    "http://localhost:4200",
    "https://smarteats-e3e08.firebaseapp.com",
    "https://se7.firebaseapp.com",
    "https://smarteats-e3e08.web.app",
    "https://se7.web.app",
    "https://smarteats.onrender.com"
], allow_headers=['Content-Type'], supports_credentials=True)
def index():
    if request.method == 'POST':
        try:
            data = request.get_json()
            meal_plan = generate_meal_plan(**data)
            return jsonify(meal_plan)
        except Exception as e:
            return jsonify({"error": str(e)}), 400
    
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'CORS preflight check'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    return jsonify({"error": "Invalid method"}), 405

@api.route('/submit', methods=['POST', 'OPTIONS'])
@cross_origin(origins=[
    "http://localhost:4200",
    "https://smarteats-e3e08.firebaseapp.com",
    "https://se7.firebaseapp.com",
    "https://smarteats-e3e08.web.app",
    "https://se7.web.app",
    "https://smarteats.onrender.com"
], allow_headers=['Content-Type'], supports_credentials=True)
def submit():
    if request.method == 'POST':
        try:
            # Get file and form data
            image = request.files.get('image')
            meal_desc = request.form.get('detail')

            # Ensure both image and meal description are provided
            if not image or not meal_desc:
                return jsonify({"error": "Image and meal description are required"}), 400

            # Call your post function with image and meal description
            return post(image, meal_desc)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'message': 'CORS preflight check'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    return jsonify({"error": "Invalid method"}), 405




@api.route('/get-nutrition', methods=['POST', 'OPTIONS'])
@cross_origin(origins=[
    "http://localhost:4200",
    "https://smarteats-e3e08.firebaseapp.com",
    "https://se7.firebaseapp.com",
    "https://smarteats-e3e08.web.app",
    "https://se7.web.app",
    "https://smarteats.onrender.com"
], allow_headers=['Content-Type'], supports_credentials=True)
def meal_nutrition():
    if request.method == 'POST':
        try:
            data = request.get_json()
            meal_description = data.get('meal_description')
            
            if not meal_description:
                return jsonify({"error": "Meal description is required"}), 400
            
            nutrition_info = get_meal_nutrition(meal_description)
            return jsonify(nutrition_info)
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight check'})
        response.headers.add('Access-Control-Allow-Origin', request.headers.get('Origin'))
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    return jsonify({"error": "Invalid method"}), 405