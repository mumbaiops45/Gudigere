import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Users | GudiGear Admin",
  description: "View and manage registered users on the GudiGear marketplace.",
  robots: { index: false },
};

export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
