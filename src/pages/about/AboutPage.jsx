import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>
          About <span>ShopEase 🛍️</span>
        </h1>
        <p>Your one-stop destination for quality and affordable products.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            ShopEase is a modern e-commerce platform built with a focus on
            simplicity, speed, and trust. We aim to make online shopping
            enjoyable and convenient for everyone.
          </p>

          <h2>Our Mission</h2>
          <p>
            To provide our customers with the best products at the best prices,
            backed by reliable service and an easy shopping experience.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>Fast and secure shopping experience</li>
            <li>High-quality products from trusted brands</li>
            <li>Dedicated customer support</li>
          </ul>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735"
            alt="Shopping Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
