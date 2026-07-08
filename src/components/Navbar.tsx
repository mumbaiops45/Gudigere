// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Search, ShoppingCart, Menu, Heart, User, X,
//   MapPin, ChevronRight, Package, LocateFixed, Loader2,
// } from "lucide-react";
// import useCartStore from "../store/cartStore";
// import useWishlistStore from "../store/wishlistStore";

// /* ── nav links ────────────────────────────────────────────────── */
// const navLinks = [
//   "🔥 Trending", "🚗 Remote Cars", "🧩 LEGO Sets", "📚 Educational",
//   "🤖 Robots", "⭐ Best Sellers", "✨ New Arrivals", "🎲 Board Games",
//   "🧸 Soft Toys", "🎨 Art & Craft", "🏏 Outdoor",
// ];

// const drawerCats = [
//   { icon: "🚗", label: "Remote Cars & RC" },
//   { icon: "🧸", label: "Soft Toys & Dolls" },
//   { icon: "🧩", label: "LEGO & Building" },
//   { icon: "📚", label: "Educational Toys" },
//   { icon: "🤖", label: "Robots & Tech" },
//   { icon: "🎲", label: "Board Games" },
//   { icon: "🎮", label: "Video Games" },
//   { icon: "✈️", label: "Drones & RC" },
//   { icon: "🎨", label: "Art & Craft" },
//   { icon: "🏏", label: "Outdoor & Sports" },
// ];

// /* ── types ────────────────────────────────────────────────────── */
// interface GeoResult {
//   place_id: number;
//   display_name: string;
//   address: {
//     city?: string; town?: string; village?: string;
//     suburb?: string; state?: string; postcode?: string;
//   };
// }

// /* ── helpers ──────────────────────────────────────────────────── */
// function parseCity(addr: GeoResult["address"]) {
//   return addr.city || addr.town || addr.village || addr.suburb || "Your Area";
// }
// function parsePin(addr: GeoResult["address"]) {
//   return addr.postcode || "";
// }

// /* ── location dropdown ────────────────────────────────────────── */
// function LocationDropdown({
//   onSelect, onClose,
// }: {
//   onSelect: (city: string, pin: string) => void;
//   onClose: () => void;
// }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<GeoResult[]>([]);
//   const [detecting, setDetecting] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => { inputRef.current?.focus(); }, []);

//   /* debounced nominatim search */
//   const search = useCallback((q: string) => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     if (!q.trim()) { setResults([]); return; }
//     timerRef.current = setTimeout(async () => {
//       setSearching(true);
//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&countrycodes=in&addressdetails=1`,
//           { headers: { "Accept-Language": "en" } }
//         );
//         const data: GeoResult[] = await res.json();
//         setResults(data);
//       } catch { /* ignore */ }
//       finally { setSearching(false); }
//     }, 500);
//   }, []);

//   const handleChange = (v: string) => { setQuery(v); search(v); };

