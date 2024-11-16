import React from "react";
import "../css/inicio.css"; // Importar el CSS específico

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1>Bienvenido a ExploraMundo</h1>
      <p>
        ExploraMundo es un blog interactivo donde puedes descubrir y compartir
        tus experiencias de viaje. Aquí encontrarás:
      </p>
      <ul>
        <li>Historias fascinantes de viajeros de todo el mundo.</li>
        <li>La posibilidad de crear y gestionar tus propios posts.</li>
        <li>Inspiración para tu próxima aventura.</li>
      </ul>
      <p>¡Gracias por ser parte de nuestra comunidad!</p>
    </div>
  );
};

export default Inicio;
