import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signin = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user.email === email && user.password === password) {
        setUser(user);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } else {
      setError("No user found. Please sign up first.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Signin;