//   /* geolocation */
//   const detectLocation = () => {
//     if (!navigator.geolocation) return;
//     setDetecting(true);
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1`,
//             { headers: { "Accept-Language": "en" } }
//           );
//           const data: GeoResult = await res.json();
//           onSelect(parseCity(data.address), parsePin(data.address));
//         } catch { /* ignore */ }
//         finally { setDetecting(false); }
//       },
//       () => setDetecting(false),
//       { timeout: 8000 }
//     );
//   };

//   return (
//     <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
//       <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-gray-100">
//         <p className="text-sm font-black text-gray-900">Deliver to</p>
//         <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
//           <X size={14} className="text-gray-500" />
//         </button>
//       </div>

//       <div className="px-3 py-2.5">
//         <div className="flex items-center gap-2 h-10 rounded-xl border-2 border-gray-200 focus-within:border-pink-500 transition-colors px-3 bg-gray-50">
//           <Search size={14} className="text-gray-400 shrink-0" />
//           <input
//             ref={inputRef}
//             value={query}
//             onChange={(e) => handleChange(e.target.value)}
//             placeholder="Search city, area, pincode…"
//             className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
//           />
//           {searching && <Loader2 size={13} className="text-pink-500 animate-spin shrink-0" />}
//         </div>
//       </div>

//       <button
//         onClick={detectLocation}
//         disabled={detecting}
//         className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors group border-b border-gray-100"
//       >
//         {detecting
//           ? <Loader2 size={16} className="text-pink-500 animate-spin shrink-0" />
//           : <LocateFixed size={16} className="text-pink-600 group-hover:text-pink-700 shrink-0" />
//         }
//         <span className="text-sm font-semibold text-pink-600 group-hover:text-pink-700">
//           {detecting ? "Detecting location…" : "Use my current location"}
//         </span>
//       </button>

//       {results.length > 0 && (
//         <ul className="max-h-52 overflow-y-auto">
//           {results.map((r) => {
//             const city = parseCity(r.address);
//             const pin = parsePin(r.address);
//             const parts = r.display_name.split(",").slice(0, 3).join(",");
//             return (
//               <li key={r.place_id}>
//                 <button
//                   onClick={() => onSelect(city, pin)}
//                   className="w-full flex items-start gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors text-left group"
//                 >
//                   <MapPin size={14} className="text-gray-400 group-hover:text-pink-500 mt-0.5 shrink-0" />
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800 group-hover:text-pink-700 line-clamp-1">
//                       {city}{pin ? ` – ${pin}` : ""}
//                     </p>
//                     <p className="text-xs text-gray-400 line-clamp-1">{parts}</p>
//                   </div>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       {!results.length && query.length > 1 && !searching && (
//         <p className="px-4 py-3 text-sm text-gray-400 text-center">No results found</p>
//       )}

//       {!query && !results.length && (
//         <p className="px-4 py-3 text-xs text-gray-400 text-center pb-3">
//           Type a city, area or pincode to search
//         </p>
//       )}
//     </div>
//   );
// }

// /* ── main navbar ──────────────────────────────────────────────── */
// export default function Navbar() {
//   const router = useRouter();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [locationOpen, setLocationOpen] = useState(false);
//   const [location, setLocation] = useState({ city: "Mumbai", pin: "400001", ready: false });
//   const locationRef = useRef<HTMLDivElement>(null);

//   const cartItems = useCartStore((s: { cartItems: unknown[] }) => s.cartItems);
//   const cartCount = cartItems.reduce(
//     (sum: number, item: unknown) => sum + ((item as { quantity?: number }).quantity ?? 1), 0
//   );
//   const wishlistCount = useWishlistStore((s) => s.wishlistItems.length);

//   /* load saved / detect on first mount */
//   useEffect(() => {
//     const saved = localStorage.getItem("gudigear-location");
//     if (saved) {
//       try {
//         const { city, pin } = JSON.parse(saved);
//         setLocation({ city, pin, ready: true });
//         return;
//       } catch { /* ignore */ }
//     }
//     if (!navigator.geolocation) { setLocation(l => ({ ...l, ready: true })); return; }
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1`,
//             { headers: { "Accept-Language": "en" } }
//           );
//           const data: GeoResult = await res.json();
//           const city = parseCity(data.address);
//           const pin = parsePin(data.address);
//           setLocation({ city, pin, ready: true });
//           localStorage.setItem("gudigear-location", JSON.stringify({ city, pin }));
//         } catch { setLocation(l => ({ ...l, ready: true })); }
//       },
//       () => setLocation(l => ({ ...l, ready: true })),
//       { timeout: 6000 }
//     );
//   }, []);

//   /* close dropdown on outside click */
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
//         setLocationOpen(false);
//       }
//     };
//     if (locationOpen) document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [locationOpen]);

//   const handleLocationSelect = (city: string, pin: string) => {
//     setLocation({ city, pin, ready: true });
//     localStorage.setItem("gudigear-location", JSON.stringify({ city, pin }));
//     setLocationOpen(false);
//   };

//   return (
//     <>
//       <header className="w-full sticky top-0 z-50 flex flex-col">

//         {/* ── ANNOUNCEMENT BAR ── */}
//         <div className="hidden sm:flex items-center justify-center gap-2 bg-slate-900 text-slate-300 py-2 px-4 text-xs">
//           <span className="text-pink-400">🎁</span>
//           <span>
//             <span className="font-semibold text-white">FREE Delivery</span>
//             {" "}on orders above ₹499 · Use code{" "}
//             <span className="font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-md">
//               TOYS10
//             </span>
//             {" "}for 10% extra off
//           </span>
//           <span className="mx-1 text-slate-700">·</span>
//           <button className="underline-offset-2 underline text-pink-400 hover:text-pink-300 transition-colors font-medium">
//             Download App →
//           </button>
//         </div>

