import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/registerPage.css";
import bcrypt from "bcryptjs";
import { AuthContext } from "../context/AuthContext"; // Importar contexto de autenticación

const RegisterPage = () => {
  const [name, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error
  const { login } = useContext(AuthContext); // Obtener función de login del contexto
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      // Hasheamos la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Enviamos los datos del usuario a la API
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
            password: hashedPassword, // Guardamos la contraseña hasheada
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (response.ok) {
        const newUser = await response.json(); // Obtiene los datos del nuevo usuario
        login(newUser); // Actualiza el estado global con los datos del usuario
        navigate("/"); // Redirige a la landing
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
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
