import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const settingsList = await prisma.siteSetting.findMany();
  const settingsMap = settingsList.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Site & Ad Settings</h1>
        <p className="text-xs text-slate-400">Configure studio contact details, SEO meta tags, and ad pixel tracking IDs.</p>
      </div>

      <SiteSettingsForm initialSettings={settingsMap} />
    </div>
  );
}
