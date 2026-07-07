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

async function getUser(token) {
    const response = await fetch("http://127.0.0.1:5000/users", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    const text = await response.text();
    const objResponse = JSON.parse(text)

    return objResponse
}

async function getTransactions(token) {
    const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response
}

async function sendTransaction(token, transaction) {
    const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
    })
    return response
}

async function getGoal(token) {
    const response = await fetch("http://127.0.0.1:5000/goal", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    return response
}

async function createGoal(token, data) {
    if (!data["dead_line"]){
        const { dead_line, ...newData } = data
        data = newData
    }
    const response = await fetch("http://127.0.0.1:5000/goal", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
    return response
    }

async function createUser(name, email, senha) {
    const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, senha})
    })
    const text = await response.text();
    const objResponse = JSON.parse(text)
    return objResponse
}

export { sendApi, getTransactions, sendTransaction, getGoal, createGoal, getUser, createUser }