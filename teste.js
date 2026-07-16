// let data = {
//     "name": "name",
//     "target_amount": true,
//     "dead_line": ""
// }

// let res = {...data, target_amount: !data.target_amount}




// console.log(data.length)

// function data_pt_en(data){
//     let newData = data.split("/")
//     return `${newData[2]}-${newData[1]}-${newData[0]}`
// }

// function mesesFaltando(data1, data2){
//     const inicio =  new Date(data_pt_en(data1))
//     const fim =  new Date(data_pt_en(data2))
//     const diff = fim - inicio
//     return Math.floor(diff /(1000 * 60 * 60 * 30 * 24))
// }


// console.log(mesesFaltando("16/07/2026", "16/12/2027"))


let list = [{"criatura": "vampiro", "vida": 1000}, {"criatura": "zumbi","vida": 250}]

let resultado = list.reduce((total, item) => total + item.vida, 0)


console.log(`Vidas somadas: ${resultado}`)