from http import HTTPStatus
from flask import jsonify, request
from app.services.services_uploads import handle_upload, handle_error

def create_uploads():
    data = request.get_json()
    email = data.get('email')
    senha_app = data.get('senha_app')
    mensagem = data.get('mensagem')
    destinatarios = data.get('destinatarios')

    if email and senha_app and mensagem and destinatarios:
        response_data = handle_upload(email, senha_app, mensagem, destinatarios)
        return jsonify(response_data), 200
    else:
        return jsonify({"message": "Faltam campos obrigatórios."}), 400
    
    
def read_all_uploads():
    pass

def update_all_uploads():
    pass

def delete_all_uploads():
    pass