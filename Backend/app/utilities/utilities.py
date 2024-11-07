import os
import re
import json 
# import time
# import uuid
import datetime
import logging
import tempfile
import mimetypes
from flask import jsonify  
from flask_mail import Message 
import google.generativeai as genai
from firebase_admin import db, storage


from dotenv import load_dotenv
load_dotenv()

# Get cloud storage bucket
bucket = storage.bucket()

genai.configure(api_key=os.environ["API"])
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 0,
    "max_output_tokens": 8192,
}
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
)
vision_model = genai.GenerativeModel('gemini-1.5-flash')

def generate_meal_plan(targetBody, preference, user_id, displayName, title, day, photoURL, allergies, diabetes):
    current_datetime = datetime.datetime.now()
    formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S")
    info = db.reference(f"/users/{user_id}/info/").get()
    data = {}
    for key, value in info.items():
        data[key] = value
    data["target_body"] = targetBody
    data["preference"] = preference
    data["allergies"] = allergies
    data["diabetes"] = diabetes

    data["day"] = day
    prompt = f"""Create a 7 day plan for only breakfast, Lunch, Dinner, For target {data["target_body"]} Body, 
                Weight - {data["weight"]} Kg, Height - {data["height"]} cm, the meal should be as per the preference - 
                {data["preference"]}, For the location - {data["location"]}. Also, take consideration that the meal suggested should not consider this ingredients, as allergies with - {data["allergies"]}. Also, the person is {data["diabetes"]}, Do provide the json format\n. 
                The json format should contains the key as B1 for Day1 Breakfast, L1 for Day1 Lunch and D1 for D1 Dinner. 
                Following the same format for 7 days for B2,L2,D2,B3,....till the 7th day as the key and the other header 
                as calories, details, img, name. Keep the image value as empty string.
            """
    response = model.generate_content(prompt)
    response_text = response.text
    json_pattern = r'\{(?:[^{}]|(?:\{[^{}]*\}[^{}]*)*)*\}'
    match = re.search(json_pattern, response_text)
    if match:
        meal_plan_json = match.group(0)
        meal_plan = json.loads(meal_plan_json)
        meals = {}
        for meal in range(1, 8):
            meals[f"Day{meal}"] = {
                f"breakfast": {**meal_plan[f"B{meal}"], "status":"pending"},
                f"lunch": {**meal_plan[f"L{meal}"], "status":"pending"},
                f"dinner": {**meal_plan[f"D{meal}"], "status":"pending"}
            }
        db.reference(f"/users/{user_id}/challenges/").push({
            "meals":meals, "preference":preference, "targetBody":targetBody, "displayName":displayName, 
            "deleted":False, "day":day, "createdAt":formatted_datetime, "title":title, "photoURL": photoURL,
            "isActive":True, "allergies" : allergies, "diabetes" : diabetes
        })
        return {"meals":meals}
    else:
        return None
    

def post(image_file, meal_desc=""):
    try:
        image_bytes = image_file.read()
        mime_type = mimetypes.guess_type(image_file.filename)[0] or 'application/octet-stream'
        logging.info(f"Image MIME type: {mime_type}")
        image_parts = [
            {
                "mime_type": mime_type,
                "data": image_bytes
            }
        ]
        prompt = f'''You need to check and evaluate the provided image, whether the provided image is as per the meal_description given below.
        meal_description = {meal_desc}
        Provide response in json as points from 1-10 based on the relevancy of the matching of the image with the mentioned meal_description.
        
        Example - 
        Input - meal_description - "Food Description"
        Output - {{"points":5}}
        '''
        
        response = vision_model.generate_content([prompt, image_parts[0]])
        response.resolve()
        test_cases = response.text

        json_pattern = r'\{(?:[^{}]|(?:\{[^{}]*\}[^{}]*)*)*\}'
        match = re.search(json_pattern, test_cases)

        if match:
            test_case_json = match.group(0)
            test_cases = json.loads(test_case_json)
            if test_cases["points"]>5:
                return {"status":True, "points":test_cases["points"]} 
            return {"status":False, "points":test_cases["points"]}
        else:
            logging.error("No JSON found in the response")
            return jsonify({'error': 'No valid JSON in response', 'raw_response': test_cases}), 500
    except Exception as e:
        return {"error":e}
    

def get_meal_nutrition(meal_description):
    prompt = f"""Provide a detailed nutritional breakdown for the following meal -
    {meal_description}
    
    Present the information in JSON format with the following structure:
   
   {{
        "meal_name": "Name of the meal",
        "serving_size": "Amount in grams or standard serving",
        "calories": X,
        "protein": "X g",
        "carbohydrates": "X g",
        "fats_saturated": "X g",
        "fats_unsaturated": "X g",
        "fats_trans": "X g"
    }}

    Base your estimates on standard nutritional data for the ingredients typically found in this type of meal.
    """
    
    response = model.generate_content(prompt)
    response_text = response.text
    
    json_pattern = r'\{(?:[^{}]|(?:\{[^{}]*\}[^{}]*)*)*\}'
    match = re.search(json_pattern, response_text)
    
    if match:
        nutrition_json = match.group(0)
        nutrition_info = json.loads(nutrition_json)
        return nutrition_info
    else:
        raise ValueError("Failed to generate valid nutritional information")
    
    