import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Project Entry</h1>
        <p className="text-xs text-slate-400">Add a new custom software system or case study to your live portfolio.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
