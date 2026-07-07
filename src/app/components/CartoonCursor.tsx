"use client";

import React, { useEffect, useRef } from "react";
import "./CartoonLoader.css";

const CartoonCursor: React.FC = () => {
  const charRef = useRef<HTMLDivElement | null>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const char = charRef.current;
    if (!char) return;

    const handleMouseMove = (e: MouseEvent) => {
      char.style.left = `${e.clientX}px`;
      char.style.top = `${e.clientY}px`;
      char.classList.add("visible");
    };

    const handleMouseDown = () => {
      char.classList.add("blink");
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
      blinkTimer.current = setTimeout(() => {
        char.classList.remove("blink");
      }, 200);
    };

    const handleMouseLeaveWindow = () => char.classList.remove("visible");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, []);

  return (
    <div ref={charRef} className="cartoon-cursor" aria-hidden="true">
      <div className="eye l"></div>
      <div className="eye r"></div>
    </div>
  );
};

export default CartoonCursor;