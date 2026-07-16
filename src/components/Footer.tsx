"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Shield, Truck, RotateCcw, BadgeCheck, Send, Smartphone } from "lucide-react";

const shopLinks = [
  { name: "Remote Cars", href: "/categories/Remote%20Cars" },
  { name: "LEGO Sets", href: "/categories/LEGO%20Sets" },
  { name: "Educational Toys", href: "/categories/Educational" },
  { name: "Robots & Tech", href: "/categories/Robots" },
  { name: "Board Games", href: "/categories/Board%20Games" },
  { name: "Soft Toys", href: "/categories/Soft%20Toys" },
  { name: "Art & Craft", href: "/categories/Art%20%26%20Craft" },
  { name: "Outdoor & Sports", href: "/categories/Outdoor" },
];

const ageLinks = [
  { name: "Toddlers (0–3 yrs)", href: "/products" },
  { name: "Little Kids (3–6 yrs)", href: "/products" },
  { name: "Big Kids (6–12 yrs)", href: "/products" },
  { name: "Teens (12+ yrs)", href: "/products" },
];

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Become a Vendor", href: "/become-vendor" },
  { name: " My Orders", href: "/myorders" },
  // { name: "Careers", href: "/careers" },
  // { name: "Blog", href: "/blog" },
];

const supportLinks = [
  // { name: "Help Center", href: "/help" },
  // { name: "Shipping Policy", href: "/shipping" },
  // { name: "7-Day Easy Returns", href: "/returns" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

const trust = [
  { icon: Shield,    label: "100% Secure",    sub: "Safe & encrypted payments" },
  { icon: Truck,     label: "Free Delivery",  sub: "On orders above ₹2,000" },
  { icon: RotateCcw, label: "Easy Returns",   sub: "7-day hassle-free returns" },
  { icon: BadgeCheck,label: "Genuine Toys",   sub: "Certified & trusted brands" },
];

const social = [
  { Icon: FaFacebookF,  color: "hover:bg-blue-600",  label: "Facebook" },
  { Icon: FaInstagram,  color: "hover:bg-pink-600",  label: "Instagram" },
  { Icon: FaTwitter,    color: "hover:bg-sky-500",   label: "Twitter" },
  { Icon: FaYoutube,    color: "hover:bg-red-600",   label: "YouTube" },
  { Icon: FaWhatsapp,   color: "hover:bg-green-600", label: "WhatsApp" },
];

const payments = ["Visa", "Mastercard", "UPI", "Razorpay", "Paytm", "PhonePe", "GPay", "Net Banking", "COD"];

export default function Footer() {
  return (
    <footer className="bg-[#0c0c17] text-white mt-10 overflow-hidden">

      {/* ── TOP GRADIENT LINE ── */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600" />

      {/* ── TRUST BADGES ── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trust.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-pink-400" />
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">

          {/* BRAND COLUMN */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/">
              <h2 className="text-4xl font-black">
                <span className="text-pink-500">Goodie</span>
                <span className="text-white">Gear</span>
              </h2>
            </Link>
            <p className="text-pink-400 text-[10px] uppercase tracking-[4px] mt-1.5 font-bold">
              India&apos;s #1 Toy Marketplace
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              10,000+ toys, games, learning kits & fun products for every kid — ages 0 to 16. Delivered to your door across India.
            </p>

            {/* CONTACT */}
            <div className="space-y-3 mt-6">
              {[
                { Icon: MapPin, text: "Mumbai, Maharashtra, India" },
                { Icon: Phone, text: "+91 98765 43210" },
                { Icon: Mail,  text: "hello@goodiegear.in" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-pink-600/20 group-hover:border-pink-500/30 transition-all">
                    <Icon size={13} className="text-pink-400" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{text}</span>
                </div>
              ))}
            </div>

            {/* SOCIAL */}
            <div className="flex gap-2.5 mt-6">
              {social.map(({ Icon, color, label }) => (
                <button
                  key={label}
                  title={label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all hover:text-white hover:scale-110 hover:-translate-y-0.5 ${color} hover:border-transparent`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* SHOP BY CATEGORY */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SHOP BY AGE */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              Shop by Age
            </h3>
            <ul className="space-y-2.5">
              {ageLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-black uppercase tracking-widest mt-8 mb-5 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
              Support
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── NEWSLETTER + APP DOWNLOAD ── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Newsletter */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-fuchsia-500/10 p-6">
            <h3 className="text-xl font-black">Get Exclusive Deals</h3>
            <p className="text-gray-400 text-sm mt-1">
              Subscribe for toy launches, offers & kids activities.
            </p>
            <div className="flex mt-5">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-13 rounded-l-2xl bg-white/5 border border-white/10 border-r-0 px-4 text-sm outline-none placeholder:text-gray-600 focus:border-pink-500/50 transition-colors"
              />
              <button className="h-13 px-5 rounded-r-2xl bg-pink-500 hover:bg-pink-600 transition flex items-center gap-2 font-bold text-sm shrink-0">
                <Send size={15} />
                Subscribe
              </button>
            </div>
          </div>

          {/* App Download */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-fuchsia-500/10 p-6 flex flex-col justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-pink-500/20 border border-pink-500/30 rounded-2xl flex items-center justify-center shrink-0">
                <Smartphone size={22} className="text-pink-400" />
              </div>
              <div>
                <h3 className="text-xl font-black">Download Our App</h3>
                <p className="text-gray-400 text-sm mt-1">App-only deals · Live order tracking · Exclusive offers</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95">
                <span className="text-lg">📱</span>
                <div className="text-left">
                  <p className="text-[9px] text-gray-400 leading-none">Download on the</p>
                  <p className="text-sm font-black leading-tight">App Store</p>
                </div>
              </button>
              <button className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95">
                <span className="text-lg">🤖</span>
                <div className="text-left">
                  <p className="text-[9px] text-gray-400 leading-none">Get it on</p>
                  <p className="text-sm font-black leading-tight">Google Play</p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* ── PAYMENT METHODS ── */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1 shrink-0">
            We Accept:
          </span>
          {payments.map((p) => (
            <span
              key={p}
              className="text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg hover:border-pink-500/40 hover:text-gray-200 transition-colors cursor-default"
            >
              {p}
            </span>
          ))}
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-3">

          <p className="text-sm text-gray-500 text-center lg:text-left">
            © 2026 <span className="text-pink-500 font-semibold">GoodieGear</span> Pvt. Ltd. All rights reserved. 🇮🇳
          </p>

          <p className="text-sm text-gray-500 text-center">
            Designed &amp; Developed by{" "}
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
            <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-pink-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-sm text-gray-500 hover:text-pink-400 transition">
              Terms & Conditions
            </Link>
            {/* <Link href="/sitemap.xml" className="text-sm text-gray-500 hover:text-pink-400 transition">
              Sitemap
            </Link> */}
          </div>

        </div>
      </div>

    </footer>
  );
}
