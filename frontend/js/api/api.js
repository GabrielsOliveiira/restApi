async function sendApi(email, senha) {
    const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    if (response.status == 429){
        throw "Muitas requisições, tente novamente mais tarde"
    }
    
    const text = await response.text();

    return text
}

async function pageTransactions(token) {
    const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response
}

export { sendApi, pageTransactions }