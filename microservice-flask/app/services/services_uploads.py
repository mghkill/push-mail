import smtplib  
from email.mime.multipart import MIMEMultipart  
from email.mime.text import MIMEText  
from http import HTTPStatus  

def enviar_email(email, senha_app, mensagem, destinatarios, title1, title2):  
    corpo_email = mensagem  

    # Configurando a mensagem  
    msg = MIMEMultipart()  
    msg['Subject'] = title1  
    msg['From'] = title2 +"<{}>".format(email)  # Usar formato "No Responder <email>"  
    msg['To'] = destinatarios  
    msg.attach(MIMEText(corpo_email, 'html'))  # Anexando o conteúdo HTML  

    try:  
        # Conexão com o servidor SMTP  
        with smtplib.SMTP('smtp.gmail.com', 587) as s:  
            s.starttls()  # Inicia o TLS  

            # Login com as credenciais do remetente  
            s.login(email, senha_app)  

            # Enviando o e-mail  
            s.send_message(msg)  # Método mais simples para enviar a mensagem  
        print('Email enviado com sucesso!')  
    except Exception as e:  
        print(f'Erro ao enviar o e-mail: {e}')  
        raise e  # Levanta a exceção  

def handle_upload(email, senha_app, mensagem, destinatarios, title1, title2):  
    try:  
        enviar_email(email, senha_app, mensagem, destinatarios, title1, title2)  
        response_data = {"mensagem": "Email enviado com sucesso!"}  
        return response_data, HTTPStatus.OK  
    except Exception as e:  
        return handle_error(e)  

def handle_error(exception):  
    print(exception)  
    return {"message": "An error occurred", "error": str(exception)}, HTTPStatus.INTERNAL_SERVER_ERROR