from flask import Flask

import models  # Import models to create schema on MySQL DB.
from config import *  # Flask App Config
from controllers.api import api
from extensions import db

URI = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(USER, PASSWORD, HOST, PORT, SCHEMA)

def register_extensions(app_obj):
    app_obj.app_context().push()
    app_obj.register_blueprint(api, url_prefix="")
    db.init_app(app_obj)
    db.create_all()

def create_app(name):
    app_obj = Flask(name)
    app_obj.config['SQLALCHEMY_DATABASE_URI'] = URI # 'mysql+pymysql://root:toor@localhost:3306/ase'
    app_obj.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    register_extensions(app_obj)
    return app_obj


app = create_app(__name__)

if __name__ == '__main__':
    app.run(debug=True)