//         {/* ── MAIN HEADER ── */}
//         <div className="bg-white shadow-[0_1px_0_rgba(0,0,0,.08)]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-16 flex items-center gap-3 sm:gap-4">

//             {/* Hamburger */}
//             <button
//               onClick={() => setDrawerOpen(true)}
//               className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors shrink-0"
//             >
//               <Menu size={22} className="text-slate-700" />
//             </button>

//             {/* LOGO */}
//             <button
//               onClick={() => router.push("/")}
//               className="shrink-0 flex items-center gap-0 select-none"
//             >
//               <span className="text-2xl sm:text-3xl font-black text-pink-600 leading-none">Goodie</span>
//               <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none"> Gear</span>
//             </button>

//             {/* ── DELIVER TO (location picker) ── */}
//             <div ref={locationRef} className="hidden xl:block relative shrink-0">
//               <button
//                 onClick={() => setLocationOpen(v => !v)}
//                 className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-pink-50 transition-colors group"
//               >
//                 <MapPin size={15} className="text-pink-500 shrink-0 group-hover:text-pink-600" />
//                 <div className="leading-tight text-left">
//                   <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">
//                     Deliver to
//                   </p>
//                   <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
//                     {location.ready
//                       ? `${location.city}${location.pin ? ` ${location.pin}` : ""}`
//                       : "Detecting…"}
//                   </p>
//                 </div>
//               </button>

//               {locationOpen && (
//                 <LocationDropdown
//                   onSelect={handleLocationSelect}
//                   onClose={() => setLocationOpen(false)}
//                 />
//               )}
//             </div>

//             {/* ── SEARCH BAR ── */}
//             <div className="hidden md:flex flex-1 h-11 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-pink-400 focus-within:border-pink-600 focus-within:shadow-[0_0_0_3px_rgba(219,39,119,.12)] transition-all bg-white">
//               <select className="h-full px-3 bg-slate-50 border-r border-slate-200 text-sm text-slate-600 outline-none font-medium cursor-pointer shrink-0 hover:bg-pink-50 transition-colors">
//                 <option>All</option>
//                 <option>RC Cars</option>
//                 <option>Teddy Bears</option>
//                 <option>LEGO</option>
//                 <option>Robots</option>
//                 <option>Dolls</option>
//               </select>
//               <input
//                 type="text"
//                 placeholder="Search toys, brands, age groups…"
//                 className="flex-1 px-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-white"
//               />
//               <button className="h-full px-5 bg-pink-600 hover:bg-pink-700 transition-colors text-white shrink-0 flex items-center justify-center">
//                 <Search size={18} />
//               </button>
//             </div>

//             {/* ── RIGHT ACTIONS ── */}
//             <div className="flex items-center gap-0.5 ml-auto">

//               {/* Mobile search */}
//               <button
//                 onClick={() => setSearchOpen(v => !v)}
//                 className="md:hidden p-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
//               >
//                 <Search size={20} className="text-slate-700" />
//               </button>

//               {/* Sign In */}
//               <button
//                 onClick={() => router.push("/login")}
//                 className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group"
//               >
//                 <User size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
//                 <div className="hidden lg:block leading-tight text-left">
//                   <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">
//                     Hello, Guest
//                   </p>
//                   <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
//                     Sign In
//                   </p>
//                 </div>
//               </button>

//               {/* Become Seller */}
//               <button
//                 onClick={() => router.push("/become-vendor")}
//                 className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group"
//               >
//                 <div className="leading-tight text-left">
//                   <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">
//                     Start selling
//                   </p>
//                   <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
//                     Become Seller
//                   </p>
//                 </div>
//               </button>

//               {/* Orders */}
//               <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group">
//                 <Package size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
//                 <div className="leading-tight text-left">
//                   <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">
//                     Returns &
//                   </p>
//                   <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
//                     Orders
//                   </p>
//                 </div>
//               </button>

