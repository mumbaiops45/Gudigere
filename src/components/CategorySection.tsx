// "use client";

// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import Image from "next/image";
// import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
// import { motion } from "framer-motion";
// import useCategory from "../hooks/useCategory";

// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   EffectCoverflow,
//   Navigation,
//   Autoplay,
// } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";

// type Category = {
//   _id: string;
//   name: string;
//   image?: string;
//   description?: string;
// };

// export default function CategorySection() {
//   const { categories, loading } = useCategory();
//   const router = useRouter();
//   const pathname = usePathname();
//   // ── State to track the selected category ──
//   // const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [redirecting, setRedirecting] = useState(false);

//   const handleCategoryClick = (category: Category) => {
//     if (redirecting) return;

//     setRedirecting(true);
//     // setSelectedId(category._id);

//     setTimeout(() => {
//       router.push(`/categories/${encodeURIComponent(category.name)}`);
//     }, 500);
//   };
//   if (loading) {

//     return (
//       <section className="py-24 bg-gradient-to-b from-white to-gray-50">
//         <div className="max-w-[1400px] mx-auto px-6">
//           <div className="h-[450px] rounded-3xl bg-gray-200 animate-pulse" />
//         </div>
//       </section>
//     );
//   }

//   if (!categories?.length) return null;

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
//       <div className="max-w-[1500px] mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16 px-6"
//         >
//           <span className="inline-flex items-center px-5 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-semibold mb-5">
//             Premium Collections
//           </span>

//           <h2 className="text-5xl font-black text-gray-900">
//             Shop By <span className="text-pink-600">Category</span>
//           </h2>

//           <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
//             Discover toys, games, gifts and learning products for every age.
//           </p>
//         </motion.div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-center gap-4 mb-10">
//           <button className="category-prev w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
//             <ChevronLeft />
//           </button>

//           <button className="category-next w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition">
//             <ChevronRight />
//           </button>
//         </div>

//         {/* Swiper Carousel */}
//         <Swiper
//           modules={[EffectCoverflow, Navigation, Autoplay]}
//           effect="coverflow"
//           centeredSlides
//           loop
//           grabCursor
//           navigation={{
//             prevEl: ".category-prev",
//             nextEl: ".category-next",
//           }}
//           autoplay={{
//             delay: 3500,
//             disableOnInteraction: false,
//           }}
//           slidesPerView={"auto"}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: -80,
//             depth: 150,
//             modifier: 1.5,
//             scale: 0.85,
//             slideShadows: false,
//           }}
//           className="!pb-10"
//         >
//           {categories.map((category: Category) => {
//             const isSelected =
//               pathname === `/categories/${encodeURIComponent(category.name)}`;

//             return (
//               <SwiperSlide
//                 key={category._id}
//                 className="!w-[320px] md:!w-[380px]"
//               >
//                 <div
//                   onClick={() => handleCategoryClick(category)}
//                   className={`cursor-pointer transition-all duration-300 ${redirecting ? "pointer-events-none" : ""
//                     }`}
//                 >
//                   <div
//                     className={`
//                       group
//                       relative
//                       h-[450px]
//                       overflow-hidden
//                       rounded-[32px]
//                       cursor-pointer
//                       shadow-[0_20px_60px_rgba(0,0,0,0.15)]
//                       transition-all
//                       duration-300
//                      ${redirecting ? "pointer-events-none opacity-95" : ""}
// ${isSelected
//                         ? "ring-4 ring-pink-500 ring-offset-4 scale-[1.03] border-4 border-pink-500 shadow-2xl"
//                         : "hover:scale-[1.01]"
//                       }
//                     `}
//                   >
//                     {/* Image */}
//                     <Image
//                       src={
//                         category.image ||
//                         "https://placehold.co/600x800"
//                       }
//                       alt={category.name}
//                       fill
//                       className="
//                         object-cover
//                         transition-transform
//                         duration-700
//                         group-hover:scale-110
//                       "
//                     />

//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                     {/* Badges */}
//                     <div className="absolute top-5 left-5 flex gap-2">
//                       <span className="px-4 py-2 rounded-full bg-white text-pink-600 shadow-lg text-xs font-bold">
//                         {/* <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-semibold"> */}
//                         Featured
//                       </span>
//                       {isSelected && (
//                         <span className="px-4 py-2 rounded-full bg-pink-500 text-white text-xs font-semibold flex items-center gap-1 animate-pulse">
//                           <CheckCircle size={14} />
//                           Selected
//                         </span>
//                       )}
//                     </div>

//                     {/* Content Box */}
//                     <div
//                       className={`
//     absolute
//     bottom-5
//     left-5
//     right-5
//     p-5
//     rounded-3xl
//     backdrop-blur-xl
//     border
//     transition-all
//     ${isSelected
//                           ? "bg-pink-600/90 border-pink-400"
//                           : "bg-white/10 border-white/20"
//                         }
//   `}
//                     >
//                       <h3
//                         className={`text-2xl font-bold mb-2 ${isSelected ? "text-yellow-300" : "text-white"
//                           }`}
//                       >
//                         {category.name}
//                       </h3>

