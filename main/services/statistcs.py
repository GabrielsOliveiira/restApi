from main.models import Transaction

def show_by_expense_date(user_id, start_date):
    transactions = Transaction.query.filter_by(user_id=user_id).filter(Transaction.created_at >= start_date).all()
    return sum(t.amount for t in transactions if t.type_of == "expense")

def show_by_income_date(user_id, start_date):
    transactions = Transaction.query.filter_by(user_id=user_id).filter(Transaction.created_at >= start_date).all()
    return sum(t.amount for t in transactions if t.type_of == "income")

def show_by_expense_category(user_id) -> dict:
    
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    category_totals = {}

    for t in transactions:
        if t.type_of == "expense":
            category = t.category
            if category in category_totals:
                category_totals[category] += t.amount
            else:
                category_totals[category] = t.amount

    return category_totals

def show_by_income_category(user_id) -> dict:
    
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    category_totals = {}

    for t in transactions:
        if t.type_of == "income":
            category = t.category
            if category in category_totals:
                category_totals[category] += t.amount
            else:
                category_totals[category] = t.amount

    return category_totals

def total_expense(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    return sum(t.amount for t in transactions if t.type_of == "expense")

def total_income(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    return sum(t.amount for t in transactions if t.type_of == "income")

def total_transactions(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    return len(transactions)

def last_transaction(user_id, how_many=1):
    transactions = Transaction.query.filter_by(user_id=user_id).order_by(Transaction.created_at.desc()).limit(how_many).all()

    if transactions:
        return {
            "transactions": [t.to_dict() for t in transactions],
            "count": len(transactions)
        }
    else:
        return None