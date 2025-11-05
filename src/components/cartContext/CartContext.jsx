import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../authContext/AuthContext";

const CartContext = createContext();

const initialState = {
  cart: [],
  loading: true,
  error: null,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, cart: action.payload, loading: false };
    case "ADD_TO_CART":
      return { ...state, cart: action.payload };
    case "REMOVE_FROM_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { token } = useAuth();

  const API_BASE = "https://shopping-app-gsnv.onrender.com/api/cart";

  const getAuthConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(API_BASE, getAuthConfig());
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.products || [] });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product) => {
    if (!token) return alert("Please login to add items to your cart");
    try {
      const res = await axios.post(
        `${API_BASE}/add`,
        { productId: product._id, quantity: 1 },
        getAuthConfig()
      );
      dispatch({
        type: "ADD_TO_CART",
        payload: res.data.cart.products || [],
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) return;
    try {
      const res = await axios.delete(
        `${API_BASE}/remove/${productId}`,
        getAuthConfig()
      );
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: res.data.cart.products || [],
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!token) return;
    try {
      await axios.delete(`${API_BASE}/clear`, getAuthConfig());
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        cartCount,
        addToCart,
        removeFromCart,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
