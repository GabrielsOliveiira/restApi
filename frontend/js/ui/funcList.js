import { addLiGo, addLiTr } from "../services/addList.js"
import { loadName, loadTransctionsLabel, loadMetasLabel } from "../services/load.js";

function loadList(list, type_of){
    for (let i = 0; i < list.length; i++) {
        type_of == "goal" ? addLiGo(list[i]) : addLiTr(list[i])
    }
    type_of == "goal" ? loadMetasLabel() : loadTransctionsLabel()
}

export { loadList }