// import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
// import { MapPin, Phone, Mail, Shield, Truck, RotateCcw, BadgeCheck, Smartphone } from "lucide-react";

// const links = {
//   Shop: ["Remote Cars", "Teddy Bears", "LEGO Sets", "Educational Toys", "Action Figures", "Board Games"],
//   Company: ["About Us", "Careers", "Vendor Partner", "Press", "Blog"],
//   Support: ["Help Center", "Easy Returns", "Shipping Info", "Privacy Policy", "Terms & Conditions"],
// };

// const trust = [
//   { icon: Shield, label: "100% Secure", sub: "Safe payments" },
//   { icon: Truck, label: "Free Delivery", sub: "Orders above ₹499" },
//   { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
//   { icon: BadgeCheck, label: "Genuine Toys", sub: "Certified brands" },
// ];

// const social = [
//   { Icon: FaFacebookF, color: "hover:bg-blue-600", label: "Facebook" },
//   { Icon: FaInstagram, color: "hover:bg-pink-600", label: "Instagram" },
//   { Icon: FaTwitter, color: "hover:bg-sky-500", label: "Twitter" },
//   { Icon: FaYoutube, color: "hover:bg-red-600", label: "YouTube" },
//   { Icon: FaWhatsapp, color: "hover:bg-green-600", label: "WhatsApp" },
// ];

// const payments = ["Visa", "Mastercard", "UPI", "Paytm", "PhonePe", "GPay", "Net Banking", "COD"];

// export default function Footer() {
//   return (
//     <footer className="bg-[#0f0f1a] text-white mt-3">

//       {/* ── GRADIENT TOP STRIPE ── */}
//       <div className="h-1 bg-linear-to-r from-pink-600 via-fuchsia-500 to-purple-600" />

//       {/* ── TRUST BADGES ── */}
//       <div className="bg-white/5 border-b border-white/8">
//         <div className="max-w-375 mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x sm:divide-white/10">
//             {trust.map(({ icon: Icon, label, sub }) => (
//               <div key={label} className="flex items-center gap-3 sm:justify-center sm:px-4 first:pl-0 last:pr-0">
//                 <div className="w-10 h-10 rounded-xl bg-pink-600/15 border border-pink-500/20 flex items-center justify-center shrink-0">
//                   <Icon size={18} className="text-pink-400" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-white leading-tight">{label}</p>
//                   <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── MAIN CONTENT ── */}
//       <div className="max-w-375 mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-14">
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

//           {/* BRAND COLUMN */}
//           <div className="col-span-2 lg:col-span-2">

//             {/* Logo */}
//             <a href="/" className="inline-flex items-center gap-0.5 mb-1 select-none">
//               <span className="text-3xl font-black text-pink-500 leading-none">Goodie</span>
//               <span className="text-3xl font-black text-white leading-none"> Gear</span>
//             </a>
//             <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-3">
//               India's #1 Toy Marketplace
//             </p>
//             <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
//               India's biggest multi-vendor toy marketplace — 10,000+ toys, games, learning kits,
//               and fun products for kids of all ages, delivered to your door.
//             </p>

//             {/* Contact */}
//             <div className="mt-5 space-y-2.5">
//               {[
//                 { icon: MapPin, text: "Mumbai, Maharashtra, India" },
//                 { icon: Phone, text: "+91 98765 43210" },
//                 { icon: Mail, text: "hello@goodiegear.in" },
//               ].map(({ icon: Icon, text }) => (
//                 <div key={text} className="flex items-center gap-2.5 group cursor-pointer">
//                   <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-pink-600/25 group-hover:border-pink-500/30 transition-all">
//                     <Icon size={12} className="text-pink-400" />
//                   </div>
//                   <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Social icons */}
//             <div className="flex gap-2 mt-6">
//               {social.map(({ Icon, color, label }) => (
//                 <button
//                   key={label}
//                   title={label}
//                   className={`w-9 h-9 bg-white/8 border border-white/10 ${color} hover:border-transparent text-gray-400 hover:text-white rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110 hover:-translate-y-0.5`}
//                 >
//                   <Icon />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* LINK COLUMNS */}
//           {Object.entries(links).map(([title, items]) => (
//             <div key={title}>
//               <h3 className="text-xs font-black text-white mb-4 uppercase tracking-widest flex items-center gap-2">
//                 <span className="w-1 h-3.5 bg-linear-to-b from-pink-500 to-purple-500 rounded-full" />
//                 {title}
//               </h3>
//               <ul className="space-y-2.5">
//                 {items.map((item) => (
//                   <li key={item}>
//                     <a
//                       href="#"
//                       className="text-xs text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
//                     >
//                       <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
//                       {item}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* ── APP DOWNLOAD BANNER ── */}
//         <div className="mt-10 relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-pink-600/20 via-fuchsia-600/15 to-purple-600/20 p-5 sm:p-6">
//           {/* Decorative blobs */}
//           <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
//           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

