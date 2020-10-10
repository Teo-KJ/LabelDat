import secrets

from flask import Flask
from flask_cors import CORS

import models  # Import the models directory to create schema on MySQL DB.
from config import *  # Flask App Config
from controllers import *
from extensions import db

URI = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(USER, PASSWORD, HOST, PORT, SCHEMA)


# Function to create blueprints and initialise db
def register_extensions(app_obj):
    app_obj.app_context().push()
    app_obj.register_blueprint(home_controller, url_prefix="/")
    app_obj.register_blueprint(user_controller, url_prefix="/api/users")
    app_obj.register_blueprint(project_controller, url_prefix="/api/projects")
    db.init_app(app_obj)
    db.create_all()


# Function to configure database with Flask
def create_app(name):
    app_obj = Flask(name)
    app_obj.config['SQLALCHEMY_DATABASE_URI'] = URI     #Link to connect db: 'mysql+pymysql://root:toor@localhost:3306/ase'
    app_obj.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app_obj.secret_key = secrets.token_urlsafe(32)
    register_extensions(app_obj)
    CORS(app_obj)

    return app_obj


app = create_app(__name__)

if __name__ == '__main__':
    app.run(debug=True)
