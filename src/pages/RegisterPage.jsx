import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/registerPage.css";
import bcrypt from "bcryptjs";
import { AuthContext } from "../context/AuthContext";
import PasswordToggle from "../components/js/PasswordToggle"; // Importar el componente personalizado

const RegisterPage = () => {
  const [name, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await fetch(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        const newUser = await response.json();
        login(newUser);
        navigate("/");
      } else {
        setError("Hubo un problema al registrar el usuario.");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h1>Regístrate en ExploraMundo</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Componente PasswordToggle para contraseña */}
        <PasswordToggle
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Componente PasswordToggle para confirmar contraseña */}
        <PasswordToggle
          placeholder="Confirmar contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Registrarse
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RegisterPage;
