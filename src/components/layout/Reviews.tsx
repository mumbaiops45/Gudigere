"use client";

import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    title: "Excellent quality, super fast delivery!",
    tag: "Remote Control Car",
    text: "My son absolutely loves it. Arrived super fast, beautifully packed, and exactly as shown. Best toy purchase this year — totally worth every rupee!",
    date: "2 days ago",
  },
  {
    id: 2,
    name: "Priya Verma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    title: "My daughter was absolutely thrilled!",
    tag: "Teddy Bear",
    text: "The teddy bear is so incredibly soft and was packaged beautifully. My daughter hasn't put it down since it arrived. Will definitely order again.",
    date: "1 week ago",
  },
  {
    id: 3,
    name: "Rohan Patel",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    title: "Great prices, awesome packaging",
    tag: "LEGO Set",
    text: "Kids loved the LEGO set — hours of fun! Great prices and fast shipping. Customer support was also very prompt and helpful.",
    date: "2 weeks ago",
  },
];

export default function Reviews() {
  return (
    <section className="section-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

      {/* Header */}
      <div className="sec-header">
        <div>
          <span className="sec-badge">⭐ Customer Reviews</span>
          <p className="title">
            What{" "}
            <span className="text-grad-warm">Parents Say</span>
          </p>
          <p className="sub">Trusted by 2 million+ happy families across India</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full shrink-0">
          <span className="text-amber-500 text-sm font-black">★ 4.9</span>
          <span className="text-xs text-slate-500 whitespace-nowrap">· 12K+ reviews</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
        {reviews.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 36, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.55,
              delay: idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{ y: -5, boxShadow: "0 14px 32px rgba(15,23,42,.12)" }}
            className="border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col
                       hover:border-pink-200 transition-colors duration-300
                       bg-white cursor-default"
          >
            {/* Stars + date */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill={i <= r.rating ? "#f59e0b" : "none"} className={i <= r.rating ? "text-amber-400" : "text-slate-200"} />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">{r.title}</h3>

            {/* Body */}
            <p className="text-slate-500 text-[0.8125rem] leading-relaxed flex-1">"{r.text}"</p>

            {/* Tag */}
            <div className="mt-4 mb-3.5">
              <span className="text-[10px] bg-slate-100 text-slate-500 font-semibold px-2.5 py-1 rounded-full">
                🛍 Purchased: {r.tag}
              </span>
            </div>

            {/* Reviewer */}
            <div className="border-t border-slate-100 pt-3.5 flex items-center gap-3">
              <img
                src={r.avatar} alt={r.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{r.name}</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  <BadgeCheck size={11} className="shrink-0" /> Verified Purchase
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
