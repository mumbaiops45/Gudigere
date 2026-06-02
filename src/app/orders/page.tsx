"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Package,
    ChevronRight,
    ShoppingBag,
    Clock,
    CheckCircle2,
    Truck,
    XCircle,
} from "lucide-react";
import { getMyOrders, Order } from "../../services/orderService";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
    pending:    { label: "Pending",    color: "bg-amber-100 text-amber-700",  icon: <Clock size={14} /> },
    processing: { label: "Processing", color: "bg-blue-100 text-blue-700",    icon: <Package size={14} /> },
    shipped:    { label: "Shipped",    color: "bg-purple-100 text-purple-700", icon: <Truck size={14} /> },
    delivered:  { label: "Delivered",  color: "bg-green-100 text-green-700",  icon: <CheckCircle2 size={14} /> },
    cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-600",      icon: <XCircle size={14} /> },
};

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            router.push("/login");
            return;
        }
        getMyOrders()
            .then((data: any) => {
                const list = data?.orders ?? data?.data ?? (Array.isArray(data) ? data : []);
                setOrders(list);
            })
            .catch(() => setOrders([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-4xl mx-auto px-4">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900">My Orders</h1>
                    <p className="text-gray-400 mt-2">Track and manage your purchases</p>
                </div>

                {/* Empty */}
                {orders.length === 0 && (
                    <div className="bg-white rounded-3xl border border-gray-100 py-24 text-center">
                        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag size={36} className="text-pink-400" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mt-6">No orders yet</h2>
                        <p className="text-gray-400 mt-2">Start shopping to see your orders here</p>
                        <Link href="/">
                            <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-2xl transition-colors">
                                Shop Now
                            </button>
                        </Link>
                    </div>
                )}

                {/* Orders list */}
                <div className="space-y-4">
                    {orders.map((order) => {
                        const status = STATUS_CONFIG[order.orderStatus?.toLowerCase()] ?? STATUS_CONFIG.pending;
                        const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        });

                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                {/* Order header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Order ID</p>
                                        <p className="text-sm font-black text-gray-700 mt-0.5">
                                            #{order._id.slice(-8).toUpperCase()}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-gray-400 font-medium">Placed on</p>
                                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 font-medium">Total</p>
                                        <p className="text-lg font-black text-pink-600 mt-0.5">
                                            ₹{order.totalPrice?.toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${status.color}`}>
                                        {status.icon}
                                        {status.label}
                                    </span>
                                </div>

                                {/* Order items */}
                                <div className="px-5 py-4 space-y-3">
                                    {order.orderItems?.map((item) => (
                                        <div key={item._id} className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                                                {item.product?.image ? (
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Package size={20} className="text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-gray-800 line-clamp-1">
                                                    {item.product?.title || "Product"}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    Qty: {item.quantity} × ₹{item.price?.toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                            <p className="text-sm font-black text-gray-800 shrink-0">
                                                ₹{(item.price * item.quantity)?.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Delivery address */}
                                {order.shippingAddress && (
                                    <div className="mx-5 mb-4 bg-gray-50 rounded-xl px-4 py-3">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">
                                            Delivering to
                                        </p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {order.shippingAddress.fullName}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                                            {order.shippingAddress.state} — {order.shippingAddress.pincode}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {orders.length > 0 && (
                    <div className="mt-8 text-center">
                        <Link href="/">
                            <button className="text-pink-600 font-bold hover:underline text-sm">
                                ← Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
