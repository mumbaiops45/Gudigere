"use client";

import { usePathname } from "next/navigation";

import Navbar from "../Navbar";

import Footer from "../Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

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