import React from "react";
import "./ProductCard.css";
import { NavLink } from "react-router-dom";
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <NavLink to={`/product/${product._id}`} className="product-link">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
      </NavLink>
      <p className="price">${product.price}</p>
      <div className="rating">rating:{product.rating}</div>
    </div>
  );
};

export default ProductCard;
