from extensions import db
from sqlalchemy.dialects import mysql


class Task(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)

    # 1(Project)-to-Many(Task)
    project_id = db.Column(db.String(80), db.ForeignKey('project.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    item_data = db.Column(mysql.LONGTEXT, nullable=False)    # Changed to text for now, for large Base64 String (?)
    created_at = db.Column(db.DateTime(), nullable=False)

    labels = db.relationship('Label', backref='task', lazy=True)  # 1(Task)-to-Many(Label)

    def __repr__(self):
        return f"<Task | task_id : {self.id} | project_id : {self.project_id} | filename : {self.filename}>"

    def to_response(self):
        return {
            "id": self.id,
            "projectId": self.project_id,
            "filename": self.filename,
            "itemData": self.item_data,
            "created_at": self.created_at,
            "labels": [label.to_response() for label in self.labels]
        }

    def to_response_with_labels_from_user(self, user_id):
        return {
            "id": self.id,
            "projectId": self.project_id,
            "filename": self.filename,
            "itemData": self.item_data,
            "created_at": self.created_at,
            "labels": [label.to_response() for label in self.labels if label.user_id == user_id]
        }
