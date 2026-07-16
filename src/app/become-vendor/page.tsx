"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, Variants } from "framer-motion";
import { toast } from "sonner";
import {
  Store, BadgeCheck, Truck, ShieldCheck,
  TrendingUp, ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";
import useVendor from "../../hooks/useVendor";

/* ══════════════════════════════════════════
   TYPES
══════════════════════════════════════════ */
interface Stat  { to: number; suffix: string; label: string }
interface Step  { num: string; emoji: string; title: string; desc: string }
interface Perk  { icon: React.ElementType; title: string; value: string; desc: string; color: string; bg: string }
interface Emoji { e: string; top: string; side: "left" | "right"; pct: string; dur: number; delay: number; size: string }

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const stats: Stat[] = [
  { to: 50,  suffix: "K+",  label: "Active Buyers"   },
  { to: 10,  suffix: "K+",  label: "Products Live"   },
  { to: 98,  suffix: "%",   label: "Seller Rating"   },
  { to: 2,   suffix: "Cr+", label: "Monthly Sales ₹" },
];

const perks: Perk[] = [
  { icon: Store,       value: "₹0",    title: "Zero Commission",  desc: "List unlimited products. Keep every rupee you earn.",      color: "var(--pink)",    bg: "rgba(219,39,119,.08)"  },
  { icon: TrendingUp,  value: "2M+",   title: "Ready Buyers",     desc: "Reach millions of parents actively looking for great toys.", color: "var(--amber)",   bg: "rgba(245,158,11,.08)"  },
  { icon: BadgeCheck,  value: "24 hr", title: "Fast Approval",    desc: "Submit once, get verified overnight. No paperwork needed.", color: "var(--emerald)", bg: "rgba(16,185,129,.08)"  },
  { icon: Truck,       value: "Daily", title: "Payouts",          desc: "Money hits your account every single day, on schedule.",    color: "var(--pink)",    bg: "rgba(219,39,119,.08)"  },
  { icon: ShieldCheck, value: "100%",  title: "Secure Payments",  desc: "Bank-grade security on every transaction, always.",         color: "var(--amber)",   bg: "rgba(245,158,11,.08)"  },
  { icon: Sparkles,    value: "Free",  title: "Marketing Tools",  desc: "Banners, deals & featured slots — included for everyone.",  color: "var(--emerald)", bg: "rgba(16,185,129,.08)"  },
];

const steps: Step[] = [
  { num: "01", emoji: "📝", title: "Apply",         desc: "Fill your shop name and a short description. Takes 60 seconds."     },
  { num: "02", emoji: "✅", title: "Get Verified",  desc: "Our team reviews your profile in 24 hours. No documents needed."   },
  { num: "03", emoji: "🚀", title: "Start Selling", desc: "Go live instantly. List toys, manage orders, get paid daily."       },
];

const marqueeItems = [
  "🚗 RC Cars", "🧸 Soft Toys", "🧩 LEGO Sets", "📚 Educational",
  "🤖 Robots", "🎨 Art & Craft", "🎲 Board Games", "✈️ Drones",
  "🏏 Outdoor", "🎀 Dolls & Gifts", "🎮 Video Games", "🌈 Creative Kits",
];

const floatingEmojis: Emoji[] = [
  { e: "🚗", top: "18%", side: "left",  pct: "6%",  dur: 4.5, delay: 0,   size: "2.4rem" },
  { e: "🧸", top: "22%", side: "right", pct: "7%",  dur: 5.2, delay: 0.6, size: "2.2rem" },
  { e: "🤖", top: "52%", side: "left",  pct: "4%",  dur: 3.8, delay: 1.2, size: "2rem"   },
  { e: "🎲", top: "55%", side: "right", pct: "5%",  dur: 6.0, delay: 0.3, size: "1.9rem" },
  { e: "🧩", top: "36%", side: "left",  pct: "9%",  dur: 5.5, delay: 1.8, size: "1.8rem" },
  { e: "🎨", top: "72%", side: "right", pct: "9%",  dur: 4.2, delay: 0.9, size: "2rem"   },
  { e: "✈️", top: "75%", side: "left",  pct: "7%",  dur: 5.8, delay: 2.2, size: "1.9rem" },
  { e: "🎀", top: "40%", side: "right", pct: "3%",  dur: 4.8, delay: 1.5, size: "1.8rem" },
];

/* ══════════════════════════════════════════
   ANIMATION VARIANTS
══════════════════════════════════════════ */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};
const fromY: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const fromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const chipSpring: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: -10 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 20 } },
};

