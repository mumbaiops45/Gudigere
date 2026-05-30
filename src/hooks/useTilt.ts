"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Returns motion values + event handlers to add a smooth 3-D tilt
 * effect to any motion.div on mouse hover.
 *
 * Usage:
 *   const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
 *   <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle:"preserve-3d" }} ... />
 */
export function useTilt(maxDeg = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [maxDeg, -maxDeg]), {
    stiffness: 300,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]), {
    stiffness: 300,
    damping: 22,
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
