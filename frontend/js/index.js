const response = await fetch("http://127.0.0.1:5000/users", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})

const data = await response.json()

console.log(data)