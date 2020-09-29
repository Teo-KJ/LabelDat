import base64
import uuid

from extensions import db
from werkzeug.exceptions import *
from models import *


class TaskService:

    @staticmethod
    def create_task(project_id, file):
        if not project_id:
            raise BadRequest("The project id is missing")
        if not file:
            raise BadRequest("The file component of the request is empty.")
        if not file.filename:
            raise BadRequest("There is no file data.")

        filename, item_data = file.filename, file
        # To add the limits for number of labels for user and a specific task?
        encoded_item_data = base64.b64encode(item_data.read())
        new_task = Task(str(uuid.uuid4()), project_id, filename, encoded_item_data)
        saved_new_task = db.session.add(new_task)
        db.session.commit()
        return saved_new_task.to_response()
