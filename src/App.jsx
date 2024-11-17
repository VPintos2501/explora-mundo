import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Importar AuthProvider
import Header from "./components/js/Header";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AddDestination from "./pages/AddDestination";
import EditDestination from "./pages/EditDestination";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Incluir Header en toda la aplicación */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-destination" element={<AddDestination />} />
          <Route path="/edit-destination/:id" element={<EditDestination />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
