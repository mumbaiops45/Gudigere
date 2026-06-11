"use client";

import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import useVendorDashboard from "@/hooks/useVendorDashboard";

/* ── status badge ─────────────────────────────────────────────── */
const STATUS: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border border-amber-200",
  processing: "bg-blue-50 text-blue-700 border border-blue-200",
  shipped:    "bg-violet-50 text-violet-700 border border-violet-200",
  delivered:  "bg-green-50 text-green-700 border border-green-200",
  cancelled:  "bg-red-50 text-red-700 border border-red-200",
};

function Badge({ value }: { value: string }) {
  const cls = STATUS[value?.toLowerCase()] ?? "bg-gray-100 text-gray-600 border border-gray-200";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}>
      {value}
    </span>
  );
}

/* ── skeleton ─────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        <div className="h-8 w-48 bg-gray-200 rounded-xl mb-2" />
        <div className="h-4 w-64 bg-gray-100 rounded-xl mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-white rounded-2xl h-28 border border-gray-100" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl h-72 border border-gray-100" />
          <div className="bg-white rounded-2xl h-72 border border-gray-100" />
        </div>
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────────── */
export default function VendorDashboard() {
  const router = useRouter();
  const { data, loading } = useVendorDashboard();

  if (loading) return <Skeleton />;

  const totalProducts  = data?.products?.length ?? 0;
  const totalOrders    = data?.earnings?.totalOrders ?? 0;
  const totalEarnings  = data?.earnings?.totalEarnings ?? 0;
  const pendingOrders  = (data?.orders ?? []).filter((o: any) => o.orderStatus?.toLowerCase() === "pending").length;
  const recentOrders   = (data?.orders ?? []).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">Your store at a glance</p>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: <Package size={18} className="text-pink-500" />,   bg: "bg-pink-50",   label: "Products",  value: totalProducts },
            { icon: <ShoppingBag size={18} className="text-blue-500" />, bg: "bg-blue-50",  label: "Orders",    value: totalOrders },
            { icon: <Clock size={18} className="text-amber-500" />,     bg: "bg-amber-50",  label: "Pending",   value: pendingOrders },
            { icon: <IndianRupee size={18} className="text-violet-500" />, bg: "bg-violet-50", label: "Revenue", value: `₹${totalEarnings.toLocaleString("en-IN")}` },
          ].map(({ icon, bg, label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                {icon}
              </div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Performance banner ── */}
        <div className="mb-8 rounded-2xl bg-linear-to-r from-pink-500 via-rose-500 to-pink-600 p-6 text-white shadow-lg shadow-pink-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <h2 className="text-lg font-bold">Store Performance</h2>
          </div>
          <p className="text-pink-100 text-sm leading-relaxed">
            You have <strong className="text-white">{totalProducts}</strong> products listed
            with <strong className="text-white">{totalOrders}</strong> total orders,
            generating <strong className="text-white">₹{totalEarnings.toLocaleString("en-IN")}</strong> in revenue.
          </p>
        </div>

        {/* ── Lower grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Recent Orders</h3>
              <button
                onClick={() => router.push("/vendor/orders")}
                className="text-xs text-pink-500 font-semibold flex items-center gap-1 hover:text-pink-600 transition"
              >
                View all <ChevronRight size={13} />
              </button>
            </div>

            {recentOrders.length === 0 ? (
              <div className="py-14 text-center text-gray-400 text-sm">
                No orders yet
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentOrders.map((order: any) => (
                  <div key={order._id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/60 transition">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{order.user?.name ?? "Customer"}</p>
                    </div>
                    <Badge value={order.orderStatus} />
                    <p className="text-sm font-bold text-gray-900 shrink-0">₹{order.totalPrice?.toLocaleString("en-IN")}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-gray-900 px-1">Quick Actions</h3>

            {[
              {
                icon: <Plus size={18} className="text-pink-500" />,
                bg: "bg-pink-50",
                title: "Add Product",
                desc: "Create a new listing",
                href: "/vendor/add-product",
              },
              {
                icon: <Package size={18} className="text-blue-500" />,
                bg: "bg-blue-50",
                title: "My Products",
                desc: "Manage your inventory",
                href: "/vendor/my-products",
              },
              {
                icon: <ShoppingBag size={18} className="text-violet-500" />,
                bg: "bg-violet-50",
                title: "Orders",
                desc: "Track customer orders",
                href: "/vendor/orders",
              },
              {
                icon: <CheckCircle2 size={18} className="text-green-500" />,
                bg: "bg-green-50",
                title: "My Profile",
                desc: "View store details",
                href: "/vendor/profile",
              },
            ].map(({ icon, bg, title, desc, href }) => (
              <button
                key={href}
                onClick={() => router.push(href)}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3.5 flex items-center gap-3 hover:border-pink-200 hover:shadow-md transition text-left group"
              >
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-xs text-gray-400">{desc}</p>
                </div>
                <ArrowRight size={15} className="text-gray-300 group-hover:text-pink-400 transition shrink-0" />
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
