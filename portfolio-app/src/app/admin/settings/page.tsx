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

  let settingsMap: Record<string, string> = {
    contact_email: "prasanth@customwebstudio.com",
    contact_phone: "+1 (555) 019-2831",
    contact_whatsapp: "+15550192831",
    meta_title: "Prasanth | Real Business Software Built & Tested Live",
    meta_description: "Portfolio of real completed custom business software — Rental Management Systems, Inventory Control, and Custom Web Apps.",
    ga4_id: "G-DEVSTUDIO2026",
    meta_pixel_id: "PIXEL-987654321",
  };

  try {
    const settingsList = await prisma.siteSetting.findMany();
    if (settingsList && settingsList.length > 0) {
      settingsMap = settingsList.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);
    }
  } catch (e) {
    console.warn("Failed to fetch site settings from DB, using defaults:", e);
  }

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
