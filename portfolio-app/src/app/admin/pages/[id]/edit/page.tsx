import { redirect, notFound } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma, DEFAULT_PRIVACY_POLICY_PAGE } from "@/lib/db";
import { PageForm } from "@/components/admin/PageForm";

export default async function EditPageAdmin({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  let page: any = null;

  try {
    page = await prisma.page.findUnique({ where: { id } });
  } catch (e) {
    console.warn("Failed to query page by id:", e);
  }

  if (!page && (id === "privacy-policy-default" || id === "privacy-policy")) {
    page = DEFAULT_PRIVACY_POLICY_PAGE;
  }

  if (!page) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Page Entry</h1>
        <p className="text-xs text-slate-400">Update page content, SEO metadata, or published status for "{page.title}".</p>
      </div>

      <PageForm initialData={page} />
    </div>
  );
}
