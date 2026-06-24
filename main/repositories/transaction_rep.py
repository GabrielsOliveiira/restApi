def validate_transaction(transaction: dict) -> bool:
    required_fields = ["amount", "description", "type_of", "category"]

    for field in required_fields:
        if field not in transaction:
            return False
    
    if not isinstance(transaction["amount"], (int, float)) or transaction["amount"] <= 0:
        return False
    
    if not isinstance(transaction["description"], str) or not transaction["description"].strip():
        return False

    if not isinstance(transaction["type_of"], str) or not transaction["type_of"].strip() or transaction["type_of"] not in ["income", "expense"]:
        return False

    if not isinstance(transaction["category"], str) or not transaction["category"].strip() or transaction["category"] not in ["food", "transportation", "entertainment", "utilities", "health", "other"]:
        return False

    return True
