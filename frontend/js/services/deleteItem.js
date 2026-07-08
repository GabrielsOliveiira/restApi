import { deleteGoal, deleteTransaction } from "../api/api.js"

const ulGo = document.getElementById("listGo")


function deleteDealer(resposta, li){
    if (resposta.status === 200) {
        li.remove()
    } else {
        throw ("Erro ao deletar a meta")
    }
}

async function addGoalDeleteEvent(token){
    const ulGo = document.getElementById("listGo")
    const lisGo = ulGo.querySelectorAll("li")

    lisGo.forEach(li => {
        const button = li.querySelector(".btn-delete")
        button.addEventListener("click", async (event) => {
            const resposta = await deleteGoal(token, button.id)
            deleteDealer(resposta, li)
        })
    })
}

async function addTrDeleteEvent(token){
    const ulTr = document.getElementById("listTr")
    const lisTr = ulTr.querySelectorAll("li")

    lisTr.forEach(li => {
        const button = li.querySelector(".btn-delete")
        button.addEventListener("click", async (event) => {
            const resposta = await deleteTransaction(token, button.id)
            deleteDealer(resposta, li) 
        })
    })
}

export { addGoalDeleteEvent, addTrDeleteEvent }