"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Monitor, Tablet, Smartphone, ExternalLink, KeyRound, ShieldCheck, ArrowRight } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";

interface ProjectDemoItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  techStack: string;
  demoUrl?: string | null;
  demoCredentials?: string | null;
  coverImage: string;
}

export function DemoViewportSimulator({ project, priority = false }: { project: ProjectDemoItem; priority?: boolean }) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const techList = typeof project.techStack === "string" ? JSON.parse(project.techStack || "[]") : (project.techStack || []);

  const getContainerWidthClass = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[340px] aspect-[9/16] mx-auto shadow-amber-500/10";
      case "tablet":
        return "max-w-[620px] aspect-[4/3] mx-auto shadow-amber-500/10";
      case "desktop":
      default:
        return "w-full aspect-[16/9]";
    }
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-emerald-900/40 bg-[#0a1710]/70 p-6 space-y-6 flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header & Viewport Switcher Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-950/60">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-amber-300 border border-amber-400/30">
              {project.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Live Sandbox</span>
            </div>
          </div>

          {/* Device Viewport Toggle Buttons */}
          <div className="flex items-center gap-1 bg-[#060b08] p-1 rounded-xl border border-emerald-950/60 self-start sm:self-auto">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === "desktop"
                  ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-amber-200"
              }`}
              title="Desktop Viewport (16:9)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Desktop</span>
            </button>

            <button
              onClick={() => setDeviceMode("tablet")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === "tablet"
                  ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-amber-200"
              }`}
              title="Tablet Viewport (4:3)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Tablet</span>
            </button>

            <button
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === "mobile"
                  ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-stone-950 shadow-md font-bold"
                  : "text-stone-400 hover:text-amber-200"
              }`}
              title="Mobile Viewport (Portrait)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Viewport Device Simulator Frame */}
        <div className="bg-[#060b08]/90 p-3 rounded-2xl border border-emerald-950/60">
          <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-[#09150e] rounded-lg text-[11px] text-stone-400 font-mono border border-emerald-950/40">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-1 text-stone-400 truncate max-w-[200px] sm:max-w-none">
                {project.demoUrl || `https://${project.slug}.demo.app`}
              </span>
            </div>
            <span className="uppercase text-[10px] text-amber-400 font-bold tracking-wider">
              {deviceMode} Viewport
            </span>
          </div>

          <div
            className={`relative rounded-xl overflow-hidden bg-[#07120b] border border-emerald-950/60 transition-all duration-500 ${getContainerWidthClass()}`}
          >
            <Image
              src={project.coverImage}
              alt={`${project.title} (${deviceMode} view)`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              className="object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-[#060b08]/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 border border-amber-400/50 text-amber-100 font-bold text-xs shadow-xl shadow-emerald-950/60 hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Title & Desc */}
        <div>
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-stone-400 text-xs mt-2 leading-relaxed">{project.shortDesc}</p>
        </div>

        {/* Demo Credentials Box */}
        {project.demoCredentials && (
          <div className="p-4 rounded-xl bg-[#07130c] border border-amber-400/30 text-amber-300 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-200">
              <div className="flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>PRE-CONFIGURED DEMO CREDENTIALS</span>
              </div>
              <CopyButton textToCopy={project.demoCredentials} label="Copy Credentials" />
            </div>
            <p className="text-xs font-mono text-stone-300 break-all">{project.demoCredentials}</p>
          </div>
        )}
      </div>

      {/* Footer Details */}
      <div className="pt-4 border-t border-emerald-950/60 flex items-center justify-between text-xs">
        <div className="flex flex-wrap gap-1">
          {techList.slice(0, 4).map((t: string, i: number) => (
            <span key={i} className="px-2 py-0.5 rounded bg-[#07130c] text-emerald-200/80 border border-emerald-900/40 text-[10px]">
              {t}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
