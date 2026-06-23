from main.models.user import User
from main.extensions import db

def create_user(data): 
    required_fields = ["name", "email", "senha"]

    if not data:
        return {
            "error": "Nenhum dado foi enviado"
            }, 400
    
    for field in required_fields:
        if field not in data:
            return {
                "error": f"Preencha '{field}' antes de enviar"
            }, 400
        
        if not data.get(field):
            return {
                "error": "Preencha todos os campos"
            }
        
    name = data.get("name")
    email = data.get("email")
    senha = data.get("senha")
    
    if len(senha) <= 7:
        return {
            "error": "Senha deve ter no mínimo 8 números"
        }, 400
    
    if len(name)<= 2:
        return {
            "error": "Nome deve ter mais que 2 caracteres"
        }, 400

    user = User(
        name=name,
        email=email,
        password=senha
    )

    db.session.add(user)
    db.session.commit()

    return {
        "message": "Usuário criado com sucesso!"
    }