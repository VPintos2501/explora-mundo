import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/addDestination.css";

const AddDestination = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [location, setLocation] = useState("");
  const [visited, setVisited] = useState(false);
  const navigate = useNavigate();

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
          images,
          rating,
          review,
          location,
          visited,
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
          type="text"
          placeholder="URL de la Imagen"
          value={images}
          onChange={(e) => setImages(e.target.value)}
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
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
};

export default AddDestination;
