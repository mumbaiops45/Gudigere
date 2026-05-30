"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getVendorDashboard,
} from "../services/dashboardService";

interface DashboardData {
  earnings: {
    totalOrders: number;

    totalEarnings: number;
  };

  orders: any[];

  products: any[];
}

export default function useVendorDashboard() {

  const [data, setData] =
    useState<DashboardData | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {

      try {

        const result =
          await getVendorDashboard();

        setData(result);

      } catch (error) {

        console.log(error);

        setError(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);
      }
    };

  return {
    data,
    loading,
    error,
    fetchDashboard,
  };
}