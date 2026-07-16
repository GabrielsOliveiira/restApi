function data_pt_en(data){
    let newData = data.split("/")
    return `${newData[2]}-${newData[1]}-${newData[0]}`
}

function mesesFaltando(data1, data2){
    const inicio =  new Date(data_pt_en(data1))
    const fim =  new Date(data_pt_en(data2))
    const diff = fim - inicio
    return Math.floor(diff /(1000 * 60 * 60 * 30 * 24))
}

function acharObjCondicional(obj){
    return obj.reduce((total, item) => item.type_of == "income" ? total + item.amount : total - item.amount, 0)
}

export { mesesFaltando, acharObjCondicional }