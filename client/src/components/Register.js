import React, { useState } from "react";
import axios from "../Axios";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    try {
      const response = await axios.post("/user/register", {
        username,
        email,
        password,
      });
      setLoading(false);
      if (response.data.message) return setError(true);
      setUsername("");
      setEmail("");
      setPassword("");
      !response.data.message && window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <p>Register</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={loading ? "Loading..." : "Register"} />
        {error && (
          <span style={{ color: "red", marginTop: "10px" }}>
            Username or Email already exists
          </span>
        )}
      </form>
    </div>
  );
}

export default Register;
