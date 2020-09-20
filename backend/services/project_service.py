import uuid

from sqlalchemy.orm.exc import MultipleResultsFound
from werkzeug.exceptions import BadRequest, Conflict

from extensions import db
from models import *


class ProjectService:

    @staticmethod
    def create_project(user_id, org_id, project_name, item_data_type, layout, outsource_labelling):
        if Project.query.filter_by(org_id=org_id, project_name=project_name, item_data_type=item_data_type).first():
            raise Conflict("Project already exists.")
        
        new_project = None
        if org_id and Organisation.query.filter_by(id=org_id):
            new_project = Project(id=str(uuid.uuid4()), org_id=org_id, project_name=project_name, 
                                    item_data_type=item_data_type, layout=layout, outsource_labelling=outsource_labelling)
            new_project_manager = ProjectManager(project_id=new_project.id, user_id=user_id)
            new_project.project_managers.append(new_project_manager)
            db.session.add(new_project)
            db.session.commit()

        return new_project.to_response()

    @staticmethod
    def get_projects_by_user_id(user_id):
        if not user_id:
            raise BadRequest("The user_id is absent.")
        project_manager_entries = ProjectManager.query.filter_by(user_id=user_id)
        project_ids = [pme.project_id for pme in project_manager_entries]
        projects = Project.query.filter(Project.id.in_(project_ids)).all()
        return [pj.to_response() for pj in projects]
