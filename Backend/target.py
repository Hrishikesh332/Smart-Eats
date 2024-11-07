import requests

url = 'https://smarteats.onrender.com/generate'

data = {
    "target_body": "slim",
    "preference":"veg",
    "user_id": "5s8YhG4fHrhETwebEfNl6v0aWkO2",
    "displayName": "Avinash Kumar",
    "title" : "Fun food for the week",
    "day": 3,
    "photoURL":""
}

response = requests.post(url, json=data)

print(response)
if response.status_code == 200:
    print(response.json())