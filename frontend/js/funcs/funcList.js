import { addLi } from "../ui/transactionsUI.js"

function loadList(list){
    for (let i = 0; i < list.length; i++) {
        addLi(list[i])
    }
}

export { loadList }