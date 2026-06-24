from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from main.extensions import db
from main.models.transaction import Transaction

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.get("")
@jwt_required()
def get_dashboard():
    user_id = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).all()               

    total_income = sum(t.amount for t in transactions if t.type_of == "income")
    total_expense = sum(t.amount for t in transactions if t.type_of == "expense")
    
    balance = total_income - total_expense

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "total_transactions": len(transactions),
        "balance": balance,
        "expense with food": sum(t.amount for t in transactions if t.type_of == "expense" and t.category == "food"),
        "expense with transport": sum(t.amount for t in transactions if t.type_of == "expense" and t.category == "transport")
    }