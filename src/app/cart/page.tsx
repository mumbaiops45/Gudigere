"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  CreditCard,
  Banknote,
  Search,
  X,
} from "lucide-react";
import { toast } from "sonner";

import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { createOrder, createPayment, verifyPayment, dummyPayment } from "../../services/orderService";

type AddressType = "Home" | "Office";
type Step = "cart" | "address" | "payment" | "confirmed";
type PaymentMethod = "razorpay" | "cod";

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

// ─── Extended suggestion interface ──────────────────────────────
interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country?: string;
    neighbourhood?: string;
  };
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

/* ── Load Razorpay script ─────────────────────────────────────────── */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ── Step indicator ─────────────────────────────────────────────── */
function StepBar({ step }: { step: Step }) {
  const steps: { key: Step; label: string }[] = [
    { key: "cart", label: "Cart" },
    { key: "address", label: "Address" },
    { key: "payment", label: "Payment" },
  ];
  const order: Step[] = ["cart", "address", "payment", "confirmed"];
  const active = order.indexOf(step);

  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center gap-1">
          <span
            className={`text-sm font-bold transition-colors ${order.indexOf(s.key) === active
              ? "text-pink-600"
              : order.indexOf(s.key) < active
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

const onlyLetters = (value: string) =>
  value
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s{2,}/g, " ")
    .trimStart();

const isValidName = (value: string) =>
  /^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(value.trim());

/* ── Main component ─────────────────────────────────────────────── */
export default function CartPage() {
  const router = useRouter();
  const { token: storeToken } = useAuthStore() as { token: string | null };
  const token =
    storeToken ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);
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
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const { user } = useAuthStore() as any;
  const [placing, setPlacing] = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [pincodeError, setPincodeError] = useState("");
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  // ── Address search states ──
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [addressSelected, setAddressSelected] = useState(false);

  useEffect(() => {
    if (!user) return;
    setAddress((prev) => ({
      ...prev,
      fullName: user?.name || "",
      mobile: user?.mobile || user?.phone || "",
    }));
  }, [user]);

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
  const deliveryFee = subtotal >= 2000 ? 0 : 50;
  const total = subtotal + deliveryFee;
  const amountNeededForFreeDelivery = Math.max(0, 2000 - subtotal);

  /* ── Handlers ── */
  const handleProceed = () => {
    if (cartItems.length === 0) { toast.error("Your cart is empty"); return; }
    setStep("address");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirmAddress = () => {
    const { fullName, mobile, pincode, flat, area, city, state } = address;

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
      toast.error("Full name should contain only letters");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Enter a valid 6-digit pincode");
      return;
    }

    if (!flat.trim()) {
      toast.error("Please enter Flat / House No.");
      return;
    }

    if (!area.trim()) {
      toast.error("Please enter Area / Street");
      return;
    }

    if (!city.trim()) {
      toast.error("Please enter Town / City");
      return;
    }

    if (!isValidName(city)) {
      toast.error("Town / City should contain only letters");
      return;
    }

    if (!state.trim()) {
      toast.error("Please enter State");
      return;
    }

    if (!isValidName(state)) {
      toast.error("State should contain only letters");
      return;
    }

    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
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

      if (paymentMethod === "cod") {
        const orderRes = await createOrder(orderData);
        const orderId = orderRes?.order?._id || orderRes?._id;
        if (orderId) await dummyPayment(orderId);
        setConfirmedTotal(total);
        clearCart();
        setStep("confirmed");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      /* ── Razorpay flow ── */
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Please try again.");
        return;
      }

      const orderRes = await createOrder(orderData);
      const orderId = orderRes?.order?._id || orderRes?._id;
      if (!orderId) { toast.error("Order creation failed. Please try again."); return; }

      const paymentData = await createPayment(orderId);
      const { razorpayOrderId, amount, currency, key } = paymentData;

      const options = {
        key: key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: currency || "INR",
        name: "GoodieGear",
        description: "Toy Store Payment",
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            await verifyPayment({
              orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            setConfirmedTotal(total);
            clearCart();
            setStep("confirmed");
            window.scrollTo({ top: 0, behavior: "smooth" });
          } catch {
            toast.error("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: address.fullName,
          contact: address.mobile,
        },
        theme: { color: "#db2777" },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled.");
            setPlacing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  const handleBack = () => {
    if (step === "payment") { setStep("address"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else if (step === "address") { setStep("cart"); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else router.back();
  };

  const fetchAddressFromPincode = async (pincode: string) => {
    if (pincode.length !== 6) return;
    try {
      setLoadingPincode(true);
      setPincodeError("");
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      if (data?.[0]?.Status === "Success" && data?.[0]?.PostOffice?.length) {
        const office = data[0].PostOffice[0];
        setAddress((prev) => ({
          ...prev,
          city: office.District || office.Block || office.Name || "",
          state: office.State || "",
          area: prev.area || office.Name || "",
        }));
      } else {
        setPincodeError("Invalid Pincode");
      }
    } catch {
      setPincodeError("Unable to fetch location");
    } finally {
      setLoadingPincode(false);
    }
  };

  // ── Address search using Nominatim ──────────────────────────────
  const searchAddress = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=20&countrycodes=in`,
        { headers: { 'User-Agent': 'GoodieGear/1.0' } }
      );
      const data = await res.json();

      // Normalise: split by comma, trim each part, collapse spaces, join with ', '
      const seen = new Set<string>();
      const unique = data.filter((s: Suggestion) => {
        const normalized = s.display_name
          .split(',')
          .map(part => part.trim().toLowerCase().replace(/\s+/g, ' '))
          .join(', ');
        if (seen.has(normalized)) return false;
        seen.add(normalized);
        return true;
      });

      setSuggestions(unique);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Address search error:", error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search
 useEffect(() => {
  if (searchTimeout.current) {
    clearTimeout(searchTimeout.current);
  }

  if (addressSelected) return;

  searchTimeout.current = setTimeout(() => {
    searchAddress(searchQuery);
  }, 400);

  return () => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
  };
}, [searchQuery, addressSelected, searchAddress]);

  // const handleSelectSuggestion = (suggestion: Suggestion) => {
  //   const addr = suggestion.address;
  //   setAddress((prev) => ({
  //     ...prev,
  //     flat: addr.house_number || prev.flat,
  //     area: addr.road || addr.suburb || addr.neighbourhood || prev.area,
  //     city: addr.city || addr.town || addr.village || prev.city,
  //     state: addr.state || prev.state,
  //     pincode: addr.postcode || prev.pincode,
  //   }));
  //   setSearchQuery(suggestion.display_name);
  //   setSuggestions([]);
  //   setShowSuggestions(false);
  // };


  const handleSelectSuggestion = (suggestion: Suggestion) => {
    const addr = suggestion.address;
    setAddress((prev) => ({
      ...prev,
      flat: addr.house_number || prev.flat,
      area: addr.road || addr.suburb || addr.neighbourhood || prev.area,
      city: addr.city || addr.town || addr.village || prev.city,
      state: addr.state || prev.state,
      pincode: addr.postcode || prev.pincode,
    }));
    // Keep the selected address in the search input
    setSearchQuery(suggestion.display_name);
    setAddressSelected(true);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setAddressSelected(false);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setAddress(EMPTY_ADDRESS); // ← clears all address fields
  };


  // ── Improved Current Location ──────────────────────────────────
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          );
          const data = await res.json();
          const addr = data.address || {};
          setAddress((prev) => ({
            ...prev,
            flat: addr.house_number || prev.flat,
            area: addr.road || addr.suburb || addr.neighbourhood || prev.area,
            city: addr.city || addr.town || addr.village || prev.city,
            state: addr.state || prev.state,
            pincode: addr.postcode || prev.pincode,
          }));
          setSearchQuery(data.display_name || "");
          setAddressSelected(true);
          toast.success("Location updated successfully");
        } catch (error) {
          toast.error("Failed to fetch location details");
        }
      },
      (error) => {
        toast.error(
          "Unable to detect your current location. Please allow location permission or search your address manually."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  /* ── Guard ── */
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
            Your order has been successfully placed. You&apos;ll receive a confirmation SMS shortly.
          </p>
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
                <p className="text-gray-600 mt-0.5">{address.flat}, {address.area}</p>
                <p className="text-gray-600">{address.city}, {address.state} — {address.pincode}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-sm text-gray-400">Total paid</p>
            <p className="text-3xl font-black text-pink-600 mt-1">₹{confirmedTotal.toLocaleString()}</p>
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
            <h2 className="text-3xl font-black text-gray-900">Your cart is empty</h2>
            <p className="text-gray-400 mt-3 max-w-sm leading-relaxed">
              Looks like you haven&apos;t added anything yet. Explore our toy collection!
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
            {/* ── LEFT: Cart items / Address form / Payment ── */}
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
                    {/* Free delivery nudge */}
                    {deliveryFee === 0 ? (
                      <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-3.5 flex items-center gap-3">
                        <Truck size={20} className="text-green-600 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-green-700">
                            🎉 You get FREE Delivery!
                          </p>
                          <p className="text-xs text-green-600 mt-0.5">
                            Orders above ₹2,000 qualify for free delivery.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 flex items-center gap-3">
                        <Truck size={20} className="text-amber-600 shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-amber-700">
                            Add ₹{amountNeededForFreeDelivery.toLocaleString()} more for FREE delivery
                          </p>
                          <p className="text-xs text-amber-600 mt-0.5">
                            Free delivery on orders above ₹2,000
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Cart item cards */}
                    <AnimatePresence>
                      {cartItems.map((item) => {
                        const shopName =
                          typeof item.vendor === "object" ? item.vendor?.shopName : null;
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
                              <Link href={`/products/${item._id}`} className="shrink-0">
                                <div className="w-[88px] h-[88px] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                  <img
                                    src={item.images?.[0] || "https://placehold.co/200/f3f4f6/9ca3af?text=No+Image"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </Link>
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
                                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                      className="w-9 h-9 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 transition-colors"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="w-10 h-9 flex items-center justify-center font-bold text-sm border-x border-gray-200 select-none">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
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

                {/* STEP 2 — Address form with search */}
                {step === "address" && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-pink-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">Delivery Address</h2>
                        <p className="text-sm text-gray-400">Where should we deliver your order?</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* ── Address Search ── */}
                      <div className="relative">
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500 transition-all">
                          <Search size={18} className="text-gray-400 shrink-0" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                              setAddressSelected(false);
                              setSearchQuery(e.target.value);
                            }}
                            placeholder="Search for your area, street, or landmark..."
                            className="w-full h-12 bg-transparent pl-3 pr-2 text-sm outline-none placeholder:text-gray-400"
                            onFocus={() => {
  if (!addressSelected && suggestions.length > 0) {
    setShowSuggestions(true);
  }
}}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          />
                          {searchQuery && (
                            <button
                              onClick={clearSearch}
                              className="text-gray-400 hover:text-gray-600 p-1 shrink-0"
                            >
                              <X size={16} />
                            </button>
                          )}
                          {isSearching && (
                            <div className="w-4 h-4 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin shrink-0" />
                          )}
                        </div>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                          <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto divide-y divide-gray-100">
                            {suggestions.map((s, idx) => (
                              <li
                                key={idx}
                                onMouseDown={() => handleSelectSuggestion(s)}
                                className="px-4 py-3 hover:bg-pink-50 cursor-pointer transition-colors flex items-start gap-3"
                              >
                                <MapPin size={16} className="text-pink-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-700">{s.display_name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          className="flex items-center gap-2 text-pink-600 font-semibold text-sm hover:underline"
                        >
                          <MapPin size={16} />
                          Use Current Location
                        </button>
                        <span className="text-xs text-gray-400">or</span>
                        <button
                          type="button"
                          onClick={clearSearch}
                          className="text-xs text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          Clear search
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            value={address.fullName}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                fullName: onlyLetters(e.target.value).slice(0, 50),
                              })
                            }
                            placeholder="e.g. Ravi Sharma"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mobile Number *</label>
                          <input
                            type="tel"
                            value={address.mobile}
                            onChange={(e) =>
                              setAddress({ ...address, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                            }
                            placeholder="10-digit number"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Pincode *</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={address.pincode}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                              setAddress((prev) => ({ ...prev, pincode: value }));
                              if (value.length === 6) fetchAddressFromPincode(value);
                            }}
                            placeholder="Enter Pincode"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                          />
                          {loadingPincode && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <div className="w-4 h-4 border-2 border-pink-200 border-t-pink-600 rounded-full animate-spin" />
                            </div>
                          )}
                        </div>
                        {pincodeError && <p className="text-red-500 text-xs mt-1">{pincodeError}</p>}
                        {address.city && address.state && (
                          <div className="mt-3 bg-green-50 border border-green-100 rounded-xl p-3">
                            <p className="text-sm font-medium text-green-700">📍 {address.city}, {address.state}</p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Flat, House No., Building *</label>
                        <input
                          type="text"
                          value={address.flat}
                          onChange={(e) => setAddress({ ...address, flat: e.target.value })}
                          placeholder="Flat no., Building name"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Area, Street, Sector, Village *</label>
                        <input
                          type="text"
                          value={address.area}
                          onChange={(e) => setAddress({ ...address, area: e.target.value })}
                          placeholder="Street / Area name"
                          className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Town / City *</label>
                          <input
                            type="text"
                            value={address.city}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                city: onlyLetters(e.target.value).slice(0, 50),
                              })
                            }
                            placeholder="Enter city"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">State *</label>
                          <input
                            type="text"
                            value={address.state}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                state: onlyLetters(e.target.value).slice(0, 50),
                              })
                            }
                            placeholder="Enter state"
                            className="w-full h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address Type</label>
                        <div className="flex gap-3">
                          {(["Home", "Office"] as AddressType[]).map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setAddress({ ...address, type: t })}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${address.type === t
                                ? "border-pink-500 bg-pink-50 text-pink-700"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                            >
                              {t === "Home" ? <HomeIcon size={15} /> : <Briefcase size={15} />}
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-5 bg-blue-50 rounded-xl px-4 py-3">
                      <AlertCircle size={15} className="text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-blue-700">
                        We&apos;ll send your order updates to the mobile number provided.
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmAddress}
                      className="w-full mt-6 h-14 bg-pink-600 hover:bg-pink-700 text-white font-black text-base rounded-2xl transition-colors shadow-lg hover:shadow-pink-200 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      Continue to Payment
                      <ChevronRight size={20} />
                    </motion.button>
                  </motion.div>
                )}

                {/* STEP 3 — Payment */}
                {step === "payment" && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center shrink-0">
                        <CreditCard size={20} className="text-pink-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-gray-900">Choose Payment Method</h2>
                        <p className="text-sm text-gray-400">Select how you want to pay</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Razorpay option */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("razorpay")}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "razorpay"
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "razorpay" ? "border-pink-500" : "border-gray-300"
                            }`}
                        >
                          {paymentMethod === "razorpay" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-gray-900 text-sm">Pay Online (Razorpay)</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            UPI, Credit/Debit Card, Net Banking, Wallets
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="bg-[#072654] text-white text-[10px] font-black px-2 py-0.5 rounded">
                            Razorpay
                          </div>
                        </div>
                      </button>

                      {/* COD option */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === "cod"
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "cod" ? "border-pink-500" : "border-gray-300"
                            }`}
                        >
                          {paymentMethod === "cod" && (
                            <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</p>
                          <p className="text-xs text-gray-500 mt-0.5">Pay when your order arrives</p>
                        </div>
                        <Banknote size={22} className="text-green-600 shrink-0" />
                      </button>
                    </div>

                    {/* Delivery address summary */}
                    <div className="mt-5 bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                      <MapPin size={16} className="text-pink-500 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-bold text-gray-900">{address.fullName}</p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {address.flat}, {address.area}, {address.city}, {address.state} — {address.pincode}
                        </p>
                      </div>
                      <button
                        onClick={() => { setStep("address"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="ml-auto text-xs text-pink-600 font-semibold shrink-0"
                      >
                        Change
                      </button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="w-full mt-6 h-14 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-black text-base rounded-2xl transition-colors shadow-lg hover:shadow-pink-200 hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      {placing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {paymentMethod === "razorpay" ? "Opening Payment..." : "Placing Order..."}
                        </>
                      ) : (
                        <>
                          <Package size={20} />
                          {paymentMethod === "razorpay"
                            ? `Pay ₹${total.toLocaleString()} with Razorpay`
                            : `Place Order • ₹${total.toLocaleString()} (COD)`}
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Shield size={14} className="text-green-500" />
                      <p className="text-xs text-gray-500">100% Secure & Encrypted Payment</p>
                    </div>
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

              {/* Free delivery banner in summary */}
              {deliveryFee === 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Truck size={16} className="text-green-600 shrink-0" />
                  <p className="text-sm font-bold text-green-700">🎉 FREE Delivery on this order!</p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Truck size={16} className="text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-700 font-medium">
                    Add <span className="font-bold">₹{amountNeededForFreeDelivery.toLocaleString()}</span> more for FREE delivery
                  </p>
                </div>
              )}

              {/* Price breakdown */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-black text-gray-900 text-base mb-4 pb-3 border-b border-gray-100 uppercase tracking-wide">
                  Price Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Price ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? "text-green-600" : ""}`}>
                      {deliveryFee === 0 ? "FREE" : "₹50"}
                    </span>
                  </div>
                  {deliveryFee === 0 && (
                    <div className="flex justify-between text-green-600 text-xs">
                      <span>You saved on delivery</span>
                      <span className="font-bold">₹50</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between">
                  <span className="font-black text-gray-900">Total Amount</span>
                  <span className="font-black text-gray-900 text-lg">₹{total.toLocaleString()}</span>
                </div>

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

              {/* Order items mini-list (shown in address / payment step) */}
              {(step === "address" || step === "payment") && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-3">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in cart
                  </p>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                          <img
                            src={item.images?.[0] || "https://placehold.co/80/f3f4f6/9ca3af?text=No"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700 line-clamp-1">{item.name}</p>
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