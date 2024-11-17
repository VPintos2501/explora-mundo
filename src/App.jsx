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
import MyPostPage from "./pages/MyPostPage";
import BlogPage from "./pages/BlogPage";
import PostPage from "./pages/PostPAge";
import ProfilePage from "./pages/ProfilePage";

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
          <Route path="/my-post/:id" element={<MyPostPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
