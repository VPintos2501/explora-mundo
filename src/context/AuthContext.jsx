import React, { createContext, useState } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario logueado

  const login = (userData) => {
    setUser(userData); // Actualiza el usuario
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
