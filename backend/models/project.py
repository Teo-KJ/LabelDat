from extensions import db
from models.item_data_type import ItemDataType


class Project(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    # 1(Project)-to-1(organisation)
    org_id = db.Column(db.String(80), db.ForeignKey('organisation.id'), nullable=False)
    project_name = db.Column(db.String(80), nullable=False)
    item_data_type = db.Column(db.Enum(ItemDataType), nullable=False)
    layout = db.Column(db.JSON, nullable=False)
    outsource_labelling = db.Column(db.Boolean, nullable=False)

    # parent 1-to-many w Task
    tasks = db.relationship('Task', backref='task', lazy=True)
    # parent 1-to-many w ProjectManager
    project_managers = db.relationship('ProjectManager', backref='project', lazy=True)

    def __repr__(self):
        return f"<Project {self.project_id} | {self.project_name} | Organisation : {self.org_id}>"

    def to_response(self):
        return {
            "id": self.id,
            "orgId": self.org_id,
            "projectName": self.project_name,
            "itemDataType": self.item_data_type,
            "layout": self.layout,
            "outsource_labelling": self.outsource_labelling
        }
