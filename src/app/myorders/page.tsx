// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   CalendarDays,
//   ChevronRight,
//   Clock,
//   Loader2,
//   MapPin,
//   Package,
//   RefreshCcw,
//   ShoppingBag,
//   Truck,
//   CheckCircle,
//   XCircle,
//   AlertCircle,
// } from "lucide-react";

// import {
//   getMyOrders,
//   Order,
// } from "../../services/orderService";

// /* ── helpers ── */
// const formatDate = (date: string) =>
//   new Intl.DateTimeFormat("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(new Date(date));

// const formatStatus = (value?: string) => {
//   if (!value) return "Pending";
//   return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
// };

// const getStatusStep = (status: string) => {
//   const map: Record<string, number> = {
//     pending: 0,
//     processing: 1,
//     shipped: 2,
//     delivered: 3,
//     cancelled: -1,
//   };
//   return map[status?.toLowerCase()] ?? 0;
// };

// const statusSteps = [
//   { label: "Pending", icon: Clock },
//   { label: "Processing", icon: Package },
//   { label: "Shipped", icon: Truck },
//   { label: "Delivered", icon: CheckCircle },
// ];

// /* ── main component ── */
// export default function MyOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadOrders = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.replace("/login?redirect=/orders");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError("");
//       const data = await getMyOrders();
//       setOrders(Array.isArray(data) ? data : []);
//     } catch (err: any) {
//       const status = err?.response?.status;
//       if (status === 401 || status === 403) {
//         localStorage.removeItem("token");
//         router.replace("/login?redirect=/orders");
//         return;
//       }
//       setError(err?.response?.data?.message || "Unable to load your orders.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadOrders();
//   }, []);

//   if (loading) {
//     return (
//       <main className="min-h-[70vh] bg-gradient-to-br from-slate-50 to-pink-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center animate-pulse">
//             <Loader2 size={32} className="animate-spin text-pink-600" />
//           </div>
//           <p className="mt-4 text-sm font-semibold text-slate-600">Loading your orders…</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
//       {/* ── HEADER ── */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-pink-900">
//         <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
//           <button
//             onClick={() => router.back()}
//             className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
//           >
//             <ArrowLeft size={16} /> Back
//           </button>
//           <div className="flex items-center gap-5 mt-6">
//             <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
//               <ShoppingBag size={28} className="text-pink-400" />
//             </div>
//             <div>
//               <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
//                 My Orders
//               </h1>
//               <p className="text-sm text-slate-300 mt-1">
//                 Track, manage, and reorder your favourite toys.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CONTENT ── */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         {error && (
//           <div className="max-w-lg mx-auto bg-white rounded-3xl border border-red-200 shadow-sm p-8 text-center">
//             <AlertCircle size={48} className="text-red-500 mx-auto" />
//             <h2 className="font-black text-xl text-slate-900 mt-4">Oops! Something went wrong</h2>
//             <p className="text-sm text-slate-500 mt-2">{error}</p>
//             <button
//               onClick={loadOrders}
//               className="mt-6 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold transition"
//             >
//               Try Again
//             </button>
//           </div>
//         )}

//         {!error && orders.length === 0 && (
//           <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-10 text-center">
//             <div className="w-24 h-24 mx-auto rounded-full bg-pink-50 flex items-center justify-center">
//               <Package size={40} className="text-pink-500" />
//             </div>
//             <h2 className="mt-6 text-2xl font-black text-slate-900">No orders yet</h2>
//             <p className="mt-2 text-sm text-slate-500">
//               You haven’t placed any orders. Start exploring our collection!
//             </p>
//             <Link
//               href="/products"
//               className="inline-block mt-7 px-7 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold shadow-lg shadow-pink-200 transition"
//             >
//               Start Shopping
//             </Link>
//           </div>
//         )}

