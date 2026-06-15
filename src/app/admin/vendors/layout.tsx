import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Vendors | GudiGear Admin",
  description: "Review, approve, and manage vendor accounts on the GudiGear marketplace.",
  robots: { index: false },
};

export default function AdminVendorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
