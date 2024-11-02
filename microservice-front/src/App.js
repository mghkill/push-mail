import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [response, setResponse] = useState({});

  const data = {
    "email": "filipexpert63@gmail.com",
    "password_app": "embkoekfyrwogroy",
    "message": "<html><body style='font-family: Arial, margin-top: '50px', sans-serif; background-color: #f4f4f4; color: #333;'><div style='max-width: 600px; margin: auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);'><h2 style='color: #4CAF50;'>Apresentamos o Novo Produto!</h2><p style='font-size: 18px;'>Estamos empolgados em apresentar <strong>Produto XYZ</strong>, a solução definitiva para suas necessidades!</p><p style='font-size: 16px;'>Com características inovadoras que incluem:</p><ul><li>Alta eficiência</li><li>Design moderno</li><li>Fácil de usar</li></ul><p style='text-align: center;'><a href='https://www.google.com/' style='background-color: #4CAF50; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px;'>Saiba Mais</a></p><p>Obrigado pela sua atenção!</p><p>Atenciosamente,<br>A Equipe</p></div></body></html>",
    "recipients": "operadorfilipe@gmail.com",
    "title1": "Não responda",
    "title2": "BB-Marcao2"
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', data);
      setResponse(response.data);
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        console.error('Erro de rede:', error);
        // Você pode adicionar um tratamento de erro mais detalhado aqui
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handleClick}>Enviar dados</button>
        <p>Resposta do servidor: {JSON.stringify(response)}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;