// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//     FaArrowRight,
//     FaLeaf,
//     FaExternalLinkAlt,
//     FaCheckCircle,
//     FaTrophy,
//     FaShieldAlt,
//     FaStar,
//     FaGem,
//     FaHeart,
//     FaStore,
//     FaUtensils,
// } from "react-icons/fa";
// import { MdVerified } from "react-icons/md";

// export default function OurBrandsPage() {
//     return (
//         <div className="min-h-screen bg-white">
// <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-rose-50">

//   <div className="max-w-6xl mx-auto px-6">

//     {/* Heading */}

//     <div className="text-center mb-14">

//       <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-5 py-2 rounded-full font-semibold">
//         <FaHeart />
//         OJAIN GROUP
//       </span>

//       <h1 className="mt-5 text-5xl md:text-6xl font-black text-gray-900">
//         Our <span className="text-pink-500">Brands</span>
//       </h1>

//       <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
//         Discover our trusted brands delivering premium quality,
//         authentic taste and excellence.
//       </p>

//     </div>

//     {/* Card */}

//     <div className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-pink-100 overflow-hidden">

//       <div className="h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500" />

//       <div className="p-10 md:p-12">

//         <div className="flex flex-col lg:flex-row items-center gap-10">

//           {/* Logo */}

//           <div className="flex-shrink-0">

//             <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200 shadow-lg flex items-center justify-center">

//               <Image
//                 src="/logo.png"
//                 alt="OJAIN"
//                 width={120}
//                 height={120}
//                 className="object-contain"
//               />

//             </div>

//           </div>

//           {/* Content */}

//           <div className="flex-1">

//             <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">

//               <MdVerified />

//               Flagship Brand

//             </span>

//             <h2 className="mt-5 text-5xl font-black text-gray-900">

//               O<span className="text-pink-500">JAIN</span>

//             </h2>

//             <p className="text-pink-500 font-semibold mt-2 text-lg">
//               Premium Jain Food Products
//             </p>

//             <p className="mt-6 text-gray-600 leading-8">
//               Premium Jain food products made without onion and garlic,
//               delivering authentic taste, purity and trusted quality with
//               carefully selected ingredients.
//             </p>

//             {/* Features */}

//             <div className="flex flex-wrap gap-3 mt-7">

//               {[
//                 "100% Jain",
//                 "No Onion & Garlic",
//                 "Premium Quality",
//                 "Trusted Brand",
//               ].map((item) => (

//                 <div
//                   key={item}
//                   className="flex items-center gap-2 bg-pink-50 border border-pink-200 px-4 py-2 rounded-full"
//                 >
//                   <FaCheckCircle className="text-pink-500" />
//                   <span className="text-gray-700 font-medium">
//                     {item}
//                   </span>
//                 </div>

//               ))}

//             </div>

//             {/* Buttons */}

//             <div className="flex flex-wrap gap-4 mt-9">

//               <a
//                 href="https://ojainwebsite.netlify.app"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-7 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
//               >
//                 Visit Website
//                 <FaExternalLinkAlt size={14} />
//               </a>

//               <Link
//                 href="https://ojainwebsite.netlify.app/categories"
//                 className="inline-flex items-center gap-2 border-2 border-pink-300 text-pink-600 hover:bg-pink-500 hover:text-white px-7 py-3 rounded-xl font-bold transition-all duration-300"
//               >
//                 Browse Products
//                 <FaArrowRight size={14} />
//               </Link>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   </div>

// </section>
//         </div>
//     );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import {
    FaArrowRight,
    FaLeaf,
    FaExternalLinkAlt,
    FaCheckCircle,
    FaTrophy,
    FaShieldAlt,
    FaStar,
    FaGem,
    FaHeart,
    FaStore,
    FaUtensils,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function OurBrandsPage() {
    return (
        <div className="min-h-screen bg-white">
            <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-pink-50 via-white to-rose-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="text-center mb-8 sm:mb-10 md:mb-14">
                        <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-semibold text-sm sm:text-base">
                            <FaHeart />
                            OJAIN GROUP
                        </span>
                        <h1 className="mt-3 sm:mt-4 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                            Our <span className="text-pink-500">Brands</span>
                        </h1>
                        <p className="mt-2 sm:mt-3 md:mt-4 max-w-2xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg px-2">
                            Discover our trusted brands delivering premium quality,
                            authentic taste and excellence.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[32px] shadow-2xl border border-pink-100 overflow-hidden">
                        <div className="h-1.5 sm:h-2 bg-gradient-to-r from-pink-400 via-pink-500 to-rose-500" />

                        <div className="p-5 sm:p-8 md:p-10 lg:p-12">
                            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10">

                                {/* Logo */}
                                <div className="flex-shrink-0">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200 shadow-lg flex items-center justify-center">
                                        <Image
                                            src="/logo.png"
                                            alt="OJAIN"
                                            width={120}
                                            height={120}
                                            className="object-contain w-16 sm:w-20 md:w-24 lg:w-28"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-center lg:text-left">
                                    <span className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                                        <MdVerified />
                                        Flagship Brand
                                    </span>

                                    <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                                        O<span className="text-pink-500">JAIN</span>
                                    </h2>

                                    <p className="text-pink-500 font-semibold mt-1 sm:mt-2 text-base sm:text-lg">
                                        Premium Jain Food Products
                                    </p>

                                    <p className="mt-4 sm:mt-5 md:mt-6 text-gray-600 leading-relaxed sm:leading-7 md:leading-8 text-sm sm:text-base">
                                        Premium Jain food products made without onion and garlic,
                                        delivering authentic taste, purity and trusted quality with
                                        carefully selected ingredients.
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-5 sm:mt-6 md:mt-7">
                                        {[
                                            "100% Jain",
                                            "No Onion & Garlic",
                                            "Premium Quality",
                                            "Trusted Brand",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-1.5 sm:gap-2 bg-pink-50 border border-pink-200 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm"
                                            >
                                                <FaCheckCircle className="text-pink-500 text-xs sm:text-sm" />
                                                <span className="text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mt-6 sm:mt-7 md:mt-9">
                                        <a
                                            href="https://ojainwebsite.netlify.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                                        >
                                            Visit Website
                                            <FaExternalLinkAlt size={14} />
                                        </a>
                                        <Link
                                            href="https://ojainwebsite.netlify.app/categories"
                                            className="inline-flex items-center justify-center gap-2 border-2 border-pink-300 text-pink-600 hover:bg-pink-500 hover:text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base"
                                        >
                                            Browse Products
                                            <FaArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}