import base64
import uuid
from extensions import db
from werkzeug.exceptions import *
from models import *
from datetime import datetime


class TaskService:

    @staticmethod
    def create_task(project_id, files):
        tasks_saved = []
        if not project_id:
            raise BadRequest("TaskService :: create_task :: The project id is missing")
        if not files:
            raise BadRequest("TaskService :: create_task :: The file component of the request is empty.")
        for index, file in enumerate(files):
            if 'filename' not in file:
                raise BadRequest(f"TaskService :: create_task :: There is no file data in the {index}th entry.")
            if 'itemData' not in file:
                raise BadRequest(f"TaskService :: create_task :: There is no itemData in the {index}th entry.")

            filename, item_data = file['filename'], file['itemData']
            new_task = Task(id=str(uuid.uuid4()), project_id=project_id, filename=filename, item_data=item_data,
                            created_at=datetime.now())
            db.session.add(new_task)
            tasks_saved.append(new_task)
            print(f"TaskService :: create_task :: A new task is added: {new_task} for the {index}th entry.")

        db.session.commit()
        print(f"TaskService :: create_task :: New tasks added: {tasks_saved}")
        return [task.to_response() for task in tasks_saved]
