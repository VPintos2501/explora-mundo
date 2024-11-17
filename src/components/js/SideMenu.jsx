import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SideMenu.css";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Imagen por defecto de tu proyecto
  const defaultProfile = "/public/images/default-profile.png"; // Asegúrate de que esté en `public/`

  return (
    <div className="side-menu">
      <button className="close-menu" onClick={onClose}>
        ✖
      </button>
      <div className="user-info">
        <img
          src={defaultProfile}
          alt="Perfil"
          className="profile-picture"
        />
        <p className="user-name">{user?.name}</p>
      </div>
      <button className="menu-btn" onClick={() => navigate("/dashboard")}>
        Mi Dashboard
      </button>
      <button className="logout-btn" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default SideMenu;
