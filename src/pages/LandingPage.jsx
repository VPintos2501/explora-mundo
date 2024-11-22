import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario autenticado
  const navigate = useNavigate();

  const handleRegisterOrDashboard = () => {
    if (user) {
      navigate("/dashboard"); // Redirige al Dashboard si el usuario está logueado
    } else {
      navigate("/register"); // Redirige al Registro si no está logueado
    }
  };

  return (
    <div className="landing-page">
      {/* Sección de Bienvenida */}
      <section className="section welcome-section">
        <h1>Bienvenido a ExploraMundo</h1>
        <p>
          La plataforma donde los amantes de los viajes pueden compartir sus experiencias y descubrir destinos increíbles.
        </p>
        <button onClick={handleRegisterOrDashboard} className="cta-button">
          {user ? "Ir al Dashboard" : "Regístrate Ahora"}
        </button>
      </section>

      {/* Sección de Introducción */}
      <section className="section intro-section">
        <h2>¿Qué es ExploraMundo?</h2>
        <p>
          ExploraMundo es una comunidad creada para viajeros de todo el mundo. Aquí puedes publicar tus experiencias turísticas y encontrar inspiración para tus próximas aventuras.
        </p>
      </section>

      {/* Sección de Objetivo */}
      <section className="section target-section">
        <h2>¿A quién ayudamos?</h2>
        <p>
          Ayudamos a turistas, bloggers y entusiastas de los viajes a conectar con otros viajeros, compartir sus historias y descubrir nuevos destinos.
        </p>
      </section>

      {/* Sección de Ofrecemos */}
      <section className="section offer-section">
        <h2>¿Qué ofrecemos?</h2>
        <ul>
          <li>Publica tus experiencias de viaje.</li>
          <li>Explora destinos compartidos por otros usuarios.</li>
          <li>Conéctate con una comunidad global de viajeros.</li>
        </ul>
      </section>

      {/* Sección de Contáctenos */}
      <section className="section contact-section">
        <h2>Contáctanos</h2>
        <p>Si tienes preguntas o comentarios, no dudes en escribirnos:</p>
        <p>
          <a href="mailto:contacto@exploramundo.com" className="contact-link">
            contacto@exploramundo.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
