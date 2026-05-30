"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ── banners data ─────────────────────────────────────────────── */
const banners = [
  {
    emoji:     "⚡",
    tag:       "Flash Sale — Today Only",
    title:     "Up to 60% OFF",
    sub:       "Remote cars, robots & more",
    cardBg:    "bg-linear-to-br from-pink-50 to-rose-50",
    border:    "border-pink-100",
    iconBg:    "bg-pink-600",
    tagColor:  "text-pink-600",
    cta:       "Shop Now",
    ctaClass:  "bg-pink-600 hover:bg-pink-700",
  },
  {
    emoji:     "🎁",
    tag:       "Limited Time Offer",
    title:     "Free Gifting Kit",
    sub:       "On all orders above ₹999",
    cardBg:    "bg-linear-to-br from-amber-50 to-orange-50",
    border:    "border-amber-100",
    iconBg:    "bg-amber-500",
    tagColor:  "text-amber-600",
    cta:       "Grab Deal",
    ctaClass:  "bg-amber-500 hover:bg-amber-600",
  },
  {
    emoji:     "🚚",
    tag:       "Every Order",
    title:     "Free Delivery",
    sub:       "On orders above ₹499",
    cardBg:    "bg-linear-to-br from-emerald-50 to-teal-50",
    border:    "border-emerald-100",
    iconBg:    "bg-emerald-600",
    tagColor:  "text-emerald-700",
    cta:       "Order Now",
    ctaClass:  "bg-emerald-600 hover:bg-emerald-700",
  },
];

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {banners.map((b, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`${b.cardBg} border ${b.border} rounded-2xl p-4 sm:p-5
            cursor-pointer flex items-center gap-4
            hover:shadow-[0_8px_24px_rgba(15,23,42,.10)]
            transition-shadow duration-200 will-change-transform text-left`}
        >
          {/* Icon */}
          <div className={`w-12 h-12 ${b.iconBg} rounded-2xl
            flex items-center justify-center text-2xl shrink-0
            shadow-md`}>
            {b.emoji}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className={`text-[10px] font-black uppercase tracking-wider
              ${b.tagColor} mb-0.5`}>
              {b.tag}
            </p>
            <p className="text-sm font-black text-slate-900 leading-tight">
              {b.title}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              {b.sub}
            </p>
          </div>

          {/* Arrow */}
          <div className={`${b.ctaClass} text-white w-7 h-7 rounded-full
            flex items-center justify-center shrink-0
            transition-colors duration-200`}>
            <ArrowRight size={13} />
          </div>
        </motion.button>
      ))}
    </div>
  );
}
