from extensions import db


class Organisation(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    is_enterprise = db.Column(db.Boolean, nullable=False)
    projects = db.relationship('Project', backref='org', lazy=True)  # 1(Organisation)-to-Many(Project)
    users = db.relationship('User', backref='org', lazy=True)   # 1(Organisation)-to-Many(Users)

    def __repr__(self):
        return f"<Organisation {self.org_id} | {self.name} | Enterprise : {self.is_enterprise}>"
