from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.models.transaction import Transaction
from main.repositories.transaction_rep import validate_transaction
from main.services.transaction_service import add_transaction, del_transaction, get_transaction_, get_transactions_, put_transaction

transaction_bp = Blueprint("transactions", __name__, url_prefix="/transactions")

@transaction_bp.post("")
@jwt_required()
def create_transaction():
    data = request.get_json()
    user_id = get_jwt_identity()

    if not validate_transaction(data):
        return {"message": "Dados inválidos para a transação"}, 400

    return add_transaction(data, user_id)

@transaction_bp.get("")
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    return get_transactions_(user_id)

@transaction_bp.get("/<int:transaction_id>")
@jwt_required()
def get_transaction(transaction_id):
    user_id = get_jwt_identity()
    return get_transaction_(transaction_id, user_id)

@transaction_bp.put("/<int:transaction_id>")
@jwt_required()
def update_transaction(transaction_id):
    data = request.get_json()
    user_id = get_jwt_identity()

    return put_transaction(transaction_id, data, user_id)

@transaction_bp.delete("/<int:transaction_id>")
@jwt_required()
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()

    return del_transaction(transaction_id, user_id)