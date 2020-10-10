from extensions import db


class Organisation(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    is_enterprise = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    projects = db.relationship('Project', backref='org', lazy=True)  # 1(Organisation)-to-Many(Project)
    users = db.relationship('User', backref='org', lazy=True)   # 1(Organisation)-to-Many(Users)

    def __repr__(self):
        return f"<Organisation {self.id} | {self.name} | Enterprise : {self.is_enterprise}>"

    def to_response(self):
        return {
            "id": self.id,
            "name": self.name,
            "is_enterprise": self.is_enterprise,
            "created_at": self.created_at,
            "projects": [pj.to_response() for pj in self.projects],
            "users": [user.to_response() for user in self.users]
        }
