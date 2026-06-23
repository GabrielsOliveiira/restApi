from main.models.user import User
from main.extensions import db
from werkzeug.security import generate_password_hash

def validate_user_data(data):
    required_fields = ["name", "email", "senha"]

    if not data:
            raise ValueError(f"Nenhum dado foi enviado")
    
    for field in required_fields:
        if field not in data:
            raise ValueError(f"O campo '{field} é obrigatório'")
        
        if not data.get(field):
            raise ValueError("Preencha todos os campos")

def email_exist(email):
    email_exist = User.query.filter_by(email=email).first()

    if (email_exist):
        raise ValueError("Email já está sendo ultilizado")

def business_rules_password(senha):
    if len(senha) <= 7:
        raise ValueError("Senha deve ter no mínimo 8 números")
    
def business_rules_name(name):
    if len(name) < 3:
        raise ValueError("Nome deve ter mais que 2 caracteres")
    
def build_user(data):
    user = User(
        name = data["name"],
        email=data["email"],
        password=generate_password_hash(data["senha"])
    )

    return user

def save_user(user):

    db.session.add(user)
    db.session.commit()

def create_user(data): 
    
    validate_user_data(data)

    email_exist(data["email"])
    
    business_rules_password(data["senha"])

    business_rules_name(data["name"])

    save_user(build_user(data))

    return {
        "message": "Usuário criado com sucesso!"
    }