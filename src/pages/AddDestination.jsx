import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddDestination = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "exploramundo");

      try {
        setIsUploading(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzkdatrkt/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setImage(data.secure_url);
        setIsUploading(false);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("No se encontró un usuario autenticado.");
      return;
    }

    try {
      await fetch("https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          rating,
          review,
          location,
          images: image,
          createdAt: new Date().toISOString(),
          userId: user.id,
        }),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al añadir el destino:", error);
    }
  };

  return (
    <main className="add-destination-page">
      <div className="container">
        <h1>Añadir Nuevo Destino</h1>
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="number"
            placeholder="Calificación (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
            className="input-field"
          />
          <textarea
            placeholder="Reseña"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="textarea-field"
          ></textarea>
          <input
            type="text"
            placeholder="Ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="input-field"
          />
          {isUploading && <p>Subiendo imagen...</p>}
          {image && (
            <img
              src={image}
              alt="Vista previa"
              className="preview-image"
            />
          )}
          <button type="submit" className="btn btn-primary" disabled={isUploading}>
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddDestination;
