from main.models import User
from werkzeug.security import check_password_hash

def login(data):
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {
            "error": "Email ou senha inválidos"
        }, 401

    if not check_password_hash(user.password, data["senha"]):
        return {
            "error": "Email ou senha inválidos"
        }, 401