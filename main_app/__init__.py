from flask import Flask
from config import config
from flask_sqlalchemy import SQLAlchemy

from datetime import timedelta
from apifairy import APIFairy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
database = SQLAlchemy()

promo_api = APIFairy()
app.config.from_pyfile("application.cfg", silent=True)
promo_api.init_app(app)


marsh = Marshmallow()


def create_app(config_name):
    app.config.from_object(config[config_name])
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=24)
    from main_app.sum import sum_bp
    app.register_blueprint(sum_bp)
    from main_app.auth import auth_bp
    app.register_blueprint(auth_bp)
    # database.init_app(main_app)
    # login_manager.init_app(main_app)
    marsh.init_app(app)

    return app