//                       <p className="text-white/80 text-sm line-clamp-2 mb-4">
//                         {category.description ||
//                           "Explore premium toys and gifts for kids."}
//                       </p>

//                       <div className="flex items-center justify-between">
//                         <div className="flex gap-2">
//                           <span className="px-3 py-1 bg-white text-xs rounded-full font-medium">
//                             Premium
//                           </span>

//                           <span className="px-3 py-1 bg-white text-xs rounded-full font-medium">
//                             Trending
//                           </span>
//                         </div>

//                         <div
//                           className="
//                             w-11
//                             h-11
//                             rounded-full
//                             bg-gradient-to-r
//                             from-pink-600
//                             to-purple-600
//                             flex
//                             items-center
//                             justify-center
//                             text-white
//                             transition-all
//                             duration-300
//                             group-hover:rotate-45
//                           "
//                         >
//                           <ArrowRight size={18} />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Shine */}
//                     <div
//                       className="
//                         absolute
//                         inset-0
//                         opacity-0
//                         group-hover:opacity-100
//                         transition-opacity
//                         duration-700
//                         bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent)]
//                       "
//                     />
//                   </div>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

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
  const [redirecting, setRedirecting] = useState(false);

  const handleCategoryClick = (category: Category) => {
    if (redirecting) return;
    setRedirecting(true);
    setTimeout(() => {
      router.push(`/categories/${encodeURIComponent(category.name)}`);
    }, 500);
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="h-[350px] sm:h-[450px] rounded-3xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16 px-4 sm:px-6"
        >
          <span className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-pink-100 text-pink-600 text-xs sm:text-sm font-semibold mb-3 sm:mb-5">
            Premium Collections
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
            Shop By <span className="text-pink-600">Category</span>
          </h2>

          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto px-4">
            Discover toys, games, gifts and learning products for every age.
          </p>
        </motion.div>

        {/* Navigation Buttons – responsive sizing */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-10">
          <button className="category-prev w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition text-pink-600">
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <button className="category-next w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition text-pink-600">
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
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
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: -40, // less stretch on mobile (was -80)
            depth: 120,   // slightly less depth
            modifier: 1.2,
            scale: 0.85,
            slideShadows: false,
          }}
          breakpoints={{
            640: {
              coverflowEffect: {
                stretch: -60,
                depth: 140,
                modifier: 1.4,
              },
            },
            1024: {
              coverflowEffect: {
                stretch: -80,
                depth: 150,
                modifier: 1.5,
              },
            },
          }}
          className="!pb-6 sm:!pb-10"
        >
          {categories.map((category: Category) => {
            const isSelected =
              pathname === `/categories/${encodeURIComponent(category.name)}`;

            return (
              <SwiperSlide
                key={category._id}
                className="!w-[260px] sm:!w-[320px] md:!w-[380px]"
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
                      h-[320px] sm:h-[400px] md:h-[450px]
                      overflow-hidden
                      rounded-2xl sm:rounded-3xl
                      cursor-pointer
                      shadow-[0_10px_40px_rgba(0,0,0,0.12)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                      transition-all
                      duration-300
                      ${redirecting ? "pointer-events-none opacity-95" : ""}
                      ${isSelected
                        ? "ring-4 ring-pink-500 ring-offset-4 scale-[1.02] sm:scale-[1.03] border-4 border-pink-500 shadow-2xl"
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
                    <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex gap-2">
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-pink-600 shadow-lg text-[10px] sm:text-xs font-bold">
                        Featured
                      </span>
                      {isSelected && (
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-pink-500 text-white text-[10px] sm:text-xs font-semibold flex items-center gap-1 animate-pulse">
                          <CheckCircle size={14} />
                          Selected
                        </span>
                      )}
                    </div>

                    {/* Content Box */}
                    <div
                      className={`
                        absolute
                        bottom-3 sm:bottom-5
                        left-3 sm:left-5
                        right-3 sm:right-5
                        p-4 sm:p-5
                        rounded-2xl sm:rounded-3xl
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
                        className={`
                          text-lg sm:text-2xl font-bold mb-1 sm:mb-2
                          ${isSelected ? "text-yellow-300" : "text-white"}
                        `}
                      >
                        {category.name}
                      </h3>

                      <p className="text-white/70 sm:text-white/80 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-4">
                        {category.description ||
                          "Explore premium toys and gifts for kids."}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 sm:gap-2">
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white text-[10px] sm:text-xs rounded-full font-medium">
                            Premium
                          </span>
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white text-[10px] sm:text-xs rounded-full font-medium">
                            Trending
                          </span>
                        </div>

                        <div
                          className="
                            w-9 h-9 sm:w-11 sm:h-11
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
                          <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
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