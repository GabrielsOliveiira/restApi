from flask import Blueprint, request

from main.services.auth_service import login

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/login")
def user_login():
    data = request.get_json()

    return login(data)