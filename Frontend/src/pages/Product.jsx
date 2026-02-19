import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
    const data = await response.json();
    setProducts(data.products || data);
  } catch (err) {
    alert("Failed to load products");
  }
};



  return (
    <div className="container">
      <h1>Products</h1>

      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
