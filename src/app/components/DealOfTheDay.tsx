// src/components/home/DealOfTheDay.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ShoppingCart, Zap, Shield } from "lucide-react";
import Link from "next/link";

// Types
interface DealProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  images: string[];
  discount: number;
  stockLeft: number;
  soldCount: number;
}

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-black/80 backdrop-blur-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[70px]">
            <span className="text-2xl sm:text-3xl font-black text-white">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 capitalize">{unit}</p>
        </div>
      ))}
    </div>
  );
}

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

// Main Component
export default function DealOfTheDay() {
  const [deal, setDeal] = useState<DealProduct | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Set target date to end of day + 2 days (example)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);
  targetDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    // Replace with your actual API call
    const fetchDeal = async () => {
      try {
        // Example: const res = await API.get("/products/deal-of-the-day");
        // setDeal(res.data);
        
        // Mock data
        setTimeout(() => {
          setDeal({
            _id: "deal_001",
            name: "Ultimate Remote Control Stunt Car",
            slug: "ultimate-rc-stunt-car",
            price: 1799,
            originalPrice: 3999,
            images: ["https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=600&auto=format"],
            discount: 55,
            stockLeft: 23,
            soldCount: 127,
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch deal:", error);
        setLoading(false);
      }
    };

    fetchDeal();
  }, []);

  if (loading) {
    return (
      <section className="bg-linear-to-r from-red-50 to-orange-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8" />
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-full lg:w-1/2 h-96 bg-gray-200 rounded-2xl" />
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-6 bg-gray-200 rounded w-1/2" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!deal) return null;

  return (
    <section className="bg-linear-to-r from-red-50 via-orange-50 to-amber-50 py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Zap size={14} /> LIMITED TIME OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-gray-900">
            Deal of the <span className="text-pink-600">Day</span>
          </h2>
          <p className="text-gray-600 text-lg mt-3">Grab it before it's gone! ⏰</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Product Image */}
          <motion.div
            {...fadeUp(0.1)}
            className="w-full lg:w-1/2 relative group"
          >
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={deal.images[0]}
                alt={deal.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white text-2xl font-black px-4 py-2 rounded-full shadow-lg rotate-[-5deg]">
                -{deal.discount}%
              </div>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div {...fadeUp(0.2)} className="w-full lg:w-1/2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                  ⚡ Hot Deal
                </span>
                <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                  {deal.stockLeft} left in stock
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                {deal.name}
              </h3>
              <p className="text-gray-500 mt-2">
                High-speed, 360° rotation, rechargeable battery. Perfect gift for kids aged 6+.
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-red-600">₹{deal.price.toLocaleString()}</span>
              <span className="text-lg text-gray-400 line-through">₹{deal.originalPrice.toLocaleString()}</span>
              <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded-full">
                Save ₹{(deal.originalPrice - deal.price).toLocaleString()}
              </span>
            </div>

            {/* Sold Count */}
            <div className="bg-white/60 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-gray-700">Already sold:</span>
                <span className="font-bold text-pink-600">{deal.soldCount} units</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-red-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${Math.min((deal.soldCount / (deal.soldCount + deal.stockLeft)) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-linear-to-r from-red-600 to-orange-600 rounded-2xl p-5 text-center shadow-xl">
              <p className="text-white font-bold mb-3 flex items-center justify-center gap-2">
                <Clock size={18} /> Hurry! Offer ends in:
              </p>
              <CountdownTimer targetDate={targetDate} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingCart size={20} />
                Add to Cart – ₹{deal.price}
              </motion.button>
              <Link href={`/product/${deal.slug}`} className="flex-1">
                <button className="w-full border-2 border-gray-300 hover:border-pink-600 text-gray-700 hover:text-pink-600 font-bold py-4 rounded-xl transition-all">
                  View Details
                </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">✅ Free Shipping</span>
              <span className="flex items-center gap-1">🔄 7-Day Returns</span>
              <span className="flex items-center gap-1">🔒 Secure Checkout</span>
            </div>
          </motion.div>
        </div>

        {/* Bumper Note */}
        <motion.p {...fadeUp(0.3)} className="text-center text-gray-400 text-sm mt-10">
          *Limited stock available. Offer valid while supplies last.
        </motion.p>
      </div>
    </section>
  );
}