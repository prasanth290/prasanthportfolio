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

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

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
