from extensions import db


class Label(db.Model):
    # 1(Task)-to-Many(Label)
    task_id = db.Column(db.String(80), db.ForeignKey('task.id'), primary_key=True, nullable=False)
    # 1(Task)-to-Many(User)
    user_id = db.Column(db.String(80), db.ForeignKey('user.id'), primary_key=True, nullable=False)

    label_data = db.Column(db.JSON, nullable=False)   # JSON

    def __repr__(self):
        return f"<Label | task_id : {self.task_id} | user_id : {self.user_id}>"
