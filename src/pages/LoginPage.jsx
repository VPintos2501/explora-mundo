import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginPage.css";
import { AuthContext } from "../context/AuthContext"; // Importar contexto de autenticación

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error
  const { login } = useContext(AuthContext); // Obtener función de login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      const response = await fetch(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users`
      );
      const users = await response.json();

      // Verifica si el usuario existe con las credenciales proporcionadas
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login(user); // Actualiza el estado global con los datos del usuario
        navigate("/"); // Redirige a la landing
      } else {
        setError("Credenciales incorrectas. Intenta nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema al intentar iniciar sesión.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h1>Inicia Sesión en ExploraMundo</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
