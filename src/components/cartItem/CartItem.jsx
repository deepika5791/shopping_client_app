import React from "react";
import "./CartItem.css";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-info">
        <h4>{item.name || item.title}</h4>
        <p>${item.price}</p>
        <p>Quantity: {item.qty}</p>
      </div>
      <div className="cart-actions">
        <input type="number" min="1" value={item.qty} readOnly />
        <button className="remove">✖</button>
      </div>
    </div>
  );
};

export default CartItem;
