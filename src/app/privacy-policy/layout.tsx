import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GudiGear",
  description:
    "Read GudiGear's privacy policy to understand how we collect, use, and protect your personal information when you shop with us.",
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
