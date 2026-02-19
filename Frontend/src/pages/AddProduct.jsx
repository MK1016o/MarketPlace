import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/products", {
        ...form,
        price: Number(form.price),
      });

      alert("Product added successfully ✅");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to add product ❌"
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <input
          type="text"
          placeholder="Title"
          required
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          required
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          required
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          required
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
