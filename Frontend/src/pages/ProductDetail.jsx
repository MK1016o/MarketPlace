import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkIfFavorited();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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
      const exists = data.find((p) => p._id === id);

      if (exists) setIsFavorited(true);
    } catch (err) {}
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
          `${import.meta.env.VITE_BACKEND_URL}/products/${id}/favorite`,
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
          `${import.meta.env.VITE_BACKEND_URL}/products/${id}/favorite`,
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

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="detail-container">
      <img
        src={product.image}
        alt={product.title}
        className="detail-image"
      />

      <div>
        <h1>{product.title}</h1>
        <h3>₹{product.price}</h3>
        <p>{product.description}</p>

        <button onClick={handleFavorite}>
          {isFavorited ? "Added ❤️" : "Add ❤️"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
