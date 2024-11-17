import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/myPostPage.css";

const MyPostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null); // Estado para almacenar los datos del post
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/1/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error al cargar el post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se carga el post
  }

  return (
    <div className="my-post-page-container">
      <form className="post-form">
        <div className="form-group">
          <label>Imagen</label>
          <img
            src={post.images || "/default-image.png"}
            alt={post.title}
            className="post-image"
          />
        </div>
        <div className="form-group">
          <label>Título</label>
          <input type="text" value={post.title} readOnly className="form-control" />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            value={post.location}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Calificación</label>
          <input
            type="text"
            value={`${post.rating}/5`}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Reseña</label>
          <textarea
            value={post.review}
            readOnly
            className="form-control"
            rows="6"
          ></textarea>
        </div>
        <div className="button-group">
          <button className="btn" onClick={() => navigate(`/edit-destination/${id}`)}>
            Editar
          </button>
          <button className="btn secondary" onClick={() => navigate("/dashboard")}>
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPostPage;
