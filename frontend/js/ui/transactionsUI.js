const named = document.getElementById("name")
const list = document.getElementById("list")

function loadName(load){
    named.textContent = load
}

function addLi(transaction){
    const newLi = document.createElement("li");
    newLi.dataset.id = transaction.id
    newLi.innerHTML = `
    <p>${transaction.type_of == "expense" ? "Gasto" : "Receita"} de: ${transaction.amount}</p>
    <p>Categoria: ${transaction.category}</p>
    <p>Descrição: ${transaction.description}</p>
    `
    list.append(newLi)
}


export { loadName, addLi }