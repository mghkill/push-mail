import smtplib
from email.message import Message
from http import HTTPStatus

def enviar_email(email, senha_app, mensagem, destinatarios):
    corpo_email = mensagem

    # Configurando a mensagem
    msg = Message()
    msg['Subject'] = 'Email enviado com sucesso!'
    msg['From'] = email
    msg['To'] = destinatarios
    password = senha_app
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    try:
        # Conexão com o servidor SMTP
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()

        # Login com as credenciais do remetente
        s.login(msg['From'], password)

        # Enviando o e-mail
        s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
        print('Email enviado com sucesso!')
    except Exception as e:
        print(f'Erro ao enviar o e-mail: {e}')
    finally:
        s.quit()  # Fecha a conexão com o servidor

def handle_upload(email, senha_app, mensagem, destinatarios):
    try:
        enviar_email(email, senha_app, mensagem, destinatarios)
        response_data = {"mensagem": "Email enviado com sucesso!"}
        return response_data
    except Exception as e:
        return handle_error(e)
    
def handle_error(exception):
    print(exception)
    return {"message": "An error occurred", "error": str(exception)}, HTTPStatus.INTERNAL_SERVER_ERROR