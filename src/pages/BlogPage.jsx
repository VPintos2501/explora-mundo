import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtiene los posts
        const { data: postsData } = await axios.get(
          "https://67391e4ea3a36b5a62edfb6e.mockapi.io/posts"
        );

        // Obtiene los usuarios
        const { data: usersData } = await axios.get(
          "https://67391e4ea3a36b5a62edfb6e.mockapi.io/users"
        );

        // Mapea el nombre del usuario en cada post
        const postsWithUsers = postsData.map((post) => {
          const user = usersData.find((u) => u.id === post.userId);
          return {
            ...post,
            userName: user?.name || "Usuario desconocido",
          };
        });

        setPosts(postsWithUsers);
        setUsers(usersData); // Guardar usuarios en caso de que sean necesarios
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="blog-page">
      <div className="container">
        <h1 className="page-title">Destinos Compartidos</h1>
        <div className="posts-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <img
                src={post.images || "/default-image.png"}
                alt={post.title}
                className="post-image"
              />
              <div className="post-details">
                <h3>{post.title}</h3>
                <p>{post.location}</p>
                <p className="post-author">Publicado por: {post.userName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
