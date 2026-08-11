import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { prisma, getAllAdminProjects } from "@/lib/db";
import {
  FolderKanban,
  Inbox,
  Sparkles,
  Plus,
  ArrowRight,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400">Welcome back, {session.name || "Prasanth"}!</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projectCount}</div>
          <div className="text-[11px] text-slate-400">Published portfolio entries</div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Inquiries & Leads</span>
            <Inbox className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{leadCount}</div>
          <div className="text-[11px] text-emerald-400 font-medium">
            {newLeadCount} New Unread {newLeadCount === 1 ? "Inquiry" : "Inquiries"}
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Interactive Sandboxes</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">
            {recentProjects.filter((p) => p.demoUrl).length}
          </div>
          <div className="text-[11px] text-slate-400">Live working demo deployments</div>
        </div>
      </div>

      {/* Grid: Recent Inquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Recent Inquiries</h3>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View All Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">No leads received yet.</div>
            ) : (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{lead.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.status === "NEW"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : lead.status === "CONTACTED"
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-slate-400">{lead.projectType} • {lead.email}</div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500 font-mono">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Portfolio Shortcuts */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Active Projects</h3>
            <Link
              href="/admin/projects"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Manage Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white line-clamp-1">{p.title}</div>
                  <div className="text-slate-400 text-[11px]">{p.category}</div>
                </div>
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium"
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
