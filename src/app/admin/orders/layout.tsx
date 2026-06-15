import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Orders | GudiGear Admin",
  description: "View and manage all customer orders placed on the GudiGear marketplace.",
  robots: { index: false },
};

export default function AdminOrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
