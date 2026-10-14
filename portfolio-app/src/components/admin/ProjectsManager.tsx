"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Star,
  CheckCircle,
  XCircle,
  FolderKanban,
} from "lucide-react";

export function ProjectsManager({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        alert(data.error || "Failed to delete project. Please verify admin session.");
        return;
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
      alert("Network error while deleting project.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleFeatured = async (project: any) => {
    const newFeatured = !project.isFeatured;
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, isFeatured: newFeatured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, isFeatured: newFeatured } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, category, or slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0a192f] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#c5a059]/20 hover:opacity-95 shrink-0 justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Projects Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Status</th>
                <th className="p-4">Demo Link</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FolderKanban className="w-8 h-8 text-slate-300" />
                      <span>No matching projects found.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={p.coverImage} alt={p.title} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-[#0a192f] max-w-xs truncate text-sm">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            /projects/{p.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold">
                        {p.category}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          p.isFeatured
                            ? "bg-amber-50 text-amber-500 border-amber-300 shadow-2xs"
                            : "bg-slate-50 text-slate-300 border-slate-200 hover:text-amber-400"
                        }`}
                        title="Toggle Featured on Homepage"
                      >
                        <Star className={`w-4 h-4 ${p.isFeatured ? "fill-current" : ""}`} />
                      </button>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {p.status === "PUBLISHED" ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-slate-400" />
                        )}
                        <span>{p.status}</span>
                      </span>
                    </td>

                    <td className="p-4">
                      {p.demoUrl ? (
                        <a
                          href={p.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-mono text-[11px] font-medium"
                        >
                          <span>Live View</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-300 font-mono">—</span>
                      )}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#0a192f] border border-slate-200 transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
