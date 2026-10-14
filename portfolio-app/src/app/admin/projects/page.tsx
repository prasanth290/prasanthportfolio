import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getAllAdminProjects } from "@/lib/db";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getAllAdminProjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
          Project & Portfolio Management
        </h1>
        <p className="text-xs text-slate-500">
          Add, edit, reorder, or publish case studies and live demo links across your portfolio.
        </p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
