// src/components/home/Testimonials.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, Zap } from "lucide-react";

// Types
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

// Helper: render stars
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      size={16}
      className={`${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
    />
  ));
};

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

// Single Testimonial Card
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
    >
      {/* Quote Icon */}
      <Quote size={28} className="text-pink-200 mb-3" />

      {/* Comment */}
      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
        "{testimonial.comment}"
      </p>

      {/* Star Rating */}
      <div className="flex mb-3">
        {renderStars(testimonial.rating)}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={testimonial.avatar || "/avatar-placeholder.png"}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
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

      {/* Product Name (optional) */}
      {testimonial.productName && (
        <p className="text-xs text-pink-600 mt-2">
          Bought: {testimonial.productName}
        </p>
      )}
    </motion.div>
  );
}

// Carousel Navigation (for mobile/tablet)
function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
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

// Main Component
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size for carousel vs grid
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Fetch testimonials from API
    const fetchTestimonials = async () => {
      try {
        // Replace with your actual API call
        // const res = await API.get("/reviews");
        // setTestimonials(res.data);

        // Mock data – replace with real data from backend
        setTimeout(() => {
          setTestimonials([
            {
              _id: "1",
              name: "Priya Sharma",
              location: "Mumbai",
              rating: 5,
              comment: "Ordered the LEGO set for my son's birthday. Arrived early and he absolutely loved it! The quality is superb.",
              avatar: "https://randomuser.me/api/portraits/women/1.jpg",
              productName: "LEGO Classic Box",
              isVerified: true,
              date: "2024-01-15",
            },
            {
              _id: "2",
              name: "Rahul Mehta",
              location: "Delhi",
              rating: 5,
              comment: "Best toy store ever! My daughter is obsessed with the stuffed unicorn. Great packing and fast delivery.",
              avatar: "https://randomuser.me/api/portraits/men/2.jpg",
              productName: "Unicorn Plush Toy",
              isVerified: true,
              date: "2024-01-10",
            },
            {
              _id: "3",
              name: "Anjali Nair",
              location: "Bangalore",
              rating: 4,
              comment: "The remote car is amazing value for money. My nephew played with it for hours. Will definitely buy again.",
              avatar: "https://randomuser.me/api/portraits/women/3.jpg",
              productName: "RC Stunt Car",
              isVerified: true,
              date: "2024-01-05",
            },
            {
              _id: "4",
              name: "Vikram Singh",
              location: "Jaipur",
              rating: 5,
              comment: "I'm impressed with the STEM robot kit. My 10-year-old learned so much. Highly recommended!",
              avatar: "https://randomuser.me/api/portraits/men/4.jpg",
              productName: "Solar Robot Kit",
              isVerified: true,
              date: "2024-01-02",
            },
            {
              _id: "5",
              name: "Neha Gupta",
              location: "Pune",
              rating: 5,
              comment: "Customer service is top-notch. They helped me choose the perfect gift. My kids love the art set!",
              avatar: "https://randomuser.me/api/portraits/women/5.jpg",
              productName: "Deluxe Art Set",
              isVerified: true,
              date: "2023-12-28",
            },
            {
              _id: "6",
              name: "Amit Patel",
              location: "Ahmedabad",
              rating: 4.5,
              comment: "Great collection of board games. Shipping was quick and the products were in perfect condition.",
              avatar: "https://randomuser.me/api/portraits/men/6.jpg",
              productName: "Family Board Game",
              isVerified: true,
              date: "2023-12-20",
            },
          ]);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
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
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Average Rating Summary */}
        <motion.div {...fadeUp(0.05)} className="bg-white rounded-2xl shadow-md p-6 mb-10 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-black text-gray-900">4.8</div>
                <div className="flex gap-0.5 mt-1">{renderStars(4.8)}</div>
                <div className="text-xs text-gray-400 mt-1">from 2,345 reviews</div>
              </div>
              <div className="border-l pl-4">
                <p className="text-sm text-gray-600 max-w-xs">
                  ⭐ "Best toy store in India – amazing quality and support!"
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">TrustScore 4.8</span>
              <span className="text-gray-300">|</span>
              <span className="text-pink-600 font-bold">Excellent</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Display */}
        {isMobile ? (
          <TestimonialCarousel testimonials={testimonials} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} index={idx} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div {...fadeUp(0.2)} className="text-center mt-12">
          <button className="inline-flex items-center gap-2 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
            Read All Reviews
            <ChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}