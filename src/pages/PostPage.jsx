import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null); // Estado para el usuario que creó el post
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Obtén los datos del post
        const { data: postData } = await axios.get(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts/${id}`
        );

        // Obtén los datos del usuario que creó el post
        const { data: userData } = await axios.get(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${postData.userId}`
        );

        setPost(postData);
        setUser(userData);
      } catch (error) {
        console.error("Error al obtener los datos del post o usuario:", error);
      }
    };

    fetchPostData();
  }, [id]);

  if (!post || !user) {
    return <p>Cargando datos del post...</p>; // Mensaje de carga
  }

  return (
    <div className="post-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate("/blog")}>
          ← Volver al Blog
        </button>
        <h1 className="post-title">{post.title}</h1>
        <img
          src={post.images || "/default-image.png"}
          alt={post.title}
          className="post-image"
        />
        <div className="post-details">
          <p>
            <strong>Ubicación:</strong> {post.location}
          </p>
          <p>
            <strong>Calificación:</strong> {post.rating}/5
          </p>
          <p>
            <strong>Publicado por:</strong> {user.name || "Usuario desconocido"}
          </p>
          <p>
            <strong>Fecha de Publicación:</strong>{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="post-content">
            <p>{post.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
