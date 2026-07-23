"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import useCategory from "../hooks/useCategory";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

type Category = {
  _id: string;
  name: string;
  image?: string;
  description?: string;
};

export default function CategorySection() {
  const { categories, loading } = useCategory();
  const router = useRouter();
  const pathname = usePathname();
  // ── State to track the selected category ──
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const handleCategoryClick = (category: Category) => {
    if (redirecting) return;

    setRedirecting(true);
    // setSelectedId(category._id);

    setTimeout(() => {
      router.push(`/categories/${encodeURIComponent(category.name)}`);
    }, 500);
  };
  if (loading) {

    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="h-[450px] rounded-3xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-6"
        >
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-5">
            Premium Collections
          </span>

          <h2 className="text-5xl font-black text-gray-900">
            Shop By <span className="text-pink-600">Category</span>
          </h2>

          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Discover toys, games, gifts and learning products for every age.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button className="category-prev w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
            <ChevronLeft />
          </button>

          <button className="category-next w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
            <ChevronRight />
          </button>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect="coverflow"
          centeredSlides
          loop
          grabCursor
          navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 150,
            modifier: 1.5,
            scale: 0.85,
            slideShadows: false,
          }}
          className="!pb-10"
        >
          {categories.map((category: Category) => {
            const isSelected =
              pathname === `/categories/${encodeURIComponent(category.name)}`;

            return (
              <SwiperSlide
                key={category._id}
                className="!w-[320px] md:!w-[380px]"
              >
                <div
                  onClick={() => handleCategoryClick(category)}
                  className={`cursor-pointer transition-all duration-300 ${redirecting ? "pointer-events-none" : ""
                    }`}
                >
                  <div
                    className={`
                      group
                      relative
                      h-[450px]
                      overflow-hidden
                      rounded-[32px]
                      cursor-pointer
                      shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                      transition-all
                      duration-300
                     ${redirecting ? "pointer-events-none opacity-95" : ""}
${isSelected
                        ? "ring-4 ring-pink-500 ring-offset-4 scale-[1.03] border-4 border-pink-500 shadow-2xl"
                        : "hover:scale-[1.01]"
                      }
                    `}
                  >
                    {/* Image */}
                    <Image
                      src={
                        category.image ||
                        "https://placehold.co/600x800"
                      }
                      alt={category.name}
                      fill
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span className="px-4 py-2 rounded-full bg-white text-pink-600 shadow-lg text-xs font-bold">
                        {/* <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold"> */}
                        Featured
                      </span>
                      {isSelected && (
                        <span className="px-4 py-2 rounded-full bg-pink-500 text-white text-xs font-semibold flex items-center gap-1 animate-pulse">
                          <CheckCircle size={14} />
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Content Box */}
                    <div
                      className={`
    absolute
    bottom-5
    left-5
    right-5
    p-5
    rounded-3xl
    backdrop-blur-xl
    border
    transition-all
    ${isSelected
                          ? "bg-pink-600/90 border-pink-400"
                          : "bg-white/10 border-white/20"
                        }
  `}
                    >
                      <h3
                        className={`text-2xl font-bold mb-2 ${isSelected ? "text-yellow-300" : "text-white"
                          }`}
                      >
                        {category.name}
                      </h3>

                      <p className="text-white/80 text-sm line-clamp-2 mb-4">
                        {category.description ||
                          "Explore premium toys and gifts for kids."}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-white text-xs rounded-full font-medium">
                            Premium
                          </span>

                          <span className="px-3 py-1 bg-white text-xs rounded-full font-medium">
                            Trending
                          </span>
                        </div>

                        <div
                          className="
                            w-11
                            h-11
                            rounded-full
                            bg-gradient-to-r
                            from-pink-600
                            to-purple-600
                            flex
                            items-center
                            justify-center
                            text-white
                            transition-all
                            duration-300
                            group-hover:rotate-45
                          "
                        >
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Shine */}
                    <div
                      className="
                        absolute
                        inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-700
                        bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)]
                      "
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}