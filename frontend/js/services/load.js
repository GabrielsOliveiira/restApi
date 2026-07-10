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

function loadMetasLabel(){
    let goalsLabel = document.getElementById("goalsLabel")

    const ulGo = document.getElementById("listGo")
    const tamUl = ulGo.querySelectorAll("li").length
    
    goalsLabel.textContent = tamUl == 0 ? "" : "Metas:"

}

function loadTransctionsLabel(){
    let transactionsLabel = document.getElementById("transactionsLabel")

    const ulTr = document.getElementById("listTr")
    const tamTr = ulTr.querySelectorAll("li").length

    transactionsLabel.textContent = tamTr == 0 ? "" : "Transações:"
}

export  { showErr, loadName, is_completed, loadMetasLabel, loadTransctionsLabel }

