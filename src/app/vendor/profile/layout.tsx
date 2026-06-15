import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor Profile | GudiGear",
  description:
    "Manage your GudiGear vendor profile, store details, and account settings.",
  robots: { index: false },
};

export default function VendorProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
