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

function loadSumGo(){
    const ulGo = document.getElementById("listGo")
    const somaGo = document.getElementById("somaGo")

    const liGo = ulGo.querySelectorAll("li")

    let soma = 0
    liGo.forEach(li => {
        const meta = li.querySelector(".meta")
        soma += parseFloat(meta.dataset.value)
    });
    somaGo.textContent = `Valor que deve juntar no mês: ${soma}`
}

function loadSomaTr(){
    const ulTr = document.getElementById("listTr")
    const somaTr = document.getElementById("somaTr")

    const liTr = ulTr.querySelectorAll("li")

    if (liTr.length <= 0){
        somaTr.textContent = ""
        return null
    }

    let soma = 0
    liTr.forEach(li => {
        const transaction = li.querySelector(".transaction")
        let valor = parseFloat(transaction.dataset.amount)
        transaction.dataset.type == "expense" ? valor *= -1 : null

        soma += valor
    })

    somaTr.textContent = soma>=0 ? `Você recebeu ${soma} reais` : `Você gastou ${soma*-1} reais`
}

export  { showErr, loadName, is_completed, loadMetasLabel, loadTransctionsLabel, loadSomaTr, loadSumGo }

