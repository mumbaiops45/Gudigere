import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | GudiGear",
  description:
    "Track and manage your toy orders on GudiGear. View order history, live status updates, and delivery information.",
};

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
