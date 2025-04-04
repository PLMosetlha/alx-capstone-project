import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = ({ setUser }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const user = {
      name,
      email,
      password,
      income: 0,
      expenses: [],
      savingsGoals: [],
    };

    if (isSignUp) {
      if (localStorage.getItem(email)) {
        setError("Account already exists with this email!");
        return;
      }
      localStorage.setItem(email, JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
    } else {
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
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className="auth-container">
      <h2>Welcome to a simple yet effective budget tracker app</h2>
      <p>Let's help you save more and spend wisely</p>

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
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            title="Show Password"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {isSignUp && (
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title="Show Password"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
        {error && <p className="error bounce">{error}</p>}
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
