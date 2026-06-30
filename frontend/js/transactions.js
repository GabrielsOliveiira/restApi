import { getTransactions, getGoal } from "./api/api.js"
import { loadName } from "./ui/transactionsUI.js";
import { loadList } from "./funcs/funcList.js";

let token = localStorage.getItem("token")

getTransactions(token).then(async resposta => {
    const resTransaction = await resposta.text()
    const resTransactionObj = JSON.parse(resTransaction)

    loadName(resTransactionObj.Nome)
    loadList(resTransactionObj, "transaction")

});


getGoal(token).then(async (resposta) =>{
    const resGoal = await resposta.text()
    const resGoalObj = JSON.parse(resGoal)

    loadList(resGoalObj.goals, "goal")
})
