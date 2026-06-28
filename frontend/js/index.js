import { validar } from "./validations.js";
import { sendApi } from "./api.js";

// async function buscarUsuarios() {
//     const response = await fetch("http://127.0.0.1:5000/users", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });

//     const usuarios = await response.json();

//     console.log(usuarios);
//     console.log(usuarios[0]);
//     console.log(usuarios[0]["name"]);

//     const nome = document.getElementById("nome");
    
//     nome.textContent = usuarios[0]["name"]

//     return usuarios
// }

// buscarUsuarios();


const email = document.getElementById("email");
const senha = document.getElementById("senha");


const err = document.getElementById("err");

const btnSubmit = document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();

    try{
        validar(email.value, senha.value)
        let reposta = sendApi(email.value, senha.value).then(resposta => {
            console.log(resposta)
        })
    } catch (error) {
        err.textContent = error
        console.log(error)
    }
    

})


