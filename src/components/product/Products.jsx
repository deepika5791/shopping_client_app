import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";
import ProductCard from "../productCard/ProductCard";
import { useSearch } from "../searchContext/SearchContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [rating, setRating] = useState(0);
  const { searchTerm } = useSearch();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://shopping-app-gsnv.onrender.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "all" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const matchPrice = product.price <= Number(priceRange);
    const matchRating = !product.rating || product.rating >= Number(rating);
    const matchSearch = product.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCategory && matchPrice && matchRating && matchSearch;
  });

  return (
    <div className="products-container">
      <aside className="sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="jewelery">Jewelery</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Max Price: ₹{priceRange}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Min Rating:</label>
          <input
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
      </aside>

      <main className="product-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div className="product-card" key={idx}>
              <Skeleton height={200} /> 
              <h3>
                <Skeleton width={`80%`} />
              </h3>
              <p className="price">
                <Skeleton width={`50%`} />
              </p>
              <Skeleton width={`60%`} height={30} />
            </div>
          ))
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </main>
    </div>
  );
};

export default Products;
