import { getTransactions, getGoal, getUser, deleteGoal, deleteTransaction, logout, checkToken } from "./api/api.js"
import { addGoalDeleteEvent, addTrDeleteEvent, addGoalUpdateEvent } from "./services/addEvent.js";
import { loadName, loadSomaTr } from "./services/load.js";
import { loadList } from "./ui/funcList.js";
import { acharObjCondicional } from "./utils/utils.js";

let goalsLabel = document.getElementById("goalsLabel")
let transactionsLabel = document.getElementById("transactionsLabel")

let token = localStorage.getItem("token")

const ulGo = document.getElementById("listGo")
const ulTr = document.getElementById("listTr")
const left = document.getElementById("logout")

let nome = await getUser(token)
loadName(`Bem vindo ${nome.name} !!!`)

checkToken()

getTransactions(token).then(async resposta => {
    const resTransaction = await resposta.text()
    const resTransactionObj = JSON.parse(resTransaction)

    if (resposta.status !== 200) {
        localStorage.removeItem("token")
        window.location.href = "index.html"
    }
    
    loadList(resTransactionObj, "transaction")
    addTrDeleteEvent(token)
    loadSomaTr(acharObjCondicional(resTransactionObj))
});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    if (resposta.status !== 200) {
        logout("index.html")
    }

    loadList(resGoalObj.goals, "goal")
    addGoalDeleteEvent(token)
    addGoalUpdateEvent(token)
})

left.addEventListener("click", (e) =>{
    logout("index.html")
})