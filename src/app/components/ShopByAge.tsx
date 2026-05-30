"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ageGroups = [
  {
    id: 1,
    range: "0–2",
    suffix: "yrs",
    label: "Babies & Toddlers",
    description: "Soft toys, teethers & sensory play",
    emoji: "🧸",
    from: "#f472b6",
    to: "#ec4899",
    shadow: "rgba(236,72,153,0.35)",
    link: "/products?age=0-2",
  },
  {
    id: 2,
    range: "3–5",
    suffix: "yrs",
    label: "Preschoolers",
    description: "Blocks, pretend play & puzzles",
    emoji: "🎨",
    from: "#60a5fa",
    to: "#3b82f6",
    shadow: "rgba(59,130,246,0.35)",
    link: "/products?age=3-5",
  },
  {
    id: 3,
    range: "6–8",
    suffix: "yrs",
    label: "Little Explorers",
    description: "STEM kits, board games & crafts",
    emoji: "🔬",
    from: "#34d399",
    to: "#10b981",
    shadow: "rgba(16,185,129,0.35)",
    link: "/products?age=6-8",
  },
  {
    id: 4,
    range: "9–12",
    suffix: "yrs",
    label: "Young Innovators",
    description: "Robotics, drones & strategy games",
    emoji: "🤖",
    from: "#a78bfa",
    to: "#7c3aed",
    shadow: "rgba(124,58,237,0.35)",
    link: "/products?age=9-12",
  },
  {
    id: 5,
    range: "12+",
    suffix: "yrs",
    label: "Teens & Beyond",
    description: "Advanced kits, collectibles & gadgets",
    emoji: "🚀",
    from: "#fbbf24",
    to: "#f97316",
    shadow: "rgba(249,115,22,0.35)",
    link: "/products?age=12plus",
  },
];

export default function ShopByAge() {
  return (
    <section className="py-16 md:py-24 bg-gray-950 overflow-hidden relative">

      {/* Background decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-pink-600/15 border border-pink-500/25 text-pink-400 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            🎂 Find by Age
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Shop by <span className="text-pink-500">Age</span>
          </h2>
          <p className="text-gray-400 text-base mt-3 max-w-lg mx-auto">
            Perfect toys for every stage of childhood — from newborns to teens.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {ageGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Link href={group.link} className="block group">
                <div
                  className="relative rounded-3xl overflow-hidden p-6 flex flex-col items-center text-center h-full min-h-52 cursor-pointer transition-all duration-300"
                  style={{
                    background: `linear-gradient(145deg, ${group.from}, ${group.to})`,
                    boxShadow: `0 8px 30px ${group.shadow}`,
                  }}
                >
                  {/* Watermark age number */}
                  <span
                    className="absolute -bottom-3 -right-2 text-8xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.12)" }}
                  >
                    {group.range}
                  </span>

                  {/* Emoji */}
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform duration-200">
                    {group.emoji}
                  </div>

                  {/* Age range */}
                  <p className="text-3xl font-black text-white leading-none">
                    {group.range}
                    <span className="text-lg font-bold text-white/70 ml-1">{group.suffix}</span>
                  </p>

                  {/* Label */}
                  <h3 className="text-sm font-black text-white mt-2 leading-tight">
                    {group.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/70 mt-1.5 leading-relaxed line-clamp-2">
                    {group.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors duration-150 group-hover:gap-2">
                    Shop
                    <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-10"
        >
          👪 Not sure?{" "}
          <Link href="/gift-guide" className="text-pink-400 hover:text-pink-300 transition-colors underline underline-offset-2">
            Our Gift Guide
          </Link>{" "}
          helps you choose the perfect toy.
        </motion.p>
      </div>
    </section>
  );
}
