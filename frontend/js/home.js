import { getTransactions, getGoal, getUser, deleteGoal, deleteTransaction } from "./api/api.js"
import { addGoalDeleteEvent, addTrDeleteEvent } from "./services/deleteItem.js";
import { loadName } from "./services/load.js";
import { loadList } from "./ui/funcList.js";

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
    addTrDeleteEvent(token)
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
    addGoalDeleteEvent(token)
    
})