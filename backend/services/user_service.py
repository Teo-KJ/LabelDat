from extensions import db
from models import *
import uuid
from flask import session
from werkzeug.exceptions import *


class UserService:

    @staticmethod
    def create_user(org_id, username, password, name, user_type):
        if User.query.filter_by(username=username).first():
            raise Conflict("Username already exists.")

        if not org_id or not Organisation.query.filter_by(id=org_id):
            new_org_name = name
            new_org = Organisation(id=str(uuid.uuid4()), name=new_org_name, is_enterprise=False)
            db.session.add(new_org)
            org_id = new_org.id

        user_type = user_type.upper()
        new_user = User(id=str(uuid.uuid4()), org_id=org_id, username=username,
                        password=password, name=name, user_type=user_type)
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_response()

    @staticmethod
    def signin_user(username, password):
        found_user = User.query.filter_by(username=username, password=password).first()
        if not found_user:
            raise Unauthorized("The login credentials are invalid.")
        return found_user.to_response()



