function validateTransaction(transaction) {
    const requiredFields = ["amount", "description", "type_of", "category"];

    for (const field of requiredFields) {
        if (!(field in transaction)) {
            throw new Error(`Falta o campo: ${field}`);
        }
    }

    if (isNaN(transaction.amount) || transaction.amount <= 0) {
        throw new Error("O valor deve ser um número positivo");
    }
    if (typeof transaction.description !== "string" || transaction.description.trim() === "") {
        throw new Error("Deve ter uma descrição");
    }
    if (typeof transaction.type_of !== "string" || transaction.type_of.trim() === "" || !["income", "expense"].includes(transaction.type_of)) {
        throw new Error("Tipo deve ser 'entrada' or 'saida'");
    }
    if (typeof transaction.category !== "string" || transaction.category.trim() === "" || !["food", "transportation", "entertainment", "utilities", "health", "other"].includes(transaction.category)) {
        throw new Error("categoria deve ser 'comida', 'transporte', 'intretenimento', 'utilidades', 'saúde', ou 'outro'");
    }  
}

export { validateTransaction };