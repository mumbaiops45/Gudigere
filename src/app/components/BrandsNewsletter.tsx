// src/components/home/BrandsNewsletter.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Zap, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Brand logos data
const brands = [
  {
    id: 1,
    name: "LEGO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/200px-LEGO_logo.svg.png",
    url: "/brands/lego",
  },
  {
    id: 2,
    name: "Hot Wheels",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Hot_Wheels_logo.svg/200px-Hot_Wheels_logo.svg.png",
    url: "/brands/hot-wheels",
  },
  {
    id: 3,
    name: "Barbie",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Barbie_Logo.svg/200px-Barbie_Logo.svg.png",
    url: "/brands/barbie",
  },
  {
    id: 4,
    name: "Fisher-Price",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Fisher-Price_logo.svg/200px-Fisher-Price_logo.svg.png",
    url: "/brands/fisher-price",
  },
  {
    id: 5,
    name: "Nerf",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nerf_logo.svg/200px-Nerf_logo.svg.png",
    url: "/brands/nerf",
  },
  {
    id: 6,
    name: "Hasbro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hasbro_logo.svg/200px-Hasbro_logo.svg.png",
    url: "/brands/hasbro",
  },
];

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const brandItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

// Newsletter Form Component
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // await API.post("/newsletter/subscribe", { email });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubscribed(true);
      toast.success("Thanks for subscribing! Check your inbox for a welcome gift 🎁");
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-6 bg-green-50 rounded-2xl"
      >
        <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg">You're subscribed! 🎉</h3>
        <p className="text-sm text-gray-600 mt-1">Welcome to the Goodie Gear family!</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Subscribe Now
            <Send size={16} />
          </>
        )}
      </motion.button>
      <p className="text-xs text-gray-400 text-center">
        No spam, only awesome deals. Unsubscribe anytime.
      </p>
    </form>
  );
}

// Main Component
export default function BrandsNewsletter() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full">
            🤝 Trusted Partners
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-4 text-gray-900">
            Brands <span className="text-pink-600">You Love</span>
          </h2>
          <p className="text-gray-500 mt-3">
            We partner with the world's most beloved toy brands
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Brands Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="bg-gray-50 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">✨ Our Brand Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <motion.a
                  key={brand.id}
                  href={brand.url}
                  variants={brandItemVariants}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white rounded-xl p-4 flex items-center justify-center hover:shadow-md transition-all"
                >
                  <div className="relative h-12 w-32">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="text-center mt-6">
              <a href="/brands" className="inline-flex items-center gap-1 text-sm text-pink-600 hover:gap-2 transition-all font-semibold">
                View all brands <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: Newsletter Signup */}
          <motion.div
            {...fadeUp(0.1)}
            className="bg-linear-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 shadow-md border border-white"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4">
                <Zap size={28} className="text-pink-600" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">
                Get 10% OFF Your First Order!
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Subscribe to our newsletter and receive exclusive deals, new arrivals, and a 10% discount code.
              </p>
            </div>
            <NewsletterForm />
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-400">
              <span>✓ 10,000+ subscribers</span>
              <span>✓ Weekly deals</span>
              <span>✓ No spam</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Badge */}
        <motion.div {...fadeUp(0.15)} className="text-center mt-12 pt-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm">
            🏆 Trusted by parents across India – 50,000+ happy customers
          </p>
        </motion.div>
      </div>
    </section>
  );
}