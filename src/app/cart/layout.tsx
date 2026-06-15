import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | GudiGear",
  description:
    "Review your selected toys and proceed to checkout. Enjoy fast delivery and hassle-free returns on all GudiGear orders.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
