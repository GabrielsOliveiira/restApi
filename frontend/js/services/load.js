function loadName(load){
    const named = document.getElementById("name")
    named.textContent = load
}

function showErr(message){
    const err = document.getElementById("err");
    err.textContent = message
}

export  { showErr, loadName }

