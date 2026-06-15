import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | GudiGear Vendor",
  description:
    "List a new toy product on GudiGear. Fill in product details, upload images, and start selling to customers across India.",
  robots: { index: false },
};

export default function AddProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
