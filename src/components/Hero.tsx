"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const quickCats = [
  { icon: "🚗", label: "Remote Cars" },
  { icon: "🧸", label: "Soft Toys" },
  { icon: "🧩", label: "LEGO" },
  { icon: "📚", label: "Educational" },
  { icon: "🤖", label: "Robots" },
  { icon: "🎲", label: "Board Games" },
  { icon: "✈️", label: "Drones" },
  { icon: "🎨", label: "Art & Craft" },
];

const slides = [
  {
    image:
      "/hero.jpg",

    title: "Amazing Toys",

    subtitle: "For Every Kid!",

    card1: {
      img:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800",

      name: "RC Cars Collection",

      badge: "Up to 40% OFF",

      badgeColor: "text-pink-600",
    },

    card2: {
      img:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800",

      name: "Teddy Bears",

      badge: "Best Seller ★",

      badgeColor: "text-green-600",
    },
  },

  {
    image:
      "/hero2.jpg",

    title: "Fun Learning",

    subtitle: "Educational Toys",

    card1: {
      img:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",

      name: "LEGO Sets",

      badge: "New Arrivals",

      badgeColor: "text-blue-600",
    },

    card2: {
      img:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800",

      name: "Science Kits",

      badge: "Top Rated ★",

      badgeColor: "text-yellow-600",
    },
  },

  {
    image:
      "/hero3.jpg",

    title: "Cute Collections",

    subtitle: "Soft Toys & Dolls",

    card1: {
      img:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",

      name: "Plush Toys",

      badge: "Kids Favourite",

      badgeColor: "text-purple-600",
    },

    card2: {
      img:
        "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800",

      name: "Doll House",

      badge: "30% OFF Today",

      badgeColor: "text-pink-600",
    },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="bg-[#f1f3f6] overflow-hidden">

      {/* ── BANNER ── */}
      <div className="relative h-80 sm:h-130 overflow-hidden">

        {/* Sliding background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image src={slides[current].image} alt="" fill priority className="object-cover" />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

        {/* Floating product cards — desktop only */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="hidden lg:block absolute top-16 right-24 z-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`card1-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-3 w-40">
                <div className="relative h-28 rounded-xl overflow-hidden">
                  <Image src={slides[current].card1.img} alt="" fill className="object-cover" />
                </div>
                <p className="font-bold text-sm mt-2.5 text-gray-900">{slides[current].card1.name}</p>
                <p className={`text-xs font-semibold mt-0.5 ${slides[current].card1.badgeColor}`}>{slides[current].card1.badge}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="hidden lg:block absolute bottom-20 right-56 z-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`card2-${current}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-3 w-40">
                <div className="relative h-28 rounded-xl overflow-hidden">
                  <Image src={slides[current].card2.img} alt="" fill className="object-cover" />
                </div>
                <p className="font-bold text-sm mt-2.5 text-gray-900">{slides[current].card2.name}</p>
                <p className={`text-xs font-semibold mt-0.5 ${slides[current].card2.badgeColor}`}>{slides[current].card2.badge}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-375 mx-auto w-full px-5 sm:px-8 lg:px-14">

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-xs sm:max-w-sm md:max-w-lg"
              >
                {/* Promo badge */}
                <div className="inline-flex items-center gap-1.5 toy-badge px-3 py-1.5 rounded-full text-xs font-bold mb-3 sm:mb-4">
                  🎉 Up to 50% OFF — Today Only!
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {slides[current].title}
                  <span className="block text-gradient-warm">{slides[current].subtitle}</span>
                </h1>

                {/* Subtext */}
                <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed hidden sm:block">
                  10,000+ toys for kids aged 0–16.{" "}
                  <span className="text-green-400 font-semibold">✓ Free delivery</span> across India.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-7">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-shine bg-pink-600 hover:bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm transition-colors shadow-lg"
                  >
                    Shop Now →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white/15 hover:bg-white/30 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-bold text-sm border border-white/35 transition-all"
                  >
                    View Deals
                  </motion.button>
                </div>

                {/* Trust badges — desktop */}
                <div className="hidden md:flex flex-wrap gap-4 mt-5">
                  {["10K+ Products", "50+ Brands", "2M+ Happy Kids"].map((b) => (
                    <div key={b} className="flex items-center gap-1.5 text-white/60 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "bg-pink-500 w-5 h-1.5" : "bg-white/40 w-1.5 h-1.5"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
