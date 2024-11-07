import firebase_admin
from flask import Flask
from firebase_admin import credentials

cred = credentials.Certificate("credentials.json")
app = firebase_admin.initialize_app(cred, 
        {
            "databaseURL": "https://smarteats-e3e08-default-rtdb.firebaseio.com/",
            "storageBucket": "smarteats-e3e08.appspot.com"
        }
    )

def create_app():
    app = Flask(__name__)

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app

