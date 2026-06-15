import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Products | GudiGear Vendor",
  description:
    "View and manage all your listed toy products on GudiGear. Edit listings, update stock, and track product performance.",
  robots: { index: false },
};

export default function MyProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
