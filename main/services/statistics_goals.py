from main.models.goal import Goal
from main.models.user import User
from .statistcs import total_income, total_expense


def porcentage_progress(goal_id, user_id):
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    user = User.query.filter_by(id=user_id).first()

    if not goal or not user:
        return 0
    
    balance = total_income(user_id) - total_expense(user_id)

    percentage = min((balance / goal.target_amount) * 100, 100) if goal.target_amount > 0 else 0

    return f"{round(percentage, 2)}%"

