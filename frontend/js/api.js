async function sendApi(email, senha) {
    const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const text = await response.text();

    return text
}

export { sendApi }