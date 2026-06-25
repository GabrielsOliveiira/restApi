from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.services.dashborad_services import dashboard_service

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.get("")
@jwt_required()
def get_dashboard():
    user_id = get_jwt_identity()

    return dashboard_service(user_id)              

    