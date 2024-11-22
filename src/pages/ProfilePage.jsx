import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    biography: "",
    profile: "", // URL de la imagen
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del usuario al cargar la página
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        biography: user.biography || "",
        profile: user.profile || "/images/default-profile.png", // Imagen predeterminada
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "exploramundo");

      try {
        setIsUploading(true);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzkdatrkt/image/upload",
          formData
        );
        setFormData({ ...formData, profile: response.data.secure_url });
        setIsUploading(false);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}`,
        formData
      );
      setUser(response.data); // Actualizar el contexto con los nuevos datos
      alert("Perfil actualizado correctamente.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="container profile-page">
      <h1>Editar Perfil</h1>
      <form className="form profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="biography">Biografía</label>
          <textarea
            id="biography"
            name="biography"
            rows="4"
            value={formData.biography}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="profile">Foto de Perfil</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {isUploading && <p>Subiendo imagen...</p>}
          {formData.profile && (
            <img
              src={formData.profile}
              alt="Vista previa"
              className="preview-image"
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
