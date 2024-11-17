import React from "react";
import "../css/SideMenu.css";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen) return null;

  // Imagen por defecto de tu proyecto
  const defaultProfile = "/public/images/default-profile.png"; // Asegúrate de que esté en `public/`

  return (
    <div className="side-menu">
      <button className="close-menu" onClick={onClose}>
        ✖
      </button>
      <div className="user-info">
        {/* Siempre usa la imagen por defecto */}
        <img
          src={defaultProfile}
          alt="Perfil por defecto"
          className="profile-picture"
        />
        <p className="user-name">{user?.name}</p>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default SideMenu;
