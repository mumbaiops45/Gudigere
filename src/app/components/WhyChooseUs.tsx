// // src/components/home/WhyChooseUs.tsx
// "use client";

// import { motion } from "framer-motion";
// import { 
//   Truck, 
//   RotateCcw, 
//   ShieldCheck, 
//   Gift, 
//   Headphones, 
//   Zap,
//   CreditCard,
//   PackageCheck 
// } from "lucide-react";

// // USPs data
// const usps = [
//   {
//     id: 1,
//     icon: Truck,
//     title: "Free Shipping",
//     description: "On orders above ₹499. Fast delivery across India.",
//     color: "from-blue-500 to-cyan-500",
//     bgColor: "bg-blue-50",
//   },
//   {
//     id: 2,
//     icon: RotateCcw,
//     title: "Easy Returns",
//     description: "7-day hassle-free returns. No questions asked.",
//     color: "from-green-500 to-emerald-500",
//     bgColor: "bg-green-50",
//   },
//   {
//     id: 3,
//     icon: ShieldCheck,
//     title: "100% Genuine",
//     description: "Authentic products from trusted brands only.",
//     color: "from-purple-500 to-indigo-500",
//     bgColor: "bg-purple-50",
//   },
//   {
//     id: 4,
//     icon: Gift,
//     title: "Gift Wrapping",
//     description: "Free gift wrapping with personalized message.",
//     color: "from-pink-500 to-rose-500",
//     bgColor: "bg-pink-50",
//   },
//   {
//     id: 5,
//     icon: Headphones,
//     title: "24/7 Support",
//     description: "Call, chat, or email – we're always here to help.",
//     color: "from-orange-500 to-amber-500",
//     bgColor: "bg-orange-50",
//   },
//   {
//     id: 6,
//     icon: CreditCard,
//     title: "Secure Payments",
//     description: "PCI compliant. All major cards & UPI accepted.",
//     color: "from-teal-500 to-green-500",
//     bgColor: "bg-teal-50",
//   },
// ];

// // Additional stats
// const stats = [
//   { value: "50K+", label: "Happy Customers" },
//   { value: "10K+", label: "Products Sold" },
//   { value: "4.8★", label: "Average Rating" },
//   { value: "99%", label: "On-Time Delivery" },
// ];

// // Animation variants
// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 30 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true, margin: "-50px" },
//   transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
// });

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const uspItemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
//   hover: { y: -8, transition: { duration: 0.2 } },
// };

// const statVariants = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
// };

// // Single USP Card
// function USPCard({ usp, index }: { usp: typeof usps[0]; index: number }) {
//   const Icon = usp.icon;

//   return (
//     <motion.div
//       variants={uspItemVariants}
//       whileHover="hover"
//       className={`${usp.bgColor} rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-lg cursor-default`}
//     >
//       <div className={`w-14 h-14 mx-auto rounded-full bg-linear-to-r ${usp.color} flex items-center justify-center mb-4 shadow-md`}>
//         <Icon size={24} className="text-white" />
//       </div>
//       <h3 className="font-black text-gray-800 text-lg mb-1">{usp.title}</h3>
//       <p className="text-gray-500 text-sm">{usp.description}</p>
//     </motion.div>
//   );
// }

// // Main Component
// export default function WhyChooseUs() {
//   return (
//     <section className="bg-white py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-12">
//           <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full">
//             <Zap size={14} /> Why Goodie Gear?
//           </span>
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4">
//             We Put <span className="text-pink-600">Kids First</span>
//           </h2>
//           <p className="text-gray-500 text-lg mt-3">
//             Here's why thousands of parents choose us every day
//           </p>
//         </motion.div>

//         {/* Stats Row */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
//         >
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={stat.label}
//               variants={statVariants}
//               className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100"
//             >
//               <div className="text-2xl sm:text-3xl font-black text-pink-600">{stat.value}</div>
//               <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* USPs Grid */}
//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {usps.map((usp, idx) => (
//             <USPCard key={usp.id} usp={usp} index={idx} />
//           ))}
//         </motion.div>

