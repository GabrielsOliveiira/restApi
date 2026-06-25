from main.models import Transaction
from datetime import datetime

from main.services.statistcs import last_transaction, show_by_expense_category, show_by_expense_date, show_by_income_category, show_by_income_date, total_expense, total_income, total_transactions

def dashboard_service(user_id):

    return {
        "total_income": total_income(user_id),
        "total_expense": total_expense(user_id),
        "total_transactions": total_transactions(user_id),
        "balance": total_income(user_id) - total_expense(user_id),
        "expense_by_category": show_by_expense_category(user_id),
        "income_by_category": show_by_income_category(user_id),
        "expense_this_month": show_by_expense_date(user_id, datetime.now().replace(day=1)),
        "income_this_month": show_by_income_date(user_id, datetime.now().replace(day=1)),
        "last_transactions": last_transaction(user_id, how_many=1)
    }