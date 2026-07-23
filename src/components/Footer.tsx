"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaWhatsapp,
} from "react-icons/fa";
import { MapPin, Phone, Mail } from "lucide-react";

// ─── SHOP LINKS ──────────────────────────────────────────────
const shopLinks = [
    { name: "Girls Toys", href: "/categories/Girls%20Toys" },
    { name: "Plush & Dolls", href: "/categories/Plush%20%26%20Dolls" },
    { name: "Vehicles & RC", href: "/categories/Vehicles%20%26%20RC" },
    { name: "Puzzles & Games", href: "/categories/Puzzles%20%26%20Games" },
    { name: "Pretend Play", href: "/categories/Pretend%20Play" },
    { name: "STEM & Science", href: "/categories/STEM%20%26%20Science" },
    { name: "Outdoor Adventure", href: "/categories/Outdoor%20Adventure" },
    { name: "Arts & Crafts", href: "/categories/Arts%20%26%20Crafts" },
    {
        name: "Building & Construction",
        href: "/categories/Building%20%26%20Construction",
    },
];

// ─── COMPANY LINKS ──────────────────────────────────────────
const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Become a Vendor", href: "/become-vendor" },
    { name: "My Orders", href: "/myorders" },
];

// ─── SUPPORT LINKS ──────────────────────────────────────────
const supportLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
];

// ─── SOCIAL ICONS ───────────────────────────────────────────
const socialLinks = [
    {
        Icon: FaFacebookF,
        href: "https://facebook.com",
        label: "Facebook",
        color: "hover:bg-[#1877F2]",
    },
    {
        Icon: FaInstagram,
        href: "https://instagram.com",
        label: "Instagram",
        color: "hover:bg-[#E4405F]",
    },
    {
        Icon: FaTwitter,
        href: "https://twitter.com",
        label: "Twitter",
        color: "hover:bg-[#1DA1F2]",
    },
    {
        Icon: FaYoutube,
        href: "https://youtube.com",
        label: "YouTube",
        color: "hover:bg-[#FF0000]",
    },
    {
        Icon: FaWhatsapp,
        href: "https://wa.me",
        label: "WhatsApp",
        color: "hover:bg-[#25D366]",
    },
];

// ─── CONTACT INFO ────────────────────────────────────────────
const contactItems = [
    { Icon: MapPin, text: "Mumbai, Maharashtra, India" },
    { Icon: Phone, text: "+91 98765 43210" },
    { Icon: Mail, text: "hello@goodiegear.in" },
];

// ─── COMPONENT ──────────────────────────────────────────────
export default function Footer() {
    return (
        <footer className="bg-[#0c0c17] text-white mt-10 overflow-hidden">

            {/* ─── TOP GRADIENT LINE ─── */}
            <div className="h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600" />

            {/* ─── MAIN CONTENT ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">

                {/* 3‑column grid: stacks on mobile, 2 cols on small, 3 cols on medium+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6">

                    {/* ─── BRAND COLUMN ─── */}
                    <div className="sm:col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                                <span className="text-pink-500">Goodie</span>
                                <span className="text-white">Gear</span>
                            </h2>
                        </Link>

                        <p className="text-pink-400 text-[10px] uppercase tracking-[4px] font-bold">
                            India&apos;s #1 Toy Marketplace
                        </p>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            10,000+ toys, games, learning kits &amp; fun products for every kid
                            — ages 0 to 16. Delivered to your door across India.
                        </p>

                        {/* ─── CONTACT ─── */}
                        <div className="space-y-2.5 pt-1">
                            {contactItems.map(({ Icon, text }) => (
                                <div
                                    key={text}
                                    className="flex items-center gap-3 group cursor-default"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-pink-600/20 group-hover:border-pink-500/30 transition-all duration-200">
                                        <Icon size={13} className="text-pink-400" />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* ─── SOCIAL ─── */}
                        <div className="flex flex-wrap gap-2 pt-1">
                            {socialLinks.map(({ Icon, href, label, color }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-200 hover:text-white hover:scale-110 hover:-translate-y-0.5 hover:border-transparent ${color}`}
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ─── SHOP BY CATEGORY ─── */}
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                            Shop
                        </h3>
                        <ul className="space-y-2">
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

                    {/* ─── COMPANY & SUPPORT (combined) ─── */}
                    <div>
                        {/* Company */}
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                            Company
                        </h3>
                        <ul className="space-y-2 mb-6">
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

                        {/* Support */}
                        <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1 h-3.5 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full" />
                            Support
                        </h3>
                        <ul className="space-y-2">
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
            </div>

            {/* ─── BOTTOM BAR ─── */}
            <div className="border-t border-white/10 bg-black/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">

                    <p className="text-xs text-gray-500 order-2 md:order-1">
                        &copy; 2026{" "}
                        <span className="text-pink-500 font-semibold">GoodieGear</span> Pvt.
                        Ltd. All rights reserved. 🇮🇳
                    </p>

                    <p className="text-xs text-gray-500 order-1 md:order-2">
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

                    <div className="flex items-center gap-4 flex-wrap justify-center order-3">
                        <Link
                            href="/privacy-policy"
                            className="text-xs text-gray-500 hover:text-pink-400 transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            className="text-xs text-gray-500 hover:text-pink-400 transition"
                        >
                            Terms &amp; Conditions
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}