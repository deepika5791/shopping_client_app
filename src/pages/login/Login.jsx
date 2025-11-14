import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/authContext/AuthContext";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" }); // for success/error
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      const res = await axios.post(
        "https://shopping-app-gsnv.onrender.com/api/auth/login",
        formData
      );
      // save token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      loginUser(res.data.user, res.data.token);

      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/"), 1500); // redirect after 1.5s
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Login failed",
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1 className="brand-logo">ShopEase</h1>
        <p className="brand-tagline">
          Welcome back! Continue exploring the best deals.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <p className="auth-subtext">Login to your account</p>

          {message.text && (
            <p className={`auth-message ${message.type}`}>{message.text}</p>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="auth-link">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
