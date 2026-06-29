import { validar } from "./validations.js";
import { sendApi } from "./api/api.js";
import { showErr } from "./ui/messages.js";

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

const btnSubmit = document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async (event) => {
    event.preventDefault();

    try{
        validar(email.value, senha.value)

        let respostaTexto = await sendApi(email.value, senha.value)
        let resposta = JSON.parse(respostaTexto)

        if (resposta.error){
            showErr(resposta.error)
        } else {
        localStorage.setItem("token", resposta.acess_token);
        window.location.href = "me.html";
        }

    } catch (error) {
        showErr(error)
    }
    

})