//               {/* Wishlist — visible on all screen sizes */}
//               <button
//                 onClick={() => router.push("/wishlist")}
//                 className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group"
//               >
//                 <div className="relative">
//                   <Heart size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-2.5 -right-2.5 bg-pink-500 text-white text-[9px] min-w-4.5 h-4.5 rounded-full px-0.5 flex items-center justify-center font-black leading-none">
//                       {wishlistCount > 99 ? "99+" : wishlistCount}
//                     </span>
//                   )}
//                 </div>
//                 <div className="hidden lg:block leading-tight text-left">
//                   <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">My</p>
//                   <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
//                     Wishlist
//                   </p>
//                 </div>
//               </button>

//               {/* CART */}
//               <button
//                 onClick={() => router.push("/cart")}
//                 className="relative flex items-center gap-2 ml-2 px-4 sm:px-5 py-2.5 bg-pink-600 hover:bg-pink-700 transition-colors text-white rounded-xl shadow-[0_4px_14px_rgba(219,39,119,.35)] hover:shadow-[0_6px_20px_rgba(219,39,119,.45)]"
//               >
//                 <div className="relative">
//                   <ShoppingCart size={19} />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-900 text-[9px] min-w-4.5 h-4.5 rounded-full px-0.5 flex items-center justify-center font-black leading-none">
//                       {cartCount > 99 ? "99+" : cartCount}
//                     </span>
//                   )}
//                 </div>
//                 <span className="hidden sm:block text-sm font-semibold">Cart</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile search bar */}
//           {searchOpen && (
//             <div className="md:hidden px-4 pb-3 border-t border-slate-100">
//               <div className="flex h-11 mt-2.5 rounded-xl overflow-hidden border-2 border-pink-500 shadow-sm">
//                 <input
//                   autoFocus
//                   type="text"
//                   placeholder="Search toys, games, LEGO…"
//                   className="flex-1 px-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-white"
//                 />
//                 <button
//                   onClick={() => setSearchOpen(false)}
//                   className="px-4 bg-pink-600 hover:bg-pink-700 transition-colors text-white"
//                 >
//                   <Search size={16} />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* ── CATEGORY NAV BAR ── */}
//         <nav className="bg-slate-900 shadow-sm">
//           <div className="max-w-7xl mx-auto h-10 flex items-stretch overflow-x-auto no-scrollbar">

//             <button
//               onClick={() => setDrawerOpen(true)}
//               className="shrink-0 flex items-center gap-2 px-4 text-sm font-semibold text-white hover:bg-pink-600 transition-colors whitespace-nowrap border-r border-white/10"
//             >
//               <Menu size={15} />
//               <span className="hidden sm:inline">All Categories</span>
//               <span className="sm:hidden">All</span>
//             </button>

//             {navLinks.map(label => (
//               <button
//                 key={label}
//                 className="shrink-0 px-3 sm:px-4 text-xs sm:text-sm text-slate-400 hover:text-pink-300 hover:bg-pink-600/20 transition-colors whitespace-nowrap font-medium"
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </nav>
//       </header>

//       {/* ── MOBILE DRAWER ── */}
//       {drawerOpen && (
//         <div className="fixed inset-0 z-100 lg:hidden">
//           <div
//             className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
//             onClick={() => setDrawerOpen(false)}
//           />
//           <div className="absolute left-0 top-0 bottom-0 w-72 sm:w-80 bg-white shadow-2xl flex flex-col overflow-hidden">

//             {/* Drawer header */}
//             <div className="bg-slate-900 px-5 py-4 flex items-center justify-between shrink-0">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
//                   <User size={18} className="text-white" />
//                 </div>
//                 <div>
//                   <p className="text-white font-semibold text-sm">Hello, Guest</p>
//                   <p className="text-slate-400 text-xs mt-0.5">Sign in for best deals</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setDrawerOpen(false)}
//                 className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
//               >
//                 <X size={18} className="text-slate-400" />
//               </button>
//             </div>

//             {/* Sign-in CTA */}
//             <div className="px-4 py-3 bg-pink-50 border-b border-pink-100">
//               <button
//                 onClick={() => { router.push("/login"); setDrawerOpen(false); }}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
//               >
//                 Sign In / Register
//               </button>
//             </div>

