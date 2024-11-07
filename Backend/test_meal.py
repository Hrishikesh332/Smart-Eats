import requests
import os

def test_submit_meal():
    url = "http://127.0.0.1:5000/submit"

    # data={
    #     "details":"Grilled chicken salad with mixed greens and balsamic dressing",
    #     "image_path": "download.jpeg",
    # }
    data = {
        "details":"hiiiiiii"
    }

    response = requests.post(url, json=data)
    
    # print(f"Status Code: {response.status_code}")
    # print(f"Response Headers: {response.headers}")
    # print(f"Response Content: {response.text}")

    print(response.json())

    if response.status_code == 200:
        print("Meal submitted successfully!")
        print(response.json())
    else:
        print(f"Error: {response.status_code}")
        print(f"Response content: {response.text}")

if __name__ == "__main__":
    test_submit_meal()