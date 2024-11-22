import React from "react";

const LandingPage = () => {
  return (
    <div className="main-content">
      <h2>Bienvenido a ExploraMundo</h2>
      <p>
        ExploraMundo es una plataforma interactiva donde puedes compartir tus
        experiencias turísticas y descubrir destinos increíbles alrededor del
        mundo.
      </p>
      <p>
        Regístrate o inicia sesión para empezar a crear tus propios posts y
        explorar los de otros usuarios.
      </p>
      <button
        className="cta-button"
        onClick={() => (window.location.href = "/register")}
      >
        Regístrate Ahora
      </button>
    </div>
  );
};

export default LandingPage;
