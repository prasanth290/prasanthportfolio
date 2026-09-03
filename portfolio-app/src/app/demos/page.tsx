import Link from "next/link";
import Image from "next/image";
import { getSafeProjects } from "@/lib/db";
import { ExternalLink, KeyRound, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";

export const metadata = {
  title: "Live Interactive System Demos | Prasanth Dev",
  description:
    "Test live working demonstrations of custom Rental Management Systems, Inventory Control Suites, and Service Booking Engines.",
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
          No sign-up required. Launch real working web application sandboxes below to test tenant portals, warehouse stock scanning, and executive dashboards firsthand.
        </p>
      </div>

      {/* Grid of Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsWithDemos.map((project, idx) => {
          const techList = JSON.parse(project.techStack || "[]");
          return (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between p-6 space-y-6"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Live Sandbox Online</span>
                  </div>
                </div>

                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx < 2}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <span className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-xl group-hover:scale-105 transition-transform flex items-center gap-2">
                        <span>Launch Demo App</span>
                        <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">{project.shortDesc}</p>
                </div>

                {/* Demo Credentials Box */}
                {project.demoCredentials && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-200">
                      <div className="flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-amber-400" />
                        <span>PRE-CONFIGURED DEMO CREDENTIALS</span>
                      </div>
                      <CopyButton textToCopy={project.demoCredentials} label="Copy Login" />
                    </div>
                    <p className="text-xs font-mono text-slate-300 break-all">{project.demoCredentials}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {techList.slice(0, 3).map((t: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
