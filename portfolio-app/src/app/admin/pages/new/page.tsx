import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { PageForm } from "@/components/admin/PageForm";

export default async function NewPageAdmin() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Page</h1>
        <p className="text-xs text-slate-400">Add a new custom landing page, policy, or legal document.</p>
      </div>

      <PageForm />
    </div>
  );
}
