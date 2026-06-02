"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  MapPin,
  Home as HomeIcon,
  Briefcase,
  CheckCircle,
  Package,
  ArrowLeft,
  Tag,
  Shield,
  Truck,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { createOrder, dummyPayment } from "../../services/orderService";

/* ── Indian states list ─────────────────────────────────────────── */
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
  "Chandigarh", "Dadra & Nagar Haveli", "Daman & Diu", "Lakshadweep",
  "Andaman & Nicobar Islands",
];

type AddressType = "Home" | "Office";
type Step = "cart" | "address" | "confirmed";

interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  flat: string;
  area: string;
  city: string;
  state: string;
  type: AddressType;
}

const EMPTY_ADDRESS: Address = {
  fullName: "",
  mobile: "",
  pincode: "",
  flat: "",
  area: "",
  city: "",
  state: "",
  type: "Home",
};

/* ── Step indicator ─────────────────────────────────────────────── */
function StepBar({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "cart", label: "Cart" },
    { key: "address", label: "Address" },
    { key: "confirmed", label: "Payment" },
  ];
  const active = steps.findIndex((s) => s.key === step);

  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-1">
          <span
            className={`text-sm font-bold transition-colors ${
              i === active
                ? "text-pink-600"
                : i < active
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <ChevronRight size={14} className="text-gray-300 shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────── */
export default function CartPage() {
  const router = useRouter();
  const { token: storeToken } = useAuthStore() as { token: string | null };
  // Fallback to localStorage — authStore has no persist, LayoutWrapper hydrates it async
  // but CartPage's useEffect runs BEFORE LayoutWrapper's, so the store token can be null
  const token = storeToken || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useCartStore() as {
      cartItems: Array<{
        _id: string;
        name: string;
        price: number;
        images?: string[];
        stock: number;
        quantity: number;
        vendor?: { shopName?: string } | string;
        category?: string | { name?: string };
      }>;
      removeFromCart: (id: string) => void;
      updateQuantity: (id: string, quantity: number) => void;
      clearCart: () => void;
    };

  const [step, setStep] = useState<Step>("cart");
  const [address, setAddress] = useState<Address>(EMPTY_ADDRESS);
  const [placing, setPlacing] = useState(false);

  /* redirect guests */
  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your cart");
      router.push("/login");
    }
  }, [token, router]);

  /* ── Price maths ── */
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = Math.floor(subtotal * 0.05); // flat 5% site discount
  const deliveryFee = subtotal - discount >= 499 ? 0 : 49;
  const total = subtotal - discount + deliveryFee;
  const amountNeededForFreeDelivery = 499 - (subtotal - discount);

  /* ── Handlers ── */
  const handleProceed = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setStep("address");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    const { fullName, mobile, pincode, flat, area, city, state } = address;
    if (!fullName || !mobile || !pincode || !flat || !area || !city || !state) {
      toast.error("Please fill all required fields");
      return;
    }
    if (mobile.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }
    if (pincode.length !== 6) {
      toast.error("Enter a valid 6-digit pincode");
      return;
    }

    setPlacing(true);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          fullName: address.fullName,
          mobile: address.mobile,
          address: `${address.flat}, ${address.area}`,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: "India",
        },
        totalPrice: total,
      };

      const orderRes = await createOrder(orderData);
      const orderId = orderRes?.order?._id || orderRes?._id;
      if (orderId) {
        await dummyPayment(orderId);
      }

      clearCart();
      setStep("confirmed");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const handleBack = () => {
    if (step === "address") {
      setStep("cart");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.back();
    }
  };

  /* ── Guard: not logged in ── */
  if (!token) return null;

  /* ── Order confirmed screen ── */
  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 max-w-md w-full text-center"
        >
          {/* Success icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={52} className="text-green-500" />
          </motion.div>

          <h1 className="text-3xl font-black text-gray-900">Order Placed!</h1>
          <p className="text-gray-500 mt-3 text-base leading-relaxed">
            Your order has been successfully placed. You'll receive a
            confirmation SMS shortly.
          </p>

          {/* Address summary */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-6 text-left">
            <p className="text-xs font-black text-green-700 uppercase tracking-wider mb-2">
              Delivering to
            </p>
            <div className="flex items-start gap-2">
              {address.type === "Home" ? (
                <HomeIcon size={15} className="text-green-600 mt-0.5 shrink-0" />
              ) : (
                <Briefcase size={15} className="text-green-600 mt-0.5 shrink-0" />
              )}
              <div className="text-sm text-gray-700 leading-relaxed">
                <p className="font-bold">{address.fullName}</p>
                <p className="text-gray-500">{address.mobile}</p>
                <p className="text-gray-600 mt-0.5">
                  {address.flat}, {address.area}
                </p>
                <p className="text-gray-600">
                  {address.city}, {address.state} — {address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-5">
            <p className="text-sm text-gray-400">Total paid</p>
            <p className="text-3xl font-black text-pink-600 mt-1">
              ₹{total.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <button
              onClick={() => router.push("/orders")}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-md hover:shadow-pink-200 hover:shadow-lg"
            >
              View My Orders
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Sticky step header ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <StepBar step={step} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* ── Empty cart ── */}
        {cartItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-28 h-28 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={52} className="text-pink-300" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mt-3 max-w-sm leading-relaxed">
              Looks like you haven&apos;t added anything yet. Explore our toy
              collection!
            </p>
            <Link href="/">
              <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-bold px-10 py-3.5 rounded-full transition-colors shadow-lg hover:shadow-pink-200 hover:shadow-xl">
                Shop Now
              </button>
            </Link>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* ── LEFT: Cart items / Address form ── */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="wait">
                {/* STEP 1 — Cart */}
                {step === "cart" && (
                  <motion.div
                    key="cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Delivery nudge */}
                    {deliveryFee === 0 ? (
                      <div className="bg-green-50 border border-green-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                        <Truck size={18} className="text-green-600 shrink-0" />
                        <p className="text-sm font-semibold text-green-700">
                          🎉 You qualify for FREE delivery!
                        </p>
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                        <Truck size={18} className="text-amber-600 shrink-0" />
                        <p className="text-sm text-amber-700">
                          Add{" "}
                          <span className="font-bold">
                            ₹{amountNeededForFreeDelivery.toLocaleString()}
                          </span>{" "}
                          more to get{" "}
                          <span className="font-bold">FREE delivery</span>
                        </p>
                      </div>
                    )}

                    {/* Cart item cards */}
                    <AnimatePresence>
                      {cartItems.map((item) => {
                        const shopName =
                          typeof item.vendor === "object"
                            ? item.vendor?.shopName
                            : null;
                        return (
                          <motion.div
                            key={item._id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -60, transition: { duration: 0.2 } }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                          >
                            <div className="flex gap-4">
                              {/* Product image */}
                              <Link
                                href={`/products/${item._id}`}
                                className="shrink-0"
                              >
                                <div className="w-[88px] h-[88px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                  <img
                                    src={
                                      item.images?.[0] ||
                                      "https://placehold.co/200/f3f4f6/9ca3af?text=No+Image"
                                    }
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </Link>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <Link href={`/products/${item._id}`}>
                                      <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-pink-600 transition-colors line-clamp-2">
                                        {item.name}
                                      </h3>
                                    </Link>
                                    {shopName && (
                                      <p className="text-xs text-pink-500 font-semibold mt-1">
                                        Sold by {shopName}
                                      </p>
                                    )}
                                    <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full mt-2">
                                      In Stock
                                    </span>
                                  </div>

                                  {/* Price */}
                                  <div className="text-right shrink-0">
                                    <p className="text-xl font-black text-pink-600">
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>
                                    {item.quantity > 1 && (
                                      <p className="text-xs text-gray-400 mt-0.5">
                                        ₹{item.price.toLocaleString()} × {item.quantity}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Qty stepper + Remove */}
                                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                      onClick={() =>
                                        updateQuantity(item._id, item.quantity - 1)
                                      }
                                      className="w-9 h-9 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 transition-colors"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="w-10 h-9 flex items-center justify-center font-bold text-sm border-x border-gray-200 select-none">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(item._id, item.quantity + 1)
                                      }
                                      disabled={item.quantity >= item.stock}
                                      className="w-9 h-9 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>

                                  <button
                                    onClick={() => {
                                      removeFromCart(item._id);
                                      toast.success("Item removed from cart");
                                    }}
                                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
                                  >
                                    <Trash2 size={15} />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* STEP 2 — Address form */}
                {step === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-pink-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">
                          Delivery Address
                        </h2>
                        <p className="text-sm text-gray-400">
                          Where should we deliver your order?
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Full name + Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={address.fullName}
                            onChange={(e) =>
                              setAddress({ ...address, fullName: e.target.value })
                            }
                            placeholder="e.g. Ravi Sharma"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            value={address.mobile}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                mobile: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10),
                              })
                            }
                            placeholder="10-digit number"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                      </div>

                      {/* Pincode */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          value={address.pincode}
                          onChange={(e) =>
                            setAddress({
                              ...address,
                              pincode: e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 6),
                            })
                          }
                          placeholder="6-digit pincode"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      {/* Flat */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Flat, House No., Building *
                        </label>
                        <input
                          type="text"
                          value={address.flat}
                          onChange={(e) =>
                            setAddress({ ...address, flat: e.target.value })
                          }
                          placeholder="Flat no., Building name"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      {/* Area */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                          Area, Street, Sector, Village *
                        </label>
                        <input
                          type="text"
                          value={address.area}
                          onChange={(e) =>
                            setAddress({ ...address, area: e.target.value })
                          }
                          placeholder="Street / Area name"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      {/* City + State */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            Town / City *
                          </label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) =>
                              setAddress({ ...address, city: e.target.value })
                            }
                            placeholder="City"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                            State *
                          </label>
                          <select
                            value={address.state}
                            onChange={(e) =>
                              setAddress({ ...address, state: e.target.value })
                            }
                            className="w-full h-12 px-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors bg-white"
                          >
                            <option value="">Select State</option>
                            {INDIAN_STATES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Address type */}
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Address Type
                        </label>
                        <div className="flex gap-3">
                          {(["Home", "Office"] as AddressType[]).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() =>
                                setAddress({ ...address, type: t })
                              }
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                                address.type === t
                                  ? "border-pink-500 bg-pink-50 text-pink-700"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              {t === "Home" ? (
                                <HomeIcon size={15} />
                              ) : (
                                <Briefcase size={15} />
                              )}
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Info note */}
                    <div className="flex items-start gap-2 mt-5 bg-blue-50 rounded-xl px-4 py-3">
                      <AlertCircle
                        size={15}
                        className="text-blue-500 mt-0.5 shrink-0"
                      />
                      <p className="text-xs text-blue-700">
                        We&apos;ll send your order updates to the mobile number
                        provided.
                      </p>
                    </div>

                    {/* Place Order CTA */}
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="w-full mt-6 h-14 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-black text-base rounded-2xl transition-colors shadow-lg hover:shadow-pink-200 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {placing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <Package size={20} />
                          Place Order &bull; ₹{total.toLocaleString()}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── RIGHT: Order summary ── */}
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Trust badges */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={17} className="text-green-500 shrink-0" />
                  Safe &amp; Secure payments
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck size={17} className="text-blue-500 shrink-0" />
                  Fast delivery across India
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Tag size={17} className="text-pink-500 shrink-0" />
                  Best price guarantee
                </div>
              </div>

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-black text-gray-900 text-base mb-4 pb-3 border-b border-gray-100 uppercase tracking-wide">
                  Price Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>
                      Price ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-semibold">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount (5%)</span>
                    <span className="font-semibold text-green-600">
                      − ₹{discount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span
                      className={`font-semibold ${
                        deliveryFee === 0 ? "text-green-600" : ""
                      }`}
                    >
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between">
                  <span className="font-black text-gray-900">Total Amount</span>
                  <span className="font-black text-gray-900 text-lg">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="mt-4 bg-green-50 rounded-xl px-4 py-2.5 text-center">
                    <p className="text-sm text-green-700 font-semibold">
                      🎉 You save ₹{discount.toLocaleString()} on this order!
                    </p>
                  </div>
                )}

                {step === "cart" && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleProceed}
                    className="w-full mt-5 h-13 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black text-base rounded-2xl transition-colors shadow-md hover:shadow-pink-200 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ChevronRight size={18} />
                  </motion.button>
                )}
              </div>

              {/* Order items mini-list (shown in address step) */}
              {step === "address" && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in cart
                  </p>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://placehold.co/80/f3f4f6/9ca3af?text=No"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