//           <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
//             <div className="w-13 h-13 bg-pink-600/25 border border-pink-500/30 rounded-2xl flex items-center justify-center shrink-0">
//               <Smartphone size={26} className="text-pink-400" />
//             </div>

//             <div className="flex-1 text-center sm:text-left">
//               <p className="font-black text-white text-base sm:text-lg">Download the Goodie Gear App</p>
//               <p className="text-gray-400 text-xs sm:text-sm mt-1">
//                 App-only deals · Live order tracking · Exclusive offers every day
//               </p>
//             </div>

//             <div className="flex gap-2.5 shrink-0">
//               <button className="group flex items-center gap-2 bg-white hover:bg-pink-50 text-gray-900 text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
//                 <span className="text-base">📱</span>
//                 <div className="text-left hidden sm:block">
//                   <p className="text-[9px] text-gray-500 leading-none">Download on the</p>
//                   <p className="text-xs font-black leading-tight">App Store</p>
//                 </div>
//                 <span className="sm:hidden">App Store</span>
//               </button>
//               <button className="group flex items-center gap-2 bg-white hover:bg-pink-50 text-gray-900 text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
//                 <span className="text-base">🤖</span>
//                 <div className="text-left hidden sm:block">
//                   <p className="text-[9px] text-gray-500 leading-none">Get it on</p>
//                   <p className="text-xs font-black leading-tight">Google Play</p>
//                 </div>
//                 <span className="sm:hidden">Google Play</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── PAYMENT METHODS ── */}
//         <div className="mt-6 flex flex-wrap items-center gap-2">
//           <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1 shrink-0">
//             We Accept:
//           </p>
//           {payments.map((p) => (
//             <span
//               key={p}
//               className="text-[11px] font-semibold text-gray-400 bg-white/6 border border-white/10 px-2.5 py-1 rounded-lg hover:border-pink-500/40 hover:text-gray-200 transition-colors cursor-default"
//             >
//               {p}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* ── BOTTOM BAR ── */}
//       <div className="border-t border-white/8 bg-black/40">
//         <div className="max-w-375 mx-auto px-6 sm:px-10 lg:px-16 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
//           {/* <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2"> */}

//           <p className="text-xs text-gray-500 text-left">
//             © 2026 <span className="text-pink-500 font-semibold">Goodie Gear</span> Pvt. Ltd. All rights reserved. 🇮🇳
//           </p>

//           <p className="text-xs text-gray-500 text-center">
//             Designed & Developed by{" "}
//             <span className="text-pink-400 font-semibold hover:text-pink-300 transition-colors cursor-pointer">
//               Nakshatra Namaha Creations
//             </span>
//           </p>

//           {/* </div> */}
//           <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
//             {["Privacy Policy", "Terms", "Cookies", "Sitemap"].map((item) => (
//               <a key={item} href="#" className="text-xs text-gray-500 hover:text-pink-400 transition-colors">
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//     </footer>
//   );
// }


"use client";

import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import {
  MapPin,
  Phone,
  Mail,
  Shield,
  Truck,
  RotateCcw,
  BadgeCheck,
  Smartphone,
  Send,
} from "lucide-react";

