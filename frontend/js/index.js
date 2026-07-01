import { validar } from "./validations/validations.js";
import { sendApi } from "./api/api.js";
import { showErr } from "./ui/loginMessage.js";

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
        window.location.href = "home.html";
        }

    } catch (error) {
        showErr(error)
    }
    

})


