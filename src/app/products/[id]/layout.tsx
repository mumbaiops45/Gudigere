import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details | GudiGear",
  description:
    "View detailed product information, high-quality images, and customer reviews. Add your favourite toys to the cart and enjoy fast delivery across India.",
};

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
