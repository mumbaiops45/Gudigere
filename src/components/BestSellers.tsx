"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";

/* ── products data ───────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Barbie Dream House Set",
    price: 2499,
    mrp: 3999,
    rating: 4.9,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=800",
    badge: "Best Seller",
    badgeColor: "bg-pink-600",
    delivery: "Free Delivery Tomorrow",
  },
  {
    id: 2,
    name: "Remote Racing Car Pro",
    price: 1499,
    mrp: 2499,
    rating: 4.8,
    reviews: 1892,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800",
    badge: "Trending 🔥",
    badgeColor: "bg-blue-600",
    delivery: "Free Delivery Tomorrow",
  },
  {
    id: 3,
    name: "Cute Teddy Bear XL",
    price: 899,
    mrp: 1499,
    rating: 4.9,
    reviews: 3104,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",
    badge: "Most Loved",
    badgeColor: "bg-amber-500",
    delivery: "Free Delivery",
  },
  {
    id: 4,
    name: "LEGO Classic 500 Pieces",
    price: 2999,
    mrp: 4199,
    rating: 4.9,
    reviews: 1248,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
    badge: "Top Rated ⭐",
    badgeColor: "bg-violet-600",
    delivery: "Free Delivery",
  },
  {
    id: 5,
    name: "Smart Robot Buddy",
    price: 1999,
    mrp: 3199,
    rating: 4.5,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800",
    badge: "New Arrival",
    badgeColor: "bg-emerald-600",
    delivery: "Free Delivery",
  },
  {
    id: 6,
    name: "Art & Craft Mega Kit",
    price: 1299,
    mrp: 1999,
    rating: 4.7,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1551887373-6edba6dacbb1?q=80&w=800",
    badge: "Value Pick",
    badgeColor: "bg-rose-600",
    delivery: "Free Delivery Tomorrow",
  },
  {
    id: 7,
    name: "Dinosaur Puzzle 3D",
    price: 749,
    mrp: 1199,
    rating: 4.6,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800",
    badge: "Popular",
    badgeColor: "bg-orange-600",
    delivery: "Free Delivery",
  },
];

/* ── product card ─────────────────────────────────────────────── */
function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const [wished, setWished] = useState(false);
  const pct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden
        border border-slate-100
        shadow-[0_2px_12px_rgba(15,23,42,.07)]
        hover:shadow-[0_14px_36px_rgba(15,23,42,.14)]
        transition-shadow duration-300 cursor-pointer will-change-transform
        shrink-0 w-48 sm:w-52"
    >
      {/* Image */}
      <div className="relative h-44 bg-slate-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 192px, 208px"
          className="object-cover transition-transform duration-500
            group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/6
          transition-colors duration-300" />

        {/* Badge */}
        <div className={`absolute top-2.5 left-2.5 z-10 ${product.badgeColor}
          text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md`}>
          {product.badge}
        </div>

        {/* Discount */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-emerald-500
          text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm">
          {pct}% OFF
        </div>

        {/* Wishlist — shows on hover */}
        <motion.button
          whileHover={{ scale: 1.18 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); setWished(v => !v); }}
          className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8
            bg-white/92 backdrop-blur-sm rounded-full shadow-md
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            size={13}
            fill={wished ? "#db2777" : "none"}
            className={wished ? "text-pink-600" : "text-slate-400"}
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-3.5">
        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                size={10}
                fill={i <= Math.round(product.rating) ? "#f59e0b" : "none"}
                className={
                  i <= Math.round(product.rating)
                    ? "text-amber-400"
                    : "text-slate-200"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Name */}
        <h3 className="text-xs sm:text-sm font-semibold text-slate-900
          leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className="text-sm sm:text-base font-black text-slate-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 line-through">
            ₹{product.mrp.toLocaleString()}
          </span>
        </div>
        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
          {product.delivery}
        </p>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-3 w-full bg-slate-900 hover:bg-pink-600 text-white
            text-[11px] sm:text-xs font-semibold py-2.5 rounded-xl
            flex items-center justify-center gap-1.5
            transition-colors duration-200 shadow-sm
            hover:shadow-[0_4px_12px_rgba(219,39,119,.4)]"
        >
          <ShoppingCart size={12} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ── main section ─────────────────────────────────────────────── */
export default function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="section-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        py-8 sm:py-10 lg:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end
            sm:justify-between gap-3 mb-6 sm:mb-8"
        >
          <div>
            <span className="sec-badge">⭐ Most Popular</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black
              leading-tight tracking-tight mt-1.5">
              <span className="text-slate-900">Best</span>{" "}
              <span className="text-grad-pink">Sellers</span>{" "}
              <span className="text-slate-900">This Week</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1.5">
              Most loved by 10,000+ happy parents across India.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {([-1, 1] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-9 h-9 rounded-full border border-slate-200 bg-white
                  hover:border-pink-500 hover:bg-pink-50
                  flex items-center justify-center
                  transition-all duration-200 shadow-sm"
              >
                {dir === -1
                  ? <ChevronLeft size={15} className="text-slate-600" />
                  : <ChevronRight size={15} className="text-slate-600" />
                }
              </button>
            ))}

            <motion.button
              whileHover={{ x: 2 }}
              className="flex items-center gap-1.5 text-sm font-bold
                text-pink-600 hover:text-pink-700 transition-colors shrink-0"
            >
              View All
              <Zap size={13} />
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth
            no-scrollbar pb-2"
        >
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p className="sm:hidden text-center text-[11px] text-slate-400 mt-3">
          ← Swipe to explore →
        </p>

      </div>
    </section>
  );
}

