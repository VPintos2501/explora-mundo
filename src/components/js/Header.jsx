import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <header className="header">
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
            <button className="menu-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </>
        )}
        <button className="menu-btn" onClick={() => navigate("/")}>
          Landing
        </button>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </nav>
    </header>
  );
};

export default Header;
