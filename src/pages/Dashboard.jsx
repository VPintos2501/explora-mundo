import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = React.useContext(AuthContext); // Contexto para el usuario autenticado
  const [posts, setPosts] = useState([]); // Estado para los posts
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        // Obtener los posts solo del usuario autenticado
        const response = await axios.get(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts?userId=${user.id}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return <p className="error-message">Debes iniciar sesión para ver esta página.</p>;
  }

  return (
    <div className="dashboard">
      <h1>Mis Destinos Turísticos</h1>
      <div className="posts-list">
        {posts.length === 0 ? (
          <p>No tienes destinos registrados. ¡Añade uno nuevo!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/my-post/${post.id}`)} // Navega a MyPostPage
              style={{ cursor: "pointer" }} // Añadir puntero
            >
              <img src={post.images || "/default-image.png"} alt={post.title} />
              <div className="post-details">
                <h3>{post.title}</h3>
                <p>{post.location}</p>
                <span>{post.rating}/5</span>
              </div>
            </div>
          ))
        )}
      </div>
      <button
        className="add-button"
        onClick={() => navigate("/add-destination")}
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;
