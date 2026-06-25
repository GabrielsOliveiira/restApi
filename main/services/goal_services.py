from main import db
from main.models.goal import Goal
from main.services.statistics_goals import porcentage_progress

def save_goal(goal, type="add"):
    if type == "add":
        db.session.add(goal)
    elif type == "delete":
        db.session.delete(goal)
    else:
        db.session.merge(goal)
    db.session.commit()

def goal_service(user_id):
    goals = [goal.to_dict() for goal in db.session.query(Goal).filter_by(user_id=user_id).all()]
    return {"goals": goals}

def get_goal_by_id_service(user_id, goal_id):
    goal = db.session.query(Goal).filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return {"message": "Goal not found"}, 404

    return goal.to_dict()

def create_goal_service(user_id, data):
    goal = Goal(
        name=data["name"],
        target_amount=data["target_amount"],
        dead_line=data.get("dead_line"),
        user_id=user_id
    )
    save_goal(goal)
    return {"message": "Goal created successfully"}

def update_goal_service(user_id, goal_id, data):
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return {"message": "Goal not found"}, 404
    
    goal.name = data.get("name", goal.name)
    goal.target_amount = data.get("target_amount", goal.target_amount)
    goal.dead_line = data.get("dead_line", goal.dead_line)
    goal.is_completed = data.get("is_completed", goal.is_completed)

    save_goal(goal, type="update")

    return {"message": "Goal updated successfully"}

def delete_goal_service(user_id, goal_id):
    goal = Goal.query.filter_by(id=goal_id, user_id=user_id).first()
    if not goal:
        return {"message": "Goal not found"}, 404
    
    save_goal(goal, type="delete")

    return {"message": "Goal deleted successfully"}

def get_goal_details_service(user_id, goal_id):
    
    return {
        "progress": porcentage_progress(goal_id, user_id),
    }