const links = {
  Shop: [
    {
      name: "Remote Cars",
      href: "/categories/Vehicles%20%26%20RC",
    },
    {
      name: "Educational Toys",
      href: "/categories/STEM%20%26%20Science",
    },
    {
      name: "Board Games",
      href: "/categories/Puzzles%20%26%20Games",
    },
    {
      name: "Soft Toys",
      href: "/categories/Plush%20%26%20Dolls",
    },
  ],

  Company: [
    {
      name: "About Us",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Vendor Partner",
      href: "/vendor/register",
    },
    {
      name: "Careers",
      href: "/careers",
    },
  ],

  Support: [
    {
      name: "Help Center",
      href: "/help",
    },
    {
      name: "Shipping Policy",
      href: "/shipping",
    },
    {
      name: "Return Policy",
      href: "/returns",
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
  ],
};

const trust = [
  {
    icon: Shield,
    label: "100% Secure",
    sub: "Safe payments",
  },

  {
    icon: Truck,
    label: "Free Delivery",
    sub: "Orders above ₹499",
  },

  {
    icon: RotateCcw,
    label: "Easy Returns",
    sub: "7-day returns",
  },

  {
    icon: BadgeCheck,
    label: "Trusted Brands",
    sub: "Original toys",
  },
];

const social = [
  {
    Icon: FaFacebookF,
    color:
      "hover:bg-blue-600",
  },

  {
    Icon: FaInstagram,
    color:
      "hover:bg-pink-600",
  },

  {
    Icon: FaTwitter,
    color:
      "hover:bg-sky-500",
  },

  {
    Icon: FaYoutube,
    color:
      "hover:bg-red-600",
  },

  {
    Icon: FaWhatsapp,
    color:
      "hover:bg-green-600",
  },
];

const payments = [
  "Visa",
  "Mastercard",
  "UPI",
  "Paytm",
  "PhonePe",
  "GPay",
  "COD",
];

export default function Footer() {

  return (
    <footer className="bg-[#0c0c17] text-white mt-10 overflow-hidden">

      {/* TOP LINE */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600" />

      {/* TRUST */}
      <div className="border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

            {trust.map(
              ({
                icon: Icon,
                label,
                sub,
              }) => (

                <div
                  key={label}
                  className="flex items-center gap-3"
                >

                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">

                    <Icon
                      size={20}
                      className="text-pink-400"
                    />

                  </div>

                  <div>

                    <h3 className="font-bold text-sm">

                      {label}

                    </h3>

                    <p className="text-xs text-gray-500 mt-1">

                      {sub}

                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="inline-block"
            >

              <h2 className="text-4xl font-black">

                <span className="text-pink-500">

                  Goodie

                </span>

                <span className="text-white">

                  Gear

                </span>

              </h2>

            </Link>

            <p className="text-pink-400 text-xs uppercase tracking-[4px] mt-2 font-bold">

              India's Toy Marketplace

            </p>

            <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-md">

              Discover amazing toys,
              games, learning kits,
              and fun products for
              kids of all ages.

            </p>

            {/* CONTACT */}
            <div className="space-y-4 mt-7">

              <div className="flex items-center gap-3">

                <MapPin
                  size={16}
                  className="text-pink-400"
                />

                <span className="text-sm text-gray-400">

                  Mumbai, India

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={16}
                  className="text-pink-400"
                />

                <span className="text-sm text-gray-400">

                  +91 9876543210

                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  size={16}
                  className="text-pink-400"
                />

                <span className="text-sm text-gray-400">

                  hello@goodiegear.in

                </span>

              </div>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-7">

              {social.map(
                ({
                  Icon,
                  color,
                }, index) => (

                  <button
                    key={index}
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition hover:text-white ${color}`}
                  >

                    <Icon />

                  </button>
                )
              )}

            </div>

          </div>

          {/* LINKS */}
          {Object.entries(
            links
          ).map(
            (
              [title, items]
            ) => (

              <div key={title}>

                <h3 className="text-sm font-black uppercase tracking-widest mb-5">

                  {title}

                </h3>

                <ul className="space-y-3">

                  {items.map(
                    (item) => (

                      <li
                        key={
                          item.name
                        }
                      >

                        <Link
                          href={
                            item.href
                          }
                          className="text-sm text-gray-400 hover:text-pink-400 transition"
                        >

                          {
                            item.name
                          }

                        </Link>

                      </li>
                    )
                  )}

                </ul>

              </div>
            )
          )}

        </div>

        {/* NEWSLETTER */}
        <div className="mt-14 rounded-[30px] border border-white/10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-fuchsia-500/10 p-6 lg:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <h3 className="text-3xl font-black">

                Subscribe Newsletter

              </h3>

              <p className="text-gray-400 mt-2">

                Get latest offers &
                toy updates

              </p>

            </div>

            <div className="flex w-full lg:w-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-[320px] h-[58px] rounded-l-2xl bg-white/5 border border-white/10 px-5 outline-none"
              />

              <button className="h-[58px] px-7 rounded-r-2xl bg-pink-500 hover:bg-pink-600 transition flex items-center gap-2 font-bold">

                <Send size={18} />

                Subscribe

              </button>

            </div>

          </div>

        </div>

        {/* PAYMENTS */}
        <div className="mt-10 flex flex-wrap items-center gap-3">

          <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">

            We Accept

          </span>

          {payments.map(
            (payment) => (

              <span
                key={payment}
                className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
              >

                {payment}

              </span>
            )
          )}

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500 text-center lg:text-left">

            © 2026 Goodie Gear.
            All rights reserved.

          </p>

          <p className="text-sm text-gray-400">
            Design & Developed by{" "}
            <a
              href="https://www.nakshatranamahacreations.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 font-semibold hover:text-pink-300 transition-colors"
            >
              Nakshatra Namaha Creations
            </a>
          </p>

          <div className="flex items-center gap-5 flex-wrap justify-center">

            <Link
              href="/privacy-policy"
              className="text-sm text-gray-500 hover:text-pink-400 transition"
            >

              Privacy

            </Link>

            <Link
              href="/terms-and-conditions"
              className="text-sm text-gray-500 hover:text-pink-400 transition"
            >

              Terms

            </Link>

            
          </div>

        </div>

      </div>

    </footer>
  );
}