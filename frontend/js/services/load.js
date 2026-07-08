function loadName(load){
    const named = document.getElementById("name")
    named.textContent = load
}

function showErr(message){
    const err = document.getElementById("err");
    err.textContent = message
}

function is_completed(id){
    const is_completedP = document.getElementById(`is_completed-${id}`)
    const is_completedButton = document.getElementById(id)

    is_completedP.textContent = is_completedP.textContent == "Finalizado" ? "Em andamento" : "Finalizado"
    is_completedButton.textContent = is_completedButton.textContent == "Completar" ? "Desmarcar" : "Completar"
}

export  { showErr, loadName, is_completed }

