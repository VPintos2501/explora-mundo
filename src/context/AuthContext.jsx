import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Carga los datos del usuario desde Local Storage al inicializar
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData); // Actualiza el estado
    localStorage.setItem("user", JSON.stringify(userData)); // Guarda en Local Storage
  };

  const logout = () => {
    setUser(null); // Limpia el estado
    localStorage.removeItem("user"); // Elimina del Local Storage
  };

  // Carga los datos del usuario desde Local Storage al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
