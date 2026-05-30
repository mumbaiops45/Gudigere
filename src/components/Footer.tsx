import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MapPin, Phone, Mail, Shield, Truck, RotateCcw, BadgeCheck, Smartphone } from "lucide-react";

const links = {
  Shop: ["Remote Cars", "Teddy Bears", "LEGO Sets", "Educational Toys", "Action Figures", "Board Games"],
  Company: ["About Us", "Careers", "Vendor Partner", "Press", "Blog"],
  Support: ["Help Center", "Easy Returns", "Shipping Info", "Privacy Policy", "Terms & Conditions"],
};

const trust = [
  { icon: Shield, label: "100% Secure", sub: "Safe payments" },
  { icon: Truck, label: "Free Delivery", sub: "Orders above ₹499" },
  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
  { icon: BadgeCheck, label: "Genuine Toys", sub: "Certified brands" },
];

const social = [
  { Icon: FaFacebookF, color: "hover:bg-blue-600", label: "Facebook" },
  { Icon: FaInstagram, color: "hover:bg-pink-600", label: "Instagram" },
  { Icon: FaTwitter, color: "hover:bg-sky-500", label: "Twitter" },
  { Icon: FaYoutube, color: "hover:bg-red-600", label: "YouTube" },
  { Icon: FaWhatsapp, color: "hover:bg-green-600", label: "WhatsApp" },
];

const payments = ["Visa", "Mastercard", "UPI", "Paytm", "PhonePe", "GPay", "Net Banking", "COD"];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-white mt-3">

      {/* ── GRADIENT TOP STRIPE ── */}
      <div className="h-1 bg-linear-to-r from-pink-600 via-fuchsia-500 to-purple-600" />

      {/* ── TRUST BADGES ── */}
      <div className="bg-white/5 border-b border-white/8">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x sm:divide-white/10">
            {trust.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 sm:justify-center sm:px-4 first:pl-0 last:pr-0">
                <div className="w-10 h-10 rounded-xl bg-pink-600/15 border border-pink-500/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-pink-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{label}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* BRAND COLUMN */}
          <div className="col-span-2 lg:col-span-2">

            {/* Logo */}
            <a href="/" className="inline-flex items-center gap-0.5 mb-1 select-none">
              <span className="text-3xl font-black text-pink-500 leading-none">Goodie</span>
              <span className="text-3xl font-black text-white leading-none"> Gear</span>
            </a>
            <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-3">
              India's #1 Toy Marketplace
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              India's biggest multi-vendor toy marketplace — 10,000+ toys, games, learning kits,
              and fun products for kids of all ages, delivered to your door.
            </p>

            {/* Contact */}
            <div className="mt-5 space-y-2.5">
              {[
                { icon: MapPin, text: "Mumbai, Maharashtra, India" },
                { icon: Phone, text: "+91 98765 43210" },
                { icon: Mail, text: "hello@goodiegear.in" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 group cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-pink-600/25 group-hover:border-pink-500/30 transition-all">
                    <Icon size={12} className="text-pink-400" />
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{text}</span>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-2 mt-6">
              {social.map(({ Icon, color, label }) => (
                <button
                  key={label}
                  title={label}
                  className={`w-9 h-9 bg-white/8 border border-white/10 ${color} hover:border-transparent text-gray-400 hover:text-white rounded-xl flex items-center justify-center text-sm transition-all hover:scale-110 hover:-translate-y-0.5`}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-xs font-black text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-3.5 bg-linear-to-b from-pink-500 to-purple-500 rounded-full" />
                {title}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-0 hover:gap-1.5 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-pink-500 rounded transition-all duration-200 overflow-hidden shrink-0" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── APP DOWNLOAD BANNER ── */}
        <div className="mt-10 relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-r from-pink-600/20 via-fuchsia-600/15 to-purple-600/20 p-5 sm:p-6">
          {/* Decorative blobs */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-13 h-13 bg-pink-600/25 border border-pink-500/30 rounded-2xl flex items-center justify-center shrink-0">
              <Smartphone size={26} className="text-pink-400" />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="font-black text-white text-base sm:text-lg">Download the Goodie Gear App</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                App-only deals · Live order tracking · Exclusive offers every day
              </p>
            </div>

            <div className="flex gap-2.5 shrink-0">
              <button className="group flex items-center gap-2 bg-white hover:bg-pink-50 text-gray-900 text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
                <span className="text-base">📱</span>
                <div className="text-left hidden sm:block">
                  <p className="text-[9px] text-gray-500 leading-none">Download on the</p>
                  <p className="text-xs font-black leading-tight">App Store</p>
                </div>
                <span className="sm:hidden">App Store</span>
              </button>
              <button className="group flex items-center gap-2 bg-white hover:bg-pink-50 text-gray-900 text-xs font-bold px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg">
                <span className="text-base">🤖</span>
                <div className="text-left hidden sm:block">
                  <p className="text-[9px] text-gray-500 leading-none">Get it on</p>
                  <p className="text-xs font-black leading-tight">Google Play</p>
                </div>
                <span className="sm:hidden">Google Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── PAYMENT METHODS ── */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1 shrink-0">
            We Accept:
          </p>
          {payments.map((p) => (
            <span
              key={p}
              className="text-[11px] font-semibold text-gray-400 bg-white/6 border border-white/10 px-2.5 py-1 rounded-lg hover:border-pink-500/40 hover:text-gray-200 transition-colors cursor-default"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/8 bg-black/40">
        <div className="max-w-375 mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2"> */}

          <p className="text-xs text-gray-500 text-left">
            © 2026 <span className="text-pink-500 font-semibold">Goodie Gear</span> Pvt. Ltd. All rights reserved. 🇮🇳
          </p>

          <p className="text-xs text-gray-500 text-center">
            Designed & Developed by{" "}
            <span className="text-pink-400 font-semibold hover:text-pink-300 transition-colors cursor-pointer">
              Nakshatra Namaha Creations
            </span>
          </p>

          {/* </div> */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {["Privacy Policy", "Terms", "Cookies", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-500 hover:text-pink-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
