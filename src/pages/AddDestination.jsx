import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDestination = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [location, setLocation] = useState("");
  const [visited, setVisited] = useState(false);
  const [image, setImage] = useState(null); // URL de la imagen subida
  const [isUploading, setIsUploading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "exploramundo");
      console.log([...formData]); // Verifica que el archivo y el preset estén presentes

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
        setImage(data.secure_url); // Guarda la URL de la imagen
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
      await fetch("https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/1/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          rating,
          review,
          location,
          visited,
          images: image, // Guarda la URL de Cloudinary
          createdAt: new Date().toISOString(),
        }),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al añadir el destino:", error);
    }
  };

  return (
    <div className="add-destination-container">
      <h1>Añadir Nuevo Destino</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Calificación (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <textarea
          placeholder="Reseña"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <label>
          Visitado:
          <input
            type="checkbox"
            checked={visited}
            onChange={(e) => setVisited(e.target.checked)}
          />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        {isUploading && <p>Subiendo imagen...</p>}
        {image && <img src={image} alt="Vista previa" style={{ width: "100px", marginTop: "10px" }} />}
        <button type="submit" className="btn" disabled={isUploading}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AddDestination;
