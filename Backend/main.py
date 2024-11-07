# import atexit
import os 
import logging
import requests
from app import create_app

logging.basicConfig(level=logging.DEBUG)

app = create_app()

# Define the function to call the endpoint
def call_endpoint():
    try:
        response = requests.get('https://smarteats.onrender.com/hello')
        if response.status_code == 200:
            logging.info('Endpoint called successfully')
        else:
            logging.error(f'Failed to call endpoint. Status code: {response.status_code}')
    except Exception as e:
        logging.error(f'Error calling endpoint: {e}')


if __name__ == '__main__':
    app.run(debug=True)
