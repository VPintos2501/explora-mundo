import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/postPage.css";

const PostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null); // Estado para almacenar el post
  const [author, setAuthor] = useState(null); // Estado para almacenar el usuario
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        // Cargar el post
        const postResponse = await fetch(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts/${id}`
        );
        const postData = await postResponse.json();
        setPost(postData);

        // Cargar el usuario asociado al post
        if (postData.userId) {
          const userResponse = await fetch(
            `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${postData.userId}`
          );
          const userData = await userResponse.json();
          setAuthor(userData.name || "Usuario desconocido");
        } else {
          setAuthor("Usuario desconocido");
        }
      } catch (error) {
        console.error("Error al cargar el post o el usuario:", error);
      }
    };

    fetchPostAndUser();
  }, [id]);

  if (!post) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="post-page-container">
      <div className="post-content">
        <img src={post.images || "/default-image.png"} alt={post.title} />
        <h1>{post.title}</h1>
        <p>
          <strong>Ubicación:</strong> {post.location}
        </p>
        <p>
          <strong>Calificación:</strong> {post.rating}/5
        </p>
        <p>{post.review}</p>
        <p>
          <strong>Publicado por:</strong> {author}
        </p>
        <button className="btn" onClick={() => navigate("/blog")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default PostPage;
