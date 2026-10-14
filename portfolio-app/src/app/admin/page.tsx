import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAdminSession } from "@/lib/auth";
import { prisma, getAllAdminProjects } from "@/lib/db";
import {
  FolderKanban,
  Inbox,
  Sparkles,
  Plus,
  ArrowRight,
  ExternalLink,
  MessageSquareQuote,
  Settings,
  HelpCircle,
  FileText,
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const allProjects = await getAllAdminProjects();
  let recentProjects = allProjects.slice(0, 4);
  let projectCount = allProjects.length;

  let recentLeads = [
    {
      id: "lead-1",
      name: "Marcus Vance",
      email: "marcus@vanceproperties.com",
      phone: "+1 (555) 389-1122",
      projectType: "Rental Management",
      budgetRange: "$3,000 - $5,000",
      message: "Hi Prasanth, I tested your PropFlow demo and love how the tenant rent collection and maintenance queue work.",
      status: "NEW",
      createdAt: new Date(),
    },
    {
      id: "lead-2",
      name: "Sarah Jenkins",
      email: "sjenkins@apexsupply.io",
      phone: "+1 (555) 902-3344",
      projectType: "Inventory System",
      budgetRange: "$5,000+",
      message: "We run 2 distribution hubs with over 4,000 SKUs. Saw your NexusStock demo and need a similar web app.",
      status: "CONTACTED",
      createdAt: new Date(),
    },
  ];
  let leadCount = 2;
  let newLeadCount = 1;

  try {
    const lCount = await prisma.lead.count();
    const nLCount = await prisma.lead.count({ where: { status: "NEW" } });
    const rLeads = await prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    leadCount = lCount;
    newLeadCount = nLCount;
    recentLeads = rLeads as any;
  } catch (e) {
    console.warn("Failed to query lead dashboard metrics from DB, using fallback data:", e);
  }

  return (
    <div className="space-y-8">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#c5a059] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Monaco Maritime Control Cockpit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500">
            Welcome back, <strong className="text-[#0a192f] font-semibold">{session.name || "Prasanth"}</strong>. Here is the operational summary of your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#c5a059]/20 hover:opacity-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Projects</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-[#c5a059] flex items-center justify-center font-bold">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a192f] tracking-tight">{projectCount}</div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Published portfolio systems</span>
            <Link href="/admin/projects" className="text-[#c5a059] font-semibold hover:underline">
              View all →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a192f] tracking-tight">{leadCount}</div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {newLeadCount} New Unread {newLeadCount === 1 ? "Inquiry" : "Inquiries"}
            </span>
            <Link href="/admin/leads" className="text-blue-600 font-semibold hover:underline">
              Open inbox →
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Sandboxes</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0a192f] tracking-tight">
            {recentProjects.filter((p) => p.demoUrl).length}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>Working deployed simulators</span>
            <Link href="/demos" target="_blank" className="text-emerald-600 font-semibold hover:underline">
              Test live →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Launchpad Strip */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#0a192f] uppercase tracking-wider">Quick Actions:</span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/projects/new"
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Add Project</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-blue-500" />
            <span>Testimonials</span>
          </Link>
          <Link
            href="/admin/faqs"
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>FAQs</span>
          </Link>
          <Link
            href="/admin/pages"
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>Custom Pages</span>
          </Link>
          <Link
            href="/admin/settings"
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Studio Settings</span>
          </Link>
        </div>
      </div>

      {/* Grid: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-[#0a192f] text-base">Recent Inquiries</h3>
              <p className="text-[11px] text-slate-500">Direct proposal requests submitted via contact forms</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-[#c5a059] hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">No leads received yet.</div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0a192f]">{lead.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === "NEW"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : lead.status === "CONTACTED"
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {lead.projectType} • <span className="font-mono text-slate-600">{lead.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                    <Link
                      href="/admin/leads"
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#c5a059] text-slate-700 text-[11px] font-semibold transition-colors"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Active Projects Showcase */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-extrabold text-[#0a192f] text-base">Active Projects</h3>
              <p className="text-[11px] text-slate-500">Live published case studies</p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-[#c5a059] hover:text-amber-700 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:bg-slate-50 hover:border-amber-300 transition-all flex items-center justify-between text-xs gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-7 rounded-md overflow-hidden bg-slate-200 shrink-0">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0a192f] line-clamp-1">{p.title}</div>
                    <div className="text-slate-500 text-[11px]">{p.category}</div>
                  </div>
                </div>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#c5a059] text-slate-700 hover:text-[#0a192f] text-[11px] font-semibold transition-colors shrink-0"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
