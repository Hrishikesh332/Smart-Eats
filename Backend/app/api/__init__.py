from flask import Blueprint
from ..utilities import generate_meal_plan, post, get_meal_nutrition

api = Blueprint('api', __name__)

from . import routes
