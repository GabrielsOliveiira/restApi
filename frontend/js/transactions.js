import { pageTransactions } from "./api/api.js";
import { loadName } from "./ui/transactionsUI.js";
import { loadList } from "./funcs/funcList.js";


pageTransactions(localStorage.getItem("token")).then(async resposta => {
    const respostaTexto = await resposta.text()
    const respostaObj = JSON.parse(respostaTexto)

    loadList(respostaObj)
    loadName(respostaObj.Nome)

});

