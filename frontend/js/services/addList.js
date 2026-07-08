const listTr = document.getElementById("listTr")
const listGo = document.getElementById("listGo")

function addLiTr(transaction){
    const newLi = document.createElement("li");
    newLi.dataset.id = transaction.id
    newLi.innerHTML = `
    <p>${transaction.type_of == "expense" ? "Gasto" : "Receita"} de: ${transaction.amount}</p>
    <p>Categoria: ${transaction.category}</p>
    <p>Descrição: ${transaction.description}</p>
    <button type="button" class="btn-delete" id="${transaction.id}">Delete</button>
    `
    listTr.append(newLi)
}

function addLiGo(goal){
    const newLi = document.createElement("li");
    newLi.dataset.idGo = goal.id
    newLi.innerHTML = `
    <p>${goal.name}</p>
    <p>Meta: ${goal.target_amount}</p>
    <p>Criado em: ${new Date(goal.created_at).toLocaleDateString("pt-BR")}</p>
    <p>Data limite: ${goal.dead_line ? new Date(goal.dead_line).toLocaleDateString("pt-BR") : "Sem data marcada"}</p>
    <p>${goal.is_completed == true ? "Finalizado" : "Em andamento"}<button>${goal.is_completed == true ? "Desmarcar" : "Completar"}</button></p>
    <button type="button" class="btn-delete" id="${goal.id}">Delete</button>
    `
    listGo.append(newLi)
}

export { addLiTr, addLiGo }