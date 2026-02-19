import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    checkIfFavorited();
  }, []);

  const checkIfFavorited = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/favorites/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) return;

      const data = await response.json();
      const exists = data.find((p) => p._id === product._id);

      if (exists) setIsFavorited(true);
    } catch (err) {
      alert("Failed to check favorites");
    }
  };

  const handleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      if (!isFavorited) {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products/${product._id}/favorite`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsFavorited(true);
        alert("Added to favorites ❤️");
      } else {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/products/${product._id}/favorite`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsFavorited(false);
        alert("Removed from favorites ❌");
      }
    } catch (err) {
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>

      {/* View Button Restored */}
      <Link to={`/products/${product._id}`}>
        <button>View</button>
      </Link>

      <button onClick={handleFavorite}>
        {isFavorited ? "Added ❤️" : "Add ❤️"}
      </button>
    </div>
  );
};

export default ProductCard;
