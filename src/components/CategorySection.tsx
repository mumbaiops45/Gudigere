// "use client";

// import Image from "next/image";
// import { motion, Variants } from "framer-motion";

// import {
//   ArrowRight,
//   Zap,
//   Sparkles,
//   Gift,
//   Star,
//   Truck,
//   RotateCcw,
//   ShieldCheck,
//   BadgePercent,
// } from "lucide-react";

// import useCategory from "../hooks/useCategory";

// // --------------------------------------------------
// // Types
// type Category = {
//   _id: string;
//   name: string;
//   image?: string;
//   description?: string;
// };

// type CategoryCardProps = {
//   category: Category;
//   index: number;
// };

// // --------------------------------------------------
// // Quick Filters
// const quickFilters: string[] = [
//   "All",
//   "Building",
//   "Arts",
//   "Outdoor",
//   "STEM",
//   "Pretend",
//   "Puzzles",
//   "Vehicles",
//   "Plush",
// ];

// // --------------------------------------------------
// // Trust Items
// const trustItems = [
//   {
//     icon: Truck,
//     text: "Free Shipping ₹499+",
//   },

//   {
//     icon: RotateCcw,
//     text: "7-Day Returns",
//   },

//   {
//     icon: ShieldCheck,
//     text: "100% Genuine",
//   },

//   {
//     icon: BadgePercent,
//     text: "Up to 60% OFF",
//   },
// ];

// // --------------------------------------------------
// // Animation
// const fadeUp = (delay = 0) => ({
//   initial: {
//     opacity: 0,
//     y: 30,
//   },

//   whileInView: {
//     opacity: 1,
//     y: 0,
//   },

//   viewport: {
//     once: true,
//     margin: "-50px",
//   },

//   transition: {
//     type: "spring" as const,
//     stiffness: 100,
//     damping: 15,
//     delay,
//   },
// });

// // --------------------------------------------------
// // Card Variants
// const cardVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     scale: 0.95,
//   },

//   visible: (i: number) => ({
//     opacity: 1,
//     scale: 1,

//     transition: {
//       delay: i * 0.08,
//       duration: 0.5,
//     },
//   }),

//   hover: {
//     y: -12,
//     scale: 1.02,

//     transition: {
//       duration: 0.3,
//     },
//   },
// };

// // --------------------------------------------------
// // Category Card
// function CategoryCard({
//   category,
//   index,
// }: CategoryCardProps) {
//   const gradients = [
//     "from-indigo-900/80 via-purple-700/60 to-transparent",
//     "from-rose-900/80 via-pink-700/60 to-transparent",
//     "from-emerald-900/80 via-teal-700/60 to-transparent",
//     "from-amber-900/80 via-orange-700/60 to-transparent",
//   ];

//   const badgeColors = [
//     "bg-gradient-to-r from-pink-500 to-rose-500",
//     "bg-gradient-to-r from-blue-500 to-cyan-500",
//     "bg-gradient-to-r from-purple-500 to-indigo-500",
//     "bg-gradient-to-r from-amber-500 to-orange-500",
//   ];

//   const badgeText = [
//     "Trending 🔥",
//     "Popular ⭐",
//     "Best Seller 🏆",
//     "New Arrival ✨",
//   ];

//   return (
//     <motion.div
//       custom={index}
//       initial="hidden"
//       whileInView="visible"
//       whileHover="hover"
//       viewport={{ once: true }}
//       variants={cardVariants}
//       className="group relative overflow-hidden rounded-3xl shadow-xl cursor-pointer"
//     >
//       {/* Image */}
//       <div className="relative h-72 w-full overflow-hidden">
//         <Image
//           src={category.image || "/placeholder.png"}
//           alt={category.name}
//           fill
//           className="object-cover transition-transform duration-700 group-hover:scale-110"
//         />

//         {/* Overlay */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-t ${
//             gradients[index % gradients.length]
//           }`}
//         />
//       </div>

//       {/* Left Badge */}
//       <div
//         className={`absolute top-4 left-4 ${
//           badgeColors[index % badgeColors.length]
//         } text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg`}
//       >
//         <Sparkles size={12} />

//         {badgeText[index % badgeText.length]}
//       </div>

//       {/* Right Badge */}
//       <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
//         <Gift size={12} />
//         Up to 50% OFF
//       </div>

//       {/* Content */}
//       <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
//         <h3 className="text-2xl font-black mb-2 drop-shadow-lg">
//           {category.name}
//         </h3>

//         <p className="text-white/90 text-sm mb-4 line-clamp-2">
//           {category.description ||
//             "Explore amazing toys for endless fun!"}
//         </p>

//         <motion.button
//           whileHover={{
//             scale: 1.05,
//             x: 3,
//           }}
//           whileTap={{
//             scale: 0.95,
//           }}
//           className="inline-flex items-center gap-2 bg-white text-gray-900 text-sm font-bold px-5 py-2 rounded-full shadow-md"
//         >
//           Shop Now

//           <ArrowRight size={14} />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }

