"use client";

import { useState } from "react";
import {
  Package,
  Search,
  ShoppingBag,
  Truck,
  IndianRupee,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  User,
  MapPin,
  Phone,
} from "lucide-react";

import useVendorOrders from "@/hooks/useVendorOrders";

/* ── status helpers ─────────────────────────────────────────────── */

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-700 border border-amber-200",
  processing: "bg-blue-50 text-blue-700 border border-blue-200",
  shipped:    "bg-violet-50 text-violet-700 border border-violet-200",
  delivered:  "bg-green-50 text-green-700 border border-green-200",
  cancelled:  "bg-red-50 text-red-700 border border-red-200",
};

const PAYMENT_STATUS_STYLES: Record<string, string> = {
  paid:    "bg-green-50 text-green-700 border border-green-200",
  unpaid:  "bg-red-50 text-red-700 border border-red-200",
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  refunded:"bg-gray-100 text-gray-600 border border-gray-200",
};

function statusStyle(map: Record<string, string>, value: string) {
  return map[value?.toLowerCase()] ?? "bg-gray-100 text-gray-600 border border-gray-200";
}

/* ── main page ──────────────────────────────────────────────────── */

export default function VendorOrdersPage() {
  const { orders, loading, error } = useVendorOrders();
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  /* ── derived stats ── */
  const totalRevenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  const pending   = orders.filter((o) => o.orderStatus?.toLowerCase() === "pending").length;
  const delivered = orders.filter((o) => o.orderStatus?.toLowerCase() === "delivered").length;

  const filtered = orders.filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.orderStatus?.toLowerCase().includes(search.toLowerCase())
  );

  /* ── loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-pink-200 border-t-pink-500 animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading orders…</p>
        </div>
      </div>
    );
  }

  /* ── error ── */
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-red-100 p-8 text-center shadow-sm max-w-sm">
          <XCircle size={36} className="text-red-400 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-400 mt-1 text-sm">Track and manage customer orders</p>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full sm:w-72 bg-white border border-gray-200 rounded-xl pl-9 pr-4 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
            />
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {
              icon: <ShoppingBag size={18} className="text-pink-500" />,
              bg: "bg-pink-50",
              label: "Total Orders",
              value: orders.length,
            },
            {
              icon: <Clock size={18} className="text-amber-500" />,
              bg: "bg-amber-50",
              label: "Pending",
              value: pending,
            },
            {
              icon: <CheckCircle2 size={18} className="text-green-500" />,
              bg: "bg-green-50",
              label: "Delivered",
              value: delivered,
            },
            {
              icon: <IndianRupee size={18} className="text-violet-500" />,
              bg: "bg-violet-50",
              label: "Revenue",
              value: `₹${totalRevenue.toLocaleString("en-IN")}`,
            },
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

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-400 flex items-center justify-center mb-4">
              <Package size={30} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">No Orders Found</h2>
            <p className="text-gray-400 mt-1 text-sm">Orders will appear here once customers start purchasing</p>
          </div>
        )}

        {/* ── Order list ── */}
        <div className="space-y-3">
          {filtered.map((order) => {
            const isOpen = expanded === order._id;
            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* ── Row summary (always visible) ── */}
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : order._id)}
                  className="w-full flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 text-left hover:bg-gray-50/60 transition"
                >
                  {/* Left: ID + date */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900 text-sm">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {order.user?.name ?? "Unknown customer"}
                    </p>
                  </div>

                  {/* Middle: items count */}
                  <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                    <Truck size={13} className="text-gray-400" />
                    {order.orderItems.length} item{order.orderItems.length !== 1 ? "s" : ""}
                  </div>

                  {/* Status badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(ORDER_STATUS_STYLES, order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle(PAYMENT_STATUS_STYLES, order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="sm:text-right shrink-0">
                    <p className="font-bold text-gray-900">₹{order.totalPrice.toLocaleString("en-IN")}</p>
                  </div>

                  {/* Chevron */}
                  <div className="text-gray-400 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* ── Expanded detail ── */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Customer */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Customer</p>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                            <User size={13} className="text-pink-500" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{order.user?.name ?? "—"}</p>
                            <p className="text-xs text-gray-400">{order.user?.email ?? "—"}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 mt-5">Shipping Address</p>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <MapPin size={13} className="text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-semibold">{order.shippingAddress?.fullName}</p>
                            <p className="text-gray-500 text-xs mt-0.5">
                              {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.state} – {order.shippingAddress?.pincode}
                            </p>
                          </div>
                        </div>
                        {order.shippingAddress?.mobile && (
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-gray-400 shrink-0" />
                            <p className="text-xs text-gray-500">{order.shippingAddress.mobile}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Products */}
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Products</p>
                      <div className="space-y-2">
                        {order.orderItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {item.product?.title ?? "Product"}
                              </p>
                              <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 shrink-0 ml-4">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div className="mt-4 flex items-center justify-between bg-linear-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-xl px-4 py-3">
                        <p className="text-sm font-semibold text-gray-700">Total Amount</p>
                        <p className="text-lg font-black text-pink-600">
                          ₹{order.totalPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
