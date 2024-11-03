import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [timeExpired, setTimeExpired] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Define a data e hora-alvo para expiração (3 de novembro de 2024, às 12h15)
    const targetDate = new Date("2024-11-04T12:27:00");

    // Configura um intervalo para verificar a data atual a cada segundo
    const interval = setInterval(() => {
      const currentDate = new Date();

      // Verifica se a data atual já passou da data-alvo
      if (currentDate <= targetDate) {
        setTimeExpired(false);
        setAllowed(true);
        clearInterval(interval); // Para o intervalo após a expiração
      }
    }, 1000);

    // Limpa o intervalo se o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {timeExpired && <h1>O tempo acabou.</h1>}
        {allowed && <Dashboard />}
      </header>
    </div>
  );
}

export default App;
