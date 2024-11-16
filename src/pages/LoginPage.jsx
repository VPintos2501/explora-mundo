import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/loginPage.css"; // Importar el CSS específico

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error
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
        // Redirige al usuario a la página de inicio si las credenciales son válidas
        navigate("/inicio");
      } else {
        setError("Credenciales incorrectas. Intenta nuevamente."); // Muestra un mensaje de error
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
