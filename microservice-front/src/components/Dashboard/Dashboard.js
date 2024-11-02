import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const [passwordApp, setPasswordApp] = useState("");
  const [message, setMessage] = useState("");
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [response, setResponse] = useState({});
  const [sending, setSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [failedEmails, setFailedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [emailsInput, setEmailsInput] = useState("");
  const [emails, setEmails] = useState([]);
  const [pauseRequested, setPauseRequested] = useState(false);

  const chunkSize = 1;
  const intervalo = 10000;

  const handleStop = () => {
    setPauseRequested(true);

    window.location.reload();
  };

  const handleEmailsChange = (e) => {
    setEmailsInput(e.target.value);
    const emailArray = e.target.value
      .split(",") // Divide pelo separador vírgula
      .map((email) => email.trim()) // Remove espaços em branco
      .filter((email) => email.includes("@")); // Filtra entradas que parecem ser emails
    setEmails(emailArray);
  };

  const handleClick = async () => {
    setSending(true);
    setSentCount(0);
    setFailedEmails([]);
    setSentEmails([]);
    if (pauseRequested) {
      return;
    }
    try {
      if (pauseRequested) {
        return;
      }
      for (let i = 0; i < emails.length; i += chunkSize) {
        if (pauseRequested) {
          break;
        }

        const chunk = emails.slice(i, i + chunkSize);
        const promises = chunk.map((recipient) => {
          const data = {
            email,
            password_app: passwordApp,
            message,
            recipients: recipient,
            title1,
            title2,
          };

          return axios.post("http://127.0.0.1:5000/upload", data);
        });

        await Promise.all(promises);
        await new Promise((resolve) => setTimeout(resolve, intervalo));

        setSentCount((prevCount) => prevCount + chunkSize);
        setSentEmails((prevSentEmails) => [...prevSentEmails, ...chunk]);
      }

      setResponse({ message: "Envios concluídos com sucesso!" });
    } catch (error) {
      console.error(error);
      setFailedEmails((prevFailedEmails) => [
        ...prevFailedEmails,
        error.response.data.recipients,
      ]);
    } finally {
      setSending(false);
    }
  };

  console.log(emailsInput);
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <form>
        <label>
          Email remetente:
          <input
            placeholder="Este E-mail deve ser verificado em duas etapas para gerar a senha do app"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Senha do App:
          <input
            placeholder="Esta não é a senha do E-mail e sim a senha do App que é gerada no Gmail"
            type="password"
            value={passwordApp}
            onChange={(e) => setPasswordApp(e.target.value)}
          />
        </label>
        <br />
        <label>
          Emails (separados por vírgula):
          <textarea
            value={emailsInput}
            onChange={handleEmailsChange}
            placeholder="Digite os emails separados por vírgula"
            rows={4}
            style={{ width: "100%" }}
          />
        </label>
        <br />
        <label>
          Mensagem:
          <textarea
            placeholder="A mensagem pode ser HTML"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <br />
        <label>
          Assunto:
          <input
            type="text"
            placeholder="Assnto do E-mail"
            value={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
        </label>
        <br />
        <label>
          Nome de apresentação:
          <input
            placeholder="Este nome substitui o nome do E-mail"
            type="text"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleClick} disabled={sending}>
          Enviar
        </button>
        <h4 style={{ margin: "40px 0" }}>{response.message}</h4>

        {sending && (
          <div>
            <h6>Enviando...</h6>
            <h6 style={{ margin: "40px 0" }}>
              {sentCount}/{emails.length} emails enviados
            </h6>
          </div>
        )}
        <button
          style={{ backgroundColor: "red" }}
          type="button"
          onClick={handleStop}
        >
          Recarregar Página
        </button>
        {failedEmails.length > 0 && (
          <div>
            <p>Emails não enviados:</p>
            <ul>
              {failedEmails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        )}
        {sentEmails.length > 0 && (
          <textarea
            value={sentEmails
              .map((email, index) => `${index + 1}. ${email}`)
              .join("\n")}
            readOnly
            style={{ height: 200, width: "100%" }}
          />
        )}
      </form>
    </div>
  );
};

export default Dashboard;
