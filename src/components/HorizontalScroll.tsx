"use client";

/**
 * GSAP pinned horizontal scroll section.
 * On desktop: section pins to the viewport, products slide left as you scroll down.
 * On mobile: normal vertical grid (no pin).
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Barbie Dream Doll Set",
    price: 2499,
    mrp: 3999,
    rating: 4.9,
    reviews: 2341,
    tag: "Girls",
    tagColor: "bg-pink-500",
    badge: "🏆 Best Seller",
    img: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=900",
    accentBg: "from-pink-600/80 to-rose-700/60",
  },
  {
    id: 2,
    name: "Remote Racing Car Pro",
    price: 1499,
    mrp: 2499,
    rating: 4.8,
    reviews: 1892,
    tag: "Boys",
    tagColor: "bg-blue-500",
    badge: "🔥 Trending",
    img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900",
    accentBg: "from-blue-700/80 to-cyan-700/60",
  },
  {
    id: 3,
    name: "Cute Teddy Bear XL",
    price: 899,
    mrp: 1499,
    rating: 4.9,
    reviews: 3104,
    tag: "Unisex",
    tagColor: "bg-amber-500",
    badge: "💝 Most Loved",
    img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=900",
    accentBg: "from-amber-600/80 to-orange-600/60",
  },
  {
    id: 4,
    name: "LEGO Classic 500 Pieces",
    price: 2999,
    mrp: 4199,
    rating: 4.9,
    reviews: 1248,
    tag: "Boys",
    tagColor: "bg-blue-500",
    badge: "⭐ Top Rated",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=900",
    accentBg: "from-violet-700/80 to-indigo-700/60",
  },
  {
    id: 5,
    name: "Smart Robot Buddy",
    price: 1999,
    mrp: 3199,
    rating: 4.5,
    reviews: 876,
    tag: "Boys",
    tagColor: "bg-blue-500",
    badge: "✨ New Arrival",
    img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=900",
    accentBg: "from-slate-700/80 to-slate-900/60",
  },
  {
    id: 6,
    name: "Princess Dress Set",
    price: 1299,
    mrp: 1999,
    rating: 4.7,
    reviews: 654,
    tag: "Girls",
    tagColor: "bg-pink-500",
    badge: "👑 Fan Fave",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900",
    accentBg: "from-pink-700/80 to-fuchsia-700/60",
  },
];

/* ── Product card ─────────────────────────────────────────────── */
function ProductCard({ p, index }: { p: (typeof products)[0]; index: number }) {
  const [wished, setWished] = useState(false);
  const pct = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div
      className="g-hscroll-card group relative rounded-2xl overflow-hidden
        cursor-pointer bg-[#0f0f1e] shrink-0
        shadow-[0_8px_32px_rgba(0,0,0,.55)]
        hover:shadow-[0_20px_56px_rgba(0,0,0,.7)]
        transition-shadow duration-300"
      style={{ width: "300px" }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={p.img}
          alt={p.name}
          fill
          className="object-cover transition-transform duration-700
            group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-linear-to-t ${p.accentBg}`} />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`${p.tagColor} text-white text-[10px] font-bold
            px-2.5 py-1 rounded-full shadow-md`}>
            {p.tag}
          </span>
          <span className="bg-black/50 backdrop-blur-sm text-white text-[10px]
            font-bold px-2.5 py-1 rounded-full">
            {p.badge}
          </span>
        </div>

        {/* Discount */}
        <div className="absolute top-3 right-3 bg-emerald-500 text-white
          text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
          {pct}% OFF
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWished(v => !v); }}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full
            shadow-md flex items-center justify-center z-10
            opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart
            size={14}
            fill={wished ? "#e91e8c" : "none"}
            className={wished ? "text-(--pink)" : "text-slate-400"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                size={11}
                fill={i <= Math.round(p.rating) ? "#f59e0b" : "none"}
                className={i <= Math.round(p.rating) ? "text-amber-400" : "text-slate-600"}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-400">
            {p.rating} ({p.reviews.toLocaleString()})
          </span>
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-base leading-snug mb-3
          line-clamp-2">
          {p.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-black text-white">
            ₹{p.price.toLocaleString()}
          </span>
          <span className="text-sm text-slate-500 line-through">
            ₹{p.mrp.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-emerald-400">
            Save {pct}%
          </span>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <button className="flex-1 bg-white/10 hover:bg-white/18 text-white
            text-xs font-semibold py-2.5 rounded-xl flex items-center
            justify-center gap-1.5 transition-colors border border-white/10
            hover:border-white/25">
            <ShoppingCart size={13} /> Add to Cart
          </button>
          <button className="flex-1 btn-base btn-pink text-white text-xs
            font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5
            shadow-[0_4px_14px_rgba(233,30,140,.4)]">
            Buy Now <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────── */
export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track || window.innerWidth < 1024) return;

      /* Stagger cards on first enter */
      gsap.from(".g-hscroll-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      /* Horizontal scroll pin */
      const scrollDistance = track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      /* Title parallax while pinned */
      gsap.to(".g-hscroll-title", {
        opacity: 0.15,
        x: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollDistance * 0.5}`,
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="g-hscroll-section bg-[#060612] relative"
      style={{ minHeight: isMobile ? "auto" : "100vh" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96
          bg-pink-600/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80
          bg-blue-600/4 rounded-full blur-3xl" />
      </div>

      {/* Section header */}
      <div className="relative z-10 flex items-end justify-between
        px-6 sm:px-10 lg:px-14 pt-14 lg:pt-20 pb-10">

        <div className="g-hscroll-title">
          <div className="inline-flex items-center gap-2 bg-white/6 border
            border-white/10 text-white/60 text-[10px] font-bold uppercase
            tracking-widest px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            Curated For You
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black
            text-white leading-tight tracking-tight">
            Most{" "}
            <span className="text-grad-pink">Popular</span>
            <br className="hidden sm:block" />
            {" "}Picks
          </h2>
          <p className="text-white/45 text-sm sm:text-base mt-3 max-w-sm leading-relaxed">
            Hand-picked bestsellers — loved by 2 million+ kids across India
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-2 shrink-0">
          <p className="text-white/30 text-xs font-medium tracking-widest uppercase">
            Scroll to explore
          </p>
          <div className="flex gap-1.5">
            {products.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal track ── */}
      {/* Mobile: normal grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4
        px-6 sm:px-10 pb-14">
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} index={i} />
        ))}
      </div>

      {/* Desktop: GSAP pinned horizontal */}
      <div
        ref={trackRef}
        className="g-hscroll-track hidden lg:flex gap-6
          px-14 pb-20 will-change-transform"
        style={{ width: "max-content" }}
      >
        {products.map((p, i) => (
          <ProductCard key={p.id} p={p} index={i} />
        ))}
        {/* End spacer */}
        <div className="shrink-0 w-14" />
      </div>
    </section>
  );
}
