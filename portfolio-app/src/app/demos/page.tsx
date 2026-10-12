import Link from "next/link";
import { getSafeProjects } from "@/lib/db";
import { ArrowRight, Sparkles } from "lucide-react";
import { DemoViewportSimulator } from "@/components/demos/DemoViewportSimulator";

export const metadata = {
  title: "Live Interactive System Demos | Prasanth Dev",
  description:
    "Test live working demonstrations of custom web applications with interactive Desktop, Tablet, and Mobile device viewport previews.",
};

export const revalidate = 300;

export default async function DemosPage() {
  const safeProjects = await getSafeProjects();
  const projectsWithDemos = safeProjects.filter((p) => p.demoUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Sandbox Access</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Test-Drive Live Business Systems
        </h1>
        <p className="text-stone-400 text-base leading-relaxed">
          No sign-up required. Toggle between Desktop, Tablet, and Mobile viewports below to test responsive layouts and launch real working web application sandboxes firsthand.
        </p>
      </div>

      {/* Grid of Demos */}
      {projectsWithDemos.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto border border-emerald-900/40 bg-[#0a1710]/80">
          <div className="w-12 h-12 rounded-full bg-emerald-950 border border-amber-400/30 text-amber-300 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white">No Live Demos Currently Listed</h3>
          <p className="text-stone-400 text-xs leading-relaxed">
            Live interactive project sandboxes will appear here once published from the Admin Dashboard with active demo URLs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 border border-amber-400/50 text-amber-100 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-950/50"
          >
            <span>Request a Private Demo Walkthrough</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsWithDemos.map((project, idx) => (
            <DemoViewportSimulator key={project.id} project={project} priority={idx < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
