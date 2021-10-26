from flask import Blueprint

sum_bp = Blueprint('sum', __name__, url_prefix= "/sum")

from main_app.sum.api import routes
