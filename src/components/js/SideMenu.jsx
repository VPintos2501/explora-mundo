import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/SideMenu.css";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/public/images/default-profile.png"); // Imagen predeterminada

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = useCallback(() => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDarkMode); // Guarda preferencia en localStorage
  }, []);

  // Aplicar el modo oscuro al cargar la página si está activado en localStorage
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode === "true") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  // Redirigir al inicio después de cerrar sesión y desactivar modo oscuro
  const handleLogout = useCallback(() => {
    document.body.classList.remove("dark-mode");
    localStorage.removeItem("darkMode");
    onLogout();
    navigate("/");
  }, [onLogout, navigate]);

  // Verificar imagen de perfil en la API
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user?.id) {
        try {
          const response = await fetch(
            `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}`
          );
          const userData = await response.json();
          if (userData.profile && userData.profile.includes("cloudinary")) {
            setProfileImage(userData.profile); // Usa la imagen de Cloudinary
          } else {
            setProfileImage("/public/images/default-profile.png"); // Imagen predeterminada
          }
        } catch (error) {
          console.error("Error al obtener la imagen de perfil:", error);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  // Renderizar null si `isOpen` es false
  if (!isOpen) {
    return null;
  }

  return (
    <div className="side-menu">
      <button className="close-menu" onClick={onClose}>
        ✖
      </button>
      {/* Cabecera con información del usuario */}
      <div className="user-header">
        <img
          src={profileImage}
          alt="Perfil"
          className="profile-picture"
        />
        <p className="user-name">{user?.name || "Usuario desconocido"}</p>
        <button
          className="edit-profile-btn"
          onClick={() => navigate("/profile")}
        >
          Editar Perfil
        </button>
      </div>
      {/* Navegación */}
      <button className="menu-btn" onClick={() => navigate("/dashboard")}>
        Mi Dashboard
      </button>
      <button className="menu-btn" onClick={() => navigate("/blog")}>
        Blog
      </button>
      {/* Switch de Modo Oscuro */}
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
