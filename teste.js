let data = {
    "name": "name",
    "target_amount": 1000,
    "dead_line": ""
}

if (!data["dead_line"]) {
    const { dead_line, ...newData } = data
    data = newData
}

console.log(JSON.stringify(data))
