"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import MagneticButton from "./MagneticButton";

const products = [
  {
    id: 1,
    name: "Barbie Dream Doll",
    price: "₹1,499",
    oldPrice: "₹2,499",
    discount: "40%",
    rating: 4.8,
    reviews: 2341,
    image:
      "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1200&auto=format&fit=crop",
    badge: "Best Seller",
    badgeBg: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    name: "Remote Racing Car",
    price: "₹2,299",
    oldPrice: "₹3,999",
    discount: "43%",
    rating: 4.7,
    reviews: 1892,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    badge: "Trending",
    badgeBg: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Cute Teddy Bear",
    price: "₹999",
    oldPrice: "₹1,699",
    discount: "41%",
    rating: 4.9,
    reviews: 3104,
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1200&auto=format&fit=crop",
    badge: "Popular",
    badgeBg: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    name: "Learning Blocks Set",
    price: "₹1,899",
    oldPrice: "₹2,899",
    discount: "35%",
    rating: 4.6,
    reviews: 987,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    badgeBg: "from-violet-500 to-indigo-500",
  },
];

/* ─── 3-D TILT CARD ─────────────────────────────────────────── */
function TiltCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const rawX  = useMotionValue(0);
  const rawY  = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 280,
    damping: 22,
  });
  /* Subtle glare that follows the mouse */
  const glareX = useTransform(rawX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(rawY, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 900,
      }}
      className="group relative bg-white rounded-2xl overflow-hidden border
        border-slate-100 shadow-[0_2px_14px_rgba(15,23,42,.07)]
        hover:shadow-[0_16px_40px_rgba(15,23,42,.15)]
        cursor-pointer will-change-transform"
    >
      {/* ── Glare overlay ── */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}px ${glareY}px,
            rgba(255,255,255,0.18) 0%, transparent 65%)`,
        }}
      />

      {/* ── IMAGE ── */}
      <div className="relative h-44 sm:h-52 lg:h-56 overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors duration-300" />

        {/* Badge */}
        <div
          className={`absolute top-2.5 left-2.5 z-10 bg-linear-to-r
            ${product.badgeBg} text-white text-[10px] sm:text-xs font-bold
            px-2.5 sm:px-3 py-1 rounded-full shadow-md`}
        >
          {product.badge}
        </div>

        {/* Discount */}
        <div
          className="absolute top-2.5 right-2.5 z-10 bg-emerald-500 text-white
            text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-1
            rounded-full shadow-sm"
        >
          -{product.discount}
        </div>

        {/* Action buttons slide in on hover */}
        <div
          className="absolute bottom-2.5 right-2.5 z-10 flex flex-col gap-2
            translate-y-3 opacity-0 group-hover:translate-y-0
            group-hover:opacity-100 transition-all duration-250"
        >
          {[Heart, Eye].map((Icon, j) => (
            <motion.button
              key={j}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 sm:w-9 sm:h-9 bg-white/95 backdrop-blur-sm
                rounded-full shadow-lg flex items-center justify-center
                text-slate-500 hover:bg-pink-500 hover:text-white
                transition-colors duration-200"
            >
              <Icon size={14} />
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="p-3.5 sm:p-4 lg:p-5" style={{ transform: "translateZ(20px)" }}>
        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                fill={i <= Math.round(product.rating) ? "#f59e0b" : "none"}
                className={
                  i <= Math.round(product.rating)
                    ? "text-amber-400"
                    : "text-slate-200"
                }
              />
            ))}
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <span className="text-base sm:text-lg font-black text-slate-900">
            {product.price}
          </span>
          <span className="text-xs sm:text-sm text-slate-400 line-through font-medium">
            {product.oldPrice}
          </span>
        </div>

        {/* Add to Cart — magnetic */}
        <MagneticButton
          strength={0.18}
          className="mt-3.5 w-full bg-slate-900 hover:bg-pink-600 text-white
            text-xs sm:text-sm font-semibold py-2.5 sm:py-3 rounded-xl
            flex items-center justify-center gap-2
            transition-colors duration-250
            shadow-sm hover:shadow-[0_4px_14px_rgba(219,39,119,.4)]"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </MagneticButton>
      </div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */
export default function TrendingProducts() {
  return (
    <section className="section-card relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-100
        rounded-full blur-[72px] opacity-60 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-100
        rounded-full blur-[72px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between
            gap-3 mb-8 sm:mb-10"
        >
          <div>
            <span className="sec-badge">🔥 Hot Right Now</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black
              leading-tight tracking-tight mt-1">
              <span className="text-slate-900">Trending</span>{" "}
              <span className="text-grad-pink">Toy Picks</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1.5">
              Hand-picked bestsellers — loved by kids, trusted by parents.
            </p>
          </div>
          <button className="view-all self-start sm:self-auto shrink-0">
            View All →
          </button>
        </motion.div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          style={{ perspective: 1000 }}
        >
          {products.map((product, index) => (
            <TiltCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* ── VIEW ALL CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <MagneticButton
            className="btn-base btn-pink inline-flex items-center gap-2.5
              px-8 sm:px-10 py-3 sm:py-3.5 rounded-xl font-bold text-sm
              shadow-[0_4px_18px_rgba(219,39,119,.4)]
              hover:shadow-[0_6px_24px_rgba(219,39,119,.5)]"
          >
            <Zap size={15} />
            Explore All Trending Toys
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}

