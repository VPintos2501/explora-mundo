import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MyPostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
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
        console.error("Error al cargar el post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts/${id}`
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="container my-post-page">
      <h1>{post.title}</h1>
      <img src={post.images || "/default-image.png"} alt={post.title} className="post-image" />
      <p><strong>Ubicación:</strong> {post.location}</p>
      <p><strong>Calificación:</strong> {post.rating}/5</p>
      <p><strong>Reseña:</strong> {post.review}</p>
      <div className="actions">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/edit-destination/${post.id}`)}
        >
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default MyPostPage;
