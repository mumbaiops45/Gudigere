"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package2,
  Search,
  Plus,
  Star,
  ImageIcon,
} from "lucide-react";

import useVendorProduct from "@/hooks/useVendorProduct";
import { Product } from "@/services/vendorProductService";

export default function MyProductsPage() {
  const router = useRouter();
  const { products, loading } = useVendorProduct();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p: Product) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount   = products.filter((p: Product) => p.isActive).length;
  const outOfStock    = products.filter((p: Product) => p.stock === 0).length;

  /* ── loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8 animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded-xl mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[1,2,3,4].map((i) => <div key={i} className="bg-white rounded-2xl h-24 border border-gray-100" />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <div key={i} className="bg-white rounded-xl h-72 border border-gray-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-400 mt-1 text-sm">Your store inventory overview</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-11 w-full sm:w-64 bg-white border border-gray-200 rounded-xl pl-9 pr-4 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
              />
            </div>
            <button
              onClick={() => router.push("/vendor/add-product")}
              className="h-11 px-5 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-pink-200"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: "Total",      value: products.length, color: "text-gray-900",  bg: "bg-pink-50",   icon: <Package2 size={18} className="text-pink-500" /> },
            { label: "Active",     value: activeCount,     color: "text-green-600", bg: "bg-green-50",  icon: <Package2 size={18} className="text-green-500" /> },
            { label: "Out of Stock", value: outOfStock,    color: "text-red-600",   bg: "bg-red-50",    icon: <Package2 size={18} className="text-red-400" /> },
            { label: "Featured",   value: products.filter((p: Product) => p.isFeatured).length, color: "text-amber-600", bg: "bg-amber-50", icon: <Star size={18} className="text-amber-500" /> },
          ].map(({ label, value, color, bg, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                {icon}
              </div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className={`text-xl font-bold mt-0.5 ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-400 flex items-center justify-center mb-4">
              <Package2 size={30} />
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              {search ? "No products match your search" : "No Products Yet"}
            </h2>
            <p className="text-gray-400 mt-1 text-sm mb-5">
              {search ? "Try a different keyword" : "Start by adding your first product"}
            </p>
            {!search && (
              <button
                onClick={() => router.push("/vendor/add-product")}
                className="h-10 px-5 rounded-xl bg-linear-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold flex items-center gap-2 hover:from-pink-600 hover:to-rose-600 transition shadow-md shadow-pink-200"
              >
                <Plus size={15} /> Add First Product
              </button>
            )}
          </div>
        )}

        {/* ── Product grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((product: Product) => {
            const pct = product.discountPrice > 0
              ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
              : 0;

            return (
              <div
                key={product._id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                {/* Image */}
                <div className="relative bg-white border-b border-gray-100 flex items-center justify-center" style={{ height: 200 }}>
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      style={{ height: 200 }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-50">
                      <ImageIcon size={32} className="text-gray-200" />
                    </div>
                  )}
                  {pct > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{pct}%
                    </span>
                  )}
                  <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-3 flex flex-col flex-1">
                  {product.brand && (
                    <p className="text-xs text-blue-600 font-medium mb-0.5 truncate">{product.brand}</p>
                  )}
                  <h2 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 min-h-10">
                    {product.title}
                  </h2>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.category && (
                      <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{product.category}</span>
                    )}
                    {(product.age ?? 0) > 0 && (
                      <span className="bg-blue-50 text-blue-500 text-[10px] px-2 py-0.5 rounded-full">Age {product.age}+</span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{(product.discountPrice > 0 ? product.discountPrice : product.price).toLocaleString("en-IN")}
                      </span>
                      {product.discountPrice > 0 && (
                        <span className="text-xs text-gray-400 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </p>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <span className="text-xs text-gray-500">{product.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("/vendor/add-product")}
                    className="mt-auto pt-3 w-full h-9 rounded border border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100 transition text-xs font-semibold"
                  >
                    Manage in Studio
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
