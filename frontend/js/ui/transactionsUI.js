const named = document.getElementById("name")
const listTr = document.getElementById("listTr")
const listGo = document.getElementById("listGo")

function loadName(load){
    named.textContent = load
}

function addLiTr(transaction){
    const newLi = document.createElement("li");
    newLi.dataset.id = transaction.id
    newLi.innerHTML = `
    <p>${transaction.type_of == "expense" ? "Gasto" : "Receita"} de: ${transaction.amount}</p>
    <p>Categoria: ${transaction.category}</p>
    <p>Descrição: ${transaction.description}</p>
    `
    listTr.append(newLi)
}

function addLiGo(goal){
    const newLi = document.createElement("li");
    newLi.dataset.idGo = goal.id
    newLi.innerHTML = `
    <p>${name}</p>
    <p>Meta: ${goal.target_amount}</p>
    <p>Criado em: ${new Date(goal.created_at).toLocaleDateString("pt-BR")}</p>
    <p>${goal.is_completed == true ? "Finalizado" : "Em andamento    "}</p>
    `
    listGo.append(newLi)
}

export { loadName, addLiTr, addLiGo }