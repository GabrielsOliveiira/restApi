import { getTransactions, getGoal, getUser, deleteGoal, deleteTransaction, logout, checkToken, exportExcel } from "./api/api.js"
import { addGoalDeleteEvent, addTrDeleteEvent, addGoalUpdateEvent } from "./services/addEvent.js";
import { loadName, loadSomaTr, loadSumGo } from "./services/load.js";
import { loadList } from "./ui/funcList.js";

let goalsLabel = document.getElementById("goalsLabel")
let transactionsLabel = document.getElementById("transactionsLabel")

let token = localStorage.getItem("token")

const ulGo = document.getElementById("listGo")
const ulTr = document.getElementById("listTr")
const left = document.getElementById("logout")
const hideTransacoes = document.getElementById("esconder-transacoes")
const hideMetas = document.getElementById("esconder-metas")
const exportExcelTr = document.getElementById("exportExcel")

let nome = await getUser(token)
loadName(`Bem vindo ${nome.name} !!!`)

checkToken()

getTransactions(token).then(async resposta => {
    const resTransaction = await resposta.text()
    const resTransactionObj = JSON.parse(resTransaction)

    if (resposta.status !== 200) {
        logout()
    }
    
    loadList(resTransactionObj, "transaction")
    addTrDeleteEvent(token)
    loadSomaTr()
});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    if (resposta.status !== 200) {
        logout()
    }

    loadList(resGoalObj.goals, "goal")
    addGoalDeleteEvent(token)
    addGoalUpdateEvent(token)
    loadSumGo()
})

left.addEventListener("click", (e) =>{
    logout()
})

hideTransacoes.addEventListener("click", (e) =>{
    hideTransacoes.textContent = hideTransacoes.textContent == "Esconder transações" ? "Mostrar transações" : "Esconder transações"
    const transactions = document.querySelectorAll(".transaction")
    transactions.forEach(element => {
        element.style.display = hideTransacoes.textContent == "Esconder transações" ? "block" : "none"
    });
})

hideMetas.addEventListener("click", (e) =>{
    hideMetas.textContent = hideMetas.textContent == "Esconder metas" ? "Mostrar metas" : "Esconder metas"
    const metas = document.querySelectorAll(".metas")
    metas.forEach(meta => {
        meta.style.display = hideMetas.textContent == "Esconder metas" ? "block" : "none"
    })
})

exportExcelTr.addEventListener("click", async (e) =>{
    const blob = await exportExcel(token)

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transacoes.xlsx";

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
})