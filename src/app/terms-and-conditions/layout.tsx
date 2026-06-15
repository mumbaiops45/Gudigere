import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | GudiGear",
  description:
    "Review GudiGear's terms and conditions governing the use of our toy marketplace, purchases, returns, and vendor agreements.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
