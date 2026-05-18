"use client";

import {
  Search,
  ShoppingCart,
  MapPin,
  Menu,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50">

      {/* TOP NAVBAR */}
      <div className="bg-white border-b border-gray-200">

        <div className="max-w-375 mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">

          {/* LOGO */}
          <div className="flex items-center cursor-pointer shrink-0">

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Gudi
              <span className="text-amber-500">
                gere
              </span>
            </h1>
          </div>

          {/* SEARCH */}
          <div className="flex flex-1 max-w-3xl h-13 border border-gray-300 rounded-xl overflow-hidden bg-white">

            {/* CATEGORY */}
            <select className="px-4 bg-gray-100 text-sm outline-none border-r border-gray-300 text-gray-700">

              <option>All</option>
              <option>Remote Cars</option>
              <option>Teddy Bears</option>
              <option>LEGO</option>
              <option>Robots</option>
              <option>Games</option>
            </select>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Search toys, games, LEGO..."
              className="flex-1 px-5 outline-none text-[15px]"
            />

            {/* BUTTON */}
            <button className="w-15 bg-amber-500 hover:bg-amber-600 transition flex items-center justify-center text-white">
              <Search size={20} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6 shrink-0">

            {/* LOCATION */}
            <div className="hidden lg:flex items-center gap-2 cursor-pointer">

              <MapPin
                size={18}
                className="text-gray-500"
              />

              <div className="leading-tight">
                <p className="text-xs text-gray-500">
                  Deliver to
                </p>

                <p className="text-sm font-semibold">
                  Mumbai
                </p>
              </div>
            </div>

            {/* ACCOUNT */}
            <div className="hidden md:block cursor-pointer">

              <p className="text-xs text-gray-500">
                Hello, Sign in
              </p>

              <p className="text-sm font-semibold">
                Account
              </p>
            </div>

            {/* CART */}
            <button className="relative flex items-center gap-2">

              <div className="relative">

                <ShoppingCart
                  size={28}
                  className="text-gray-800"
                />

                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </div>

              <span className="hidden md:block text-sm font-semibold">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>

     {/* BOTTOM NAVBAR */}
<div className="bg-[#111827] text-white border-b border-gray-800">

  <div className="max-w-375 mx-auto px-6 lg:px-10 h-13 flex items-center justify-center gap-10 overflow-x-auto text-sm font-medium">

    {/* ALL CATEGORIES */}
    <button className="flex items-center gap-2 hover:text-amber-500 transition whitespace-nowrap">
      <Menu size={18} />
      All Categories
    </button>

    {/* CATEGORY ITEMS */}
    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Trending Toys
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Remote Cars
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      LEGO Sets
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Educational Toys
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Action Figures
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Best Sellers
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      New Arrivals
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Board Games
    </button>

    <button className="hover:text-amber-500 transition whitespace-nowrap">
      Soft Toys
    </button>
  </div>
</div>
    </header>
  );
}