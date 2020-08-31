"""
    This folder (/models) will contain the definition for all the data access objects.
"""

from models.label import Label
from models.organisation import Organisation
from models.project import Project
from models.project_manager import ProjectManager
from models.task import Task
from models.user import User

'''
    --------------------------------------------------------------------------------------------------------------------
    Explanation for the relationships. For example, 

        class Organisation(db.Model)
            id = db.Column(db.String, primary_key=True, nullable=False)
            projects = db.relationship('Project', backref='org')

        class Project(db.Model):
            id = db.Column(db.String, primary_key=True, nullable=False)
            org_id = db.Column(db.Integer, db.ForeignKey('organisation.id'), primary_key=True)

    * This means that that project objects will be able to do something like my_project.org in order to get the 
    organisation object.
    * This also means that the org_id attribute in Project is just that - an integer id column, not the organisation
    object.
    * We can also do my_organisation.projects to find a list of projects associated with my_organisation
    * If it is a one-to-one, we can use the argument uselist=False to enforce that there should be only 1.
    --------------------------------------------------------------------------------------------------------------------
'''
