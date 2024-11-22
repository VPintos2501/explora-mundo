import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ isOpen, onClose, user, onLogout }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/images/default-profile.png"); // Imagen predeterminada

  // Redirigir al inicio después de cerrar sesión
  const handleLogout = useCallback(() => {
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
          setProfileImage(userData.profile || "/images/default-profile.png");
        } catch (error) {
          console.error("Error al obtener la imagen de perfil:", error);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="side-menu">
      <button className="close-button" onClick={onClose}>
        ✖
      </button>
      <div className="side-menu-header">
        <img src={profileImage} alt="Perfil" className="profile-image" />
        <p className="profile-name">{user?.name || "Usuario desconocido"}</p>
        <button
          className="dropdown-item"
          onClick={() => {
            navigate("/profile");
            onClose();
          }}
        >
          Editar Perfil
        </button>
      </div>
      <div className="side-menu-body">
        <button
          className="dropdown-item"
          onClick={() => {
            navigate("/dashboard");
            onClose();
          }}
        >
          Mi Dashboard
        </button>
        <button
          className="dropdown-item"
          onClick={() => {
            navigate("/blog");
            onClose();
          }}
        >
          Blog
        </button>
      </div>
      <div className="side-menu-footer">
        <button className="dropdown-item" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
