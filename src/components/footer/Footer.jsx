import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ShopSmart</h3>
          <p>
            Your one-stop destination for amazing deals and top-quality
            products.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <NavLink to="https://www.linkedin.com/in/deepika-tripathi-5617562a1/">
              <i class="bi bi-linkedin"></i>
            </NavLink>

            <NavLink to="">
              <i class="bi bi-instagram"></i>
            </NavLink>

            <NavLink to="https://github.com/deepika5791?tab=repositories">
              <i class="bi bi-github"> </i>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
