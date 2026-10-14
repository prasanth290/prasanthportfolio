import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllAdminPages } from "@/lib/db";
import { PagesManager } from "@/components/admin/PagesManager";

export const revalidate = 0;

export default async function AdminPagesPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const pages = await getAllAdminPages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
          Custom Pages Management
        </h1>
        <p className="text-xs text-slate-500">
          Create, edit, or delete custom content pages, privacy policy, and terms.
        </p>
      </div>

      <PagesManager initialPages={pages} />
    </div>
  );
}
