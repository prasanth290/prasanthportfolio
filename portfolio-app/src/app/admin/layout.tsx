import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // If viewing admin login page, allow
  // Otherwise enforce auth
  if (!session) {
    // Note: Login page overrides layout via client route or redirect handled inside pages
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col md:flex-row">
      <AdminSidebar session={session} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">{children}</main>
    </div>
  );
}
