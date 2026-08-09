import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Project & Portfolio Management</h1>
        <p className="text-xs text-slate-400">Add, edit, reorder, or publish case studies and live demo links.</p>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
