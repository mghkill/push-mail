from http import HTTPStatus
from flask import jsonify, request
from app.services.services_uploads import handle_upload, handle_error

def create_uploads():
    data = request.get_json()
    email = data.get('email')
    password_app = data.get('password_app')
    message = data.get('message')
    recipients = data.get('recipients')
    title1 = data.get('title1')
    title2 = data.get('title2')

    if email and password_app and message and recipients and title1 and title2:
        response_data = handle_upload(email, password_app, message, recipients, title1, title2)
        return jsonify(response_data), 200
    else:
        return jsonify({"message": "Faltam campos obrigatórios."}), 400
    
def read_all_uploads():
    return jsonify({}), 200

def update_all_uploads():
    pass

def delete_all_uploads():
    pass