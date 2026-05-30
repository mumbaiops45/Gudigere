"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        scaleX,
        background: "linear-gradient(90deg, #db2777, #9333ea, #3b82f6)",
      }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left shadow-[0_0_8px_rgba(219,39,119,.7)]"
    />
  );
}
