from main.models.transaction import Transaction
from main.extensions import db

def save_transaction(transaction, type_of="add"):
    if type_of == "add":
        db.session.add(transaction)
    elif type_of == "update":
        db.session.merge(transaction)
    elif type_of == "delete":
        db.session.delete(transaction)
    db.session.commit()

def add_transaction(data, user_id):
    transaction = Transaction(
        user_id=int(user_id),
        amount=data["amount"],
        description=data["description"],
        type_of=data["type_of"],
        category=data["category"]
    )
    save_transaction(transaction)
    return {"message": "Transação criada com sucesso", "transaction_id": transaction.id}, 201

def put_transaction(transaction_id, data, user_id):

    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    transaction.description = data.get("description", transaction.description)
    transaction.amount = data.get("amount", transaction.amount)
    transaction.type_of = data.get("type_of", transaction.type_of)
    transaction.category = data.get("category", transaction.category)

    save_transaction(transaction)

    return transaction.to_dict(), 200

def del_transaction(transaction_id, user_id):
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    save_transaction(transaction, type_of="delete")

    return {"message": "Transaction deleted successfully"}, 200

def get_transaction_(transaction_id, user_id):
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    return transaction.to_dict(), 200

def get_transactions_(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return [transaction.to_dict() for transaction in transactions], 200