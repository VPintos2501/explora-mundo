import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/SideMenu.css";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Imagen por defecto de tu proyecto
  const defaultProfile = "/public/images/default-profile.png"; // Asegúrate de que esté en `public/images/`

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode); // Guarda preferencia en localStorage
  };

  // Redirigir al inicio después de cerrar sesión y desactivar modo oscuro
  const handleLogout = () => {
    // Limpia el modo oscuro
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("darkMode");

    // Ejecuta la función de logout
    onLogout();

    // Redirige al usuario a la página de inicio
    navigate("/");
  };

  return (
    <div className="side-menu">
      <button className="close-menu" onClick={onClose}>
        ✖
      </button>
      {/* Cabecera con información del usuario */}
      <div className="user-header">
        <img
          src={(user?.profile) || defaultProfile}
          alt="Perfil"
          className="profile-picture"
        />
        <p className="user-name">{user?.name}</p>
        <button
          className="edit-profile-btn"
          onClick={() => navigate("/profile")}
        >
          Editar Perfil
        </button>
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
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
