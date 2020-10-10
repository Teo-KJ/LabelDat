from extensions import db


class ProjectManager(db.Model):
    # 1(Project)-to-many(ProjectManager)
    project_id = db.Column(db.String(80), db.ForeignKey('project.id'), primary_key=True, nullable=False)
    # 1(User)-to-many(ProjectManager)
    user_id = db.Column(db.String(80), db.ForeignKey('user.id'), primary_key=True, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"<ProjectManager | project_id : {self.project_id} | user_id : {self.user_id}>"

    def to_response(self):
        return {
            "project_id": self.project_id,
            "user_id": self.user_id,
            "created_at": self.created_at
        }