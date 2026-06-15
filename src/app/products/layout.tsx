import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Toys & Games | GudiGear",
  description:
    "Browse GudiGear's full collection of toys and games for every age. Find LEGO sets, RC cars, dolls, puzzles, board games, and more at great prices.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
