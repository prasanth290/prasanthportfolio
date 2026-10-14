"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, AlertCircle, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PageForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && !initialData?.isSystem) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug,
      content,
      metaTitle: metaTitle || `${title} | Prasanth Dev`,
      metaDescription,
      isPublished,
    };

    try {
      const targetId = initialData?.id || "new";
      const url = isEditing ? `/api/pages/${targetId}` : "/api/pages";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save page.");

      router.push("/admin/pages");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Error saving page.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md">
      <div>
        <Link
          href="/admin/pages"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a192f] font-semibold transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Page Manager</span>
        </Link>
        <h2 className="text-xl font-extrabold text-[#0a192f] flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#c5a059]" />
          <span>{isEditing ? `Edit "${title}"` : "Create New Custom Page"}</span>
        </h2>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Page Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. Terms of Service, Refund Policy, Company Overview..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            URL Slug *
          </label>
          <input
            type="text"
            required
            disabled={initialData?.isSystem}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="terms-of-service"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] disabled:opacity-60 transition-all"
          />
        </div>
      </div>

      {/* Meta Title & Description */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Search Engine Metadata (SEO)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0a192f] block">
              SEO Meta Title
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Terms of Service | Prasanth Dev"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0a192f] block">
              SEO Meta Description
            </label>
            <input
              type="text"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Summary description for search engines..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Visibility Status
        </label>
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded bg-slate-100 border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Publish publicly on live website</span>
          </label>
        </div>
      </div>

      {/* Content Markdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Page Content (Markdown supported) *
        </label>
        <textarea
          required
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="### Heading&#10;Write page body text, terms, or policy information here..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] font-mono leading-relaxed transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#c5a059]/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Page...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEditing ? "Update Page" : "Publish New Page"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
