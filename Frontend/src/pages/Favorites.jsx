import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/products/favorites/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load favorites");
      }

      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const removeFavorite = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}/favorite`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove favorite");
      }

      // Instantly update UI (no reload)
      setFavorites((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Removed from favorites ❌");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!favorites.length) {
    return (
      <h2 style={{ padding: "60px", textAlign: "center" }}>
        No favorites yet ❤️
      </h2>
    );
  }

  return (
    <div className="container">
      <h2>Your Favorites</h2>

      <div className="grid">
        {favorites.map((product) => (
          <div key={product._id} className="card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>₹{product.price}</p>

            {/* View Button Restored */}
            <Link to={`/products/${product._id}`}>
              <button>View</button>
            </Link>
            <button
              onClick={() => removeFavorite(product._id)}
              className="remove-btn"
            >
              Remove ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
