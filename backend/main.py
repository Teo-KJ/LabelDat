from flask import Flask
from extensions import db
from api import api


def register_extensions(app_obj):
    db.init_app(app_obj)
    app_obj.register_blueprint(api, url_prefix="")


def create_app(name):
    app_obj = Flask(name)
    app_obj.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/ase'
    app_obj.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    register_extensions(app_obj)

    return app_obj


app = create_app(__name__)

if __name__ == '__main__':
    app.run(debug=True)
