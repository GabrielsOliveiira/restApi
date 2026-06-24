from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.models.transaction import Transaction
from main.services.transaction_service import add_transaction

transaction_bp = Blueprint("transactions", __name__, url_prefix="/transactions")

@transaction_bp.post("")
@jwt_required()
def create_transaction():
    data = request.get_json()
    user_id = get_jwt_identity()

    return add_transaction(data, user_id)

@transaction_bp.get("")
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    return {
        "transactions": [transaction.to_dict() for transaction in transactions]
    }, 200

@transaction_bp.get("/<int:transaction_id>")
@jwt_required()
def get_transaction(transaction_id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    return transaction.to_dict(), 200

@transaction_bp.put("/<int:transaction_id>")
@jwt_required()
def update_transaction(transaction_id):
    data = request.get_json()
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    transaction.description = data.get("description", transaction.description)
    transaction.amount = data.get("amount", transaction.amount)
    transaction.type_of = data.get("type_of", transaction.type_of)
    transaction.category = data.get("category", transaction.category)

    db.session.commit()

    return transaction.to_dict(), 200

@transaction_bp.delete("/<int:transaction_id>")
@jwt_required()
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return {"message": "Transaction not found"}, 404

    db.session.delete(transaction)
    db.session.commit()

    return {"message": "Transaction deleted successfully"}, 200