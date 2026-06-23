from flask import Flask
from .extensions import db, migrate

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///fincance.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    migrate.init_app(app, db)

    from .routes import homepage
    from . import models
    app.register_blueprint(homepage)

    return app