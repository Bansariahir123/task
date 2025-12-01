function ProductList({ products }) {
  if (products.length === 0) return <p>No products to display.</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          <strong>{p.title}</strong> – ${p.price}
          <br />
          Category: {p.category}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
