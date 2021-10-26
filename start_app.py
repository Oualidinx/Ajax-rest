from main_app import create_app, database
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from main_app import routes
load_dotenv('.flaskenv')
app = create_app(os.environ.get('FLASK_ENV'))

migrate = Migrate(app, database)


@app.shell_context_processor
def make_shell_context():
    return dict(app=app, db=database)
