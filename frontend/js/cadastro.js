import { createUser } from "./api/api.js";
import { showErr } from "./ui/loginMessage.js";

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
        const user = await createUser(name.value, email.value, password.value);
        if (user.error){
            showErr(user.error);
        }
        if (user.token) {
            localStorage.setItem("token", user.token);
            window.location.href = "home.html";
        }
    } catch (error) {
        showErr(error);
    }
})

btnVoltar.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
})