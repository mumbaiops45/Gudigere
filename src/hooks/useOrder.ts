import { useEffect } from "react";

import { useState } from "react";

import {
  getOrders,
  Order,
} from "../services/orderService";

export default function useOrder() {

  const [
    orders,
    setOrders,
  ] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH
  const fetchOrders =
    async () => {
      try {
        const data =
          await getOrders();

        setOrders(data);

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    fetchOrders,
  };
}