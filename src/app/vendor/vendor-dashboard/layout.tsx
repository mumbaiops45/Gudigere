import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Dashboard | GudiGear",
  description:
    "Monitor your sales, earnings, orders, and products from your GudiGear vendor dashboard.",
  robots: { index: false },
};

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
