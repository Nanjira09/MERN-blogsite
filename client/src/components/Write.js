import React, { useState, useContext } from "react";
import FileBase64 from "react-filebase64";
import { UserContext } from "../contexts/UserContext";
import axios from "../Axios";
import "./Write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post("/post", {
      title: title,
      username: user.username,
      photoUrl: file,
      description: content,
    });
    setLoading(false);
    setFile("");
    setTitle("");
    setContent("");
    window.location.replace("/");
  };

  return (
    <div className="write">
      <div className="write-img">{file && <img src={file} alt="" />}</div>
      <form onSubmit={handleSubmit}>
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
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
    </div>
  );
}

export default Write;
