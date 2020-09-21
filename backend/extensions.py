import sqlalchemy
from flask_sqlalchemy import SQLAlchemy

from config import *

url = 'mysql+pymysql://{0}:{1}@{2}'.format(USER, PASSWORD, HOST)
engine = sqlalchemy.create_engine(url) # connect to server
engine.execute("CREATE SCHEMA IF NOT EXISTS `ase`;") #create 'ase' schema if it does not exist
engine.execute("USE ase;") # select new 'ase' schema

db = SQLAlchemy()
