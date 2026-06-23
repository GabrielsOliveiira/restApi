from flask import Blueprint, request
from ..services.services import create_user
from ..models.user import User

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
def list_users():
    users = User.query.all()

    result = []

    for i in users:
        result.append({
         "id": i.id,
         "name": i.name,
         "email": i.email
        })

    return result, 200