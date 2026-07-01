import { getTransactions, getGoal } from "./api/api.js"
import { loadName } from "./ui/transactionsUI.js";
import { loadList } from "./funcs/funcList.js";
import { getUser } from "./api/api.js";

let token = localStorage.getItem("token")

getTransactions(token).then(async resposta => {
    const resTransaction = await resposta.text()
    const resTransactionObj = JSON.parse(resTransaction)

    let nome = await getUser(token)

    loadName(`Bem vindo ${nome.name} !!!`)
    loadList(resTransactionObj, "transaction")

});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    loadList(resGoalObj.goals, "goal")
})

const btnAddTr = document.getElementById("btnAddTr")
btnAddTr.addEventListener("click", () => {
    window.location.href = "addTransaction.html"
})