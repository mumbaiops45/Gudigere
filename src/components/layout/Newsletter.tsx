"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Gift, Bell, Truck, Send } from "lucide-react";
import MagneticButton from "../MagneticButton";

const perks = [
  { icon: Gift,  text: "10% off your very first order" },
  { icon: Bell,  text: "Weekly exclusive toy deals"    },
  { icon: Truck, text: "Early access to new arrivals"  },
];

export default function Newsletter() {
  const [done, setDone] = useState(false);

  return (
    <section className="section-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row min-h-64">

        {/* ── LEFT — dark panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="lg:w-5/12 bg-slate-900 px-8 sm:px-10 lg:px-12
            py-10 sm:py-12 lg:py-14 flex flex-col justify-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="text-pink-400 text-xs font-bold uppercase
              tracking-widest mb-3"
          >
            Newsletter
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.45 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-white leading-snug"
          >
            Exclusive Toy Deals,<br />
            <span className="text-pink-400">Every Week</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            viewport={{ once: true }}
            className="mt-3 text-slate-400 text-sm leading-relaxed max-w-xs"
          >
            Join&nbsp;
            <span className="text-white font-semibold">10,000+ parents</span>
            &nbsp;who get the best toy deals and new arrivals delivered
            to their inbox.
          </motion.p>

          <div className="mt-7 space-y-3.5">
            {perks.map(({ icon: Icon, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38 + i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-pink-600/20 border border-pink-600/30
                  rounded-lg flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-pink-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT — form ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex-1 px-8 sm:px-10 lg:px-14 py-10 sm:py-12
            lg:py-14 flex flex-col justify-center bg-white"
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center py-8 text-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <CheckCircle2 size={56} className="text-emerald-500" />
                </motion.div>
                <p className="text-xl font-bold text-slate-900">
                  You're in! 🎉
                </p>
                <p className="text-sm text-slate-500 max-w-xs">
                  Your 10% off coupon code is on its way to your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="max-w-sm"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Get 10% Off Your First Order
                </h3>
                <p className="text-sm text-slate-400 mt-1.5 mb-6">
                  Subscribe free — no spam, cancel anytime.
                </p>

                <div className="flex flex-col gap-3">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="Your name"
                    className="form-input"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    placeholder="Email address"
                    className="form-input"
                  />
                  <MagneticButton
                    onClick={() => setDone(true)}
                    className="btn-base btn-pink py-3.5 rounded-xl font-semibold
                      text-sm flex items-center justify-center gap-2
                      shadow-[0_4px_14px_rgba(219,39,119,.35)] w-full"
                  >
                    <Send size={15} />
                    Subscribe &amp; Get 10% Off
                  </MagneticButton>
                </div>

                <p className="text-[11px] text-slate-400 mt-4 text-center">
                  🔒 Your data is safe. We never share it.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
