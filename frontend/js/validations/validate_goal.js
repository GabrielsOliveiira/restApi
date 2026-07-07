function name_menager(name){
    if (!typeof name === "string" || !name.trim() === ""){
        throw ValueError("Nome deve ser uma string não vazia.")
    }

    if (name in ["", " ", undefined, null]){
        throw ValueError("Nome não pode ser vazio ou nulo.")
    }

    if (name.length > 50){
        throw ValueError("Nome não pode ter mais de 50 caracteres.") 
    }
}

function target_amount_menager(target_amount){
    if (!typeof(target_amount) === "number" || target_amount <= 0){
        throw ValueError("O valor alvo deve ser um número positivo.")
    }
}

function fields_menager(data){
    const required_fields = ["name", "target_amount"]
    
    for (const field of required_fields) {
        if (!(field in data)) {
            throw ValueError(`Missing required field: ${field}`)
        }
    }
}

function validate_goal_data(data){  
    fields_menager(data)
    name_menager(data["name"])
    target_amount_menager(data["target_amount"])
    
    return true
}

export { validate_goal_data }