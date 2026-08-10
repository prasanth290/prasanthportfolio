import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { LeadsInbox } from "@/components/admin/LeadsInbox";

export const revalidate = 0;

export default async function AdminLeadsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let leads: any[] = [
    {
      id: "lead-1",
      name: "Marcus Vance",
      email: "marcus@vanceproperties.com",
      phone: "+1 (555) 389-1122",
      projectType: "Rental Management",
      budgetRange: "$3,000 - $5,000",
      message: "Hi Prasanth, I tested your PropFlow demo and love how the tenant rent collection and maintenance queue work.",
      status: "NEW",
      notes: "Tested PropFlow demo.",
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
      notes: "Tested NexusStock demo.",
      createdAt: new Date(),
    },
  ];

  try {
    const dbLeads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbLeads && dbLeads.length > 0) {
      leads = dbLeads;
    }
  } catch (e) {
    console.warn("Failed to fetch leads from DB, using fallback leads:", e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Inquiries & Leads Inbox</h1>
        <p className="text-xs text-slate-400">View form submissions, update status, add notes, and export CSVs.</p>
      </div>

      <LeadsInbox initialLeads={leads} />
    </div>
  );
}
