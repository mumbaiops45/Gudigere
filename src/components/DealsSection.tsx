"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Zap, Truck, RotateCcw, Shield } from "lucide-react";
import MagneticButton from "./MagneticButton";

/* stagger helper */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true },
});

export default function DealsSection() {
  const target = new Date("2026-12-31").getTime();
  const calc = () => {
    const d = target - Date.now();
    if (d <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor((d / 3_600_000) % 24),
      m: Math.floor((d / 60_000) % 60),
      s: Math.floor((d / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc());
  useEffect(() => {
    const iv = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(iv);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="section-card overflow-hidden">
      <div className="max-w-7xl mx-auto">

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6
        px-4 sm:px-6 lg:px-8 py-4 bg-slate-900 border-b border-white/5">

        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-amber-400 text-base"
          >
            ⚡
          </motion.span>
          <h2 className="font-bold text-sm sm:text-base">
            <span className="text-white">Deal of the</span>{" "}
            <span className="text-amber-400">Day</span>
          </h2>
        </div>

        {/* Countdown — each digit flips on change */}
        <div className="flex items-center gap-1.5">
          {[
            { l: "HRS", v: t.h },
            { l: "MIN", v: t.m },
            { l: "SEC", v: t.s },
          ].map(({ l, v }, i) => (
            <span key={l} className="flex items-center gap-1">
              <motion.span
                key={`${l}-${v}`}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.22 }}
                className="block bg-pink-600 text-white font-black text-xs sm:text-sm
                  px-2.5 py-1 rounded-lg tabular-nums min-w-9 text-center shadow-sm"
              >
                {pad(v)}
              </motion.span>
              <span className="text-slate-500 text-[10px] font-bold">{l}</span>
              {i < 2 && <span className="text-slate-600 font-bold px-0.5">:</span>}
            </span>
          ))}
        </div>

        <span className="ml-auto hidden sm:flex items-center gap-1.5
          text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Only 14 left in stock!
        </span>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Image panel — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative lg:w-2/5 bg-slate-50 flex items-center
            justify-center p-10 sm:p-14 lg:p-16 min-h-56 sm:min-h-80"
        >
          {/* Floating product image */}
          <motion.img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800"
            alt="Deal product"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.06 }}
            className="h-44 sm:h-64 lg:h-72 object-contain drop-shadow-2xl
              cursor-pointer will-change-transform"
          />

          {/* Discount badge — pulse */}
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-4 left-4 bg-pink-600 text-white font-black
              text-sm px-4 py-1.5 rounded-full shadow-lg pulse-glow"
          >
            50% OFF
          </motion.span>

          {/* Soft radial glow behind product */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(219,39,119,.08),transparent_65%)]
            pointer-events-none" />
        </motion.div>

        {/* Info panel — staggered children */}
        <div className="flex-1 px-6 sm:px-10 lg:px-12 py-8 sm:py-10
          lg:py-12 flex flex-col justify-center">

          <motion.span
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold
              text-pink-600 bg-pink-50 border border-pink-200 px-3 py-1
              rounded-full w-fit mb-4 uppercase tracking-widest"
          >
            ⚡ Limited Time Offer
          </motion.span>

          <motion.h3
            {...fadeUp(0.12)}
            className="text-xl sm:text-2xl lg:text-3xl font-bold
              text-slate-900 leading-tight"
          >
            Remote Control Racing Car
          </motion.h3>

          <motion.p
            {...fadeUp(0.19)}
            className="mt-2 text-slate-500 text-sm leading-relaxed
              hidden sm:block max-w-md"
          >
            Award-winning RC car with precision controls, 30+ min battery
            life, and top speed of 25 km/h. Perfect for ages 6–14.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="flex items-center gap-3 mt-4"
          >
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.28 + i * 0.06, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-amber-400 text-sm"
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="text-sm text-slate-500 font-medium">
              4.8 · 1,248 reviews
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.3)}
            className="flex items-baseline gap-3 mt-5 flex-wrap"
          >
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              ₹1,499
            </span>
            <span className="text-lg line-through text-slate-400">₹2,999</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50
              px-2.5 py-0.5 rounded-full">
              50% off
            </span>
          </motion.div>

          <motion.div
            {...fadeUp(0.36)}
            className="flex flex-wrap gap-3 mt-4"
          >
            {[
              { icon: Truck,     text: "Free Delivery Tomorrow", color: "text-emerald-600" },
              { icon: RotateCcw, text: "7-Day Easy Return",      color: "text-blue-500"   },
              { icon: Shield,    text: "1 Year Warranty",         color: "text-purple-500" },
            ].map(({ icon: Icon, text, color }) => (
              <span key={text}
                className="flex items-center gap-1.5 text-xs text-slate-600
                  bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full"
              >
                <Icon size={12} className={`${color} shrink-0`} />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            {...fadeUp(0.42)}
            className="flex flex-wrap gap-3 mt-6 sm:mt-7"
          >
            <MagneticButton className="btn-base btn-dark px-7 sm:px-9 py-3
              rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm">
              <ShoppingCart size={15} /> Add to Cart
            </MagneticButton>

            <MagneticButton className="btn-base btn-pink px-7 sm:px-9 py-3
              rounded-xl font-semibold text-sm flex items-center gap-2
              shadow-[0_4px_14px_rgba(219,39,119,.35)]">
              <Zap size={15} /> Buy Now
            </MagneticButton>
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  );
}

