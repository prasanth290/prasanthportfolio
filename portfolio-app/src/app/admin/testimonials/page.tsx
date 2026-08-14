import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminTestimonialsClient } from "@/components/admin/AdminTestimonialsClient";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("Failed to fetch testimonials from DB:", e);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Client Testimonials CMS</h1>
        <p className="text-xs text-slate-400">
          Manage client quotes, star ratings, and company proof displayed on your homepage and case study pages.
        </p>
      </div>

      <AdminTestimonialsClient initialTestimonials={testimonials} />
    </div>
  );
}
