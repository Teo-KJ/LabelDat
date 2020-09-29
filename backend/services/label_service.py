import uuid

from extensions import db
from werkzeug.exceptions import *
from models import *


class LabelService:

    @staticmethod
    def create_label(user_id, task_id, label_data):
        if not user_id:
            raise BadRequest("The user id is missing")
        if not task_id:
            raise BadRequest("The task id is missing")
        if not label_data:
            raise BadRequest("The label data is missing")

        # To add the limits for number of labels for user and a specific task?
        new_label = Label(str(uuid.uuid4()), task_id, user_id, label_data)
        saved_new_label = db.session.add(new_label)
        db.session.commit()
        return saved_new_label.to_response()