//         {!error && orders.length > 0 && (
//           <>
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
//               <div>
//                 <h2 className="text-2xl font-black text-slate-900">Order History</h2>
//                 <p className="text-sm text-slate-500 mt-0.5">
//                   {orders.length} {orders.length === 1 ? "order" : "orders"} placed
//                 </p>
//               </div>
//               <button
//                 onClick={loadOrders}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-all hover:shadow-sm"
//               >
//                 <RefreshCcw size={15} /> Refresh
//               </button>
//             </div>

//             <div className="space-y-6">
//               {orders.map((order) => {
//                 const status = order.orderStatus?.toLowerCase() || "pending";
//                 const currentStep = getStatusStep(status);
//                 const isCancelled = status === "cancelled";

//                 return (
//                   <article
//                     key={order._id}
//                     className="bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
//                   >
//                     {/* ── order header ── */}
//                     <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
//                       <div className="flex flex-wrap items-center gap-4 text-sm">
//                         <span className="font-mono text-slate-500">
//                           #{order._id.slice(-8).toUpperCase()}
//                         </span>
//                         <span className="flex items-center gap-1.5 text-slate-500">
//                           <CalendarDays size={14} />
//                           {formatDate(order.createdAt)}
//                         </span>
//                         <span className="font-black text-pink-600">
//                           ₹{Number(order.totalPrice).toLocaleString("en-IN")}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {!isCancelled ? (
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-bold border ${
//                               status === "delivered"
//                                 ? "bg-green-50 text-green-700 border-green-200"
//                                 : status === "shipped"
//                                 ? "bg-purple-50 text-purple-700 border-purple-200"
//                                 : status === "processing"
//                                 ? "bg-blue-50 text-blue-700 border-blue-200"
//                                 : "bg-amber-50 text-amber-700 border-amber-200"
//                             }`}
//                           >
//                             {formatStatus(order.orderStatus)}
//                           </span>
//                         ) : (
//                           <span className="px-3 py-1 rounded-full text-xs font-bold border bg-red-50 text-red-600 border-red-200">
//                             Cancelled
//                           </span>
//                         )}
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-bold ${
//                             order.paymentStatus?.toLowerCase() === "paid"
//                               ? "bg-green-100 text-green-700"
//                               : order.paymentStatus?.toLowerCase() === "failed"
//                               ? "bg-red-100 text-red-600"
//                               : "bg-amber-100 text-amber-700"
//                           }`}
//                         >
//                           {formatStatus(order.paymentStatus)}
//                         </span>
//                       </div>
//                     </div>

//                     {/* ── status timeline ── */}
//                     {!isCancelled && (
//                       <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
//                         <div className="flex items-center justify-between max-w-md">
//                           {statusSteps.map((step, idx) => {
//                             const Icon = step.icon;
//                             const isActive = idx <= currentStep;
//                             const isLast = idx === statusSteps.length - 1;
//                             return (
//                               <div key={step.label} className="flex items-center flex-1">
//                                 <div className="flex items-center gap-2">
//                                   <div
//                                     className={`w-7 h-7 rounded-full flex items-center justify-center ${
//                                       isActive
//                                         ? "bg-pink-600 text-white"
//                                         : "bg-slate-200 text-slate-400"
//                                     }`}
//                                   >
//                                     <Icon size={14} />
//                                   </div>
//                                   <span
//                                     className={`text-[10px] font-bold uppercase tracking-wider ${
//                                       isActive ? "text-pink-700" : "text-slate-400"
//                                     }`}
//                                   >
//                                     {step.label}
//                                   </span>
//                                 </div>
//                                 {!isLast && (
//                                   <div
//                                     className={`flex-1 h-0.5 mx-2 ${
//                                       idx < currentStep ? "bg-pink-500" : "bg-slate-200"
//                                     }`}
//                                   />
//                                 )}
//                               </div>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     )}

//                     {/* ── products ── */}
//                     <div className="px-6 py-5">
//                       <div className="flex flex-wrap gap-4">
//                         {order.orderItems?.map((item) => (
//                           <div
//                             key={item._id}
//                             className="flex items-center gap-4 bg-slate-50 rounded-xl p-3 flex-1 min-w-[200px] border border-slate-100"
//                           >
//                             <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
//                               {item.product?.image ? (
//                                 <img
//                                   src={item.product.image}
//                                   alt={item.product.title}
//                                   className="w-full h-full object-contain p-1"
//                                 />
//                               ) : (
//                                 <Package size={24} className="text-slate-300" />
//                               )}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <p className="font-bold text-slate-800 text-sm truncate">
//                                 {item.product?.title}
//                               </p>
//                               <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
//                             </div>
//                             <p className="font-black text-pink-600 text-sm shrink-0">
//                               ₹{Number(item.price).toLocaleString("en-IN")}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* ── footer: address + actions ── */}
//                     <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
//                       {order.shippingAddress && (
//                         <div className="flex items-start gap-3 text-sm">
//                           <MapPin size={16} className="text-pink-500 mt-0.5" />
//                           <div>
//                             <p className="font-bold text-slate-800">
//                               {order.shippingAddress.fullName}
//                             </p>
//                             <p className="text-slate-500 text-xs">
//                               {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
//                               – {order.shippingAddress.pincode}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                       <Link
//                         href={`/orders/${order._id}`}
//                         className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-white text-sm font-bold transition-all hover:shadow-md"
//                       >
//                         View Details <ChevronRight size={16} />
//                       </Link>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </section>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Package,
  RefreshCcw,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

import {
  getMyOrders,
  Order,
} from "../../services/orderService";

/* ── helpers ── */
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const formatStatus = (value?: string) => {
  if (!value) return "Pending";
  return value.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

const getStatusStep = (status: string) => {
  const map: Record<string, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
  };
  return map[status?.toLowerCase()] ?? 0;
};

const statusSteps = [
  { label: "Pending", icon: Clock },
  { label: "Processing", icon: Package },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: CheckCircle },
];

/* ── main component ── */
export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login?redirect=/orders");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const data = await getMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        router.replace("/login?redirect=/orders");
        return;
      }
      setError(err?.response?.data?.message || "Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-gradient-to-br from-slate-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center animate-pulse">
            <Loader2 size={28} className="animate-spin text-pink-600 sm:w-8 sm:h-8" />
          </div>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-slate-600">Loading your orders…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30">
      {/* ── HEADER ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-pink-900">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-repeat" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 relative">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back
          </button>
          <div className="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <ShoppingBag size={22} className="text-pink-400 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                My Orders
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 sm:mt-1">
                Track, manage, and reorder your favourite toys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {error && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl sm:rounded-3xl border border-red-200 shadow-sm p-6 sm:p-8 text-center">
            <AlertCircle size={40} className="text-red-500 mx-auto sm:w-12 sm:h-12" />
            <h2 className="font-black text-lg sm:text-xl text-slate-900 mt-3 sm:mt-4">Oops! Something went wrong</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">{error}</p>
            <button
              onClick={loadOrders}
              className="mt-4 sm:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold transition text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-pink-50 flex items-center justify-center">
              <Package size={32} className="text-pink-500 sm:w-10 sm:h-10" />
            </div>
            <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-black text-slate-900">No orders yet</h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500">
              You haven’t placed any orders. Start exploring our collection!
            </p>
            <Link
              href="/products"
              className="inline-block mt-5 sm:mt-7 px-6 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold shadow-lg shadow-pink-200 transition text-sm sm:text-base"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {!error && orders.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">Order History</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  {orders.length} {orders.length === 1 ? "order" : "orders"} placed
                </p>
              </div>
              <button
                onClick={loadOrders}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-all hover:shadow-sm"
              >
                <RefreshCcw size={14} className="sm:w-4 sm:h-4" /> Refresh
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {orders.map((order) => {
                const status = order.orderStatus?.toLowerCase() || "pending";
                const currentStep = getStatusStep(status);
                const isCancelled = status === "cancelled";

                return (
                  <article
                    key={order._id}
                    className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    {/* ── order header ── */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-100 flex flex-wrap items-start gap-2 sm:gap-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm w-full sm:w-auto">
                        <span className="font-mono text-slate-500">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <CalendarDays size={12} className="sm:w-3.5 sm:h-3.5" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="font-black text-pink-600">
                          ₹{Number(order.totalPrice).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 ml-auto sm:ml-0">
                        {!isCancelled ? (
                          <span
                            className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${
                              status === "delivered"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : status === "shipped"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : status === "processing"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {formatStatus(order.orderStatus)}
                          </span>
                        ) : (
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border bg-red-50 text-red-600 border-red-200">
                            Cancelled
                          </span>
                        )}
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold ${
                            order.paymentStatus?.toLowerCase() === "paid"
                              ? "bg-green-100 text-green-700"
                              : order.paymentStatus?.toLowerCase() === "failed"
                              ? "bg-red-100 text-red-600"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {formatStatus(order.paymentStatus)}
                        </span>
                      </div>
                    </div>

                    {/* ── status timeline – fixed for mobile ── */}
                    {!isCancelled && (
                      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/50 border-b border-slate-100 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[280px] sm:min-w-0 max-w-md mx-auto">
                          {statusSteps.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = idx <= currentStep;
                            const isLast = idx === statusSteps.length - 1;
                            return (
                              <div key={step.label} className="flex items-center flex-1">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <div
                                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                      isActive
                                        ? "bg-pink-600 text-white"
                                        : "bg-slate-200 text-slate-400"
                                    }`}
                                  >
                                    <Icon size={10} className="sm:w-3 sm:h-3" />
                                  </div>
                                  <span
                                    className={`hidden sm:inline text-[10px] font-bold uppercase tracking-wider ${
                                      isActive ? "text-pink-700" : "text-slate-400"
                                    }`}
                                  >
                                    {step.label}
                                  </span>
                                </div>
                                {!isLast && (
                                  <div
                                    className={`flex-1 h-0.5 mx-1 sm:mx-2 ${
                                      idx < currentStep ? "bg-pink-500" : "bg-slate-200"
                                    }`}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ── products ── */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex flex-wrap gap-3 sm:gap-4">
                        {order.orderItems?.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 sm:gap-4 bg-slate-50 rounded-xl p-2.5 sm:p-3 flex-1 min-w-[150px] sm:min-w-[200px] border border-slate-100"
                          >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                              {item.product?.image ? (
                                <img
                                  src={item.product.image}
                                  alt={item.product.title}
                                  className="w-full h-full object-contain p-1"
                                />
                              ) : (
                                <Package size={18} className="text-slate-300 sm:w-5 sm:h-5" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-800 text-xs sm:text-sm truncate">
                                {item.product?.title}
                              </p>
                              <p className="text-[10px] sm:text-xs text-slate-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-black text-pink-600 text-xs sm:text-sm shrink-0">
                              ₹{Number(item.price).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── footer ── */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50/30 border-t border-slate-100 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4">
                      {order.shippingAddress && (
                        <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                          <MapPin size={14} className="text-pink-500 mt-0.5 sm:w-4 sm:h-4" />
                          <div>
                            <p className="font-bold text-slate-800 text-xs sm:text-sm">
                              {order.shippingAddress.fullName}
                            </p>
                            <p className="text-slate-500 text-[10px] sm:text-xs">
                              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                              – {order.shippingAddress.pincode}
                            </p>
                          </div>
                        </div>
                      )}
                      <Link
                        href={`/orders/${order._id}`}
                        className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-pink-600 text-white text-xs sm:text-sm font-bold transition-all hover:shadow-md w-full sm:w-auto justify-center"
                      >
                        View Details <ChevronRight size={14} className="sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}