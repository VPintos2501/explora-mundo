import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/landingPage.css"; // Importar el CSS específico

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Bienvenidos a nuestro Blog de Turismo</h1>
      <p>Descubre y comparte experiencias de viajes por todo el mundo.</p>
      <div className="button-container">
        <button className="btn" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
        <button className="btn" onClick={() => navigate("/register")}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
