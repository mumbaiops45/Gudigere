// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ShoppingCart, Sparkles } from "lucide-react";
// import { getAllProducts as getProducts, Product } from "@/services/productService";
// import ProductCard from "@/components/product/ProductCard";

// function Skeleton() {
//   return (
//     <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
//       <div className="h-60 bg-linear-to-br from-gray-100 to-gray-200" />
//       <div className="p-4 space-y-3">
//         <div className="h-3 bg-gray-100 rounded-full w-1/3" />
//         <div className="h-4 bg-gray-200 rounded-full w-4/5" />
//         <div className="h-3 bg-gray-100 rounded-full w-2/5" />
//         <div className="h-6 bg-gray-200 rounded-full w-1/2 mt-2" />
//         <div className="h-10 bg-gray-200 rounded-2xl w-full mt-1" />
//       </div>
//     </div>
//   );
// }

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     getProducts()
//       .then((data) => setProducts(data.slice(0, 4)))
//       .catch(() => setError(true))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <section className="py-16 md:py-24 bg-linear-to-b from-white to-pink-50/40">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-pink-100 to-amber-100 text-pink-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
//             <Sparkles size={13} />
//             Handpicked For You
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
//             Featured <span className="text-pink-600">Products</span>
//           </h2>
//           <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
//             Most loved toys by kids &amp; parents — curated with care.
//           </p>
//         </motion.div>

//         {/* Grid */}
//         {error ? (
//           <p className="text-center text-gray-400 py-16">Failed to load products. Please try again.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {loading
//               ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} />)
//               : products.map((p) => <ProductCard key={p._id} product={p} />)}
//           </div>
//         )}

//         {/* View All */}
//         {!loading && !error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.5 }}
//             className="text-center mt-12"
//           >
//             <Link
//               href="/products"
//               className="inline-flex items-center gap-2 bg-linear-to-r from-pink-600 to-amber-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-pink-200 hover:scale-105 transition-all duration-300"
//             >
//               View All Products
//               <ShoppingCart size={17} />
//             </Link>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getAllProducts as getProducts, Product } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";

function Skeleton() {
  return (
    <div className="bg-white rounded-[28px] overflow-hidden shadow-md animate-pulse">
      <div className="h-72 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-6 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-semibold text-sm">
            <Sparkles size={14} />
            Handpicked Collection
          </span>

          <h2 className="mt-5 text-4xl md:text-6xl font-black text-gray-900">
            Toys Kids{" "}
            <span className="text-pink-600">
              Love Most
            </span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Bestselling toys, educational games and creative gifts loved by thousands of families.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                >
                  <Skeleton />
                </motion.div>
              ))
            : products.map((product) => (
                <motion.div
                  key={product._id}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
}