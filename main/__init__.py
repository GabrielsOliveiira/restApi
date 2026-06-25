from flask import Flask

from.config import Config   
from .extensions import db, migrate, jwt

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from .routes.users import users_bp
    from .routes.auth import auth_bp
    from .routes.transaction import transaction_bp
    from .routes.dashboard import dashboard_bp
    from .routes.goal import goal_bp
    from .routes.export_csv import csv_blueprint
    from .routes.export_excel import excel_bp
    from . import models

    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(transaction_bp)
    app.register_blueprint(goal_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(csv_blueprint)
    app.register_blueprint(excel_bp)

    return app