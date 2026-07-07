import { getTransactions, getGoal } from "./api/api.js"
import { loadName } from "./ui/transactionsUI.js";
import { loadList } from "./funcs/funcList.js";
import { getUser } from "./api/api.js";

let goalsLabel = document.getElementById("goalsLabel")
let transactionsLabel = document.getElementById("transactionsLabel")

let token = localStorage.getItem("token")

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
})