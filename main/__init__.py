from flask import Flask
from flask_cors import CORS

from.config import Config   
from .extensions import db, migrate, jwt, limiter

def create_app():
    app = Flask(__name__)

    CORS(app, origins=["http://127.0.0.1:5500"])

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    limiter.init_app(app)

    from .routes.users import users_bp
    from .routes.auth import auth_bp
    from .routes.transaction import transaction_bp
    from .routes.dashboard import dashboard_bp
    from .routes.goal import goal_bp
    from .routes.export import export_bp
    from . import models

    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(transaction_bp)
    app.register_blueprint(goal_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(export_bp)

    return app