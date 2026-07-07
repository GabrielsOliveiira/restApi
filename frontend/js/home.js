import { getTransactions, getGoal } from "./api/api.js"
import { loadName } from "./ui/transactionsUI.js";
import { loadList } from "./funcs/funcList.js";
import { getUser, deleteGoal, deleteTransaction } from "./api/api.js";

let goalsLabel = document.getElementById("goalsLabel")
let transactionsLabel = document.getElementById("transactionsLabel")

let token = localStorage.getItem("token")

const ulGo = document.getElementById("listGo")
const ulTr = document.getElementById("listTr")

if (!token) {
    window.location.href = "index.html"
}

getTransactions(token).then(async resposta => {
    const resTransaction = await resposta.text()
    const resTransactionObj = JSON.parse(resTransaction)

    if (resposta.status !== 200) {
        localStorage.removeItem("token")
        window.location.href = "index.html"
    }

    if (resTransactionObj.length > 0) {
        transactionsLabel.textContent = "Transações:"
    }
    
    let nome = await getUser(token)
    
    loadName(`Bem vindo ${nome.name} !!!`)
    loadList(resTransactionObj, "transaction")
});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    if (resposta.status !== 200) {
        localStorage.removeItem("token")
        window.location.href = "index.html"
    }

    if (resGoalObj.goals.length > 0) {
        goalsLabel.textContent = "Metas:"
    }
    loadList(resGoalObj.goals, "goal")
    await deleteItem()
})

async function deleteItem(){

    const lisGo = ulGo.querySelectorAll("li")

    lisGo.forEach(li => {
        const button = li.querySelector("button")

        button.addEventListener("click", async (event) => {
        const resposta = await deleteGoal(token, button.id)
        deleteDealer(resposta, li)
    })
    })
    
    const lisTr = ulTr.querySelectorAll("li")

    lisTr.forEach(li => {
        const button = li.querySelector("button")

        button.addEventListener("click", async (event) => {
        const resposta = await deleteTransaction(token, button.id)
        deleteDealer(resposta, li) 
        })
    })

    ulTr.addEventListener("click", async(event) => {
        const li = event.target.closest("li")
        if (!li){
            return
        }

        const resposta = await deleteTransaction(token, li.dataset.id)
        deleteDealer(resposta, li)
    })
}

function deleteDealer(resposta, li){
    if (resposta.status === 200) {
        li.remove()
    } else {
        throw ("Erro ao deletar a meta")
    }
}