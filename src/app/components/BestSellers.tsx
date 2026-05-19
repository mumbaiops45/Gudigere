"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart, Zap } from "lucide-react";

const products = [
  { id: 1, title: "Remote Racing Car",  price: 1499, mrp: 2499, rating: "4.8", reviews: 248, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800" },
  { id: 2, title: "Cute Teddy Bear",    price: 899,  mrp: 1499, rating: "4.7", reviews: 192, image: "https://images.pexels.com/photos/459976/pexels-photo-459976.jpeg" },
  { id: 3, title: "Smart Robot Toy",    price: 1999, mrp: 3199, rating: "4.5", reviews: 136, image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800" },
  { id: 4, title: "LEGO Building Set",  price: 2999, mrp: 4199, rating: "4.9", reviews: 310, image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800" },
  { id: 5, title: "Gaming Console",     price: 4999, mrp: 7499, rating: "4.6", reviews: 410, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800" },
  { id: 6, title: "Drone Flying Toy",   price: 3499, mrp: 5499, rating: "4.4", reviews: 87,  image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800" },
];

export default function BestSellers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const iv = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(iv);
  }, []);

  const scroll = (dir: -1 | 1) =>
    ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  const pct = (p: number, m: number) => Math.round(((m - p) / m) * 100);

  return (
    <section className="section-card px-4 sm:px-6 lg:px-8 py-5 sm:py-7">

      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-black text-gray-900">Best Sellers</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll(-1)}
            className="hidden sm:flex w-8 h-8 rounded-full border border-gray-300 bg-white hover:border-pink-400 hover:text-pink-600 items-center justify-center transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            className="hidden sm:flex w-8 h-8 rounded-full border border-gray-300 bg-white hover:border-pink-400 hover:text-pink-600 items-center justify-center transition-all"
          >
            <ChevronRight size={16} />
          </button>
          <button className="text-xs sm:text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors">
            See All →
          </button>
        </div>
      </div>

      <div ref={ref} className="flex gap-3 overflow-x-auto scroll-smooth no-scrollbar pb-1">
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-40 sm:min-w-52 flex-shrink-0 bg-white border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col group"
          >
            <div className="relative bg-gray-50 h-36 sm:h-44 flex items-center justify-center p-3 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-pink-600 text-white text-[9px] font-black px-2 py-0.5 rounded">
                {pct(p.price, p.mrp)}% off
              </div>
            </div>

            <div className="p-2.5 sm:p-3 flex flex-col flex-1">
              <h3 className="font-semibold text-gray-800 text-[11px] sm:text-xs leading-snug line-clamp-2">{p.title}</h3>

              <div className="flex items-center gap-1 mt-1.5">
                <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {p.rating} ★
                </span>
                <span className="text-gray-400 text-[9px]">({p.reviews})</span>
              </div>

              <div className="flex items-baseline gap-1 mt-1.5">
                <span className="font-black text-sm sm:text-base text-gray-900">₹{p.price.toLocaleString()}</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 line-through">₹{p.mrp.toLocaleString()}</span>
              </div>

              <p className="text-[9px] text-green-600 font-semibold mt-0.5">FREE Delivery</p>

              <div className="flex gap-1.5 mt-auto pt-2">
                <button className="flex-1 bg-yellow-400 hover:bg-black hover:text-white text-gray-900 py-1.5 sm:py-2 rounded font-bold text-[9px] sm:text-[10px] transition-colors flex items-center justify-center gap-0.5">
                  <ShoppingCart size={9} />
                  Cart
                </button>
                <button className="flex-1 bg-pink-600 hover:bg-black text-white py-1.5 sm:py-2 rounded font-bold text-[9px] sm:text-[10px] transition-colors flex items-center justify-center gap-0.5">
                  <Zap size={9} />
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="sm:hidden text-center text-[11px] text-gray-400 mt-2">← Swipe to see more →</p>
    </section>
  );
}
