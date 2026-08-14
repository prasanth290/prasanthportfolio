"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code2,
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  PlusCircle,
  MessageSquareQuote,
  HelpCircle,
} from "lucide-react";

export function AdminSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects & Portfolio", href: "/admin/projects", icon: FolderKanban },
    { label: "Add New Project", href: "/admin/projects/new", icon: PlusCircle },
    { label: "Client Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "FAQ Manager", href: "/admin/faqs", icon: HelpCircle },
    { label: "Inquiries & Leads", href: "/admin/leads", icon: Inbox },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-900 p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold">
            <Code2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold text-white text-base">Studio Admin</span>
            <div className="text-[10px] text-emerald-400 font-mono">v1.0 • Single Admin</div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="space-y-3 pt-6 border-t border-slate-900 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {session && (
          <div className="px-3.5 py-2 text-[11px] text-slate-400 font-mono border-t border-slate-900/60 pt-2">
            Logged as: <span className="text-white font-semibold">{session.email}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors font-semibold"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
