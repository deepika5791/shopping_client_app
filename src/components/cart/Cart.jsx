import React from "react";
import { useCart } from "../cartContext/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No products in cart</p>
      ) : (
        <>
          {cart.map((item) =>
            item.productId ? (
              <div key={item.productId._id} className="cart-item">
                <img src={item.productId.image} alt={item.productId.name} />
                <h4>{item.productId.name}</h4>
                <p>${item.productId.price}</p>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.productId._id)}>
                  Remove
                </button>
              </div>
            ) : null
          )}
          <div className="clear_container">
            <button className="clear-btn" onClick={clearCart}>
            Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
