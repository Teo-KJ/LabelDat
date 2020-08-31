from extensions import db


class ProjectManager(db.Model):
    # 1(Project)-to-many(ProjectManager)
    project_id = db.Column(db.String(80), db.ForeignKey('project.id'), primary_key=True, nullable=False)
    # 1(User)-to-many(ProjectManager)
    user_id = db.Column(db.String(80), db.ForeignKey('user.id'), primary_key=True, nullable=False)

    def __repr__(self):
        return f"<ProjectManager | project_id : {self.project_id} | user_id : {self.user_id}>"
