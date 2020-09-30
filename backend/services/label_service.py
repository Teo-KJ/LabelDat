import uuid

from extensions import db
from werkzeug.exceptions import *
from models import *


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
            label_data = label.get("labelData")
            new_label = Label(str(uuid.uuid4()), task_id, user_id, label_data)
            saved_new_label = db.session.add(new_label)
            saved_labels.append(saved_new_label)
        db.session.commit()
        return [saved_label.to_response() for saved_label in saved_labels]
