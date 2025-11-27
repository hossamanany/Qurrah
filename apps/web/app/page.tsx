"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
  model_3d_url?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/.netlify/functions/getProducts");
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Product List</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 20 }}>
        <h1>Product List</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Product List</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
          <div key={p.id} style={{ marginBottom: 20 }}>
            <strong>{p.name}</strong>
            <br />
            ${p.price}
          </div>
        ))
      )}
    </main>
  );
}
