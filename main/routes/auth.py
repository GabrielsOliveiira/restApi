from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.models.user import User
from main.services.auth_service import login

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/login")
def user_login():
    data = request.get_json()

    return login(data)

@auth_bp.get("/me")
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    return {
        "Id": user.id,
        "Nome": user.name,
        "Email": user.email
    }, 200