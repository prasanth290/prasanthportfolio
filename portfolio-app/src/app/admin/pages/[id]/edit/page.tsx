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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f] tracking-tight">
          Edit Page Entry
        </h1>
        <p className="text-xs text-slate-500">
          Update page content, SEO metadata, or published status for &ldquo;<span className="text-[#0a192f] font-semibold">{page.title}</span>&rdquo;.
        </p>
      </div>

      <PageForm initialData={page} />
    </div>
  );
}
