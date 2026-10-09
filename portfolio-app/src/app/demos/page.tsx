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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Sandbox Access</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Test-Drive Live Business Systems
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          No sign-up required. Toggle between Desktop, Tablet, and Mobile viewports below to test responsive layouts and launch real working web application sandboxes firsthand.
        </p>
      </div>

      {/* Grid of Demos */}
      {projectsWithDemos.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto border border-slate-800">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">No Live Demos Currently Listed</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Live interactive project sandboxes will appear here once published from the Admin Dashboard with active demo URLs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            <span>Request a Private Demo Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
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
