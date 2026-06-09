"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import useCategory from "../hooks/useCategory";

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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-4xl overflow-hidden animate-pulse bg-gray-200 h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-black text-gray-900">
            Shop By <span className="text-pink-600">Category</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Discover amazing toys for every child
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: Category) => (
            <Link
              key={category._id}
              href={`/categories/${encodeURIComponent(category.name)}`}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="group bg-white rounded-4xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={category.image || "https://placehold.co/600x400"}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />
                  {/* <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h2 className="text-3xl font-black">{category.name}</h2>
                    <p className="text-white/80 mt-2 line-clamp-2">{category.description}</p>
                    <button className="mt-5 bg-white text-black h-[52px] px-6 rounded-full font-bold flex items-center gap-2 hover:bg-pink-500 hover:text-white transition">
                      Explore
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
