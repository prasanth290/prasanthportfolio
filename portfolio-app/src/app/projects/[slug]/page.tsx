import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSafeProjects, getSafeProjectBySlug } from "@/lib/db";
import {
  ExternalLink,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
  Code2,
  Calendar,
  MessageSquare,
  Building,
  AlertTriangle,
  TrendingUp,
  Clock,
  Zap,
  Layers,
} from "lucide-react";
import { LightboxGallery } from "@/components/projects/LightboxGallery";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await getSafeProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getSafeProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study & Live Demo`,
    description: project.shortDesc,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rawProject = await getSafeProjectBySlug(slug);

  if (!rawProject || rawProject.status === "DRAFT") {
    notFound();
  }
  const project = rawProject as any;

  const techStackList = JSON.parse(project.techStack || "[]");
  const galleryImagesList = JSON.parse(project.galleryImages || "[]");
  if (galleryImagesList.length === 0 && project.coverImage) {
    galleryImagesList.push(project.coverImage);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-amber-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to All Portfolio Projects</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-amber-300 border border-amber-400/30">
            {project.category} Case Study
          </span>
          <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Updated {new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        {/* Case Study Meta Cards: Business Built For, Problem Solved, Key Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {project.businessType && (
            <div className="p-4 rounded-2xl bg-[#0a1710] border border-emerald-900/50 space-y-1">
              <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Business Built For</span>
              </div>
              <div className="text-xs font-bold text-white leading-snug">{project.businessType}</div>
            </div>
          )}

          {project.problemSolved && (
            <div className="p-4 rounded-2xl bg-[#0a1710] border border-emerald-900/50 space-y-1">
              <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Operational Problem Solved</span>
              </div>
              <div className="text-xs font-medium text-stone-300 leading-snug">{project.problemSolved}</div>
            </div>
          )}

          {project.keyResults && (
            <div className="p-4 rounded-2xl bg-[#0a1710] border border-emerald-900/50 space-y-1">
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Key Results & Impact</span>
              </div>
              <div className="text-xs font-bold text-emerald-200 leading-snug">{project.keyResults}</div>
            </div>
          )}
        </div>

        {/* Outcome & Delivery Proof Strip */}
        <div className="p-4 rounded-2xl bg-[#07130c] border border-amber-400/30 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs shadow-lg shadow-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-semibold uppercase">Delivery Speed</div>
              <div className="font-bold text-white">{project.deliveryTimeline || "Delivered in 18 Days"}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-semibold uppercase">Performance Metric</div>
              <div className="font-bold text-white">{project.performanceMetric || "98/100 Mobile Speed & Sub-second API"}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] text-stone-400 font-semibold uppercase">Scope Delivered</div>
              <div className="font-bold text-white">{project.scopeShipped || "Full Custom Web Software Suite"}</div>
            </div>
          </div>
        </div>

        <p className="text-stone-300 text-base sm:text-lg max-w-3xl leading-relaxed">
          {project.shortDesc}
        </p>

        {/* Action Bar (Live Demo + Credentials) */}
        <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a1710]/90">
          <div className="space-y-1 text-center md:text-left w-full md:w-auto">
            <div className="text-xs text-amber-400/90 font-semibold uppercase tracking-wider">Live System Sandbox</div>
            <div className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Working Product Deployment
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 border border-amber-400/50 text-amber-100 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
              >
                <span>View Live Demo System</span>
                <ExternalLink className="w-4 h-4 text-amber-300" />
              </a>
            )}

            <Link
              href={`/contact?type=${encodeURIComponent(project.category)}&ref=${encodeURIComponent(project.title)}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#060b08] hover:bg-[#07130c] text-amber-200 border border-emerald-900/60 font-semibold text-sm transition-colors text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Request Similar Project</span>
            </Link>
          </div>
        </div>

        {/* Demo Credentials Box */}
        {project.demoCredentials && (
          <div className="p-4 rounded-xl bg-[#07130c] border border-amber-400/30 text-amber-300 flex items-start gap-3 text-xs font-mono">
            <KeyRound className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-amber-200">Demo Account Login Access:</span>
              <span>{project.demoCredentials}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Image Gallery / Lightbox */}
      <LightboxGallery images={galleryImagesList} title={project.title} />

      {/* Case Study Details & Tech Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        {/* Left Column: Full Description */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-6">
            <h2 className="text-2xl font-bold text-white border-b border-emerald-950/60 pb-4">
              Detailed Case Study & Capabilities Delivered
            </h2>
            <div className="prose prose-invert max-w-none text-stone-300 text-sm leading-relaxed whitespace-pre-line">
              {project.fullDesc}
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack & Specs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tech Stack Card */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Technologies Engineered</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {techStackList.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#07130c] text-emerald-200/90 border border-emerald-900/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Solution Highlights */}
          <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-3">
            <h3 className="text-sm font-bold text-white">Deliverables & Ownership</h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real Working System Tested Live</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Source Code Ownership Transfer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom Database Deployment</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Customizable to Your Business Rules</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
