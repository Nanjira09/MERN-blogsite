import React, { useState, useContext } from "react";
import FileBase64 from "react-filebase64";
import { Redirect } from "react-router";
import axios from "../Axios";
import { UserContext } from "../contexts/UserContext";
import "./Profile.css";

function Profile() {
  const { user, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [file, setFile] = useState(user.userProfile);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleted, setDeleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const updatedUser = await axios.patch(
      `/user/${user.id}`,
      {
        email,
        password,
        userProfile: file,
      },
      {
        headers: { auth: `Bearer ${user.token}` },
      }
    );
    setLoading(false);
    if (updatedUser.data.message) {
      setError(true);
      setErrorMessage(updatedUser.data.message);
    } else {
      dispatch({ type: "update", payload: updatedUser.data });
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError(false);
    setLoad(true);
    const response = await axios.delete(`/user/${user.id}`, {
      headers: { auth: `Bearer ${user.token}` },
    });
    setLoad(false);
    if (response.data.message) {
      setError(true);
      setErrorMessage(response.data.message);
      // console.log(response.data.message);
    } else {
      dispatch({ type: "logout" });
      setDeleted(true);
    }
  };

  if (deleted) {
    return <Redirect to="/" />;
  }

  return (
    <div className="profile">
      <form onSubmit={handleSubmit}>
        <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
        <input
          type="text"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={loading ? "Loading..." : "Update"} />
        <button className="del" onClick={handleDelete}>
          {load ? "Loading..." : "Delete"}
        </button>
        {error && (
          <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default Profile;
