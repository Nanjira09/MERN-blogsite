import React, { useEffect, useState } from "react";
import axios from "../Axios";
import "./HomePage.css";
import Header from "./Header";
import Post from "./Post";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get("/post");
      setLoading(false);
      setPosts(response.data);
    };
    fetchPosts();
    return fetchPosts();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {loading && <p>Be patient Content Loading...😇</p>}
      </div>
    </>
  );
}

export default HomePage;
