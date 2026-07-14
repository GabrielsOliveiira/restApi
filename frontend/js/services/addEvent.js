import { deleteGoal, deleteTransaction, updateGoal, checkToken } from "../api/api.js"
import { GoalUpdateEventDealer } from "../api/GoalUpdateEventDealer.js"
import { is_completed } from "./load.js"
import { loadMetasLabel, loadTransctionsLabel } from "./load.js"

const ulGo = document.getElementById("listGo")
const ulTr = document.getElementById("listTr")


function deleteDealer(resposta, li){
    if (resposta.status === 200) {
        li.remove()
    } else {
        throw ("Erro ao deletar a meta")
    }
}

async function addGoalDeleteEvent(token){
    const lisGo = ulGo.querySelectorAll("li")
    
    lisGo.forEach(li => {
        const button = li.querySelector(".btn-delete")
        button.addEventListener("click", async (event) => {
            await checkToken()
            const resposta = await deleteGoal(token, button.id)
            deleteDealer(resposta, li)
            loadMetasLabel()
        })
    })
}

async function addGoalUpdateEvent(token){
    const lisGo = ulGo.querySelectorAll("li")

    lisGo.forEach(li => {
        const button = li.querySelector(".completed")
        button.addEventListener("click", async (event) => {
            await checkToken()
            GoalUpdateEventDealer(token, button.id)
            is_completed(button.id)
        })
    })
}

async function addTrDeleteEvent(token){
    const lisTr = ulTr.querySelectorAll("li")
    
    lisTr.forEach(li => {
        const button = li.querySelector(".btn-delete")
        checkToken()
        button.addEventListener("click", async (event) => {
            const resposta = await deleteTransaction(token, button.id)
            deleteDealer(resposta, li)
            loadTransctionsLabel()
        })
    })
}


export { addGoalDeleteEvent, addTrDeleteEvent, addGoalUpdateEvent }