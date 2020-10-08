from extensions import db
from models.item_data_type import ItemDataType
from models.label import Label
from models.task import Task
from copy import deepcopy


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
            "tasks": [t.to_response() for t in self.tasks],
            "projectManagers": [pm.to_response() for pm in self.project_managers],
            "created_at": self.created_at
        }

    def to_project_for_user_response(self, user_id):
        return {
            "id": self.id,
            "orgId": self.org_id,
            "projectName": self.project_name,
            "itemDataType": self.item_data_type.name,
            "layout": self.layout,
            "outsourceLabelling": self.outsource_labelling,
            "tasksLabelled": [t.to_response() for t in self.tasks_and_labels_from_user(user_id)],
            "projectManagers": [pm.to_response() for pm in self.project_managers],
            "created_at": self.created_at
        }

    def tasks_and_labels_from_user(self, user_id):
        resulting_tasks = []
        for task in self.tasks:
            labels_for_user = []
            for label in task.labels:
                if label.user_id == user_id:
                    labels_for_user.append(label)
            if not labels_for_user:
                continue
            task.labels = labels_for_user
            resulting_tasks.append(task)
        return resulting_tasks



    def to_created_project_response(self):
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
            "overallPercentage": self.calculate_tasks_labelled_percentage(),
            "created_at": self.created_at
        }

    def to_contributed_project_response(self, user_id):
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
            "overallPercentage": self.calculate_tasks_labelled_percentage(),
            "contributionCount": self.calculate_tasks_labelled_by_user(user_id),
            "contributionPercentage": self.calculate_tasks_labelled_percentage_by_user(user_id),
            "created_at": self.created_at
        }

    def calculate_number_of_tasks(self):
        return len(self.tasks)

    def calculate_tasks_labelled_percentage(self):
        """
            Count % of tasks that have >= 1 label
        """
        number_of_tasks = self.calculate_number_of_tasks()
        if not number_of_tasks:  # When there are no tasks
            return 0
        num_labelled = len([task for task in self.tasks if len(task.labels) > 0])
        return round(float((num_labelled / number_of_tasks * 100)), 1)

    def calculate_tasks_labelled_percentage_by_user(self, user_id):
        """
            Count % of tasks that a user has labelled
        """
        number_of_tasks = self.calculate_number_of_tasks()
        if not number_of_tasks:  # When there are no tasks
            return 0
        num_labelled_by_user = self.calculate_tasks_labelled_by_user(user_id)
        return round(float((num_labelled_by_user / number_of_tasks) * 100), 1)

    def calculate_tasks_labelled_by_user(self, user_id):
        """
            Count % of tasks that a user has labelled
        """
        tasks_by_user = db.session.query(Task).filter_by(project_id=self.id).join(Label).filter_by(
            user_id=user_id).all()
        num_labelled = len(tasks_by_user)
        return num_labelled
