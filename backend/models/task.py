from extensions import db


class Task(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)

    # 1(Project)-to-Many(Task)
    project_id = db.Column(db.String(80), db.ForeignKey('project.id'), nullable=False)
    filename = db.Column(db.String(200), nullable=False)
    item_data = db.Column(db.String(200), nullable=False)    # Base64 String (?)

    labels = db.relationship('Label', backref='task', lazy=True)  # 1(Task)-to-Many(Label)

    def __repr__(self):
        return f"<Task | task_id : {self.task_id} | project_id : {self.project_id} | filename : {self.filename}>"
