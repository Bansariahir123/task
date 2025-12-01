import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import RecommendationForm from "./RecommendationForm";

function App() {
  const [products, setProducts] = useState([]);
  const [recommendedIds, setRecommendedIds] = useState([]);

  // Fetch products from Fake Store API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const recommendedProducts = products.filter((p) =>
    recommendedIds.includes(p.id)
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Product Recommendation</h1>

      <RecommendationForm
        products={products}
        setRecommendedIds={setRecommendedIds}
      />

      <h2>All Products</h2>
      <ProductList products={products} />

      <h2>Recommended Products</h2>
      <ProductList products={recommendedProducts} />
    </div>
  );
}

export default App;
