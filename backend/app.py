from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_caching import Cache
from flask_sqlalchemy import SQLAlchemy
from userAuth.auth import auth_routes, db
from userAdvice.advicePosts import advice_posts_bp
from userCommunity.community import community_bp

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///User.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "secretkey_set_later"

# Initialize extensions
CORS(app, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Import and register blueprints
from routes import main_routes
from userKids.kids import kid_routes
from userTag.tag import tag_bp

app.register_blueprint(main_routes)
app.register_blueprint(auth_routes)
app.register_blueprint(advice_posts_bp, url_prefix='/api')
app.register_blueprint(kid_routes, url_prefix='/api')
app.register_blueprint(tag_bp, url_prefix='/api')
app.register_blueprint(community_bp, url_prefix='/api')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)