"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Tag, Clock, Users, CalendarDays, Zap, ShoppingBag } from "lucide-react";
import { getActiveCoupons, type Coupon } from "../services/couponService";
import { useRouter } from "next/navigation";


/* ── countdown hook ── */
type Countdown = { d: number; h: number; m: number; s: number } | null;

function useCountdown(endDate?: string | null): Countdown {
  const calc = (): Countdown => {
    if (!endDate) return null;
    const d = new Date(endDate).getTime() - Date.now();
    if (d <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(d / 86_400_000),
      h: Math.floor((d / 3_600_000) % 24),
      m: Math.floor((d / 60_000) % 60),
      s: Math.floor((d / 1000) % 60),
    };
  };
  const [t, setT] = useState<Countdown>(calc);
  useEffect(() => {
    if (!endDate) return;
    const iv = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(iv);
  }, [endDate]);
  return t;
}

/* ── copy button ── */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
            <Check size={15} /> Copied!
          </motion.span>
        ) : (
          <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
            <Copy size={15} /> Copy Code
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

/* ── single coupon card ── */
function CouponCard({ coupon, index }: { coupon: Coupon; index: number }) {
  const timer = useCountdown(coupon.endDate);
  const usagePct = coupon.usageLimit ? Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100) : 0;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -4 }}
      className="flex flex-col sm:flex-row bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-shadow hover:shadow-xl"
    >
      {/* ── left discount panel ── */}
      <div className="relative sm:w-36 bg-pink-600 flex flex-col items-center justify-center p-5 shrink-0">
        {/* perforation dots */}
        <div className="hidden sm:flex absolute right-0 top-0 bottom-0 flex-col justify-between py-3 translate-x-1/2 z-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
          ))}
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white text-center"
        >
          <p className="text-4xl font-black leading-none">
            {coupon.discountType === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
          </p>
          <p className="text-pink-200 text-xs font-bold uppercase tracking-widest mt-1">OFF</p>
        </motion.div>
        {coupon.discountType === "percentage" && coupon.maxDiscount && (
          <p className="text-pink-200 text-[10px] mt-2 text-center">
            Max ₹{coupon.maxDiscount}
          </p>
        )}
      </div>

      {/* ── right details panel ── */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">{coupon.title}</h3>
            {coupon.description && (
              <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-2">{coupon.description}</p>
            )}
          </div>
          {/* code badge */}
          <div className="flex items-center gap-1.5 bg-pink-50 border border-dashed border-pink-300 rounded-lg px-3 py-1.5 shrink-0">
            <Tag size={12} className="text-pink-500" />
            <span className="font-black text-pink-700 text-sm tracking-widest">{coupon.code}</span>
          </div>
        </div>

        {/* meta row */}
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          {coupon.minPrice > 0 && (
            <span className="flex items-center gap-1">
              <ShoppingBag size={11} className="text-slate-400" />
              Min. order ₹{coupon.minPrice}
            </span>
          )}
          {coupon.days.length > 0 && (
            <span className="flex items-center gap-1">
              <CalendarDays size={11} className="text-slate-400" />
              {coupon.days.slice(0, 3).join(", ")}{coupon.days.length > 3 ? "…" : ""}
            </span>
          )}
          {coupon.startTime && coupon.endTime && (
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-slate-400" />
              {coupon.startTime} – {coupon.endTime}
            </span>
          )}
          {coupon.usageLimit && (
            <span className="flex items-center gap-1">
              <Users size={11} className="text-slate-400" />
              {coupon.usedCount}/{coupon.usageLimit} used
            </span>
          )}
        </div>

        {/* usage bar */}
        {coupon.usageLimit && (
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${usagePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-full bg-pink-500 rounded-full"
            />
          </div>
        )}

        {/* countdown + copy */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-1">
          {timer ? (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} className="text-pink-500" />
              Expires in:
              <span className="font-black text-slate-800 tabular-nums">
                {timer.d > 0 ? `${timer.d}d ` : ""}{pad(timer.h)}h {pad(timer.m)}m {pad(timer.s)}s
              </span>
            </div>
          ) : (
            <span className="text-xs text-emerald-600 font-semibold">✓ Always valid</span>
          )}
          <CopyButton code={coupon.code} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── main section ── */
export default function DealsSection() {
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveCoupons()
      .then((data) => setCoupons(data))
      .catch(() => setCoupons([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center shadow-md">
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Zap size={18} className="text-white" />
              </motion.div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Hot Coupons & Offers</h2>
              <p className="text-slate-500 text-xs">Copy a code · use at checkout · save instantly</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/coupons")}
            className="text-sm font-semibold text-pink-600 hover:text-pink-700 transition-colors"
          >
            View all →
          </button>
        </motion.div>

        {/* ── coupon list ── */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Tag size={36} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold text-slate-500">No active coupons right now</p>
            <p className="text-sm mt-1">Check back soon for exclusive deals!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((c, i) => (
              <CouponCard key={c._id} coupon={c} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