//             {/* Categories */}
//             <div className="flex-1 overflow-y-auto">
//               <p className="px-5 pt-4 pb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
//                 Shop By Category
//               </p>
//               {drawerCats.map(({ icon, label }) => (
//                 <button
//                   key={label}
//                   className="w-full flex items-center justify-between px-5 py-3 hover:bg-pink-50 transition-colors border-b border-slate-50 group text-left"
//                 >
//                   <span className="flex items-center gap-3 text-sm font-medium text-slate-700 group-hover:text-pink-700">
//                     <span className="text-xl w-7 text-center">{icon}</span>
//                     {label}
//                   </span>
//                   <ChevronRight size={14} className="text-slate-300 group-hover:text-pink-400 transition-colors shrink-0" />
//                 </button>
//               ))}
//             </div>

//             {/* Footer */}
//             <div className="border-t border-slate-100 px-4 py-4 shrink-0 bg-slate-50">
//               <p className="text-[11px] text-center text-slate-400">
//                 © 2026{" "}
//                 <span className="text-pink-500 font-semibold">Goodie Gear</span>
//                 {" "}Pvt. Ltd.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, ShoppingCart, Menu, Heart, User, X,
  MapPin, Package, LocateFixed, Loader2,
  Flame, Star, Sparkles, LogOut, ChevronDown,
  LayoutDashboard, ShoppingBag,
} from "lucide-react";
import useCartStore from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import useCategory from "../hooks/useCategory";
import { Category } from "../services/categoryService";
import useAuthStore from "../store/authStore";

/* ── static special links always shown first ── */
// const specialLinks = [
//   { icon: Flame,    label: "Trending",     href: "/products",    color: "text-orange-400" },
//   { icon: Star,     label: "Best Sellers", href: "/products",    color: "text-amber-400"  },
//   { icon: Sparkles, label: "New Arrivals", href: "/products",    color: "text-pink-400"   },
// ];

/* ── types (unchanged) ── */
interface GeoResult {
  place_id: number;
  display_name: string;
  address: {
    city?: string; town?: string; village?: string;
    suburb?: string; state?: string; postcode?: string;
  };
}

function parseCity(addr: GeoResult["address"]) {
  return addr.city || addr.town || addr.village || addr.suburb || "Your Area";
}
function parsePin(addr: GeoResult["address"]) {
  return addr.postcode || "";
}

