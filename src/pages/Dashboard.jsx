import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]); // Estado para almacenar los destinos
  const { user } = useContext(AuthContext); // Usuario autenticado desde el contexto
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(
            `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}/posts`
          );
          const data = await response.json();
          setPosts(data); // Asignar solo los posts del usuario autenticado
        }
      } catch (error) {
        console.error("Error al cargar los destinos:", error);
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      if (user && user.id) {
        await fetch(
          `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}/posts/${id}`,
          {
            method: "DELETE",
          }
        );
        setPosts(posts.filter((post) => post.id !== id)); // Actualiza la lista
      }
    } catch (error) {
      console.error("Error al eliminar el destino:", error);
    }
  };

  if (!user) {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>Mis Destinos Turísticos</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={post.images || "/default-image.png"} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.location}</p>
            <p>{post.review.substring(0, 100)}...</p>
            <button
              className="read-more-btn"
              onClick={() => navigate(`/my-post/${post.id}`)}
            >
              Ver más
            </button>
            <div className="post-card-footer">
              <button onClick={() => navigate(`/edit-destination/${post.id}`)}>
                Editar
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="delete-btn"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Botón flotante */}
      <button
        className="floating-btn"
        onClick={() => navigate("/add-destination")}
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;
