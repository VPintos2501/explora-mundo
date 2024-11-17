import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/postPage.css";

const PostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null);
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
    return <p>Cargando...</p>;
  }

  return (
    <div className="post-page-container">
      <div className="post-content">
        <img src={post.images || "/default-image.png"} alt={post.title} />
        <h1>{post.title}</h1>
        <p><strong>Ubicación:</strong> {post.location}</p>
        <p><strong>Calificación:</strong> {post.rating}/5</p>
        <p>{post.review}</p>
        <p><strong>Publicado por:</strong> {post.userName || "Anónimo"}</p>
        <button className="btn" onClick={() => navigate("/blog")}>Volver</button>
      </div>
    </div>
  );
};

export default PostPage;
