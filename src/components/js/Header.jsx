import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { AuthContext } from "../../context/AuthContext";
import SideMenu from "../js/SideMenu"; // Importamos el componente SideMenu

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna el estado del menú
  };

  return (
    <header className="header">
      {/* Botón de menú solo visible si el usuario está logueado */}
      {user && (
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      )}
      <div className="logo" onClick={() => navigate("/")}>
        ExploraMundo
      </div>
      <nav className="menu">
        {!user ? (
          <>
            <button className="menu-btn" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
            <button className="menu-btn" onClick={() => navigate("/register")}>
              Registrarse
            </button>
          </>
        ) : (
          <>
            <span className="welcome-text">Bienvenido, {user.name}!</span>
            <button className="menu-btn" onClick={() => navigate("/blog")}>
              Blog
            </button>
          </>
        )}
      </nav>
      {/* Componente SideMenu, solo aparece si el usuario está logueado */}
      {user && (
        <SideMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          user={user}
          onLogout={logout}
        />
      )}
    </header>
  );
};

export default Header;
