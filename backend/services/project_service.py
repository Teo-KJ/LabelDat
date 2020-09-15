from models import *
from werkzeug.exceptions import BadRequest


class ProjectService:

    @staticmethod
    def get_projects_by_user_id(user_id):
        if not user_id:
            raise BadRequest("The user_id is absent.")
        project_manager_entries = ProjectManager.query.filter_by(user_id=user_id)
        project_ids = [pme.project_id for pme in project_manager_entries]
        projects = Project.query.filter(Project.id.in_(project_ids)).all()
        return [pj.to_response() for pj in projects]
