// "use client";

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { getBanners, trackBannerClick, Banner } from "../services/bannerService";

// const quickCats = [
//   { icon: "🚗", label: "Remote Cars" },
//   { icon: "🧸", label: "Soft Toys" },
//   { icon: "🧩", label: "LEGO" },
//   { icon: "📚", label: "Educational" },
//   { icon: "🤖", label: "Robots" },
//   { icon: "🎲", label: "Board Games" },
//   { icon: "✈️", label: "Drones" },
//   { icon: "🎨", label: "Art & Craft" },
// ];

// /* ── static fallback slides (used when API returns nothing) ── */
// const staticSlides: Banner[] = [
//   { _id: "static-1", image: "/hero.jpg",  title: "Amazing Toys",     subtitle: "For Every Kid!",      link: "/products", active: true, placement: "Home Hero", clicks: 0 },
//   { _id: "static-2", image: "/hero2.jpg", title: "Fun Learning",     subtitle: "Educational Toys",    link: "/products", active: true, placement: "Home Hero", clicks: 0 },
//   { _id: "static-3", image: "/hero3.jpg", title: "Cute Collections", subtitle: "Soft Toys & Dolls",  link: "/products", active: true, placement: "Home Hero", clicks: 0 },
// ];

// /* ── skeleton loader ── */
// function HeroSkeleton() {
//   return (
//     <div className="bg-[#f1f3f6] overflow-hidden">
//       <div className="relative h-80 sm:h-130 overflow-hidden bg-slate-200 animate-pulse">
//         <div className="absolute inset-0 bg-linear-to-r from-slate-300/80 via-slate-200/50 to-transparent" />
//         <div className="relative z-10 h-full flex items-center">
//           <div className="max-w-375 mx-auto w-full px-5 sm:px-8 lg:px-14 space-y-4">
//             <div className="h-5 w-40 rounded-full bg-slate-300" />
//             <div className="h-12 w-72 rounded-xl bg-slate-300" />
//             <div className="h-8 w-56 rounded-xl bg-slate-300" />
//             <div className="flex gap-3 mt-4">
//               <div className="h-11 w-32 rounded-md bg-slate-300" />
//               <div className="h-11 w-28 rounded-md bg-slate-300" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Hero() {
//   const router = useRouter();
//   const [slides, setSlides] = useState<Banner[]>([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   /* fetch hero banners on mount */
//   useEffect(() => {
//     getBanners("Home Hero")
//       .then((data) => {
//         const active = data.filter((b) => b.active);
//         setSlides(active.length > 0 ? active : staticSlides);
//       })
//       .catch(() => setSlides(staticSlides))
//       .finally(() => setLoading(false));
//   }, []);

//   /* auto-advance */
//   useEffect(() => {
//     if (slides.length <= 1) return;
//     const iv = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
//     return () => clearInterval(iv);
//   }, [slides.length]);

//   const handleCTA = (slide: Banner) => {
//     if (!slide._id.startsWith("static-")) {
//       trackBannerClick(slide._id).catch(() => {});
//     }
//     router.push(slide.link || "/products");
//   };

//   if (loading) return <HeroSkeleton />;

//   const slide = slides[current];

//   return (
//     <div className="bg-[#f1f3f6] overflow-hidden">

//       {/* ── BANNER ── */}
//       <div className="relative h-80 sm:h-130 overflow-hidden">

//         {/* Sliding background */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={slide._id}
//             initial={{ opacity: 0, scale: 1.06 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.9 }}
//             className="absolute inset-0"
//           >
//             <Image
//               src={slide.image}
//               alt={slide.title}
//               fill
//               priority
//               sizes="100vw"
//               className="object-cover"
//             />
//           </motion.div>
//         </AnimatePresence>

//         {/* Dark overlay */}
//         <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

//         {/* Slide indicator dots */}
//         {slides.length > 1 && (
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
//             {slides.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrent(i)}
//                 className={`transition-all duration-300 rounded-full ${
//                   i === current
//                     ? "w-6 h-2 bg-pink-500"
//                     : "w-2 h-2 bg-white/40 hover:bg-white/70"
//                 }`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Content */}
//         <div className="relative z-10 h-full flex items-center">
//           <div className="max-w-375 mx-auto w-full px-5 sm:px-8 lg:px-14">

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={slide._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.6 }}
//                 className="max-w-xs sm:max-w-sm md:max-w-lg"
//               >
//                 {/* Promo badge */}
//                 <div className="inline-flex items-center gap-1.5 toy-badge px-3 py-1.5 rounded-full text-xs font-bold mb-3 sm:mb-4">
//                   🎉 Up to 50% OFF — Today Only!
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
//                   {slide.title}
//                   {(slide.subtitle || slide.description) && (
//                     <span className="block text-gradient-warm">
//                       {slide.subtitle || slide.description}
//                     </span>
//                   )}
//                 </h1>

