function name_menager(name){
    if (typeof name !== "string" || name.trim() === ""){
        throw new Error( "Preencha o nome")
    }

    if (name in ["", " ", undefined, null]){
        throw new Error( "Nome não pode ser vazio")
    }

    if (name.length > 50 || name.length < 2){
        throw new Error( "Nome deve ter entre 2 e 50 Characteres") 
    }
}

function target_amount_menager(target_amount){
    if (typeof(target_amount) !== "number" || Number.isNaN(target_amount) || target_amount <= 0){
        throw new Error("O valor alvo deve ser um número positivo")
    }
}

function fields_menager(data){
    const required_fields = ["name", "target_amount"]
    
    for (const field of required_fields) {
        if (!(field in data)) {
            throw new Error( `Preencha o campo: ${field}`)
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