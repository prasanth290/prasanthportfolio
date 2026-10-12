"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ExternalLink, ArrowRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  techStack: string;
  demoUrl?: string | null;
  demoCredentials?: string | null;
  coverImage: string;
  isFeatured: boolean;
}

export function ProjectsGrid({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects] = useState<ProjectItem[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const dynamicCategories = Array.from(
    new Set(["All", ...projects.map((p) => p.category).filter(Boolean)])
  );

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const techArray = typeof p.techStack === "string" ? JSON.parse(p.techStack || "[]") : (p.techStack || []);
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      techArray.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {dynamicCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-bold"
                  : "bg-slate-100 text-slate-600 hover:text-[#0a192f] hover:bg-slate-200"
              }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tech stack, feature..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-card p-12 rounded-2xl text-center space-y-3 border border-slate-200 shadow-sm">
          <p className="text-[#0a192f] font-semibold text-lg">No matching projects found</p>
          <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("All");
            }}
            className="px-4 py-2 bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const techList = JSON.parse(project.techStack || "[]");
            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-200 flex flex-col group shadow-sm hover:shadow-xl transition-all"
              >
                {/* Cover Image */}
                <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 3}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-75" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-[#0a192f] border border-slate-200/80 backdrop-blur-md shadow-sm">
                    {project.category}
                  </span>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs hover:brightness-105 transition-all shadow-md flex items-center gap-1"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0a192f] group-hover:text-amber-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1">
                      {techList.map((t: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-bold text-slate-700 hover:text-amber-700 flex items-center gap-1"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.demoCredentials && (
                        <span className="text-[10px] text-amber-800 font-mono bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          Demo Credentials
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
