import uuid

from flask import session
from datetime import datetime
from werkzeug.exceptions import *

from extensions import db
from models import *


class UserService:

    @staticmethod
    def create_user(org_id, username, password, name, user_type):
        if User.query.filter_by(username=username).first():
            raise Conflict("UserService :: create_user :: Username already exists.")

        org = Organisation.query.filter_by(id=org_id).first() if org_id else None
        if not org_id or not org:
            new_org_name = name
            new_org = Organisation(id=str(uuid.uuid4()), name=new_org_name, is_enterprise=False,
                                   created_at=datetime.now())
            org_id = new_org.id
            org = new_org
            db.session.add(new_org)

        user_type = user_type.upper()
        new_user = User(id=str(uuid.uuid4()), org_id=org_id, username=username,
                        password=password, name=name, user_type=user_type, created_at=datetime.now())
        org.users.append(new_user)  # Resolves new organisation not existing before creating new user in 1 transaction.
        db.session.commit()
        return new_user.to_response()

    @staticmethod
    def get_user_by_id(id):
        found_user = User.query.filter_by(id=id).first()
        if not found_user:
            raise BadRequest("UserService :: get_user_by_id :: There is no valid current user.")
        return found_user.to_response()

    @staticmethod
    def signin_user(username, password):
        found_user = User.query.filter_by(username=username, password=password).first()
        if not found_user:
            raise Unauthorized("UserService :: signin_user :: The login credentials are invalid.")
        return found_user.to_response()

    @staticmethod
    def get_user_type(id):
        found_user = User.query.filter_by(id=id).first()
        if not found_user:
            raise BadRequest("There is no valid current user.")
        return found_user.to_response()["userType"]

    @staticmethod
    def get_user_profile():
        queryProject = '''
            select user_id,
            count(user_id) as NumOfTasks
            from label
            group by user_id;
        '''
        queryList = [dict(row) for row in db.session.execute(queryProject)]
        
        for i in queryList:
            i['contributionPercentage'] = str(i['contributionPercentage'])
        
        return queryList
