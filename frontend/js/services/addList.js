import { mesesFaltando } from "../utils/utils.js"

const listTr = document.getElementById("listTr")
const listGo = document.getElementById("listGo")

function traduzir(categoria){
    const ingles = ["food", "transportation", "entertainment", "utilities", "health", "other"]
    const portugues = ["comida", "transporte", "entretenimento", "serviços essenciais", "saúde", "outro"]
    return portugues[ingles.indexOf(categoria)]
}


function addLiTr(transaction){
    const newLi = document.createElement("li");
    newLi.dataset.id = transaction.id
    newLi.innerHTML = `
    <p>${transaction.type_of == "expense" ? "Gasto" : "Receita"} de: ${transaction.amount}</p>
    <p>Categoria: ${traduzir(transaction.category)}</p>
    <p>Descrição: ${transaction.description}</p>
    <button type="button" class="btn-delete" id="${transaction.id}">Delete</button>
    `
    listTr.append(newLi)
}

function addLiGo(goal){
    const created_at = new Date(goal.created_at).toLocaleDateString("pt-BR")
    const dead_line = new Date(goal.dead_line).toLocaleDateString("pt-BR")
    const meses = mesesFaltando(created_at, dead_line)
    const aportesNescessarios = Math.ceil(goal.target_amount/meses)

    const newLi = document.createElement("li");
    newLi.dataset.idGo = goal.id
    newLi.innerHTML = `
    <p class="nameGoal">${goal.name}</p>
    <p>Meta: ${goal.target_amount}</p>
    <p>Criado em: ${created_at}</p>
    <p>Data limite: ${goal.dead_line ? dead_line : "Sem data marcada"}</p>
    ${goal.dead_line && meses > 0? `<p>Faltam ${meses} meses</p>` : ""}
    ${goal.dead_line && aportesNescessarios > 0? `<p>Invista: ${aportesNescessarios} por mês</p>` : ""}
    <p id="is_completed-${goal.id}">${goal.is_completed == true ? "Finalizado" : "Em andamento"}</p>
    <button id="${goal.id}" class="completed">${goal.is_completed == true ? "Desmarcar" : "Completar"}</button>
    <button type="button" class="btn-delete" id="${goal.id}">Delete</button>
    `
    listGo.append(newLi)
}

export { addLiTr, addLiGo }