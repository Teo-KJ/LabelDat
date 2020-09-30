import base64
import uuid
from extensions import db
from werkzeug.exceptions import *
from models import *
from datetime import datetime


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
        encoded_item_data = base64.b64encode(item_data.read())
        new_task = Task(id=str(uuid.uuid4()), project_id=project_id, filename=filename, item_data=encoded_item_data,
                        created_at=datetime.now())

        db.session.add(new_task)
        db.session.commit()
        print(f"TaskService :: A new task is added: {new_task}")
        return new_task.to_response()
