from flask import Blueprint, request
from ..services.services import create_user
from ..models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.post("")
def user():
    data = request.get_json()

    try: 
        return create_user(data)
    
    except ValueError as error:
        return {
        "error": str(error)
        }

@users_bp.get("")
@jwt_required()
def list_users():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    return user.to_dict(), 200
