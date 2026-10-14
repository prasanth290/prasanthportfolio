"use client";

import { useState } from "react";
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
  FileText,
  Menu,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";

export function AdminSidebar({ session }: { session: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Projects & Portfolio", href: "/admin/projects", icon: FolderKanban },
    { label: "Add New Project", href: "/admin/projects/new", icon: PlusCircle },
    { label: "Client Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "FAQ Manager", href: "/admin/faqs", icon: HelpCircle },
    { label: "Custom Pages", href: "/admin/pages", icon: FileText },
    { label: "Inquiries & Leads", href: "/admin/leads", icon: Inbox },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200/90 shadow-sm sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-bold shadow-sm">
            <Code2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-[#0a192f] text-sm">Studio Admin</span>
            <div className="text-[10px] text-[#c5a059] font-medium">Prasanth.dev</div>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-[#0a192f] hover:bg-slate-200 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/30 backdrop-blur-xs z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-white border-r border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shrink-0 shadow-xl md:shadow-none transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="space-y-6">
          {/* Brand Logo & Studio Identity */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold text-[#0a192f] text-base group-hover:text-amber-600 transition-colors">
                  Studio Admin
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-[#c5a059] font-medium font-mono">
                  <Shield className="w-2.5 h-2.5" />
                  <span>Senior Engineer CMS</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? "bg-amber-500/15 text-[#0a192f] border border-amber-400/50 font-bold shadow-xs"
                      : "text-slate-600 hover:text-[#0a192f] hover:bg-slate-50 font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-[#c5a059]" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#c5a059]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls */}
        <div className="space-y-3 pt-6 border-t border-slate-200 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-slate-600 hover:text-[#0a192f] hover:bg-slate-50 border border-slate-200/80 transition-all shadow-2xs group"
          >
            <span className="font-medium text-xs">View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {session && (
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500">
              <span className="block text-[10px] uppercase font-bold text-slate-400">Authenticated As</span>
              <span className="text-[#0a192f] font-semibold truncate block max-w-[180px]">
                {session.email}
              </span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-600 bg-rose-50/60 hover:bg-rose-100/80 hover:text-rose-700 transition-colors font-semibold border border-rose-200/60"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
