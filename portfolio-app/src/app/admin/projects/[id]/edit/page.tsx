import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Project Entry</h1>
        <p className="text-xs text-slate-400">Update project details, live demo URL, or screenshots for "{project.title}".</p>
      </div>

      <ProjectForm initialData={project} />
    </div>
  );
}
