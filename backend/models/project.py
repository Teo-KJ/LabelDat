from extensions import db
from models.item_data_type import ItemDataType
from models.label import Label
from models.task import Task


class Project(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    # 1(Project)-to-1(organisation)
    org_id = db.Column(db.String(80), db.ForeignKey('organisation.id'), nullable=False)
    project_name = db.Column(db.String(80), nullable=False)
    item_data_type = db.Column(db.Enum(ItemDataType), nullable=False)
    layout = db.Column(db.JSON, nullable=False)
    outsource_labelling = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    # parent 1-to-many w Task
    tasks = db.relationship('Task', backref='task', lazy=True)
    # parent 1-to-many w ProjectManager
    project_managers = db.relationship('ProjectManager', backref='project', lazy=True)

    def __repr__(self):
        return f"<Project {self.id} | {self.project_name} | Organisation : {self.org_id}>"

    def to_response(self):
        return {
            "id": self.id,
            "orgId": self.org_id,
            "projectName": self.project_name,
            "itemDataType": self.item_data_type.name,
            "layout": self.layout,
            "outsourceLabelling": self.outsource_labelling,
            "created_at": self.created_at,
            "tasks": [t.to_response() for t in self.tasks],
            "projectManagers": [pm.to_response() for pm in self.project_managers]
        }

    def to_dashboard_response(self):
        return {
            "id": self.id,
            "orgId": self.org_id,
            "projectName": self.project_name,
            "itemDataType": self.item_data_type.name,
            "layout": self.layout,
            "outsourceLabelling": self.outsource_labelling,
            "tasks": [t.to_response() for t in self.tasks],
            "projectManagers": [pm.to_response() for pm in self.project_managers],
            "tasksCount": self.calculate_number_of_tasks(),
            "overallPercentage": self.calculate_percentage_labelled()
        }

    def to_dashboard_response_by_user(self, user_id):
        return {
            "id": self.id,
            "orgId": self.org_id,
            "projectName": self.project_name,
            "itemDataType": self.item_data_type.name,
            "layout": self.layout,
            "outsourceLabelling": self.outsource_labelling,
            "tasks": [t.to_response() for t in self.tasks],
            "projectManagers": [pm.to_response() for pm in self.project_managers],
            "tasksCount": self.calculate_number_of_tasks(),
            "overallPercentage": self.calculate_percentage_labelled(),
            "contributionPercentage": self.calculate_percentage_labelled_by_user(user_id)
        }

    def calculate_number_of_tasks(self):
        return len(self.tasks)

    def calculate_percentage_labelled(self):
        """
            Count number of tasks that DO NOT have labels
        """
        # percentage_labelled_query = f'''
        #             SELECT task_id, COUNT(task_id) FROM project p
        #             inner join task t on p.id = t.project_id
        #             inner join label l on t.id = l.task_id
        #             where p.id = {self.id}
        #             group by task_id
        #         '''
        # num_labelled = len(db.session.execute(percentage_labelled_query))
        number_of_tasks = self.calculate_number_of_tasks()
        if not number_of_tasks: # When there are no tasks
            return 0
        num_labelled = len([task for task in self.tasks if len(task.labels) > 0])
        return (num_labelled / self.calculate_number_of_tasks()) * 100

    def calculate_percentage_labelled_by_user(self, user_id):
        """
            Count number of tasks that have user has labelled
        """
        tasks_by_user = db.session.query(Task).filter_by(project_id=self.id).join(Label).filter_by(user_id=user_id).all()
        num_labelled = len(tasks_by_user)
        if not num_labelled: # When there are no tasks
            return 0
        return (num_labelled / self.calculate_number_of_tasks()) * 100