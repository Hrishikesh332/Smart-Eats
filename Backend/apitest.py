import requests

url = 'https://smarteats.onrender.com/hello'

response = requests.get(url)

print(response)
if response.status_code == 200:
    print(response)