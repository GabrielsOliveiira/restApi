from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt_identity

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def rate_limit_key():
    verify_jwt_in_request(optional=True)

    user_id = get_jwt_identity()
    
    if user_id:
        return f"User:{user_id}"

    return get_remote_address()

limiter = Limiter(key_func=rate_limit_key, storage_uri="redis://redis:6379", default_limits=["5 per minute"], )