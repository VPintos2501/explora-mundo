import React, { useEffect, useState, useContext } from "react"; // Asegúrate de importar useContext
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Importa AuthContext

const MyPostPage = () => {
  const { id } = useParams(); // Obtiene el ID del post desde la URL
  const [post, setPost] = useState(null); // Estado para almacenar los datos del post
  const { user } = useContext(AuthContext); // Obtén el usuario autenticado
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
    if (!user) {
      console.error("Usuario no autenticado.");
      return;
    }
  
    try {
      console.log(`Intentando eliminar el post con ID: ${id}`);
      const deleteUrl = `https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/${user.id}/posts/${id}`; // Asegúrate de que esta ruta sea correcta
      console.log(`URL de eliminación: ${deleteUrl}`);
      await axios.delete(deleteUrl);
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
      <p>
        <strong>Ubicación:</strong> {post.location}
      </p>
      <p>
        <strong>Calificación:</strong> {post.rating}/5
      </p>
      <p>
        <strong>Reseña:</strong> {post.review}
      </p>
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
