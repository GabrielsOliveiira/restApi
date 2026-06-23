from main.models import User

def login(data):
    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return {
            "error": "Email ou senha inválidos"
        }, 401