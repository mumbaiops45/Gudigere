"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Navbar from "../Navbar";
import Footer from "../Footer";
import useAuthStore from "../../store/authStore";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const { setAuth } = useAuthStore() as { setAuth: (user: unknown, token: string) => void };

  // Hydrate auth store from localStorage on every page load
  // (authStore has no persist middleware, so token is lost on refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const raw   = localStorage.getItem("user");
    if (token && raw) {
      try {
        setAuth(JSON.parse(raw), token);
      } catch {
        // malformed user JSON — ignore
      }
    }
  }, []);

  const isAdmin  = pathname.startsWith("/admin");
  const isVendor = pathname.startsWith("/vendor");
  const isAuth   = pathname === "/login" || pathname === "/register";

  if (isAdmin || isVendor || isAuth) {
    return <>{children}</>;
  }

  return (
    <>

      <Navbar />

      <main>
        {children}
      </main>

      <Footer />

    </>
  );
}