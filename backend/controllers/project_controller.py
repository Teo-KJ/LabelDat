import csv
import os

from flask import Blueprint, jsonify, request, send_file, session
from models.user_type import UserType
from services import *
from utilities import *
from keras_predictor.keras_predictor import get_suggestion
from werkzeug.exceptions import *

project_controller = Blueprint("controllers/project_controller",
                               __name__, static_folder="static", template_folder="templates")
SESSION_USER_ID_KEY = "user_id"


@project_controller.before_request
def require_login():
    endpoint = request.endpoint.split(".")[-1]
    allowed_routes = []
    if endpoint not in allowed_routes and "user_id" not in session:
        response = RestResponse()
        response.data = GenericErrorResponse(message="Authentication is required.").to_response()
        return jsonify(response.to_dict()), 401


@project_controller.route('', methods=['GET', 'POST'])
def get_projects():
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session[SESSION_USER_ID_KEY]
            projects = ProjectService.get_projects_associated_to_user(current_user_id)
            response.data = projects
        elif request.method == "POST":
            print(f"The request data is: {request.data}")
            data = request.get_json()
            current_user_id = session.get(SESSION_USER_ID_KEY)
            newly_created_project = ProjectService.create_project(current_user_id, data.get("projectName"),
                                                                  data.get("itemDataType"), data.get("layout"),
                                                                  data.get("outsourceLabelling"))
            response.data = newly_created_project          
        return jsonify(response.to_dict()), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code


@project_controller.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            project = ProjectService.get_project_by_project_id(project_id, current_user_id)
            response.data = project
        return jsonify(response.to_dict()), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code


@project_controller.route('/<project_id>/tasks', methods=['POST'])
def add_project_task(project_id):
    response = RestResponse()
    try:
        if request.method == "POST":
            files = request.get_json()
            newly_created_tasks = TaskService.create_task(project_id, files)
            response.data = newly_created_tasks
            response = get_suggestion(response.to_dict())
        return jsonify(response), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code


@project_controller.route('/<project_id>/tasks', methods=['GET'])
def get_project_tasks_unlabelled(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            tasks_count = request.args.get('count')
            unlabelled_tasks_and_layout = ProjectService.get_tasks_by_user_from_project(project_id, current_user_id,
                                                                                        tasks_count, False)
            response = unlabelled_tasks_and_layout
        return jsonify(response.to_dict()), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code


@project_controller.route('/<project_id>/analytics', methods=['GET'])
def get_project_analytics(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            days_count = request.args.get('days')
            analytics = ProjectService.get_project_analytics(project_id, days_count)

            response = analytics
        return jsonify(response.to_dict()), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code


@project_controller.route('/<project_id>/export', methods=['GET'])
def export_project_labels(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            ext = request.args.get('ext')
            project_name, project_layout, project_item_data_type = ProjectService.get_project_info(project_id)

            if ext == "csv":
                csv_list = ProjectService.get_project_csv(project_id)
                response = FileResponseCSV(project_name, csv_list)

            return response.to_file_output()
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code

# @project_controller.route('/<project_id>/tasks/labelled', methods=['GET'])
# def get_project_tasks_labelled(project_id):
#     response = RestResponse()
#     try:
#         if request.method == "GET":
#             current_user_id = session.get(SESSION_USER_ID_KEY)
#             tasks_count = request.args.get('count')
#             labelled_tasks_and_layout = ProjectService.get_tasks_by_user_from_project(project_id, current_user_id,
#                                                                                       tasks_count, True)
#             response = labelled_tasks_and_layout
#         return jsonify(response.to_dict()), 200
#     except BadRequest as err:
#         response.data = GenericErrorResponse(message=err.description).to_response()
#         return jsonify(response.to_dict()), err.code


@project_controller.route('/tasks', methods=['POST'])
def save_task_label_response():
    response = RestResponse()
    try:
        if request.method == "POST":
            data = request.get_json()
            current_user_id = session.get(SESSION_USER_ID_KEY)
            unlabelled_tasks = LabelService.create_label(current_user_id, data)
            response.data = unlabelled_tasks
        return jsonify(response.to_dict()), 200
    except BadRequest as err:
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict()), err.code
