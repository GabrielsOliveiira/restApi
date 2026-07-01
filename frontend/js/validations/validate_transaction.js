function validateTransaction(transaction) {
    const requiredFields = ["amount", "description", "type_of", "category"];

    for (const field of requiredFields) {
        if (!(field in transaction)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (isNaN(transaction.amount) || transaction.amount <= 0) {
        throw new Error("Amount must be a positive number.");
    }
    if (typeof transaction.description !== "string" || transaction.description.trim() === "") {
        throw new Error("Description must be a non-empty string.");
    }
    if (typeof transaction.type_of !== "string" || transaction.type_of.trim() === "" || !["income", "expense"].includes(transaction.type_of)) {
        throw new Error("Type_of must be either 'income' or 'expense'.");
    }
    if (typeof transaction.category !== "string" || transaction.category.trim() === "" || !["food", "transportation", "entertainment", "utilities", "health", "other"].includes(transaction.category)) {
        throw new Error("Category must be 'food', 'transportation', 'entertainment', 'utilities', 'health', or 'other'.");
    }  
}

export { validateTransaction };