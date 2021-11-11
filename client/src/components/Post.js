import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
function Post({ post }) {
  const truncate = (text) => text.slice(0, 150) + "...";
  return (
    <div className="post">
      <img className="post-img" src={post.photoUrl} alt="" />
      <p className="post-title">{post.title}</p>
      <span className="post-author">By: {post.username}</span>
      <span className="post-date">
        {new Date(post.createdAt).toDateString()}
      </span>
      <p className="post-description">{truncate(post.description)}</p>
      <button>
        <Link to={`/${post._id}`}> >>></Link>
      </button>
    </div>
  );
}

export default Post;
