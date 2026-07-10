import { getTransactions, getGoal, getUser, deleteGoal, deleteTransaction } from "./api/api.js"
import { addGoalDeleteEvent, addTrDeleteEvent, addGoalUpdateEvent } from "./services/addEvent.js";
import { loadName, loadTransctionsLabel } from "./services/load.js";
import { loadList } from "./ui/funcList.js";
import { loadMetasLabel } from "./services/load.js";

let goalsLabel = document.getElementById("goalsLabel")
let transactionsLabel = document.getElementById("transactionsLabel")

let token = localStorage.getItem("token")

const ulGo = document.getElementById("listGo")
const ulTr = document.getElementById("listTr")

let nome = await getUser(token)
loadName(`Bem vindo ${nome.name} !!!`)


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
    
    loadList(resTransactionObj, "transaction")
    loadTransctionsLabel()
    addTrDeleteEvent(token)
});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    if (resposta.status !== 200) {
        localStorage.removeItem("token")
        window.location.href = "index.html"
    }

    loadList(resGoalObj.goals, "goal")
    loadMetasLabel()
    addGoalDeleteEvent(token)
    addGoalUpdateEvent(token)
})