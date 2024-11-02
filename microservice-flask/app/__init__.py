from flask import Flask
from flask_cors import CORS
from app import routes

def create_app():
    app = Flask(__name__)
    CORS(app)  # Adicione essa linha para configurar o CORS
    routes.init_app(app)
    return app