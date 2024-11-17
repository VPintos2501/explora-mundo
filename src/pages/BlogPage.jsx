import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/blogPage.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://67391e4ea3a36b5a62edfb6e.mockapi.io/users/1/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-page-container">
      <h1>Explora las Experiencias de Otros Usuarios</h1>
      <div className="blog-posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            className="blog-post-card"
            onClick={() => navigate(`/post/${post.id}`)} // Redirige a PostPage
          >
            <img src={post.images || "/default-image.png"} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.location}</p>
            <div className="post-footer">
              <p>Publicado por: {post.userName || "Anónimo"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
