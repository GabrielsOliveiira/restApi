def name_menager(name: str) -> bool:
    if not isinstance(name, str) or not name.strip():
        raise ValueError("Nome deve ser uma string não vazia.")

    if name in ["", " ", None]:
        raise ValueError("Nome não pode ser vazio ou nulo.")
    
    if len(name) > 50:
        raise ValueError("Nome não pode ter mais de 50 caracteres.") 

def target_amount_menager(target_amount: float) -> bool:
    if not isinstance(target_amount, (int, float)) or target_amount <= 0:
        raise ValueError("O valor alvo deve ser um número positivo.")

def fields_menager(data: dict) -> bool:
    required_fields = ["name", "target_amount"]
    
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

def validate_goal_data(data) -> bool:  
    fields_menager(data)
    name_menager(data["name"])
    target_amount_menager(data["target_amount"])
    
    return True