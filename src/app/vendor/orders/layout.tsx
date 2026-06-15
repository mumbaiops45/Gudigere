import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Orders | GudiGear",
  description:
    "View and manage orders placed for your toy listings on GudiGear. Update order statuses and track fulfilment.",
  robots: { index: false },
};

export default function VendorOrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
