import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";
import { AuthContext } from "../context/AuthContext";
import PasswordToggle from "../components/js/PasswordToggle";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: users } = await axios.get(
        "https://67391e4ea3a36b5a62edfb6e.mockapi.io/users"
      );

      const user = users.find((u) => u.email === email);

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          login(user);
          navigate("/"); // Redirige a la landing
        } else {
          setError("Credenciales incorrectas. Intenta nuevamente.");
        }
      } else {
        setError("Credenciales incorrectas. Intenta nuevamente.");
      }
    } catch (error) {
      setError("Hubo un problema al intentar iniciar sesión.");
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="login-page">
      <h2>Inicia Sesión en ExploraMundo</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          className="input-field"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordToggle
          className="input-field"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="cta-button">
          Iniciar Sesión
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
