import React, { useState } from "react";
import "./Dashboard.css";

const DashBoard = () => {
  const [emailPrincipal, setEmailPrincipal] = useState("");
  const [senhaApp, setSenhaApp] = useState("");
  const [textoEmail, setTextoEmail] = useState("");
  const [listaEmails, setListaEmails] = useState("");

  const handleEmailPrincipalChange = (event) => {
    setEmailPrincipal(event.target.value);
  };

  const handleSenhaAppChange = (event) => {
    setSenhaApp(event.target.value);
  };

  const handleTextoEmailChange = (event) => {
    setTextoEmail(event.target.value);
  };

  const handleListaEmailsChange = (event) => {
    setListaEmails(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode fazer a requisição para enviar o email
    console.log("Email principal:", emailPrincipal);
    console.log("Senha app:", senhaApp);
    console.log("Texto do email:", textoEmail);
    console.log("Lista de emails:", listaEmails);
  };

  return (
    <div>
      <h1>DashBoard</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email principal:
          <input
            type="email"
            value={emailPrincipal}
            onChange={handleEmailPrincipalChange}
            placeholder="exemplo@email.com"
          />
        </label>
        <br />
        <label>
          Senha app:
          <input
            type="password"
            value={senhaApp}
            onChange={handleSenhaAppChange}
            placeholder="Digite sua senha"
          />
        </label>
        <br />
        <label>
          Texto do email:
          <textarea
            value={textoEmail}
            onChange={handleTextoEmailChange}
            placeholder="Digite o texto do email"
          />
        </label>
        <br />
        <label>
          Lista de emails (separados por ","):
          <textarea
            value={listaEmails}
            onChange={handleListaEmailsChange}
            placeholder="exemplo1@email.com, exemplo2@email.com"
          />
        </label>
        <br />
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default DashBoard;
