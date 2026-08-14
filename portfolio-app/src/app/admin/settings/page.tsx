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
    contact_email: "prasanth.dev.studio@gmail.com",
    contact_phone: "+91 98765 43210",
    github_url: "https://github.com/BloodHunt029",
    linkedin_url: "https://linkedin.com/in/prasanth-dev",
    notification_email: "prasanth.dev.studio@gmail.com",
    resume_url: "/Prasanth_Developer_Capabilities.pdf",
    meta_title: "Prasanth | Real Business Software Built & Tested Live",
    meta_description:
      "Portfolio of real completed custom business software — Rental Management Systems, Inventory Control, and Custom Web Apps.",
    ga4_id: "",
    meta_pixel_id: "",
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
        <h1 className="text-2xl font-bold text-white">Global Site & Studio Settings</h1>
        <p className="text-xs text-slate-400">Configure studio contact info, social channels, lead notification alerts, and SEO settings.</p>
      </div>

      <SiteSettingsForm initialSettings={settingsMap} />
    </div>
  );
}
