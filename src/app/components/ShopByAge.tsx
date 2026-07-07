// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   Cake,
//   IndianRupee,
//   Puzzle,
//   Tag,
//   Star,
//   Gift,
// } from "lucide-react";

// const filters = [
//   {
//     id: 1,
//     title: "By Age",
//     icon: Cake,
//     color: "from-pink-500 to-rose-500",
//     link: "/products?filter=age",
//   },
//   {
//     id: 2,
//     title: "By Price",
//     icon: IndianRupee,
//     color: "from-green-500 to-emerald-500",
//     link: "/products?filter=price",
//   },
//   {
//     id: 3,
//     title: "By Toys",
//     icon: Puzzle,
//     color: "from-blue-500 to-cyan-500",
//     link: "/products?filter=category",
//   },
//   {
//     id: 4,
//     title: "By Brand",
//     icon: Tag,
//     color: "from-purple-500 to-indigo-500",
//     link: "/products?filter=brand",
//   },
//   {
//     id: 5,
//     title: "Top Rated",
//     icon: Star,
//     color: "from-yellow-500 to-orange-500",
//     link: "/products?filter=rating",
//   },
//   {
//     id: 6,
//     title: "Offers",
//     icon: Gift,
//     color: "from-red-500 to-pink-500",
//     link: "/products?filter=offers",
//   },
// ];

// export default function ShopByFilters() {
//   return (
//     <section className="py-20 bg-gray-50">

//       <div className="max-w-7xl mx-auto px-4">

//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold">
//             Shop by Filters
//           </h2>

//           <p className="text-gray-500 mt-3">
//             Find toys quickly using different filters
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

//           {filters.map((item) => {

//             const Icon = item.icon;

//             return (

//               <Link
//                 href={item.link}
//                 key={item.id}
//               >

//                 <motion.div
//                   whileHover={{ y: -8 }}
//                   className={`rounded-3xl p-8 text-white bg-gradient-to-br ${item.color} shadow-lg cursor-pointer`}
//                 >

//                   <Icon size={40} />

//                   <h3 className="mt-5 text-lg font-bold">
//                     {item.title}
//                   </h3>

//                 </motion.div>

//               </Link>

//             );

//           })}

//         </div>

//       </div>

//     </section>
//   );
// }






"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cake,
  IndianRupee,
  Puzzle,
  Tag,
  Star,
  Gift,
  Truck,
  Sparkles,
} from "lucide-react";

const filters = [
  {
    id: 1,
    title: "By Age",
    subtitle: "0 - 12+ Years",
    icon: Cake,
    color: "from-pink-500 to-rose-500",
    link: "/products?filter=age",
  },
  {
    id: 2,
    title: "By Price",
    subtitle: "Best Budget",
    icon: IndianRupee,
    color: "from-green-500 to-emerald-500",
    link: "/products?filter=price",
  },
  {
    id: 3,
    title: "By Toy Type",
    subtitle: "Educational, RC...",
    icon: Puzzle,
    color: "from-blue-500 to-cyan-500",
    link: "/products?filter=category",
  },
  {
    id: 4,
    title: "By Brand",
    subtitle: "LEGO, Funskool...",
    icon: Tag,
    color: "from-purple-500 to-indigo-500",
    link: "/products?filter=brand",
  },
  {
    id: 5,
    title: "Top Rated",
    subtitle: "4★ & Above",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    link: "/products?filter=rating",
  },
  {
    id: 6,
    title: "Offers",
    subtitle: "Today's Deals",
    icon: Gift,
    color: "from-red-500 to-pink-500",
    link: "/products?filter=offers",
  },
  {
    id: 7,
    title: "New Arrivals",
    subtitle: "Latest Toys",
    icon: Sparkles,
    color: "from-cyan-500 to-sky-500",
    link: "/products?filter=new",
  },
  {
    id: 8,
    title: "Free Delivery",
    subtitle: "Eligible Products",
    icon: Truck,
    color: "from-teal-500 to-green-500",
    link: "/products?filter=delivery",
  },
];

export default function ShopByFilters() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-100">

      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">

          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-gray-900">Shop By </span>
            <span className="text-pink-500">Filters</span>
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Find your perfect toy in seconds
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-7">

          {filters.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                href={item.link}
                key={item.id}
              >

                <motion.div

                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}

                  whileTap={{
                    scale: .97,
                  }}

                  className={`group rounded-3xl bg-gradient-to-br ${item.color} p-8 shadow-xl cursor-pointer relative overflow-hidden`}

                >

                  <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />

                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full" />

                  <div className="relative z-10">

                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">

                      <Icon
                        size={34}
                        className="text-white"
                      />

                    </div>

                    <h3 className="mt-6 text-white text-xl font-black">

                      {item.title}

                    </h3>

                    <p className="text-white/80 mt-2 text-sm">

                      {item.subtitle}

                    </p>

                  </div>

                </motion.div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>
  );
}