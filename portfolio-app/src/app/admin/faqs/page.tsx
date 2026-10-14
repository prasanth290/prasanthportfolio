import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminFAQsClient } from "@/components/admin/AdminFAQsClient";

export const revalidate = 0;

export default async function AdminFAQsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let faqs: any[] = [];
  try {
    faqs = await prisma.fAQ.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("Failed to fetch FAQs from DB:", e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
          FAQ Manager
        </h1>
        <p className="text-xs text-slate-500">
          Create, edit, and categorize client objection answers displayed on your public website.
        </p>
      </div>

      <AdminFAQsClient initialFaqs={faqs} />
    </div>
  );
}
