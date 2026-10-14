import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col md:flex-row antialiased">
      <AdminSidebar session={session} />
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto max-w-7xl w-full">{children}</main>
    </div>
  );
}