//         {/* Bottom Banner with Guarantee */}
//         <motion.div
//           {...fadeUp(0.2)}
//           className="mt-12 bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-6 text-center text-white shadow-xl"
//         >
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="flex items-center gap-3">
//               <PackageCheck size={32} className="text-green-400" />
//               <div className="text-left">
//                 <p className="font-black text-lg">100% Satisfaction Guaranteed</p>
//                 <p className="text-sm text-indigo-200">Or get your money back – no questions asked!</p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-white text-purple-900 font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap"
//             >
//               Shop with Confidence →
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Trust Badges Row */}
//         <motion.div {...fadeUp(0.25)} className="flex flex-wrap justify-center gap-6 mt-10 pt-6 border-t border-gray-100">
//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <span className="w-2 h-2 bg-green-500 rounded-full"></span> Secure SSL Encryption
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Verified by Trustwave
//           </div>
//           <div className="flex items-center gap-2 text-xs text-gray-400">
//             <span className="w-2 h-2 bg-purple-500 rounded-full"></span> Google Customer Reviews
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




// src/components/home/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Gift, 
  Headphones, 
  Zap,
  CreditCard,
  PackageCheck 
} from "lucide-react";

// USPs data (unchanged)
const usps = [
  {
    id: 1,
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹499. Fast delivery across India.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free returns. No questions asked.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "100% Genuine",
    description: "Authentic products from trusted brands only.",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    icon: Gift,
    title: "Gift Wrapping",
    description: "Free gift wrapping with personalized message.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    id: 5,
    icon: Headphones,
    title: "24/7 Support",
    description: "Call, chat, or email – we're always here to help.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
  },
  {
    id: 6,
    icon: CreditCard,
    title: "Secure Payments",
    description: "PCI compliant. All major cards & UPI accepted.",
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50",
  },
];

// Additional stats
const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Sold" },
  { value: "4.8★", label: "Average Rating" },
  { value: "99%", label: "On-Time Delivery" },
];

// Animation variants (unchanged)
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
    transition: { staggerChildren: 0.08 },
  },
};

const uspItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { y: -8, transition: { duration: 0.2 } },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// Single USP Card – responsive sizes
function USPCard({ usp }: { usp: typeof usps[0] }) {
  const Icon = usp.icon;

  return (
    <motion.div
      variants={uspItemVariants}
      whileHover="hover"
      className={`${usp.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:shadow-lg cursor-default h-full flex flex-col items-center`}
    >
      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-r ${usp.color} flex items-center justify-center mb-2 sm:mb-4 shadow-md flex-shrink-0`}>
        <Icon size={20} className="text-white sm:w-6 sm:h-6" />
      </div>
      <h3 className="font-black text-gray-800 text-base sm:text-lg mb-0.5 sm:mb-1">{usp.title}</h3>
      <p className="text-gray-500 text-xs sm:text-sm">{usp.description}</p>
    </motion.div>
  );
}

// Main Component
export default function WhyChooseUs() {
  return (
    <section className="bg-white py-10 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
            <Zap size={12} className="sm:w-3.5 sm:h-3.5" /> Why Goodie Gear?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-3 sm:mt-4">
            We Put <span className="text-pink-600">Kids First</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg mt-2 sm:mt-3">
            Here's why thousands of parents choose us every day
          </p>
        </motion.div>

        {/* Stats Row – responsive grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12 md:mb-16"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-gray-100"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-pink-600">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* USPs Grid – 1 col mobile, 2 sm, 3 lg */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
        >
          {usps.map((usp) => (
            <USPCard key={usp.id} usp={usp} />
          ))}
        </motion.div>

        {/* Bottom Banner with Guarantee – responsive */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 sm:mt-10 md:mt-12 bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-4 sm:p-6 text-center text-white shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <PackageCheck size={24} className="text-green-400 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              <div className="text-left">
                <p className="font-black text-base sm:text-lg">100% Satisfaction Guaranteed</p>
                <p className="text-xs sm:text-sm text-indigo-200">Or get your money back – no questions asked!</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-purple-900 font-bold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap text-sm sm:text-base"
            >
              Shop with Confidence →
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Badges Row – responsive */}
        <motion.div {...fadeUp(0.25)} className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-00">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></span> Secure SSL Encryption
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></span> Verified by Trustwave
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span> Google Customer Reviews
          </div>
        </motion.div>
      </div>
    </section>
  );
}