import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDestination = () => {
  const { id } = useParams(); // Obtiene el ID del destino desde la URL
  const [post, setPost] = useState(null); // Estado para almacenar los datos del post
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Obtener datos del post
        const response = await axios.get(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error al cargar el destino:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Actualizar datos del post
      await axios.put(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts/${id}`,
        post
      );
      navigate("/dashboard"); // Redirige al Dashboard
    } catch (error) {
      console.error("Error al actualizar el destino:", error);
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container edit-post-page">
      <h1>Editar Destino</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          className="input-field"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Título"
          required
        />
        <input
          type="number"
          className="input-field"
          value={post.rating}
          onChange={(e) => setPost({ ...post, rating: e.target.value })}
          placeholder="Calificación (1-5)"
          min="1"
          max="5"
          required
        />
        <textarea
          className="textarea-field"
          value={post.review}
          onChange={(e) => setPost({ ...post, review: e.target.value })}
          placeholder="Reseña"
          required
        ></textarea>
        <input
          type="text"
          className="input-field"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
          placeholder="Ubicación"
          required
        />
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/dashboard")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditDestination;
