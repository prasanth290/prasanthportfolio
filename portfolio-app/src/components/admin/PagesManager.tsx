"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, ExternalLink, Edit, Trash2, CheckCircle, XCircle, FileText, Lock } from "lucide-react";

export function PagesManager({ initialPages }: { initialPages: any[] }) {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, isSystem: boolean) => {
    if (isSystem) {
      alert("System pages (e.g. Privacy Policy) cannot be deleted. You can edit them.");
      return;
    }
    if (!confirm("Are you sure you want to delete this custom page?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`/api/pages/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        alert(data.error || "Failed to delete page.");
        return;
      }

      setPages((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
      alert("Network error while deleting page.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search custom pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <Link
          href="/admin/pages/new"
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shrink-0 justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Custom Page</span>
        </Link>
      </div>

      {/* Pages Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Page Title</th>
                <th className="p-4">URL Slug</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Public URL</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No custom pages found.
                  </td>
                </tr>
              ) : (
                filteredPages.map((p) => {
                  const publicPath = p.slug === "privacy-policy" ? "/privacy-policy" : `/pages/${p.slug}`;
                  return (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-400" />
                          <span>{p.title}</span>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-[11px] text-slate-400">/{p.slug}</td>

                      <td className="p-4">
                        {p.isSystem ? (
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-bold inline-flex items-center gap-1">
                            <Lock className="w-3 h-3" /> System Policy
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                            Custom Page
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.isPublished
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {p.isPublished ? (
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3 h-3 text-slate-400" />
                          )}
                          <span>{p.isPublished ? "Published" : "Draft"}</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <a
                          href={publicPath}
                          target="_blank"
                          rel="noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>{publicPath}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/pages/${p.id}/edit`}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                            title="Edit Page"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          {!p.isSystem && (
                            <button
                              onClick={() => handleDelete(p.id, p.isSystem)}
                              disabled={deletingId === p.id}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
