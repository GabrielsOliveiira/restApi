from main.models.transaction import Transaction
from main.extensions import db

def add_transaction(data, user_id):
    transaction = Transaction(
        user_id=int(user_id),
        amount=data["amount"],
        description=data["description"],
        type_of=data["type_of"],
        category=data["category"]
    )
    db.session.add(transaction)
    db.session.commit()
    return {"message": "Transação criada com sucesso", "transaction_id": transaction.id}, 201