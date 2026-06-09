"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Sparkles } from "lucide-react";
import { getAllProducts as getProducts, Product } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

function Skeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-60 bg-linear-to-br from-gray-100 to-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
        <div className="h-4 bg-gray-200 rounded-full w-4/5" />
        <div className="h-3 bg-gray-100 rounded-full w-2/5" />
        <div className="h-6 bg-gray-200 rounded-full w-1/2 mt-2" />
        <div className="h-10 bg-gray-200 rounded-2xl w-full mt-1" />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-white to-pink-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-pink-100 to-amber-100 text-pink-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={13} />
            Handpicked For You
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
            Featured <span className="text-pink-600">Products</span>
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
            Most loved toys by kids &amp; parents — curated with care.
          </p>
        </motion.div>

        {/* Grid */}
        {error ? (
          <p className="text-center text-gray-400 py-16">Failed to load products. Please try again.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
              : products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        {/* View All */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-linear-to-r from-pink-600 to-amber-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ShoppingCart size={17} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