// // --------------------------------------------------
// // Main Component
// export default function CategorySection() {
//   const {
//     categories,
//     loading,
//   }: {
//     categories: Category[];
//     loading: boolean;
//   } = useCategory();

//   // ------------------------------------------------
//   // Loader
//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />

//           <p className="text-gray-500 font-medium">
//             Loading awesome categories...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ------------------------------------------------
//   return (
//     <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <motion.div
//           {...fadeUp(0)}
//           className="text-center max-w-3xl mx-auto mb-12"
//         >
//           <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-700 text-sm font-bold px-4 py-1.5 rounded-full">
//             <Zap size={14} />

//             EXPLORE COLLECTIONS
//           </span>

//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-5 leading-tight">
//             <span className="text-pink-600">
//               Top Categories
//             </span>

//             <br />

//             <span className="text-black">
//               For Every Kid’s Joy
//             </span>
//           </h2>

//           <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
//             Handpicked toys that spark creativity, learning,
//             and endless smiles.
//           </p>
//         </motion.div>

//         {/* Quick Filters */}
//         <motion.div
//           {...fadeUp(0.1)}
//           className="flex flex-wrap justify-center gap-3 mb-12"
//         >
//           {quickFilters.map((filter, idx) => (
//             <button
//               key={idx}
//               className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
//                 idx === 0
//                   ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
//                   : "bg-white border border-gray-200 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </motion.div>

//         {/* Trust Strip */}
//         <motion.div
//           {...fadeUp(0.15)}
//           className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-14"
//         >
//           {trustItems.map(({ icon: Icon, text }, idx) => (
//             <div
//               key={idx}
//               className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm"
//             >
//               <Icon
//                 size={16}
//                 className="text-pink-500"
//               />

//               <span className="text-sm font-medium text-gray-700">
//                 {text}
//               </span>
//             </div>
//           ))}
//         </motion.div>

//         {/* Categories */}
//         <motion.div
//           {...fadeUp(0.2)}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
//         >
//           {categories.map((category, idx) => (
//             <CategoryCard
//               key={category._id}
//               category={category}
//               index={idx}
//             />
//           ))}
//         </motion.div>

//         {/* Button */}
//         <motion.div
//           {...fadeUp(0.3)}
//           className="text-center mt-16"
//         >
//           <button className="group inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-full shadow-xl transition-all duration-300">
//             View All Categories

//             <ArrowRight
//               size={18}
//               className="group-hover:translate-x-1 transition-transform"
//             />
//           </button>
//         </motion.div>

//         {/* Promo Banner */}
//         <motion.div
//           {...fadeUp(0.35)}
//           className="mt-16 rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 shadow-2xl"
//         >
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8 sm:py-10">

//             {/* Left */}
//             <div className="flex items-center gap-4">
//               <motion.div
//                 animate={{
//                   rotate: [0, 10, -10, 0],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                 }}
//                 className="text-5xl"
//               >
//                 🎁
//               </motion.div>

//               <div>
//                 <h3 className="text-white text-2xl font-black">
//                   New Arrivals Every Week!
//                 </h3>

//                 <p className="text-indigo-200 text-sm mt-1">
//                   Sign up & get extra 15% off your first order
//                 </p>
//               </div>
//             </div>

//             {/* Right */}
//             <button className="bg-white text-purple-900 font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
//               Subscribe

//               <Star size={16} />
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";

import Image from "next/image";

import { motion } from "framer-motion";

import {
  ArrowRight,
} from "lucide-react";

type Category = {
  _id: string;

  name: string;

  image?: string;

  description?: string;
};

export default function CategorySection({ categories }: { categories: Category[] }) {

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* TOP */}
        <div className="text-center mb-14">

          <h1 className="text-5xl font-black text-gray-900">
            Shop By <span className="text-pink-600">Category</span>
          </h1>

          <p className="text-gray-500 mt-4 text-lg">

            Discover amazing toys for every child

          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map(
            (
              category: Category
            ) => (

              <Link
                key={category._id}
                href={`/categories/${encodeURIComponent(category.name)}`}
              >

                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                  className="group bg-white rounded-[32px] overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
                >

                  {/* IMAGE */}
                  <div className="relative h-[320px] overflow-hidden">

                    <Image
                      src={
                        category.image ||
                        "https://placehold.co/600x400"
                      }
                      alt={
                        category.name
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* CONTENT */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                      <h2 className="text-3xl font-black">

                        {
                          category.name
                        }

                      </h2>

                      <p className="text-white/80 mt-2 line-clamp-2">

                        {
                          category.description
                        }

                      </p>

                      {/* BUTTON */}
                      <button className="mt-5 bg-white text-black h-[52px] px-6 rounded-full font-bold flex items-center gap-2 hover:bg-pink-500 hover:text-white transition">

                        Explore

                        <ArrowRight
                          size={18}
                        />

                      </button>

                    </div>

                  </div>

                </motion.div>

              </Link>
            )
          )}

        </div>

      </div>

    </section>
  );
}