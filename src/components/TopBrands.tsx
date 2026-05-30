"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  { logo: "/logo1.png", color: "from-yellow-50 to-yellow-100",  border: "hover:border-yellow-300"  },
  { logo: "/logo5.png", color: "from-pink-50 to-rose-100",      border: "hover:border-pink-300"    },
  { logo: "/logo3.png", color: "from-red-50 to-orange-100",     border: "hover:border-red-300"     },
  { logo: "/logo4.png", color: "from-orange-50 to-amber-100",   border: "hover:border-orange-300"  },
  { logo: "/logo2.png", color: "from-green-50 to-emerald-100",  border: "hover:border-green-300"   },
  { logo: "/logo6.png", color: "from-blue-50 to-cyan-100",      border: "hover:border-blue-300"    },
];

/* duplicate list for seamless infinite loop */
const marqueeItems = [...brands, ...brands, ...brands];

/* ── single brand tile ─────────────────────────────────────── */
function BrandTile({ brand, i }: { brand: (typeof brands)[0]; i: number }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.06 }}
      transition={{ duration: 0.2 }}
      className={`group relative bg-linear-to-b ${brand.color}
        ${brand.border} border-2 border-gray-100 rounded-2xl
        p-5 sm:p-6 flex items-center justify-center
        w-32 sm:w-36 aspect-square shrink-0
        cursor-pointer shadow-sm hover:shadow-xl
        transition-shadow duration-300`}
    >
      {/* Hover glow ring */}
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2
        ring-pink-300/50 transition-all duration-300 pointer-events-none" />

      <Image
        src={brand.logo}
        alt="Brand logo"
        width={120}
        height={80}
        className="object-contain w-full max-h-14 sm:max-h-16
          group-hover:scale-110 transition-transform duration-300
          drop-shadow-sm"
      />

      {/* Star pop */}
      <span className="absolute -top-2 -right-2 text-sm opacity-0
        group-hover:opacity-100 transition-all duration-200
        group-hover:-translate-y-0.5">⭐</span>
    </motion.div>
  );
}

export default function TopBrands() {
  return (
    <section className="section-card px-0 py-8 sm:py-10 lg:py-12
      overflow-hidden relative">

      {/* Subtle bg blobs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-100/50
        rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-100/40
        rounded-full blur-3xl pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="px-6 sm:px-8 lg:px-10">
        <div className="relative flex flex-col sm:flex-row sm:items-end
          sm:justify-between gap-3 mb-7 sm:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 bg-pink-50
                border border-pink-200 px-3 py-1 rounded-full
                text-xs font-bold text-pink-600 mb-2.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              Trusted by 2M+ families
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-extrabold
              leading-tight tracking-tight">
              Top{" "}
              <span className="text-grad-pink">Brands</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Official partners · 100% authentic products
            </p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            whileHover={{ x: 3 }}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm
              font-semibold text-pink-600 hover:text-pink-700
              transition-colors group"
          >
            View All Brands
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </motion.button>
        </div>
      </div>

      {/* ── INFINITE MARQUEE ── */}
      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24
          bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24
          bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Track — pauses on hover */}
        <div className="overflow-hidden group/track">
          <motion.div
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            /* pause on hover */
            whileHover={{ animationPlayState: "paused" }}
            className="flex gap-4 sm:gap-5 px-4 will-change-transform
              group-hover/track:[animation-play-state:paused]"
          >
            {marqueeItems.map((brand, i) => (
              <BrandTile key={i} brand={brand} i={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-6 flex justify-center sm:hidden px-6">
        <button className="inline-flex items-center gap-2 px-6 py-2.5
          rounded-full bg-pink-600 hover:bg-slate-900 text-white
          font-bold text-sm transition-colors shadow-md">
          View All Brands →
        </button>
      </div>
    </section>
  );
}
