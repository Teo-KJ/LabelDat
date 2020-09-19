import csv # meant to read CSV files
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

URI = 'mysql+pymysql://{0}:{1}@{2}:{3}/{4}'.format(USER, PASSWORD, HOST, PORT, SCHEMA)

engine = create_engine(os.getenv(URI))
db = scoped_session(sessionmaker(bind=engine))

def insertOrganisations():
    f = open("organisations.csv")
    reader = csv.reader(f)
    print("Start adding organisations")
    for ID, name, isEnterprise in reader: # each column in the db
        db.execute("INSERT INTO organisation (id, name, is_enterprise) VALUES (:id, :name, :is_enterprise)", # :__ is a placeholder variable
                    {"id": ID, "name": name, "is_enterprise": isEnterprise}) # dict to tell the query what to fill in; the values are the iterable variables (in the for loop)
        print(f"Added organisation with ID {ID} and Name - {name}.")
    db.commit() # save the changes
    print("Completed additions")

def insertProjects():
    f = open("projects.csv")
    reader = csv.reader(f)
    print("Start adding projects")
    for ID, org_id, project_name, itemDType, layout, isOutsourced in reader: # each column in the db
        db.execute("INSERT INTO project (id, org_id, project_name, item_data_type, layout, outsource_labelling) VALUES (:id, :org_id, :project_name, :item_data_type, :layout, :outsource_labelling)",
                    {"id": ID, "org_id": org_id, "project_name": project_name, "item_data_type": itemDType, "layout": layout, "outsource_labelling": isOutsourced})
        print(f"Added projects with ID {ID} and Name - {project_name}.")
    db.commit() # save the changes
    print("Completed additions")

if __name__ == "__main__":
    insertOrganisations()
    insertProjects()
