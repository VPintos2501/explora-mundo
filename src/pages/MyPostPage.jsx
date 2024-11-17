import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/myPostPage.css";
import { AuthContext } from "../context/AuthContext";

const MyPostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null); // Estado para almacenar los datos del post
  const { user } = useContext(AuthContext); // Usuario autenticado desde el contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(
            `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}/posts/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            setPost(data);
          } else {
            console.error("No se encontró el post o no tienes acceso.");
            navigate("/dashboard"); // Redirige si no se encuentra el post
          }
        }
      } catch (error) {
        console.error("Error al cargar el post:", error);
        navigate("/dashboard"); // Redirige en caso de error
      }
    };

    fetchPost();
  }, [id, user, navigate]);

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
          <button
            className="btn"
            type="button"
            onClick={() => navigate(`/edit-destination/${id}`)}
          >
            Editar
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyPostPage;
