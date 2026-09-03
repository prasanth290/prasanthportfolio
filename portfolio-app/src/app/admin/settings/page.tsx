import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";

import { DEFAULT_SITE_SETTINGS } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let settingsMap: Record<string, string> = { ...DEFAULT_SITE_SETTINGS };

  try {
    const settingsList = await prisma.siteSetting.findMany();
    if (settingsList && settingsList.length > 0) {
      settingsMap = settingsList.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, { ...DEFAULT_SITE_SETTINGS } as Record<string, string>);
    }
  } catch (e) {
    console.warn("Failed to fetch site settings from DB, using defaults:", e);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Site & Studio Settings</h1>
        <p className="text-xs text-slate-400">Configure studio contact info, social channels, lead notification alerts, and SEO settings.</p>
      </div>

      <SiteSettingsForm initialSettings={settingsMap} />
    </div>
  );
}
