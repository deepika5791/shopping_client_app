import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    axios
      .get("https://shopping-app-gsnv.onrender.com/products")
      .then((res) => setProducts(res.data.slice(0, 6)))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Best Deals Every Day</h1>
          <p>Shop top-quality products at unbeatable prices</p>
          <button className="shop-btn">Shop Now</button>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">${item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="deal">
        <div className="deal-content">
          <h2>Deal of the Day</h2>
          <p>Exclusive discounts available for a limited time!</p>
          <div className="countdown">{formatTime(timeLeft)}</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
