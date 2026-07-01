import { sendTransaction } from "./api/api.js"
import { validateTransaction } from "./validations/validate_transaction.js"
import { showErr } from "./ui/loginMessage.js"

let token = localStorage.getItem("token")
const transaction = document.getElementById("btnSubmit")

console.log(typeof(parseFloat(document.getElementById("value").value)))


transaction.addEventListener("click", async (e) => {
    e.preventDefault()

    const newTransaction = {
        "amount": parseFloat(document.getElementById("value").value),
        "description": document.getElementById("description").value,
        "category": document.getElementById("category").value,
        "type_of": document.getElementById("type").value
    }

    try {
        validateTransaction(newTransaction)
        await sendTransaction(token, newTransaction)
        window.location.href = "home.html"
    } catch (error) {
        showErr(error.message)
    }

})