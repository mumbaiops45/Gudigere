"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";

export default function DealsSection() {
  const target = new Date("2026-12-31").getTime();

  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
    return {
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
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

      {/* HEADER BAR */}
      <div className="bg-[#212121] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3 sm:gap-5">
        <h2 className="text-white font-black text-base sm:text-lg">Deal of the Day</h2>
        <div className="flex items-center gap-1.5">
          {[
            { l: "HRS", v: t.hours },
            { l: "MIN", v: t.minutes },
            { l: "SEC", v: t.seconds },
          ].map(({ l, v }, i) => (
            <span key={l} className="flex items-center gap-1">
              <span className="bg-pink-600 text-white font-black text-xs sm:text-sm px-2 py-1 rounded tabular-nums min-w-9 text-center">
                {pad(v)}
              </span>
              <span className="text-gray-400 text-[10px] font-bold">{l}</span>
              {i < 2 && <span className="text-white font-bold text-sm">:</span>}
            </span>
          ))}
        </div>
        <span className="ml-auto text-xs text-gray-400 hidden sm:block">Hurry, limited stock!</span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}
        <div className="relative md:w-2/5 bg-gray-50 flex items-center justify-center p-6 sm:p-10 min-h-52 sm:min-h-72">
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800"
            alt="Deal of the Day"
            className="h-40 sm:h-56 object-contain"
          />
          <div className="absolute top-3 left-3 bg-pink-600 text-white font-black px-3 py-1 rounded text-sm">
            50% OFF
          </div>
        </div>

        {/* INFO */}
        <div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col justify-center">

          <span className="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-3 tracking-widest uppercase">
            ⚡ Limited Time
          </span>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight">
            Remote Control Racing Car
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
              4.8 ★
            </span>
            <span className="text-xs text-gray-400">(1,248 ratings)</span>
          </div>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl sm:text-4xl font-black text-gray-900">₹1,499</span>
            <span className="text-base sm:text-lg line-through text-gray-400">₹2,999</span>
            <span className="text-green-600 font-bold text-sm">50% off</span>
          </div>

          <p className="text-green-600 font-semibold text-sm mt-1">FREE Delivery Tomorrow</p>

          <p className="mt-3 text-gray-500 text-sm leading-relaxed hidden sm:block">
            The hottest toy of the season — perfect for kids who love speed and adventure.
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-6">
            <button className="btn-shine bg-yellow-400 hover:bg-black hover:text-white text-gray-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded font-black text-sm transition-colors flex items-center gap-2">
              <ShoppingCart size={15} />
              Add to Cart
            </button>
            <button className="btn-shine bg-pink-600 hover:bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded font-black text-sm transition-colors flex items-center gap-2">
              <Zap size={15} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
