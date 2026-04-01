import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    } 

    try {
      const res = await axios.post(
        "https://shopping-app-nz4t.onrender.com/api/auth/signup",
        formData,
      );
      setMessage({
        type: "success",
        text: "Signup successful! Redirecting...",
      });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Signup failed",
      });
    }
  };
  const changeInputfocus = (event, NextInput) => {
    if (event.key === "ENTER") {
      event.preventDefault();
      NextInput.current.focus();
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="brand-logo">ShopEase</h1>
        <p className="brand-tagline">
          Join thousands of users shopping smarter every day.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Create Account</h2>
          <p className="auth-subtext">Sign up to get started</p>

          {message.text && (
            <p className={`auth-message ${message.type}`}>{message.text}</p>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              ref={username}
              onKeyDown={(event) => changeInputfocus(event, email)}
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              ref={email}
              onKeyDown={(event) => changeInputfocus(event, password)}
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              ref={password}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="auth-btn"
              disabled={!formData.email || !formData.password}
            >
              Sign Up
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <NavLink to="/login" className="auth-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
