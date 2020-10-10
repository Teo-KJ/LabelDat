from extensions import db
from models.user_type import UserType


class User(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    # 1(Organisation)-to-many(User)
    org_id = db.Column(db.String(80), db.ForeignKey('organisation.id'), nullable=False)

    username = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    user_type = db.Column(db.Enum(UserType), nullable=False)

    # 1(User)-to-Many(ProjectManager)
    project_managers = db.relationship('ProjectManager', backref='user')
    labels = db.relationship('Label', backref='user', lazy=True)  # 1(User)-to-Many(Label)

    def __repr__(self):
        return f"<User {self.id} | {self.username} ({self.name}) | Organisation : {self.org_id}>"

    def to_response(self):
        return {
            "orgId": self.org_id,
            "username": self.username,
            "userType": self.user_type.name,
            "name": self.name,
            "id": self.id
        }
