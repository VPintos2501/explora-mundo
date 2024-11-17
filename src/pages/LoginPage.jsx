import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginPage.css";
import bcrypt from "bcryptjs"; // Importar bcryptjs
import { AuthContext } from "../context/AuthContext";
import PasswordToggle from "../components/js/PasswordToggle"; // Importar el componente personalizado

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users`
      );
      const users = await response.json();

      // Buscar usuario por correo electrónico
      const user = users.find((u) => u.email === email);

      if (user) {
        // Verificar si la contraseña coincide con el hash almacenado
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          login(user); // Actualiza el estado global con los datos del usuario
          navigate("/"); // Redirige a la landing
        } else {
          setError("Credenciales incorrectas. Intenta nuevamente.");
        }
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
        {/* Componente PasswordToggle para manejar la contraseña */}
        <PasswordToggle
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
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
