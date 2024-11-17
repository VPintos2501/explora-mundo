import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SideMenu.css";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Imagen por defecto de tu proyecto
  const defaultProfile = "/images/default-profile.png"; // Asegúrate de que esté en `public/images/`

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode); // Guarda preferencia en localStorage
  };

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
      <div className="dark-mode-switch">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            defaultChecked={document.body.classList.contains("dark-mode")}
          />
          <span className="slider"></span>
        </label>
        <span>Modo Oscuro</span>
      </div>
      {/* Botón de Cerrar Sesión en el pie del menú */}
      <div className="menu-footer">
        <button className="logout-btn" onClick={onLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