/* LocationDropdown component (unchanged) */
function LocationDropdown({ onSelect, onClose }: { onSelect: (city: string, pin: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [detecting, setDetecting] = useState(false);
  const [searching, setSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const search = useCallback((q: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!q.trim()) { setResults([]); return; }
    timerRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&countrycodes=in&addressdetails=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data: GeoResult[] = await res.json();
        setResults(data);
      } catch { /* ignore */ } finally { setSearching(false); }
    }, 500);
  }, []);

  const handleChange = (v: string) => { setQuery(v); search(v); };

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data: GeoResult = await res.json();
          onSelect(parseCity(data.address), parsePin(data.address));
        } catch { /* ignore */ } finally { setDetecting(false); }
      },
      () => setDetecting(false),
      { timeout: 8000 }
    );
  };

  return (
    <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-gray-100">
        <p className="text-sm font-black text-gray-900">Deliver to</p>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <X size={14} className="text-gray-500" />
        </button>
      </div>
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-2 h-10 rounded-xl border-2 border-gray-200 focus-within:border-pink-500 transition-colors px-3 bg-gray-50">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search city, area, pincode…"
            className="flex-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent"
          />
          {searching && <Loader2 size={13} className="text-pink-500 animate-spin shrink-0" />}
        </div>
      </div>
      <button
        onClick={detectLocation}
        disabled={detecting}
        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors group border-b border-gray-100"
      >
        {detecting ? <Loader2 size={16} className="text-pink-500 animate-spin" /> : <LocateFixed size={16} className="text-pink-600 group-hover:text-pink-700" />}
        <span className="text-sm font-semibold text-pink-600 group-hover:text-pink-700">
          {detecting ? "Detecting location…" : "Use my current location"}
        </span>
      </button>
      {results.length > 0 && (
        <ul className="max-h-52 overflow-y-auto">
          {results.map((r) => {
            const city = parseCity(r.address);
            const pin = parsePin(r.address);
            const parts = r.display_name.split(",").slice(0, 3).join(",");
            return (
              <li key={r.place_id}>
                <button
                  onClick={() => onSelect(city, pin)}
                  className="w-full flex items-start gap-3 px-4 py-2.5 hover:bg-pink-50 transition-colors text-left group"
                >
                  <MapPin size={14} className="text-gray-400 group-hover:text-pink-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-pink-700 line-clamp-1">
                      {city}{pin ? ` – ${pin}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-1">{parts}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {!results.length && query.length > 1 && !searching && (
        <p className="px-4 py-3 text-sm text-gray-400 text-center">No results found</p>
      )}
      {!query && !results.length && (
        <p className="px-4 py-3 text-xs text-gray-400 text-center pb-3">Type a city, area or pincode to search</p>
      )}
    </div>
  );
}

/* ── main navbar with redesigned categories ── */
export default function Navbar() {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location, setLocation] = useState({ city: "Mumbai", pin: "400001", ready: false });
  const locationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuthStore() as { user: any; logout: () => void };
  const { categories } = useCategory();

  const cartItems = useCartStore((s: { cartItems: unknown[]; clearCart: () => void }) => s.cartItems);
  const clearCart = useCartStore((s: { cartItems: unknown[]; clearCart: () => void }) => s.clearCart);
  const cartCount = cartItems.reduce((sum: number, item: unknown) => sum + ((item as { quantity?: number }).quantity ?? 1), 0);
  const wishlistItems = useWishlistStore((s) => s.wishlistItems);
  const wishlistCount = user ? wishlistItems.length : 0;

  useEffect(() => {
    const saved = localStorage.getItem("gudigear-location");
    if (saved) {
      try {
        const { city, pin } = JSON.parse(saved);
        setLocation({ city, pin, ready: true });
        return;
      } catch { /* ignore */ }
    }
    if (!navigator.geolocation) { setLocation(l => ({ ...l, ready: true })); return; }
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&addressdetails=1`,
            { headers: { "Accept-Language": "en" } }
          );
          const data: GeoResult = await res.json();
          const city = parseCity(data.address);
          const pin = parsePin(data.address);
          setLocation({ city, pin, ready: true });
          localStorage.setItem("gudigear-location", JSON.stringify({ city, pin }));
        } catch { setLocation(l => ({ ...l, ready: true })); }
      },
      () => setLocation(l => ({ ...l, ready: true })),
      { timeout: 6000 }
    );
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
    };
    if (locationOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [locationOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    clearCart();
    useWishlistStore.getState().clearWishlist(); 
    setUserMenuOpen(false);
    setDrawerOpen(false);
    router.push("/");
  };

  const handleLocationSelect = (city: string, pin: string) => {
    setLocation({ city, pin, ready: true });
    localStorage.setItem("gudigear-location", JSON.stringify({ city, pin }));
    setLocationOpen(false);
  };

  return (
    <>
      <header className="w-full sticky top-0 z-50 flex flex-col">
        {/* announcement bar unchanged */}
        <div className="hidden sm:flex items-center justify-center gap-2 bg-slate-900 text-slate-300 py-2 px-4 text-xs">
          <span className="text-pink-400">🎁</span>
          <span><span className="font-semibold text-white">FREE Delivery</span> on orders above ₹499 · Use code <span className="font-black text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded-md">TOYS10</span> for 10% extra off</span>
          <span className="mx-1 text-slate-700">·</span>
          <button className="underline-offset-2 underline text-pink-400 hover:text-pink-300 transition-colors font-medium">Download App →</button>
        </div>

        {/* main header (unchanged) */}
        <div className="bg-white shadow-[0_1px_0_rgba(0,0,0,.08)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-16 flex items-center gap-3 sm:gap-4">
            <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors shrink-0">
              <Menu size={22} className="text-slate-700" />
            </button>
            <button onClick={() => router.push("/")} className="shrink-0 flex items-center gap-0 select-none">
              <span className="text-2xl sm:text-3xl font-black text-pink-600 leading-none">Goodie</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 leading-none"> Gear</span>
            </button>

            {/* location picker (unchanged) */}
            <div ref={locationRef} className="hidden xl:block relative shrink-0">
              <button onClick={() => setLocationOpen(v => !v)} className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-pink-50 transition-colors group">
                <MapPin size={15} className="text-pink-500 shrink-0 group-hover:text-pink-600" />
                <div className="leading-tight text-left">
                  <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">Deliver to</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">
                    {location.ready ? `${location.city}${location.pin ? ` ${location.pin}` : ""}` : "Detecting…"}
                  </p>
                </div>
              </button>
              {locationOpen && <LocationDropdown onSelect={handleLocationSelect} onClose={() => setLocationOpen(false)} />}
            </div>

            {/* search bar (unchanged) */}
            <div className="hidden md:flex flex-1 h-11 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-pink-400 focus-within:border-pink-600 focus-within:shadow-[0_0_0_3px_rgba(219,39,119,.12)] transition-all bg-white">
              <select className="h-full px-3 bg-slate-50 border-r border-slate-200 text-sm text-slate-600 outline-none font-medium cursor-pointer shrink-0 hover:bg-pink-50 transition-colors">
                <option>All</option>
                <option>RC Cars</option>
                <option>Teddy Bears</option>
                <option>LEGO</option>
                <option>Robots</option>
                <option>Dolls</option>
              </select>
              <input type="text" placeholder="Search toys, brands, age groups…" className="flex-1 px-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-white" />
              <button className="h-full px-5 bg-pink-600 hover:bg-pink-700 transition-colors text-white shrink-0 flex items-center justify-center">
                <Search size={18} />
              </button>
            </div>

            {/* right actions (unchanged) */}
            <div className="flex items-center gap-0.5 ml-auto">
              <button onClick={() => setSearchOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors">
                <Search size={20} className="text-slate-700" />
              </button>
              {user ? (
                <div ref={userMenuRef} className="relative hidden md:block">
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-black shrink-0">
                      {user.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <div className="hidden lg:block leading-tight text-left">
                      <p className="text-[10px] text-slate-400">Hello,</p>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors max-w-24 truncate">{user.name}</p>
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 hidden lg:block ${userMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      <div className="px-4 py-3 bg-pink-50 border-b border-pink-100">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-1.5">
                        <button onClick={() => { router.push("/orders"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <ShoppingBag size={15} className="text-gray-400" /> My Orders
                        </button>
                        <button onClick={() => { router.push("/wishlist"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Heart size={15} className="text-gray-400" /> Wishlist
                        </button>
                        {(user.role === "vendor") && (
                          <button onClick={() => { router.push("/vendor/vendor-dashboard"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <LayoutDashboard size={15} className="text-gray-400" /> Vendor Dashboard
                          </button>
                        )}
                        {(user.role === "admin") && (
                          <button onClick={() => { router.push("/admin"); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                            <LayoutDashboard size={15} className="text-gray-400" /> Admin Panel
                          </button>
                        )}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors font-semibold">
                            <LogOut size={15} /> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => router.push("/login")} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group">
                  <User size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
                  <div className="hidden lg:block leading-tight text-left">
                    <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">Hello, Guest</p>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">Sign In</p>
                  </div>
                </button>
              )}
              <button onClick={() => router.push("/become-vendor")} className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group">
                <div className="leading-tight text-left">
                  <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">Start selling</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">Become Seller</p>
                </div>
              </button>
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group">
                <Package size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
                <div className="leading-tight text-left">
                  <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">Returns &</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">Orders</p>
                </div>
              </button>
              <button onClick={() => router.push("/wishlist")} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-pink-50 transition-colors group">
                <div className="relative">
                  <Heart size={18} className="text-slate-500 group-hover:text-pink-600 transition-colors" />
                  {wishlistCount > 0 && <span className="absolute -top-2.5 -right-2.5 bg-pink-500 text-white text-[9px] min-w-4.5 h-4.5 rounded-full px-0.5 flex items-center justify-center font-black leading-none">{wishlistCount > 99 ? "99+" : wishlistCount}</span>}
                </div>
                <div className="hidden lg:block leading-tight text-left">
                  <p className="text-[10px] text-slate-400 group-hover:text-pink-400 transition-colors">My</p>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-pink-600 transition-colors">Wishlist</p>
                </div>
              </button>
              <button onClick={() => router.push("/cart")} className="relative flex items-center gap-2 ml-2 px-4 sm:px-5 py-2.5 bg-pink-600 hover:bg-pink-700 transition-colors text-white rounded-xl shadow-[0_4px_14px_rgba(219,39,119,.35)] hover:shadow-[0_6px_20px_rgba(219,39,119,.45)]">
                <div className="relative">
                  <ShoppingCart size={19} />
                  {cartCount > 0 && <span className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-900 text-[9px] min-w-4.5 h-4.5 rounded-full px-0.5 flex items-center justify-center font-black leading-none">{cartCount > 99 ? "99+" : cartCount}</span>}
                </div>
                <span className="hidden sm:block text-sm font-semibold">Cart</span>
              </button>
            </div>
          </div>
          {searchOpen && (
            <div className="md:hidden px-4 pb-3 border-t border-slate-100">
              <div className="flex h-11 mt-2.5 rounded-xl overflow-hidden border-2 border-pink-500 shadow-sm">
                <input autoFocus type="text" placeholder="Search toys, games, LEGO…" className="flex-1 px-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-white" />
                <button onClick={() => setSearchOpen(false)} className="px-4 bg-pink-600 hover:bg-pink-700 transition-colors text-white"><Search size={16} /></button>
              </div>
            </div>
          )}
        </div>

        {/* ── CATEGORY NAV BAR (DESKTOP) — dynamic ── */}
        <nav className="bg-slate-900 shadow-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto h-12 flex items-center overflow-x-auto no-scrollbar gap-1 px-4">
            {/* All Categories button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-600 hover:bg-pink-700 transition-all text-white font-semibold text-sm shadow-md"
            >
              <Menu size={16} />
              <span className="hidden sm:inline">All Categories</span>
              <span className="sm:hidden">All</span>
            </button>

            {/* Static special pills */}
            {/* {specialLinks.map(({ icon: Icon, label, href, color }) => (
              <Link
                key={label}
                href={href}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <Icon size={14} className={color} />
                <span>{label}</span>
              </Link>
            ))} */}

            {/* Dynamic category pills from API */}
            {categories.map((cat: Category) => (
              <Link
                key={cat._id}
                href={`/categories/${encodeURIComponent(cat.name)}`}
                className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* ── REDESIGNED MOBILE DRAWER CATEGORIES (2‑COLUMN GRID) ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer header */}
            <div className="bg-slate-900 px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 overflow-hidden shrink-0">
                  {user ? (
                    <span className="text-white font-black text-base">{user.name?.[0]?.toUpperCase() ?? "U"}</span>
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{user ? `Hello, ${user.name}` : "Hello, Guest"}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{user ? user.email : "Sign in for best deals"}</p>
                </div>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            {user ? (
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex flex-col gap-2">
                <button onClick={() => { router.push("/orders"); setDrawerOpen(false); }} className="w-full flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5 transition-colors">
                  <ShoppingBag size={15} /> My Orders
                </button>
                {user.role === "vendor" && (
                  <button onClick={() => { router.push("/vendor/vendor-dashboard"); setDrawerOpen(false); }} className="w-full flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5 transition-colors">
                    <LayoutDashboard size={15} /> Vendor Dashboard
                  </button>
                )}
                {user.role === "admin" && (
                  <button onClick={() => { router.push("/admin"); setDrawerOpen(false); }} className="w-full flex items-center gap-2 text-slate-300 hover:text-white text-sm py-1.5 transition-colors">
                    <LayoutDashboard size={15} /> Admin Panel
                  </button>
                )}
                <button onClick={handleLogout} className="w-full flex items-center gap-2 text-rose-400 hover:text-rose-300 text-sm font-semibold py-1.5 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 bg-pink-50 border-b border-pink-100">
                <button onClick={() => { router.push("/login"); setDrawerOpen(false); }} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  Sign In / Register
                </button>
              </div>
            )}

            {/* Categories in grid layout — dynamic */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Shop By Category</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat: Category) => (
                  <button
                    key={cat._id}
                    onClick={() => { router.push(`/categories/${encodeURIComponent(cat.name)}`); setDrawerOpen(false); }}
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-pink-50 transition-all group text-center border border-slate-100 hover:border-pink-200"
                  >
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-lg">🧸</div>
                    )}
                    <span className="text-xs font-medium text-slate-700 group-hover:text-pink-700 line-clamp-2 leading-tight">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer (unchanged) */}
            <div className="border-t border-slate-100 px-4 py-4 shrink-0 bg-slate-50">
              <p className="text-[11px] text-center text-slate-400">© 2026 <span className="text-pink-500 font-semibold">Goodie Gear</span> Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
