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
        return [pj.to_dashboard_response() for pj in projects]

    @staticmethod
    def get_project_by_project_id(project_id):
        if not project_id:
            raise BadRequest("The project_id is absent.")
        try:
            requested_project = Project.query.filter(Project.id == project_id).one_or_none()
        except MultipleResultsFound:
            raise BadRequest("Multiple Projects with the same project_id found")
        return requested_project.to_response()

    @staticmethod
    def get_projects_contributed_to_by_user_id(user_id):
        """
            Get all projects the user has contributed to, i.e. has labelled files of the projects
        """
        if not user_id:
            raise BadRequest("The project_id is absent.")
        query = f'''
            SELECT p.id, p.org_id, p.project_name, p.item_data_type, p.layout, p.outsource_labelling 
            FROM user u
            inner join label l on u.id = l.user_id
            inner join task t on l.task_id = t.id
            inner join project p on t.project_id = p.id
            where u.id = {user_id};
        '''
        projects = db.session.execute(query)
        return [p.to_response() for p in projects]

    @staticmethod
    def get_tasks_unlabelled_by_user_from_project(project_id, user_id, tasks_count):
        """
            For a labeller, receive the number of tasks (THAT ARE NOT YET LABELLED FOR THIS PARTICULAR USER)
            for a particular project as specified by tasks_count query parameter.
        """
        if not user_id:
            raise BadRequest("The user id is missing")
        if not project_id:
            raise BadRequest("The project id is missing")
        if not tasks_count:
            raise BadRequest("The tasks count is missing")

        query = f'''
            SELECT t.id, t.project_id, t.filename, t.item_data FROM task t
            INNER JOIN project p ON t.project_id = p.id
            WHERE p.id = {project_id} and (t.id, {user_id}) NOT IN (SELECT l.task_id, l.user_id FROM label l);
        '''
        tasks = db.session.execute(query).paginate(per_page=tasks_count)
        return [t.to_response() for t in tasks]
