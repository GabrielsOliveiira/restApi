const email = document.getElementById("email");
const senha = document.getElementById("senha");


const err = document.getElementById("err");

const btnSubmit = document.getElementById("btnSubmit")

function showErr(message){
    err.textContent = message
}

export  { showErr }

