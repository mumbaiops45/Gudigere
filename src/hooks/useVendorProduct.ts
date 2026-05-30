import { useEffect } from "react";

import { useState } from "react";

import {
  Product,
  getProducts,
} from "../services/vendorProductService";

export default function useVendorProduct() {

  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH
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