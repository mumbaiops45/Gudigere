"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import {
  LayoutDashboard, Boxes, Users, Package,
  ShoppingCart, LogOut, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin",            icon: LayoutDashboard, label: "Dashboard"  },
  { href: "/admin/categories", icon: Boxes,           label: "Categories" },
  { href: "/admin/vendors",    icon: Users,           label: "Vendors"    },
  { href: "/admin/products",   icon: Package,         label: "Products"   },
  { href: "/admin/orders",     icon: ShoppingCart,    label: "Orders"     },
  { href: "/admin/users",      icon: Users,           label: "Users"      },
];

function Sidebar({ user, onLogout }: { user: any; onLogout: () => void }) {
  const pathname = usePathname();
  const initials = user?.name
    ? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <aside className="sticky top-0 h-screen w-64 bg-slate-900 flex flex-col overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/admin" className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center font-black text-white text-sm">
            G
          </div>
          <span className="text-xl font-black">
            <span className="text-white">Goodie</span>
            <span className="text-pink-500"> Gear</span>
          </span>
        </Link>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1.5 ml-0.5">
          Admin Console
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group ${
                active
                  ? "bg-pink-600 text-white shadow-md shadow-pink-900/40"
                  : "text-slate-400 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={18} className={active ? "text-white" : "text-slate-500 group-hover:text-white"} />
              {label}
              {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-3 pb-2">
        <div className="bg-white/5 border border-white/8 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{user?.name || "Admin"}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email || "admin@goodiegear.in"}</p>
          </div>
          <span className="shrink-0 text-[9px] font-black uppercase bg-pink-600/20 text-pink-400 border border-pink-600/30 px-1.5 py-0.5 rounded-full">
            Admin
          </span>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4 pt-1">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/15 hover:text-rose-300 transition-all duration-150 group"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore() as { user: any };
  const [pageUser, setPageUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { router.push("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "admin") { router.push("/"); return; }
    setPageUser(parsed);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const activeUser = user || pageUser;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar user={activeUser} onLogout={handleLogout} />

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-6 py-3.5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Admin Panel</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <span className="text-pink-600 font-semibold">{activeUser?.name || "Admin"}</span> 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{activeUser?.name || "Admin"}</p>
              <p className="text-xs text-slate-400">{activeUser?.email || "admin@goodiegear.in"}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-black text-white text-sm">
              {activeUser?.name ? activeUser.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "AD"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
