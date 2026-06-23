from flask import Blueprint, request
from .services import create_user
from .models.user import User

homepage = Blueprint("homepage", __name__)

@homepage.post("/users")
def user():
    data = request.get_json()

    return create_user(data)

@homepage.get("/users")
def list_users():
    users = User.query.all()

    result = []

    for i in users:
        result.append({
         "id": i.id,
         "name": i.name,
         "email": i.email,
         "password": i.password
        })

    return result