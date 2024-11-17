import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/blogPage.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todos los posts con datos de usuario
        const postsResponse = await fetch(
          "https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts"
        );
        const postsData = await postsResponse.json();

        const usersResponse = await fetch(
          "https://67391e4ea3a36b5a62edfb6e.mockapi.io/users"
        );
        const usersData = await usersResponse.json();

        // Asocia cada post con su usuario correspondiente
        const postsWithUsers = postsData.map((post) => {
          const user = usersData.find((u) => u.id === post.userId);
          return {
            ...post,
            userName: user?.name || "Usuario desconocido",
            userProfile: user?.profile || "/default-image.png", // Imagen por defecto
          };
        });

        setPosts(postsWithUsers); // Guarda los posts con información del usuario
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="blog-page-container">
      <h1>Destinos Turísticos</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => navigate(`/post/${post.id}`)}
          >
            <img src={post.images || "/default-image.png"} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.location}</p>
            <p>Calificación: {post.rating}/5</p>
            <p className="post-author">
              Publicado por: <strong>{post.userName}</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
