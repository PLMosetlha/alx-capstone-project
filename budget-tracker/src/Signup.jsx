import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Signup = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      income: 0,
      expenses: [],
      savingsGoals: [],
    };

    if (isSignUp) {
      // Sign up logic
      if (localStorage.getItem(email)) {
        setError("Account already exists with this email!");
        return;
      }
      localStorage.setItem(email, JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
    } else {
      // Sign in logic
      const existingUser = JSON.parse(localStorage.getItem(email));
      if (existingUser && existingUser.password === password) {
        setUser(existingUser);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials!");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between sign up and sign in
    setError(""); // Clear any error messages when switching forms
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
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
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <span onClick={toggleForm} className="toggle-btn">
          {isSignUp ? "Sign In" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Signup;
