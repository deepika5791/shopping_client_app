import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../authContext/AuthContext";
import { useSearch } from "../searchContext/SearchContext";
import "./Admin.css";
const Admin = () => {
  const { searchTerm } = useSearch();
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://shopping-app-nz4t.onrender.com/products"
    );
    setProducts(res.data);
  };

  const handleAdd = async () => {
    await axios.post(
      "https://shopping-app-nz4t.onrender.com/products",
      newProduct,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchProducts();
  };
  const handleDelete = async (id) => {
    await axios.delete(
      `https://shopping-app-nz4t.onrender.com/products/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchProducts();
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await axios.patch(
      `https://shopping-app-nz4t.onrender.com/products/${editId}`,
      newProduct,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNewProduct({ name: "", price: "", image: "" });
    setEditId(null);
    fetchProducts();
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setNewProduct({
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>

      <div className="add-product-form">
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        {editId ? (
          <button onClick={handleUpdate}>Update Product</button>
        ) : (
          <button onClick={handleAdd}>Add Product</button>
        )}
      </div>

      <div className="product-list">
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-item">
            <img src={p.image} alt={p.name} />
            <p>{p.name}</p>
            <p>₹{p.price}</p>
            <button onClick={() => startEdit(p)} className="edit-product">
              Edit
            </button>
            <button
              onClick={() => handleDelete(p._id)}
              className="delete-product"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
