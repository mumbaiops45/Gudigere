"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Shield, Truck, RotateCcw, BadgeCheck,
  Heart, Star, Package, Sparkles, Award,
  Users, ArrowRight,
} from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ── animation variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ── count-up hook ── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── stat item with count-up ── */
function StatItem({ value, suffix, label, icon: Icon }: {
  value: number; suffix: string; label: string; icon: React.ElementType;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div variants={cardItem} className="flex flex-col items-center gap-2 text-white">
      <Icon size={28} className="text-pink-200" />
      <p className="text-3xl sm:text-4xl font-black">
        <span ref={ref}>{count.toLocaleString()}</span>{suffix}
      </p>
      <p className="text-pink-100 text-sm font-medium">{label}</p>
    </motion.div>
  );
}

const stats = [
  { value: 50000, suffix: "+", label: "Happy Kids",       icon: Heart   },
  { value: 10000, suffix: "+", label: "Products",         icon: Package },
  { value: 500,   suffix: "+", label: "Trusted Brands",   icon: Award   },
  { value: 48,    suffix: "★", label: "Average Rating",   icon: Star    },
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    desc: "Every toy is CE & BIS certified. We verify safety standards before listing anything.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Sparkles,
    title: "Joyful Learning",
    desc: "We curate toys that spark creativity, curiosity, and real developmental growth.",
    color: "bg-violet-100 text-violet-600",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Built with real parents — reviews, feedback, and feature requests shape us.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: BadgeCheck,
    title: "100% Genuine",
    desc: "No counterfeits. We work directly with manufacturers and authorised distributors.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const trust = [
  { icon: Shield,    label: "Secure Payments", sub: "SSL encrypted checkout" },
  { icon: Truck,     label: "Fast Delivery",   sub: "Pan-India shipping"      },
  { icon: RotateCcw, label: "Easy Returns",    sub: "7-day hassle-free"       },
  { icon: BadgeCheck,label: "Genuine Toys",    sub: "Certified & verified"    },
];

const team = [
  {
    name: "Arjun Mehta",
    role: "Co-founder & CEO",
    avatar: "AM",
    color: "from-pink-500 to-rose-600",
    bio: "Dad of two, former e-commerce exec, obsessed with making toy-shopping delightful for Indian families.",
  },
  {
    name: "Priya Sharma",
    role: "Co-founder & CPO",
    avatar: "PS",
    color: "from-violet-500 to-purple-600",
    bio: "Child psychologist turned product builder — every feature ships with kids' development at its core.",
  },
  {
    name: "Rahul Nair",
    role: "Head of Partnerships",
    avatar: "RN",
    color: "from-amber-400 to-orange-500",
    bio: "15 years in toy retail. He knows every brand story and brings only the best to our shelves.",
  },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-slate-900 overflow-hidden min-h-130 flex items-center">
        {/* animated gradient orbs */}
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-pink-600/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-15 -right-15 w-72 h-72 rounded-full bg-violet-600/25 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        <FloatingParticles count={28} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center w-full">
          <motion.span
            variants={fadeIn} custom={0.1} initial="hidden" animate="show"
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-pink-600/20 text-pink-400 text-xs font-bold uppercase tracking-widest border border-pink-500/20"
          >
            Our Story
          </motion.span>

          <motion.h1
            variants={fadeUp} custom={0.2} initial="hidden" animate="show"
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          >
            India&apos;s Most Loved
            <motion.span
              className="block text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400"
              variants={fadeUp} custom={0.35} initial="hidden" animate="show"
            >
              Toy Marketplace
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={0.45} initial="hidden" animate="show"
            className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            We started Goodie Gear because we were tired of hunting across dozens of websites
            for safe, quality toys. Today, we bring the world&apos;s best toys to millions of
            Indian families — with trust, speed, and joy at every step.
          </motion.p>

          <motion.div
            variants={fadeUp} custom={0.55} initial="hidden" animate="show"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(219,39,119,0.45)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/products")}
              className="group px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/become-vendor")}
              className="px-8 py-3.5 border-2 border-slate-600 hover:border-pink-500 text-slate-300 hover:text-pink-400 font-bold rounded-xl transition-colors"
            >
              Become a Vendor
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-linear-to-r from-pink-600 to-rose-600 py-14 overflow-hidden">
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={staggerContainer} initial="hidden" whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => <StatItem key={s.label} {...s} />)}
          </div>
        </motion.div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="inline-block mb-3 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest">
              Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-5">
              Play Is How Children
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-rose-500"> Discover the World</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Our mission is simple — make it effortless for every Indian parent to find toys
              that are safe, age-appropriate, and genuinely fun. We curate with care, deliver
              with speed, and stand behind every product we sell.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Founded in 2022, Goodie Gear has grown from a small Mumbai-based startup to
              a platform trusted by families across 500+ cities. We partner with 500+ brands
              ranging from global icons like LEGO and Mattel to homegrown Indian makers.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={staggerContainer} initial="hidden"
            whileInView="show" viewport={{ once: true, amount: 0.3 }}
          >
            {values.map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={cardItem}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.10)" }}
                className="p-5 rounded-2xl border border-slate-100 bg-white cursor-default transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color} bg-opacity-20`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TIMELINE STRIP ── */}
      <section className="bg-slate-50 py-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10"
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest">
            Our Journey
          </span>
          <h2 className="text-3xl font-black text-slate-900">Milestones That Matter</h2>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-4 gap-6"
          variants={staggerContainer} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {[
            { year: "2022", event: "Founded in Mumbai with 200 products and big dreams." },
            { year: "2023", event: "Crossed 1 lakh orders & launched vendor marketplace." },
            { year: "2024", event: "Expanded to 500+ cities with same-day delivery in metros." },
            { year: "2025", event: "50,000+ happy kids and India's #1 toy marketplace." },
          ].map(({ year, event }, i) => (
            <motion.div
              key={year}
              variants={cardItem}
              whileHover={{ y: -4 }}
              className="relative p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-black text-xs mb-3">
                {i + 1}
              </div>
              <p className="text-pink-600 font-black text-lg mb-1">{year}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{event}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12"
        >
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold uppercase tracking-widest">
            The Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            Built by People Who Love Toys
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Parents, educators, and product obsessives — united by one goal: joyful childhoods.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.2 }}
        >
          {team.map(({ name, role, avatar, color, bio }) => (
            <motion.div
              key={name}
              variants={cardItem}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left transition-shadow cursor-default"
            >
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center text-white text-xl font-black mb-4 shadow-md`}>
                {avatar}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{name}</h3>
              <p className="text-pink-600 text-xs font-semibold mb-3">{role}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-slate-50 py-14 border-t border-slate-100">
        <motion.div
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer} initial="hidden"
          whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          {trust.map(({ icon: Icon, label, sub }) => (
            <motion.div
              key={label}
              variants={cardItem}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center"
              >
                <Icon size={22} className="text-pink-600" />
              </motion.div>
              <p className="font-bold text-slate-800 text-sm">{label}</p>
              <p className="text-slate-400 text-xs">{sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-slate-900 py-20 overflow-hidden">
        <motion.div
          className="absolute -top-15 -right-15 w-72 h-72 rounded-full bg-pink-600/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-violet-600/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 max-w-2xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to Make a Child Smile?
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Browse 10,000+ toys across every category, age group, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(219,39,119,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/products")}
              className="group px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Shop All Toys
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/privacy-policy"
                className="px-8 py-4 border-2 border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-bold rounded-xl transition-colors inline-flex items-center justify-center"
              >
                Privacy Policy
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
