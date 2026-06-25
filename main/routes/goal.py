from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.repositories.goal_rep import validate_goal_data
from main.services.goal_services import create_goal_service, delete_goal_service, get_goal_by_id_service, get_goal_details_service, goal_service, update_goal_service

goal_bp = Blueprint("goal", __name__, url_prefix="/goal")

@goal_bp.get("")
@jwt_required()
def get_goal():
    user_id = get_jwt_identity()

    return goal_service(user_id)

@goal_bp.get("/<int:goal_id>")
@jwt_required()
def get_goal_by_id(goal_id):
    user_id = get_jwt_identity()
    
    return get_goal_by_id_service(user_id, goal_id)

@goal_bp.get("/<int:goal_id>/details")
@jwt_required()
def get_goal_details(goal_id):
    user_id = get_jwt_identity()

    return get_goal_details_service(user_id, goal_id)

@goal_bp.post("")
@jwt_required()
def create_goal():
    user_id = get_jwt_identity()
    data = request.get_json()

    try:
        validate_goal_data(data)
    except ValueError as e:
        return {"error": str(e)}, 400
    
    return create_goal_service(user_id, data)

@goal_bp.put("/<int:goal_id>")
@jwt_required()
def update_goal(goal_id):
    user_id = get_jwt_identity()
    data = request.get_json()

    return update_goal_service(user_id, goal_id, data)

@goal_bp.delete("/<int:goal_id>")
@jwt_required()
def delete_goal(goal_id):
    user_id = get_jwt_identity()

    return delete_goal_service(user_id, goal_id)