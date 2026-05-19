"use client";

import { useState } from "react";
import Image from "next/image";

import {
  Search,
  ShoppingCart,
  Menu,
  Heart,
  User,
  X,
  MapPin,
  ChevronRight,
  Package,
  HelpCircle,
} from "lucide-react";

const navLinks = [
  "🔥 Trending",
  "🚗 Remote Cars",
  "🧩 LEGO Sets",
  "📚 Educational",
  "🤖 Robots",
  "⭐ Best Sellers",
  "✨ New Arrivals",
  "🎲 Board Games",
  "🧸 Soft Toys",
];

const drawerCats = [
  { icon: "🚗", label: "Remote Cars & RC" },
  { icon: "🧸", label: "Soft Toys & Dolls" },
  { icon: "🧩", label: "LEGO & Building" },
  { icon: "📚", label: "Educational Toys" },
  { icon: "🤖", label: "Robots & Tech Toys" },
  { icon: "🎲", label: "Board Games" },
  { icon: "🎮", label: "Video Games" },
  { icon: "✈️", label: "Drones & RC Aircraft" },
  { icon: "🎨", label: "Art & Craft" },
  { icon: "🏏", label: "Outdoor & Sports" },
];

const brandImages = [
  {
    name: "LEGO",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
  },
  {
    name: "Barbie",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
  },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="w-full sticky top-0 z-50">

        {/* ANNOUNCEMENT BAR */}
        <div className="bg-[#212121] text-white text-center py-1.5 px-4 text-[11px] sm:text-xs font-medium hidden sm:block">

          <span className="mr-1">🎁</span>

          <span className="font-bold text-pink-300">
            FREE Delivery
          </span>

          <span className="mx-1">
            on orders above ₹499 ·
          </span>

          <span>
            Use code
          </span>

          <span className="font-bold text-pink-300 mx-1">
            TOYS10
          </span>

          <span>
            for 10% extra off ·
          </span>

          <span className="underline cursor-pointer hover:text-pink-300 transition-colors ml-1">
            Download App →
          </span>

        </div>

        {/* MAIN HEADER */}
        <div className="bg-white border-b border-gray-200 shadow-sm">

          <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 h-14 sm:h-16 flex items-center gap-2 sm:gap-3 lg:gap-5">

            {/* MENU */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors shrink-0"
            >
              <Menu size={21} className="text-gray-700" />
            </button>

            {/* LOGO */}
            <a
              href="/"
              className="shrink-0 flex items-center select-none"
            >
              <span className="text-xl sm:text-2xl font-black text-pink-600">
                Gudi
              </span>

              <span className="text-xl sm:text-2xl font-black text-gray-900">
                gere
              </span>
            </a>

            {/* LOCATION */}
            <div className="hidden xl:flex items-center gap-1.5 cursor-pointer shrink-0 group">

              <MapPin
                size={15}
                className="text-pink-500 shrink-0"
              />

              <div className="leading-tight">

                <p className="text-[10px] text-gray-400">
                  Deliver to
                </p>

                <p className="text-sm font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                  Mumbai
                </p>

              </div>
            </div>

            {/* SEARCH */}
            <div className="hidden md:flex flex-1 h-10 lg:h-[42px] rounded-xl overflow-hidden border-2 border-gray-200 hover:border-pink-400 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all bg-white">

              <select className="h-full px-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 outline-none font-medium">

                <option>All</option>
                <option>Remote Cars</option>
                <option>Teddy Bears</option>
                <option>LEGO</option>
                <option>Robots</option>

              </select>

              <input
                type="text"
                placeholder="Search toys, games, LEGO, puzzles..."
                className="flex-1 px-4 text-sm text-gray-700 placeholder-gray-400 outline-none bg-white"
              />

              <button className="h-full px-5 bg-pink-600 hover:bg-pink-700 transition-colors text-white">
                <Search size={18} />
              </button>

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-1 ml-auto">

              {/* MOBILE SEARCH */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
              >
                <Search
                  size={20}
                  className="text-gray-700"
                />
              </button>

              {/* ACCOUNT */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">

                <User
                  size={17}
                  className="text-gray-600"
                />

                <div className="hidden lg:block leading-tight">

                  <p className="text-[10px] text-gray-400">
                    Hello, Guest
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    Sign In
                  </p>

                </div>
              </div>

              {/* ORDERS */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">

                <Package
                  size={17}
                  className="text-gray-600"
                />

                <div className="leading-tight">

                  <p className="text-[10px] text-gray-400">
                    Returns &
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    Orders
                  </p>

                </div>
              </div>

              {/* WISHLIST */}
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors group">

                <Heart
                  size={17}
                  className="text-gray-600 group-hover:text-pink-500 transition-colors"
                />

                <div className="leading-tight">

                  <p className="text-[10px] text-gray-400">
                    My
                  </p>

                  <p className="text-sm font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                    Wishlist
                  </p>

                </div>
              </button>

              {/* CART */}
              <button className="relative flex items-center gap-2 ml-1 px-4 py-2.5 bg-pink-600 hover:bg-pink-700 transition-colors text-white rounded-xl shadow-lg">

                <div className="relative">

                  <ShoppingCart size={18} />

                  <span className="absolute -top-2.5 -right-2.5 bg-white text-pink-600 text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-black">
                    2
                  </span>

                </div>

                <span className="hidden sm:block text-sm font-bold">
                  Cart
                </span>

              </button>
            </div>
          </div>

          {/* MOBILE SEARCH */}
          {searchOpen && (
            <div className="md:hidden px-3 pb-3 bg-white border-t border-gray-100">

              <div className="flex h-10 mt-2 rounded-xl overflow-hidden border-2 border-pink-500 shadow-sm">

                <input
                  autoFocus
                  type="text"
                  placeholder="Search toys, games..."
                  className="flex-1 px-4 text-sm text-gray-700 outline-none bg-white"
                />

                <button
                  onClick={() => setSearchOpen(false)}
                  className="px-4 bg-pink-600 hover:bg-pink-700 transition-colors text-white"
                >
                  <Search size={16} />
                </button>

              </div>
            </div>
          )}
        </div>

        {/* CATEGORY NAV */}
        <nav className="bg-[#212121] border-b border-white/5">

          <div className="max-w-7xl mx-auto h-10 flex items-stretch overflow-x-auto no-scrollbar">

            <button
              onClick={() => setDrawerOpen(true)}
              className="shrink-0 flex items-center gap-2 px-4 font-bold text-white hover:bg-pink-600 transition-colors whitespace-nowrap text-xs sm:text-sm border-r border-white/10"
            >

              <Menu size={15} />

              <span className="hidden sm:inline">
                All Categories
              </span>

              <span className="sm:hidden">
                All
              </span>

            </button>

            {navLinks.map((label) => (
              <button
                key={label}
                className="shrink-0 px-4 text-xs sm:text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap font-medium"
              >
                {label}
              </button>
            ))}

          </div>
        </nav>

        {/* BRAND IMAGES */}
        {/* <div className="bg-white border-b border-gray-100">

          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-4 overflow-x-auto no-scrollbar">

            {brandImages.map((brand, i) => (
              <div
                key={i}
                className="relative shrink-0 w-40 h-20 rounded-2xl overflow-hidden border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all group"
              >

                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 160px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                <div className="absolute inset-0 flex items-center justify-center">

                  <p className="text-white font-black text-lg">
                    {brand.name}
                  </p>

                </div>
              </div>
            ))}

          </div>
        </div> */}

      </header>

      {/* DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="absolute left-0 top-0 bottom-0 w-72 sm:w-80 bg-white shadow-2xl flex flex-col overflow-hidden">

            {/* TOP */}
            <div className="bg-pink-600 px-4 py-4 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">

                  <User
                    size={18}
                    className="text-white"
                  />

                </div>

                <div>

                  <p className="text-white font-bold text-sm">
                    Hello, Guest
                  </p>

                  <p className="text-pink-100 text-xs">
                    Sign in for best experience
                  </p>

                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded hover:bg-white/20 transition-colors"
              >

                <X
                  size={20}
                  className="text-white"
                />

              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto">

              <p className="px-4 pt-4 pb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Shop By Category
              </p>

              {drawerCats.map(({ icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors border-b border-gray-50 group"
                >

                  <span className="flex items-center gap-3 text-sm font-medium text-gray-700 group-hover:text-pink-700">

                    <span className="text-lg w-6">
                      {icon}
                    </span>

                    {label}

                  </span>

                  <ChevronRight
                    size={15}
                    className="text-gray-400 group-hover:text-pink-500"
                  />

                </button>
              ))}

            </div>
          </div>
        </div>
      )}
    </>
  );
}