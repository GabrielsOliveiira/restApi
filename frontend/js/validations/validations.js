import { z } from "https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm";


function checkEmail(email){
    const emailSchema = z.string().email();
    if (emailSchema.safeParse(email).success){
            return true
        }
        return false
}
    
function checkSenha(senha){   
    const senhaSchema = z.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "Precisa de ao menos uma letra minúscula")
    .regex(/[A-Z]/, "Precisa de ao meno uma letra maiúscula")
    .regex(/[0-9]/, "Precisa de pelo menos um número")

    let validarSenha = senhaSchema.safeParse(senha)
    if (!validarSenha.success){
            return validarSenha.error.issues[0]["message"]
        }
    return true
}

function validar(email, senha)
{
    if (!checkEmail(email))
    {
        throw "Email inválido"
    }

    let resultSenha = checkSenha(senha)

    if (resultSenha != true)
       {
        throw resultSenha
       }
}

export { validar }