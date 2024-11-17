import React, { useState, useContext } from "react";
import "../css/profilePage.css";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext); // Obtener usuario y función para actualizarlo
  const [name, setName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(user?.profile || "");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "exploramundo"); // Reemplazar con tu upload preset

    try {
      setLoading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzkdatrkt/image/upload", // Reemplazar con tu Cloud Name
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setProfileImage(data.secure_url); // Actualiza la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    // Aquí deberías actualizar el usuario en la base de datos/mockAPI
    try {
      const response = await fetch(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            profile: profileImage,
          }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Actualiza el contexto con los datos del usuario modificado
        alert("Perfil actualizado exitosamente.");
      } else {
        alert("Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <div className="profile-page-container">
      <h1>Editar Perfil</h1>
      <div className="profile-form">
        <label htmlFor="profile-image" className="image-label">
          <img
            src={profileImage || "/public/images/default-profile.png"}
            alt="Foto de perfil"
            className="profile-image"
          />
          {loading ? <span>Cargando...</span> : <span>Cambiar Foto</span>}
        </label>
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button onClick={handleSave} className="save-btn">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
