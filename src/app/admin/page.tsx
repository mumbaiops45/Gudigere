"use client";

import {
  ShoppingCart,
  Users,
  Package,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Orders",

    value: "1,240",

    growth: "+12%",

    icon: ShoppingCart,

    color:
      "from-pink-500 to-rose-500",

    bg: "bg-pink-500/10",
  },

  {
    title: "Products",

    value: "320",

    growth: "+8%",

    icon: Package,

    color:
      "from-cyan-500 to-blue-500",

    bg: "bg-cyan-500/10",
  },

  {
    title: "Vendors",

    value: "42",

    growth: "+5%",

    icon: Users,

    color:
      "from-violet-500 to-purple-500",

    bg: "bg-violet-500/10",
  },

  {
    title: "Revenue",

    value: "₹2.4L",

    growth: "+18%",

    icon: IndianRupee,

    color:
      "from-orange-500 to-amber-500",

    bg: "bg-orange-500/10",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

      {stats.map(
        (
          item,
          index
        ) => {
          const Icon =
            item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay:
                  index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="relative overflow-hidden rounded-[35px] border border-white/20 bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8"
            >

              {/* TOP GLOW */}
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r ${item.color} opacity-20 blur-3xl`}
              />

              {/* HEADER */}
              <div className="flex items-start justify-between">

                {/* ICON */}
                <div
                  className={`w-18 h-18 rounded-[24px] ${item.bg} flex items-center justify-center border border-white/30`}
                >

                  <div
                    className={`w-14 h-14 rounded-[20px] bg-gradient-to-r ${item.color} flex items-center justify-center shadow-xl`}
                  >

                    <Icon
                      size={28}
                      className="text-white"
                    />

                  </div>

                </div>

                {/* GROWTH */}
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-3 py-2 rounded-full text-sm font-bold">

                  <TrendingUp
                    size={16}
                  />

                  {item.growth}

                </div>

              </div>

              {/* CONTENT */}
              <div className="mt-10">

                <p className="text-slate-500 text-lg font-medium">

                  {item.title}

                </p>

                <h2 className="text-6xl font-black text-slate-900 mt-4 tracking-tight">

                  {item.value}

                </h2>

              </div>

              {/* BOTTOM LINE */}
              <div
                className={`mt-8 h-2 w-full rounded-full bg-gradient-to-r ${item.color}`}
              />

            </motion.div>
          );
        }
      )}

    </div>
  );
}