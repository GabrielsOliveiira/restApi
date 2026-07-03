const email = document.getElementById("email");
const senha = document.getElementById("senha");



const btnSubmit = document.getElementById("btnSubmit")

function showErr(message){
    const err = document.getElementById("err");
    err.textContent = message
}

export  { showErr }

