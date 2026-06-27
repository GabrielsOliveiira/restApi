from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt_identity
import os

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def rate_limit_key():

    try:
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
        
        if user_id:
            return f"User:{user_id}"
    except:
        pass

    return get_remote_address()

limiter = Limiter(
    key_func=rate_limit_key,
    storage_uri=os.getenv("REDIS_URL"),
    default_limits=[os.getenv("RATE_LIMIT")], 
    )