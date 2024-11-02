from flask import Flask
from app.routes.routes_uploads import bp as bp_uploads


def init_app(app: Flask):
   
    app.register_blueprint(bp_uploads)