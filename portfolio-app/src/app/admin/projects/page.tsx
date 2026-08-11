import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma, FALLBACK_PROJECTS } from "@/lib/db";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
  } catch (e) {
    console.warn("Failed to fetch projects from DB, using fallback projects:", e);
    projects = FALLBACK_PROJECTS;
  }

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
