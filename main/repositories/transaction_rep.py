def validate_transaction(transaction: dict) -> bool:
    required_fields = ["amount", "description", "type_of", "category"]

    for field in required_fields:
        if field not in transaction:
            raise ValueError(f"Missing required field: {field}")
    
    if not isinstance(transaction["amount"], (int, float)) or transaction["amount"] <= 0:
        raise ValueError("Amount must be a positive number.")
    
    if not isinstance(transaction["description"], str) or not transaction["description"].strip():
        raise ValueError("Description must be a non-empty string.")

    if not isinstance(transaction["type_of"], str) or not transaction["type_of"].strip() or transaction["type_of"] not in ["income", "expense"]:
        raise ValueError("Type_of must be either 'income' or 'expense'.")

    if not isinstance(transaction["category"], str) or not transaction["category"].strip() or transaction["category"] not in ["food", "transportation", "entertainment", "utilities", "health", "other"]:
        raise ValueError("Category must be a valid option.")

    return True