/* ══════════════════════════════════════════
   COUNT-UP
══════════════════════════════════════════ */
function CountUp({ to, suffix }: Stat) {
  const ref  = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const tick  = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [seen, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function BecomeVendorPage() {
  const router               = useRouter();
  const { handleApplyVendor } = useVendor();
  const [shopName, setShopName]             = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [loading, setLoading]               = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await handleApplyVendor({ shopName, shopDescription });
      toast.success("Application submitted! We'll review within 24 hrs 🎉");
      setShopName("");
      setShopDescription("");
      router.push("/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        ?? "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Scroll to "How It Works" section ──
  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* marquee CSS — self-contained so globals.css stays untouched */}
      <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .ticker-track { animation: ticker 28s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div style={{ background: "var(--bg)" }}>

        {/* ════════════════════════════════════════
            1. HERO — centered, full-width dark
        ════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            minHeight: "92vh",
            background: "linear-gradient(160deg, var(--dark) 0%, #140820 50%, var(--dark-2) 100%)",
          }}
        >
          {/* dot-grid texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          {/* large ambient blob — always animating (parallel track #1) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-130 h-130 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(219,39,119,.16), transparent 65%)" }}
            animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,.12), transparent 65%)" }}
            animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(16,185,129,.10), transparent 65%)" }}
            animate={{ scale: [1, 1.25, 1], x: [0, -20, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          />

          {/* floating toy emojis — each on its own x+y path (parallel track #2…N) */}
          {floatingEmojis.map((fe, i) => (
            <motion.span
              key={i}
              className="absolute pointer-events-none select-none hidden sm:block"
              style={{
                top: fe.top,
                [fe.side]: fe.pct,
                fontSize: fe.size,
                filter: "drop-shadow(0 6px 12px rgba(0,0,0,.35))",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1],
                scale:   [0.4, 1],
                x: [0, fe.side === "left" ? 16 : -16, 0, fe.side === "left" ? -16 : 16, 0],
                y: [0, -14, 0, 14, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.4 + i * 0.12 },
                scale:   { duration: 0.5, delay: 0.4 + i * 0.12 },
                x: { duration: fe.dur, repeat: Infinity, ease: "easeInOut", delay: fe.delay },
                y: { duration: fe.dur * 0.85, repeat: Infinity, ease: "easeInOut", delay: fe.delay + 0.4 },
              }}
            >
              {fe.e}
            </motion.span>
          ))}

          {/* center content — staggered children (parallel track) */}
          <motion.div
            className="relative z-10 px-6 max-w-3xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={chipSpring}>
              <span className="toy-badge inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black mb-7 tracking-wide">
                🎉 Join 10,000+ Sellers Across India
              </span>
            </motion.div>

            <motion.h1
              variants={fromY}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight text-white"
            >
              Sell Toys.
              <br />
              <span className="text-grad-warm">Build Your</span>
              <br />
              Dream Store.
            </motion.h1>

            <motion.p
              variants={fromY}
              className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,.6)" }}
            >
              RC cars for boys, soft dolls for girls, LEGO for everyone —
              list your toys and start earning today. Free forever.
            </motion.p>

            <motion.div variants={fromY} className="flex flex-wrap justify-center gap-4 mt-9">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="btn-base btn-pink inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-black text-base"
                style={{ boxShadow: "0 10px 32px rgba(219,39,119,.45)" }}
              >
                Start Selling Free <ArrowRight size={18} />
              </motion.button>

              {/* ── "See How It Works" now scrolls to the steps section ── */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToHowItWorks}   // ← added
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base border transition-all"
                style={{ border: "1px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.8)", background: "rgba(255,255,255,.06)" }}
              >
                See How It Works
              </motion.button>
            </motion.div>

            {/* stat strip */}
            <motion.div
              variants={fromY}
              className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-14 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,.1)" }}
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-black text-white"><CountUp {...s} /></p>
                  <p className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,.45)" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* bottom wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--bg), transparent)" }} />
        </section>

        {/* ════════════════════════════════════════
            2. MARQUEE STRIP
        ════════════════════════════════════════ */}
        <div
          className="py-4 overflow-hidden border-y"
          style={{ background: "var(--pink)", borderColor: "var(--pink-700)" }}
        >
          <div className="ticker-track flex gap-10 w-max">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-white font-black text-sm whitespace-nowrap flex items-center gap-2">
                {item}
                <span className="opacity-40 text-xs">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            3. PERKS — 3+3 grid, alternating x
        ════════════════════════════════════════ */}
        <section className="py-24 overflow-hidden" style={{ background: "var(--surface)" }}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center mb-14"
            >
              <motion.p variants={fromY} className="text-xs font-black uppercase tracking-[0.22em] mb-3" style={{ color: "var(--pink)" }}>
                Why Sell on Goodie Gear
              </motion.p>
              <motion.h2 variants={fromY} className="text-4xl sm:text-5xl font-black" style={{ color: "var(--dark)" }}>
                Everything You Need
                <br />
                <span className="text-grad-pink">Included Free</span>
              </motion.h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {perks.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="group rounded-3xl p-7 border transition-all cursor-default"
                  style={{
                    background:  "var(--bg)",
                    borderColor: "var(--border)",
                    boxShadow:   "var(--sh-xs)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-md)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--sh-xs)"; }}
                >
                  {/* icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: p.bg }}
                  >
                    <p.icon size={22} style={{ color: p.color }} />
                  </div>

                  {/* big value */}
                  <p
                    className="text-4xl font-black leading-none mb-2"
                    style={{ color: p.color }}
                  >
                    {p.value}
                  </p>

                  <h3 className="text-lg font-black mb-1.5" style={{ color: "var(--dark)" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            4. HOW IT WORKS — 3 steps, x-alternating
             added id="how-it-works"
        ════════════════════════════════════════ */}
        <section
          id="how-it-works"   // ← added ID for scrolling
          className="py-24 overflow-hidden"
          style={{ background: "var(--bg)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p variants={fromY} className="text-xs font-black uppercase tracking-[0.22em] mb-3" style={{ color: "var(--amber)" }}>
                How It Works
              </motion.p>
              <motion.h2 variants={fromY} className="text-4xl sm:text-5xl font-black" style={{ color: "var(--dark)" }}>
                From Zero to <span className="text-grad-warm">First Sale</span>
              </motion.h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6 items-stretch relative">
              {/* connector line */}
              <div
                className="hidden md:block absolute top-14 left-[calc(16.5%+1.5rem)] right-[calc(16.5%+1.5rem)] h-0.5 z-0"
                style={{ background: "linear-gradient(90deg, var(--pink), var(--amber), var(--emerald))" }}
              />

              {steps.map((step, i) => {
                const xFrom = i === 0 ? -60 : i === 2 ? 60 : 0;
                const yFrom = i === 1 ? 40 : 0;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: xFrom, y: yFrom }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.16, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -8, transition: { type: "spring", stiffness: 260 } }}
                    className="flex-1 relative z-10 rounded-3xl p-8 text-center border"
                    style={{
                      background:  "var(--surface)",
                      borderColor: "var(--border)",
                      boxShadow:   "var(--sh-sm)",
                    }}
                  >
                    {/* step bubble */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white mx-auto mb-5"
                      style={{ background: "linear-gradient(135deg, var(--dark), var(--dark-2))" }}
                    >
                      {step.num}
                    </div>

                    <div className="text-5xl mb-4">{step.emoji}</div>
                    <h3 className="text-xl font-black mb-2" style={{ color: "var(--dark)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            5. APPLICATION FORM
        ════════════════════════════════════════ */}
        <section
          ref={formRef}
          className="py-24 overflow-hidden relative"
          style={{ background: "linear-gradient(160deg, var(--dark) 0%, #140820 50%, var(--dark-2) 100%)" }}
        >
          {/* texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          {/* ambient blobs */}
          <motion.div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(219,39,119,.18), transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,.13), transparent 70%)" }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />

          <div className="relative z-10 max-w-2xl mx-auto px-6">
            {/* heading — slides from left and right in parallel */}
            <div className="text-center mb-10">
              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs font-black uppercase tracking-[0.22em] mb-3"
                style={{ color: "var(--amber)" }}
              >
                Apply in 60 Seconds
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-4xl sm:text-5xl font-black text-white leading-tight"
              >
                Open Your Toy Shop
                <br />
                <span className="text-grad-warm">Today</span>
              </motion.h2>
            </div>

            {/* form card — slides up */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-8 sm:p-10"
              style={{
                background: "var(--surface)",
                boxShadow:  "var(--sh-xl)",
                border:     "1px solid var(--border)",
              }}
            >
              {/* mini trust row */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {["No setup fee", "Free to join", "24hr approval"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(16,185,129,.1)", color: "var(--emerald)" }}
                  >
                    <CheckCircle2 size={12} />{t}
                  </span>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* shop name */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>
                    Shop Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none" style={{ color: "var(--muted)" }}>
                      <Store size={16} />
                    </span>
                    <input
                      type="text"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="e.g. Toy Kingdom by Priya"
                      required
                      className="form-input"
                      style={{ paddingLeft: "2.4rem" }}
                    />
                  </div>
                </div>

                {/* description */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--text)" }}>
                    What do you sell?
                  </label>
                  <textarea
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
                    placeholder="Tell us about your toys — RC cars, soft toys, LEGO, board games for boys & girls…"
                    required
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>

                {/* category chips */}
                <div className="flex flex-wrap gap-2">
                  {["🚗 RC Cars", "🧸 Soft Toys", "🧩 LEGO", "📚 Educational", "🤖 Robots", "🎨 Art & Craft"].map((c) => (
                    <span
                      key={c}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all"
                      style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--muted)" }}
                      onClick={() => setShopDescription((d) => d ? `${d}, ${c.split(" ").slice(1).join(" ")}` : c.split(" ").slice(1).join(" "))}
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="btn-base btn-pink w-full py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2"
                  style={{
                    opacity: loading ? 0.65 : 1,
                    cursor:  loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 10px 32px rgba(219,39,119,.4)",
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    <>Apply Now — It&apos;s Free <ArrowRight size={18} /></>
                  )}
                </motion.button>

                <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
                  By applying you agree to our Seller Terms · No credit card required
                </p>
              </form>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}