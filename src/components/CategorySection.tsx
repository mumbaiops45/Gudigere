"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";
import useCategory from "../hooks/useCategory";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariant = (i: number) => ({
  hidden: { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
  show:  { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: cubicBezier(0.25, 0.1, 0.25, 1) } },
});

type Category = {
  _id: string;
  name: string;
  image?: string;
  description?: string;
};

export default function CategorySection() {
  const { categories, loading } = useCategory();

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[380px] rounded-[30px] bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center px-5 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-5"
          >
            Premium Collections
          </motion.span>

          <h1 className="text-5xl font-black text-gray-900">
            Shop By <span className="text-pink-600">Category</span>
          </h1>

          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
            Discover toys, games, gifts and learning products for every age.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category: Category, i: number) => (
            <motion.div key={category._id} variants={cardVariant(i)} whileHover={{ y: -6, transition: { duration: 0.25 } }}>
            <Link
              href={`/categories/${encodeURIComponent(category.name)}`}
            >
              <div
                className="
                  group
                  relative
                  h-[380px]
                  overflow-hidden
                  rounded-[30px]
                  cursor-pointer
                  transition-shadow
                  duration-300
                  shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                "
              >
                {/* Image */}
                <Image
                  src={category.image || "https://placehold.co/600x800"}
                  alt={category.name}
                  fill
                  sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Featured Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold">
                    Featured
                  </span>
                </div>

                {/* Floating Content Box */}
                <div
                  className="
                    absolute
                    left-5
                    right-5
                    bottom-5
                    rounded-[24px]
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/20
                    p-5
                  "
                >
                  <h3 className="text-2xl font-bold text-white mb-2 line-clamp-1">
                    {category.name}
                  </h3>

                  <p className="text-white/80 text-sm line-clamp-2 mb-4">
                    {category.description ||
                      "Explore premium toys and gifts for kids."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-white text-gray-800 text-xs rounded-full font-medium">
                        Premium
                      </span>

                      <span className="px-3 py-1 bg-white text-gray-800 text-xs rounded-full font-medium">
                        Trending
                      </span>
                    </div>

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-gradient-to-r
                        from-pink-600
                        to-purple-600
                        flex
                        items-center
                        justify-center
                        text-white
                        transition-transform
                        duration-300
                        group-hover:rotate-45
                      "
                    >
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-700
                    bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)]
                    pointer-events-none
                  "
                />
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}