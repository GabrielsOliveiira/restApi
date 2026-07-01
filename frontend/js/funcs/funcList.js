import { addLiGo, addLiTr } from "../ui/transactionsUI.js"

function loadList(list, type_of){
    for (let i = 0; i < list.length; i++) {
        type_of == "goal" ? addLiGo(list[i]) : addLiTr(list[i])
    }
}

export { loadList }