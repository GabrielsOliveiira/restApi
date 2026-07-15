import { createUser } from "./api/api.js";
import { validar } from "./validations/validate_user.js"
import { showErr } from "./services/load.js";

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const btnSubmit = document.getElementById("btnSubmit");
const btnVoltar = document.getElementById("btnVoltar");

btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if (password.value !== confirmPassword.value) {
        alert("As senhas não coincidem!");
        return;
    }

    try{
        validar(email.value, password.value, true)
        const user = await createUser(name.value, email.value, password.value);
        if (user.error){
            showErr(user.error);
            return;
        }
        if (user.token) {
            localStorage.setItem("token", user.token);
            window.location.href = "home.html";
        }
    } catch (error) {
        showErr(error);
    }
})