import { useEffect } from "react";

import { useState } from "react";

import {
  getProducts,
  Product,
} from "../services/productService";

export default function useProduct() {

  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH PRODUCTS
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    fetchProducts,
  };
}