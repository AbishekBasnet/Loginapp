import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //  for redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((res) => {
        if (res.data.status === "ok") {
          alert("Login successful!");
          navigate("/"); //  go to Home
        } else {
          alert("Invalid credentials!");
        }
      })
      .catch(() => alert("Login failed!"));
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "#2e8b57", fontWeight: "bold" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
