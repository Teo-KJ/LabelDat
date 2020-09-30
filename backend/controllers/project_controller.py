from flask import Blueprint, jsonify, request, session
from werkzeug.exceptions import *

from services import *
from utilities import *

project_controller = Blueprint("controllers/project_controller",
                               __name__, static_folder="static", template_folder="templates")
SESSION_USER_ID_KEY = "user_id"


@project_controller.before_request
def require_login():
    endpoint = request.endpoint.split(".")[-1]
    allowed_routes = []
    if endpoint not in allowed_routes and "user_id" not in session:
        response = RestResponse()
        response.status_code = 401
        response.data = GenericErrorResponse(message="Authentication is required.").to_response()
        jsonify(response.to_dict())


@project_controller.route('/', methods=['GET'])
def get_projects():
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            user_projects = ProjectService.get_projects_by_user_id(current_user_id)
            response.status_code = 200
            response.data = user_projects
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            project = ProjectService.get_project_by_project_id(project_id)
            response.status_code = 200
            response.data = project
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/add', methods=['POST'])
def add_project():
    response = RestResponse()
    try:
        if request.method == "POST":
            print(f"The request data is: {request.data}")
            data = request.get_json()
            current_user_id = session.get(SESSION_USER_ID_KEY)
            newly_created_project = ProjectService.create_project(current_user_id, data.get("projectName"),
                                                                  data.get("itemDataType"), data.get("layout"),
                                                                  data.get("outsourceLabelling"))
            response.status_code = 200
            response.data = newly_created_project
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/<project_id>/tasks/add/upload', methods=['POST'])
def add_project_task(project_id):
    response = RestResponse()
    try:
        if request.method == "POST":
            file = request.files['file']
            newly_created_task = TaskService.create_task(project_id, file)
            response.status_code = 200
            response.data = newly_created_task
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/contribution', methods=['GET'])
def get_user_contribution():
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            projects_contributed_to = ProjectService.get_projects_contributed_to_by_user_id(current_user_id)
            response.status_code = 200
            response.data = projects_contributed_to
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/<project_id>/tasks', methods=['GET'])
def get_project_tasks_unlabelled(project_id):
    response = RestResponse()
    try:
        if request.method == "GET":
            current_user_id = session.get(SESSION_USER_ID_KEY)
            tasks_count = request.args.get('count')
            unlabelled_tasks = ProjectService.get_tasks_unlabelled_by_user_from_project(project_id, current_user_id,
                                                                                        tasks_count)
            response.status_code = 200
            response.data = unlabelled_tasks
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())


@project_controller.route('/tasks', methods=['POST'])
def save_task_label_response():
    response = RestResponse()
    try:
        if request.method == "POST":
            data = request.get_json()
            current_user_id = session.get(SESSION_USER_ID_KEY)
            unlabelled_tasks = LabelService.create_label(current_user_id, data)
            response.status_code = 200
            response.data = unlabelled_tasks
        return jsonify(response.to_dict())
    except BadRequest as err:
        response.status_code = err.code
        response.data = GenericErrorResponse(message=err.description).to_response()
        return jsonify(response.to_dict())
