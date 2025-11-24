import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../cartContext/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://shopping-app-nz4t.onrender.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <div className="details-left">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details-right">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <div className="buttons">
          <button className="add" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
