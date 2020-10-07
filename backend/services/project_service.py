import uuid
from datetime import datetime
from sqlalchemy.orm.exc import MultipleResultsFound
from werkzeug.exceptions import BadRequest, Conflict
from extensions import db
from models import *
from models.user_type import UserType
from utilities import *
from sqlalchemy import desc


class ProjectService:

    @staticmethod
    def create_project(user_id, project_name, item_data_type, layout, outsource_labelling):
        if not user_id:
            raise BadRequest("ProjectService :: create_project :: The user id is missing.")

        current_user = User.query.filter_by(id=user_id).first()
        org_id = current_user.org_id
        outsource_labelling = outsource_labelling if outsource_labelling else True

        if not org_id or not Organisation.query.filter_by(id=org_id):
            raise BadRequest("ProjectService :: create_project :: The org_id is missing, or the organisation is "
                             "invalid.")

        if Project.query.filter_by(org_id=org_id, project_name=project_name, item_data_type=item_data_type).first():
            raise Conflict("ProjectService ::create_project :: "
                           "Project with the same name and item data type already exists.")

        new_project = Project(id=str(uuid.uuid4()), org_id=org_id, project_name=project_name,
                              item_data_type=item_data_type, layout=layout, outsource_labelling=outsource_labelling,
                              created_at=datetime.now())
        new_project_manager = ProjectManager(project_id=new_project.id, user_id=user_id, created_at=datetime.now())
        new_project.project_managers.append(new_project_manager)

        db.session.add(new_project)
        db.session.commit()

        print(f"ProjectService :: create_project :: The new project to be created is: {new_project}")
        print(f"ProjectService :: create_project :: The new project manager entry added is: {new_project_manager}")

        return new_project.to_response()

    @staticmethod
    def get_projects_associated_to_user(user_id):
        if not user_id:
            raise BadRequest("ProjectService :: get_projects_associated_to_user :: The user_id is absent.")

        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise BadRequest("ProjectService :: get_projects_associated_to_user :: The user_id is invalid.")

        created_projects, contributed_projects = [], []
        if user.user_type == UserType.PROJECT_OWNER:
            project_manager_entries = ProjectManager.query.filter_by(user_id=user_id)
            project_ids = [pme.project_id for pme in project_manager_entries]
            created_projects = Project.query.filter(Project.id.in_(project_ids)).order_by(desc(Project.created_at)).all()
        contributed_projects = ProjectService.query_user_contributed_projects(user_id)
        results = UserProjectsResults(projects=created_projects, contributed_projects=contributed_projects)
        return results.to_response(user_id)

    @staticmethod
    def get_project_by_project_id(project_id):
        if not project_id:
            raise BadRequest("ProjectService :: get_project_by_project_id :: The project_id is absent.")
        try:
            requested_project = Project.query.filter(Project.id == project_id).one_or_none()
        except MultipleResultsFound:
            raise BadRequest("ProjectService :: get_project_by_project_id :: "
                             "Multiple Projects with the same project_id found")
        return requested_project.to_response()

    @staticmethod
    def get_tasks_by_user_from_project(project_id, user_id, tasks_count, labelled):
        """
            For a labeller, receive the number of tasks (THAT ARE NOT YET LABELLED FOR THIS PARTICULAR USER)
            for a particular project as specified by tasks_count query parameter.
        """
        if not user_id:
            raise BadRequest("ProjectService :: get_tasks_by_user_from_project :: The user id is missing")
        if not project_id:
            raise BadRequest("ProjectService :: get_tasks_by_user_from_project :: The project id is missing")
        if not tasks_count:
            raise BadRequest("ProjectService :: get_tasks_by_user_from_project :: The tasks count is missing")
        if labelled is None:
            raise BadRequest("ProjectService :: get_tasks_by_user_from_project :: "
                             "Unknown whether tasks requested are labelled or unlabelled.")

        if labelled:
            query = f'''
                SELECT t.id, t.project_id, t.filename, t.item_data, t.created_at FROM task t
                INNER JOIN project p ON t.project_id = p.id
                WHERE p.id = '{project_id}' and (t.id, '{user_id}') IN (SELECT l.task_id, l.user_id FROM label l)
                ORDER BY t.created_at DESC
                LIMIT {tasks_count};
            '''
        else:
            query = f'''
                SELECT t.id, t.project_id, t.filename, t.item_data, t.created_at FROM task t
                INNER JOIN project p ON t.project_id = p.id
                WHERE p.id = '{project_id}' and (t.id, '{user_id}') NOT IN (SELECT l.task_id, l.user_id FROM label l)
                ORDER BY t.created_at DESC
                LIMIT {tasks_count};
            '''
        tasks = db.session.execute(query)  # .paginate(per_page=tasks_count)
        task_dicts = [dict(task) for task in tasks]
        tasks = [Task(id=d['id'], project_id=d['project_id'], filename=d['filename'], item_data=d['item_data'],
                      created_at=d['created_at']) for d in task_dicts]
        task_responses = [t.to_response() for t in tasks]
        project = Project.query.filter_by(id=project_id).first()
        project_name, project_layout, project_item_data_type = project.project_name, project.layout, project.item_data_type

        print(f"ProjectService :: get_tasks_unlabelled_by_user_from_project :: The tasks retrieved are: {tasks}")
        return TasksAndLayoutResponse(project_name, project_layout, project_item_data_type.name, task_responses)

    '''
        Helper Methods
    '''

    @staticmethod
    def query_user_contributed_projects(user_id):
        query = f'''
                SELECT p.id, p.org_id, p.project_name, p.item_data_type, p.layout, p.outsource_labelling, p.created_at 
                FROM user u
                INNER JOIN label l ON u.id = l.user_id
                INNER JOIN task t ON l.task_id = t.id
                INNER JOIN project p ON t.project_id = p.id
                WHERE u.id = '{user_id}'
                ORDER BY p.created_at DESC;
                '''
        print("HERE: ", [row.created_at for row in db.session.execute(query)])
        project_dicts = [dict(row) for row in db.session.execute(query)]
        return [Project.query.filter_by(id=project_dict['id']).first() for project_dict in project_dicts]
