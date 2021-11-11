import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import axios from "../Axios";
import "./Login.css";
import { Redirect } from "react-router";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { dispatch } = useContext(UserContext);
  const [logged, setLogged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const response = await axios.post("/user/login", {
        username,
        password,
      });
      setLoading(false);
      if (response.data.message) return setError(true);
      dispatch({ type: "login", payload: response.data });
      setUsername("");
      setPassword("");
      setLogged(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (logged) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <p>Login</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={loading ? "Loading..." : "Login"} />
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Wrong credentials
          </span>
        )}
      </form>
    </div>
  );
}

export default Login;
