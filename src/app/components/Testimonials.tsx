// src/components/home/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Zap } from "lucide-react";
import API from "../../services/api";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  productName?: string;
  isVerified: boolean;
  date: string;
}

const AVATAR_COLORS = [
  "bg-pink-500", "bg-purple-500", "bg-blue-500",
  "bg-green-500", "bg-amber-500", "bg-rose-500", "bg-indigo-500",
];

function AvatarInitials({ name, size = "w-10 h-10" }: { name: string; size?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const color = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div className={`${size} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${color}`}>
      {initials}
    </div>
  );
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      size={16}
      className={`${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
    />
  ));
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100 hover:border-pink-300 hover:shadow-xl transition-all"
    >
      <Quote size={28} className="text-pink-200 mb-3" />
      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
        "{testimonial.comment}"
      </p>
      <div className="flex mb-3">{renderStars(testimonial.rating)}</div>
      <div className="flex items-center gap-3">
        {testimonial.avatar ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
            <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="40px" className="object-cover" />
          </div>
        ) : (
          <AvatarInitials name={testimonial.name} />
        )}
        <div>
          <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{testimonial.location}</span>
            {testimonial.isVerified && (
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Verified</span>
            )}
          </div>
        </div>
      </div>
      {testimonial.productName && (
        <p className="text-xs text-pink-600 mt-2">Bought: {testimonial.productName}</p>
      )}
    </motion.div>
  );
}

function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TestimonialCard testimonial={testimonials[current]} index={0} />
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
        <ChevronRight size={20} />
      </button>
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-pink-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const fetchTestimonials = async () => {
      try {
        // ✅ New endpoint: returns only published reviews
        const res = await API.get("/reviews/published");
        console.log("✅ Published reviews:", res.data);

        const reviews = Array.isArray(res.data) ? res.data : [];
        const mapped = reviews.map((r: any) => ({
          _id: r._id,
          name: r.customer?.name ?? "Customer",
          location: r.customer?.location ?? "",
          rating: r.rating,
          comment: r.comment,
          avatar: r.customer?.avatar ?? "",
          productName: r.product?.title ?? "",
          isVerified: true,
          date: r.createdAt,
        }));

        setTestimonials(mapped);
      } catch (err) {
        console.error("❌ Error fetching reviews:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4" />
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <div key={i} className="bg-gray-200 h-64 rounded-2xl" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full">
            <Zap size={14} /> Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-gray-900">
            What <span className="text-pink-600">Parents</span> Say
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            No published reviews yet – check back soon!
          </p>
          <p className="text-sm text-gray-400 mt-2">
            (Admins can approve pending reviews in the dashboard)
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full">
            <Zap size={14} /> Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 text-gray-900">
            What <span className="text-pink-600">Parents</span> Say
          </h2>
          <p className="text-gray-500 text-lg mt-3">
            Join 10,000+ happy families who trust Goodie Gear
          </p>
        </motion.div>

        

        {isMobile ? (
          <TestimonialCarousel testimonials={showAll ? testimonials : testimonials.slice(0, 3)} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAll ? testimonials : testimonials.slice(0, 3)).map((testimonial, idx) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} index={idx} />
            ))}
          </div>
        )}

        {testimonials.length > 3 && (
          <motion.div {...fadeUp(0.2)} className="text-center mt-12">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              {showAll ? "Show Less" : "Read All Reviews"}
              <ChevronRight size={18} className={`transition-transform ${showAll ? "rotate-90" : ""}`} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}