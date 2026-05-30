"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import {
  LayoutDashboard, PlusSquare, Package,
  ShoppingCart, IndianRupee, User, LogOut, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/vendor",              icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/vendor/add-product",  icon: PlusSquare,      label: "Add Product"  },
  { href: "/vendor/products",     icon: Package,         label: "My Products"  },
  { href: "/vendor/orders",       icon: ShoppingCart,    label: "Orders"       },
  { href: "/vendor/earnings",     icon: IndianRupee,     label: "Earnings"     },
  { href: "/vendor/profile",      icon: User,            label: "Profile"      },
];

function Sidebar({ user, onLogout }: { user: any; onLogout: () => void }) {
  const pathname = usePathname();
  const initials = user?.name
    ? user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
    : "VN";

  return (
    <aside className="sticky top-0 h-screen w-64 bg-slate-900 flex flex-col overflow-y-auto shrink-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/8">
        <Link href="/vendor" className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center font-black text-white text-sm">
            G
          </div>
          <span className="text-xl font-black">
            <span className="text-white">Goodie</span>
            <span className="text-pink-500"> Gear</span>
          </span>
        </Link>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1.5 ml-0.5">
          Vendor Portal
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/vendor" && pathname.startsWith(href));
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
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-500 to-pink-600 flex items-center justify-center font-black text-white text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{user?.name || "Vendor"}</p>
            <p className="text-[11px] text-slate-400 truncate">{user?.email || "vendor@goodiegear.in"}</p>
          </div>
          <span className="shrink-0 text-[9px] font-black uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
            Vendor
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

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuthStore() as { user: any };
  const [pageUser, setPageUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) { router.push("/login"); return; }
    const parsed = JSON.parse(stored);
    if (parsed.role !== "vendor") { router.push("/"); return; }
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
            <h2 className="text-lg font-black text-slate-900">Vendor Panel</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Welcome back, <span className="text-pink-600 font-semibold">{activeUser?.name || "Vendor"}</span> 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{activeUser?.name || "Vendor"}</p>
              <p className="text-xs text-slate-400">{activeUser?.email || ""}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-pink-600 flex items-center justify-center font-black text-white text-sm">
              {activeUser?.name ? activeUser.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "VN"}
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
