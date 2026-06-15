import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Categories | GudiGear Admin",
  description: "Add, edit, and manage product categories on the GudiGear platform.",
  robots: { index: false },
};

export default function AdminCategoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
