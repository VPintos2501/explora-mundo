import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editDestination.css";

const EditDestination = () => {
  const { id } = useParams();
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
        console.error("Error al cargar el destino:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/1/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al actualizar el destino:", error);
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="edit-destination-container">
      <h1>Editar Destino</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <input
          type="text"
          value={post.images}
          onChange={(e) => setPost({ ...post, images: e.target.value })}
        />
        <input
          type="number"
          value={post.rating}
          onChange={(e) => setPost({ ...post, rating: e.target.value })}
          min="1"
          max="5"
          required
        />
        <textarea
          value={post.review}
          onChange={(e) => setPost({ ...post, review: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          value={post.location}
          onChange={(e) => setPost({ ...post, location: e.target.value })}
          required
        />
        <label>
          Visitado:
          <input
            type="checkbox"
            checked={post.visited}
            onChange={(e) => setPost({ ...post, visited: e.target.checked })}
          />
        </label>
        <button type="submit" className="btn">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditDestination;
