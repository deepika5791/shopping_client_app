import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";
import { useCart } from "../cartContext/CartContext";
import { useSearch } from "../searchContext/SearchContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { cartCount } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          🛍️ ShopEase
        </Link>
        <Link to="/products" className="nav-link products-link">
          Products
        </Link>

        <Link to="/about" className="nav-link products-link">
          About
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin" className="nav-link admin-link">
            Admin Panel
          </Link>
        )}
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="nav-link">Hi, {user.name}</span>
            <button
              className="nav-link logout-btn"
              onClick={() => {
                logoutUser();
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Login / Register
          </Link>
        )}

        <Link to="/cart" className="nav-cart">
          <i className="bi bi-cart4">
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </i>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
