import { z } from "https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm";


function checkEmail(email){
    const emailSchema = z.string().email();
    let validarEmail = emailSchema.safeParse(email)
    if (!validarEmail.success){
            return validarEmail.error.issues[0]["message"]
        }
        return true
}
    
function checkSenha(senha){   
    const senhaSchema = z.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "Senha precisa de ao menos uma letra minúscula")
    .regex(/[A-Z]/, "Senha precisa de ao menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha precisa de pelo menos um número")

    let validarSenha = senhaSchema.safeParse(senha)
    if (!validarSenha.success){
            return validarSenha.error.issues[0]["message"]
        }
    return true
}

function validar(email, senha, showProblem=false)
{
    const emailChecked = checkEmail(email)
    const senhaChecked = checkSenha(senha)
    
    checkSenha(senha)
    if (showProblem == true){
        if (emailChecked != true){
            throw "Email inválido"
        }

        if (senhaChecked != true){
            throw senhaChecked
        }
    }

    if (!checkEmail(email) || checkSenha(senha) != true)
    {
        
        throw "Senha e/ou email incorretos"
    }
}

export { validar }