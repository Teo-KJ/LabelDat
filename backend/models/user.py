from extensions import db


class User(db.Model):
    id = db.Column(db.String(80), primary_key=True, nullable=False)
    # 1(Organisation)-to-many(User)
    org_id = db.Column(db.String(80), db.ForeignKey('organisation.id'), nullable=False)

    username = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(256), nullable=False)    # SHA256 Encryption (?) --- Probably use Bcrypt for this
    name = db.Column(db.String(120), nullable=False)

    # 1(User)-to-Many(ProjectManager)
    project_managers = db.relationship('ProjectManager', backref='user')
    labels = db.relationship('Label', backref='user', lazy=True)  # 1(User)-to-Many(Label)

    def __repr__(self):
        return f"<User {self.id} | {self.username} ({self.name}) | Organisation : {self.org_id}>"
