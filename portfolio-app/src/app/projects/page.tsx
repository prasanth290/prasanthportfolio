import { getSafeProjects } from "@/lib/db";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Layers } from "lucide-react";

export const metadata = {
  title: "Portfolio & Projects | Prasanth Dev",
  description:
    "Explore custom web application projects, Rental Management Systems, and Inventory Tracking platforms built for business clients.",
};

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await getSafeProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Case Studies & Systems Portfolio</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Custom Business Software Delivered
        </h1>
        <p className="text-slate-400 text-base">
          Filter by solution category or tech stack to inspect real system architecture, feature breakdowns, and live demo access.
        </p>
      </div>

      <ProjectsGrid initialProjects={projects} />
    </div>
  );
}
