import uuid

from extensions import db
from werkzeug.exceptions import *
from models import *
from datetime import datetime


class LabelService:

    @staticmethod
    def create_label(user_id, labels):
        if not user_id:
            raise BadRequest("The user id is missing")
        if not labels:
            raise BadRequest("The labels data is missing")

        # To add the limits for number of labels for user and a specific task?
        saved_labels = []
        for label in labels:
            task_id = label.get("taskId")
            label_data = label.get("data")
            new_label = Label(task_id=task_id, user_id=user_id, label_data=label_data, created_at=datetime.now())
            db.session.add(new_label)
            saved_labels.append(new_label)
        db.session.commit()
        return [saved_label.to_response() for saved_label in saved_labels]