//                 {/* Subtext */}
//                 <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed hidden sm:block">
//                   10,000+ toys for kids aged 0–16.{" "}
//                   <span className="text-green-400 font-semibold">✓ Free delivery</span> across India.
//                 </p>

//                 {/* CTAs */}
//                 <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-7">
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => handleCTA(slide)}
//                     className="btn-shine bg-pink-600 hover:bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-bold text-sm transition-colors shadow-lg"
//                   >
//                     Shop Now →
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                     onClick={() => router.push("/cart")}
//                     className="bg-white/15 hover:bg-white/30 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-md font-bold text-sm border border-white/35 transition-all"
//                   >
//                     View Deals
//                   </motion.button>
//                 </div>

//                 {/* Trust badges — desktop */}
//                 <div className="hidden md:flex flex-wrap gap-4 mt-5">
//                   {["10K+ Products", "50+ Brands", "2M+ Happy Kids"].map((b) => (
//                     <div key={b} className="flex items-center gap-1.5 text-white/60 text-sm">
//                       <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
//                       {b}
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getBanners, trackBannerClick, Banner } from "../services/bannerService";

const staticSlides: Banner[] = [
  { _id: "static-1", image: "/hero.jpg",  title: "Amazing Toys",     subtitle: "For Every Kid!",      link: "/products", active: true, placement: "Home Hero", clicks: 0 },
  { _id: "static-2", image: "/hero2.jpg", title: "Fun Learning",     subtitle: "Educational Toys",    link: "/products", active: true, placement: "Home Hero", clicks: 0 },
  { _id: "static-3", image: "/hero3.jpg", title: "Cute Collections", subtitle: "Soft Toys & Dolls",  link: "/products", active: true, placement: "Home Hero", clicks: 0 },
];

function HeroSkeleton() {
  return (
    <div className="bg-[#f1f3f6] overflow-hidden">
      <div className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] overflow-hidden bg-slate-200 animate-pulse">
        <div className="absolute inset-0 bg-linear-to-r from-slate-300/80 via-slate-200/50 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4">
            <div className="h-4 w-28 sm:w-36 rounded-full bg-slate-300" />
            <div className="h-8 sm:h-12 w-48 sm:w-72 rounded-xl bg-slate-300" />
            <div className="h-6 sm:h-8 w-40 sm:w-56 rounded-xl bg-slate-300" />
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div className="h-10 sm:h-11 w-28 sm:w-32 rounded-md bg-slate-300" />
              <div className="h-10 sm:h-11 w-24 sm:w-28 rounded-md bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [slides, setSlides] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners("Home Hero")
      .then((data) => {
        const active = data.filter((b) => b.active);
        setSlides(active.length > 0 ? active : staticSlides);
      })
      .catch(() => setSlides(staticSlides))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const iv = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(iv);
  }, [slides.length]);

  const handleCTA = (slide: Banner) => {
    if (!slide._id.startsWith("static-")) {
      trackBannerClick(slide._id).catch(() => {});
    }
    router.push(slide.link || "/products");
  };

  if (loading) return <HeroSkeleton />;

  const slide = slides[current];

  return (
    <div className="bg-[#f1f3f6] overflow-hidden">

      {/* ── BANNER ── */}
      <div className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] overflow-hidden">

        {/* Sliding background */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide._id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

        {/* Slide indicator dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-pink-500"
                    : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* ── CONTENT ── */}
        <div className="relative z-10 h-full flex items-center pt-8 sm:pt-12 lg:pt-8">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

            <AnimatePresence mode="wait">
              <motion.div
                key={slide._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl"
              >
                {/* Promo badge */}
                <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 bg-pink-600/80 text-white backdrop-blur-sm">
                  🎉 Up to 50% OFF — Today Only!
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  {slide.title}
                  {(slide.subtitle || slide.description) && (
                    <span className="block text-gradient-warm">
                      {slide.subtitle || slide.description}
                    </span>
                  )}
                </h1>

                {/* Subtext */}
                <p className="mt-3 sm:mt-4 text-white/70 text-sm sm:text-base md:text-lg leading-relaxed hidden sm:block">
                  10,000+ toys for kids aged 0–16.{" "}
                  <span className="text-green-400 font-semibold">✓ Free delivery</span> across India.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-5 sm:mt-6 md:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCTA(slide)}
                    className="bg-pink-600 hover:bg-black text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-md font-bold text-sm sm:text-base transition-colors shadow-lg"
                  >
                    Shop Now →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => router.push("/cart")}
                    className="bg-white/15 hover:bg-white/30 text-white px-5 sm:px-7 md:px-9 py-3 sm:py-3.5 md:py-4 rounded-md font-bold text-sm sm:text-base border border-white/35 transition-all"
                  >
                    View Deals
                  </motion.button>
                </div>

                {/* Trust badges */}
                <div className="hidden md:flex flex-wrap gap-4 lg:gap-6 mt-5 lg:mt-6">
                  {["10K+ Products", "50+ Brands", "2M+ Happy Kids"].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-white/60 text-sm lg:text-base">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}