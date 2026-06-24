from main.extensions import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), nullable=False)

    password = db.Column(db.String(255), nullable=False)

    transactions = db.relationship("Transaction", backref="user", lazy=True, cascade="all, delete-orphan")