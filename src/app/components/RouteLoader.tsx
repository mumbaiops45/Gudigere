"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CartoonLoader from "./CartoonLoader"; 

const MIN_VISIBLE_MS = 600;

export default function RouteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(true);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstEffect = useRef(true);

  useEffect(() => {
    hideTimer.current = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (isFirstEffect.current) {
      isFirstEffect.current = false;
      return;
    }

    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname, searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFF6EA]">
      <CartoonLoader />
    </div>
  );
}