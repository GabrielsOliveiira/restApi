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
    from . import models

    app.register_blueprint(users_bp)
    app.register_blueprint(auth_bp)

    return app