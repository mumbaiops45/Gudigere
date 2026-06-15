import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Vendor | GudiGear",
  description:
    "Partner with GudiGear and sell your toys to thousands of customers across India. Register as a vendor today and grow your toy business online.",
};

export default function BecomeVendorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
