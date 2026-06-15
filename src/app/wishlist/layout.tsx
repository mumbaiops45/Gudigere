import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | GudiGear",
  description:
    "Save your favourite toys and games on GudiGear. Come back anytime to add wishlisted items to your cart and enjoy fast delivery.",
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
