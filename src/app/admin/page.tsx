"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Store,
  Package,
  ShoppingBag,
  IndianRupee,
} from "lucide-react";

import { getDashboardStats } from "@/services/adminService";

interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalUsers: 0,
      totalVendors: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 p-6">

      {/* Hero */}
      <div className="mb-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">

        <h1 className="text-4xl font-bold">
          Admin Dashboard 🚀
        </h1>

        <p className="mt-3 text-lg text-indigo-100">
          Monitor platform activity,
          revenue and growth.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">

          <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl">
            <p className="text-sm">
              Revenue
            </p>

            <h3 className="text-2xl font-bold">
              ₹
              {stats.totalRevenue.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white/20 backdrop-blur px-5 py-3 rounded-xl">
            <p className="text-sm">
              Orders
            </p>

            <h3 className="text-2xl font-bold">
              {stats.totalOrders}
            </h3>
          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

        {/* Users */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Users
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalUsers}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Users
                size={30}
                className="text-blue-600"
              />
            </div>

          </div>
        </div>

        {/* Vendors */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Vendors
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalVendors}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
              <Store
                size={30}
                className="text-green-600"
              />
            </div>

          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Products
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalProducts}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Package
                size={30}
                className="text-purple-600"
              />
            </div>

          </div>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Orders
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.totalOrders}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <ShoppingBag
                size={30}
                className="text-orange-600"
              />
            </div>

          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition-all">
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500">
                Revenue
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-600">
                ₹
                {stats.totalRevenue.toLocaleString()}
              </h2>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">
              <IndianRupee
                size={30}
                className="text-red-600"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-10 grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            Platform Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>Total Users</span>
              <span className="font-bold">
                {stats.totalUsers}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Approved Vendors</span>
              <span className="font-bold">
                {stats.totalVendors}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total Products</span>
              <span className="font-bold">
                {stats.totalProducts}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total Orders</span>
              <span className="font-bold">
                {stats.totalOrders}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Revenue</span>
              <span className="font-bold text-green-600">
                ₹
                {stats.totalRevenue.toLocaleString()}
              </span>
            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 shadow-lg">

          <h2 className="text-2xl font-bold">
            Marketplace Health
          </h2>

          <p className="mt-4 text-blue-100">
            Managing{" "}
            <strong>
              {stats.totalUsers}
            </strong>{" "}
            users,{" "}
            <strong>
              {stats.totalVendors}
            </strong>{" "}
            vendors and{" "}
            <strong>
              {stats.totalProducts}
            </strong>{" "}
            products.
          </p>

          <h2 className="text-5xl font-bold mt-8">
            ₹
            {stats.totalRevenue.toLocaleString()}
          </h2>

          <p className="mt-2 text-blue-100">
            Total Platform Revenue
          </p>

        </div>

      </div>

    </div>
  );
}