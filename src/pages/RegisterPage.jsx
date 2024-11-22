import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Para manejar solicitudes a la API
import bcrypt from "bcryptjs"; // Para hashear la contraseña
import PasswordToggle from "../components/js/PasswordToggle"; // Importa el componente PasswordToggle
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el correo
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar contraseña
  const [error, setError] = useState(null); // Mensajes de error
  const { login } = useContext(AuthContext); // Contexto para manejar el estado global de autenticación
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hasheamos la contraseña

      const response = await axios.post(
        "https://67391e4ea3a36b5a62edfb6e.mockapi.io/users",
        {
          name,
          email,
          password: hashedPassword,
          createdAt: new Date().toISOString(),
          profile:
            "https://res.cloudinary.com/dzkdatrkt/image/upload/v1732076024/default-profile_lo0bpc.png", // Imagen de perfil predeterminada
        }
      );

      const newUser = response.data;
      login(newUser); // Inicia sesión automáticamente después del registro
      navigate("/"); // Redirige a la página principal
    } catch (error) {
      setError("Hubo un problema al registrar el usuario.");
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <div className="register-page">
      <h1>Regístrate en ExploraMundo</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <PasswordToggle
          placeholder="Contraseña"
          className="input-field"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordToggle
          placeholder="Confirmar contraseña"
          className="input-field"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
