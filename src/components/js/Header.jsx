import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SideMenu from "../js/SideMenu";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Botón de menú para usuarios logueados */}
      {user && (
        <button
          className="nav-button"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      )}
      {/* Logo redirige a la landing */}
      <div className="logo" onClick={() => navigate("/")}>
        ExploraMundo
      </div>
      <nav className="nav">
        {!user ? (
          <>
            <button
              className="nav-button"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
            <button
              className="nav-button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </>
        ) : (
          <>
            <button
              className="nav-button"
              onClick={() => navigate("/blog")}
            >
              Blog
            </button>
          </>
        )}
      </nav>
      {/* Menú lateral desplegable */}
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
