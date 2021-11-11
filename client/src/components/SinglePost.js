import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import FileBase64 from "react-filebase64";
import { UserContext } from "../contexts/UserContext";
import axios from "../Axios";
import "./SinglePost.css";

function SinglePost() {
  let location = useLocation();
  const { user } = useContext(UserContext);
  const id = location.pathname.split("/")[1];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setError(false);
    const response = await axios.delete(`/post/${id}`, {
      headers: { auth: `Bearer ${user.token}` },
    });
    if (response.data.message) {
      setError(true);
      setErrorMessage(response.data.message);
      // console.log(response.data.message);
    } else {
      window.location.replace("/");
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setError(false);
    setTitle(post.title);
    setContent(post.description);
    setFile(post.photoUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const response = await axios.patch(
      `/post/${id}`,
      {
        title: title,
        username: user.username,
        photoUrl: file,
        description: content,
      },
      { headers: { auth: `Bearer ${user.token}` } }
    );
    setLoading(false);
    if (response.data.message) {
      setError(true);
      setErrorMessage(response.data.message);
    } else {
      window.location.replace("/");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`/post/${id}`);
      setLoading(false);
      setPost(response.data);
    };
    fetchData();
  }, [id]);

  return (
    <div className="single-post">
      {!edit ? (
        <>
          {loading && (
            <p style={{ textAlign: "center" }}>
              Loading...Your Net is sloow 😆
            </p>
          )}
          <div className="single-img">
            {!loading && <img src={post.photoUrl} alt="" />}
          </div>
          <div className="single-content">
            <div className="single-row">
              <h3>{post.title}</h3>
              <div>
                {user && !loading && (
                  <>
                    <i
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      onClick={handleEdit}
                    ></i>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={handleDelete}
                    ></i>
                  </>
                )}
              </div>
            </div>
            {error && (
              <p style={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </p>
            )}
            {!loading && <p>Author: {post.username}</p>}
            <p>{post.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="write-img">{file && <img src={file} alt="" />}</div>
          <form onSubmit={handleSubmit}>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setFile(base64)}
            />
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Type content here..."
              cols="30"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input type="submit" value={loading ? "Loading..." : "Submit"} />
          </form>
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
          )}
        </>
      )}
    </div>
  );
}

export default SinglePost;
