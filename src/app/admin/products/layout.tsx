import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Products | GudiGear Admin",
  description: "Review, approve, and manage all toy product listings on the GudiGear platform.",
  robots: { index: false },
};

export default function AdminProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
