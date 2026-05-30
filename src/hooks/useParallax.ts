"use client";

import { RefObject } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

/**
 * Parallax that tracks the window scroll.
 * @param outputRange  e.g. [0, -120]  — how far (px) the element moves
 * @param inputEnd     scroll distance (px) over which the effect plays out
 */
export function useWindowParallax(
  outputRange: [number, number] = [0, -120],
  inputEnd = 600
): MotionValue<number> {
  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, inputEnd], outputRange);
  return useSpring(raw, { stiffness: 80, damping: 20 });
}

/**
 * Parallax relative to an element entering/leaving the viewport.
 * @param ref          ref on the container element
 * @param outputRange  e.g. [60, -60]
 */
export function useElementParallax(
  ref: RefObject<Element>,
  outputRange: [number, number] = [60, -60]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], outputRange);
  return useSpring(raw, { stiffness: 60, damping: 18 });
}
