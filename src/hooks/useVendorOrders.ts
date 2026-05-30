"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getVendorOrders,
  Order,
} from "../services/orderService";

interface UseVendorOrdersReturn {
  orders: Order[];

  loading: boolean;

  error: string;

  fetchOrders: () => Promise<void>;
}

export default function useVendorOrders():
  UseVendorOrdersReturn {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string>("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async (): Promise<void> => {

      try {

        setLoading(true);

        const data =
          await getVendorOrders();

        setOrders(data);

      } catch (err) {

        console.log(err);

        setError(
          "Failed to load orders"
        );

      } finally {

        setLoading(false);
      }
    };

  return {
    orders,
    loading,
    error,
    fetchOrders,
  };
}