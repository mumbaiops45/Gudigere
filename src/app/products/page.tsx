"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/product/ProductCard";
import {Product,getAllProducts as getProducts} from "@/services/productService"; 

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const data =
          await getProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10 text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-black mb-8">
        Products
      </h1>

      {products.length === 0 ? (
        <p>
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map(
            (product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            )
          )}

        </div>
      )}
    </div>
  );
}