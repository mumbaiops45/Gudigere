"use client";

import { useState } from "react";
import { ShoppingCart, Zap, Heart, Star } from "lucide-react";

type Props = { product: any };

export default function ProductCard({ product }: Props) {
  const [wished, setWished] = useState(false);
  const mrp     = product.price + 500;
  const pct     = Math.round(((mrp - product.price) / mrp) * 100);

  return (
    <div className="product-card flex flex-col h-full group cursor-pointer">

      {/* ── IMAGE ── */}
      <div className="relative bg-slate-50 flex items-center justify-center overflow-hidden"
           style={{ height: "13rem" }}>

        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-5 group-hover:scale-[1.07] transition-transform duration-500"
        />

        {/* Discount pill */}
        <span className="absolute top-3 left-3 bg-pink-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {pct}% off
        </span>

        {/* Wishlist — always visible */}
        <button
          onClick={(e) => { e.stopPropagation(); setWished((v) => !v); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:border-pink-300 hover:bg-pink-50 transition-all duration-200"
        >
          <Heart
            size={14}
            fill={wished ? "#db2777" : "none"}
            className={wished ? "text-pink-600" : "text-slate-400"}
          />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-4 flex flex-col flex-1">

        {/* Vendor */}
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          {product.vendor}
        </p>

        {/* Title */}
        <h2 className="text-[0.8125rem] sm:text-sm text-slate-800 font-medium leading-snug mt-1 line-clamp-2 min-h-9 sm:min-h-10">
          {product.title}
        </h2>

        {/* Star rating */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                fill={i <= 4 ? "#f59e0b" : "none"}
                className={i <= 4 ? "text-amber-400" : "text-slate-200"}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-medium">(245)</span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap mt-2.5">
          <span className="text-base sm:text-lg font-bold text-slate-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 line-through">
            ₹{mrp.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-emerald-600">
            {pct}% off
          </span>
        </div>

        {/* Delivery */}
        <p className="text-[11px] font-medium text-emerald-600 mt-0.5 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
          Free Delivery
        </p>

        {/* ── BUTTONS ── */}
        <div className="flex gap-2 mt-auto pt-4">
          <button className="btn-base btn-dark flex-1 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <ShoppingCart size={12} />
            Add to Cart
          </button>
          <button className="btn-base btn-pink flex-1 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm">
            <Zap size={12} />
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}
