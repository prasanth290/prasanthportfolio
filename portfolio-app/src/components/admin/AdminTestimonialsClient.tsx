"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Star, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function AdminTestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [items, setItems] = useState<any[]>(initialTestimonials);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    company: "",
    quote: "",
    rating: 5,
    projectSlug: "",
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientRole: "",
      company: "",
      quote: "",
      rating: 5,
      projectSlug: "",
      isPublished: true,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item: any) => {
    setFormData({
      clientName: item.clientName,
      clientRole: item.clientRole,
      company: item.company,
      quote: item.quote,
      rating: item.rating || 5,
      projectSlug: item.projectSlug || "",
      isPublished: item.isPublished !== false,
    });
    setEditId(item.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const url = editId ? `/api/testimonials/${editId}` : "/api/testimonials";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save testimonial");

      if (editId) {
        setItems(items.map((it) => (it.id === editId ? data.testimonial : it)));
        setSuccess("Testimonial updated successfully!");
      } else {
        setItems([data.testimonial, ...items]);
        setSuccess("Testimonial created successfully!");
      }

      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems(items.filter((it) => it.id !== id));
    } catch (err) {
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="space-y-8">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonial Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 max-w-4xl">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0a192f]">
              {isEditing ? "Edit Testimonial Entry" : "Add New Client Testimonial"}
            </h3>
            <p className="text-[11px] text-slate-500">Quotes appear directly on your homepage and project case studies</p>
          </div>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-slate-500 hover:text-[#0a192f] font-semibold cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Subash / Twosomesty Founder"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Role & Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Managing Director & Site Lead"
              value={formData.clientRole}
              onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Company Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Subash Build / Twosomesty"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Rating (1 to 5 Stars)
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              <option value={3}>⭐⭐⭐ (3 Stars)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Testimonial Quote Text *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Prasanth delivered our custom management software in under 3 weeks. Communication was direct, code ownership is 100% ours..."
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded bg-slate-100 border-slate-300 text-amber-600 focus:ring-amber-500"
            />
            <span>Publish on public homepage & case studies</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#c5a059]/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>{isEditing ? "Update Testimonial" : "Save Testimonial"}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Existing Testimonials List */}
      <div className="space-y-4 max-w-4xl">
        <h3 className="text-base font-extrabold text-[#0a192f]">
          All Testimonials ({items.length})
        </h3>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No testimonials added yet. Fill the form above to add your first verified quote!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-4 relative"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#0a192f] text-sm">{item.clientName}</h4>
                    <p className="text-xs text-[#c5a059] font-medium">{item.clientRole} • {item.company}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#0a192f] transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex text-amber-500">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span
                    className={`font-semibold text-[10px] px-2 py-0.5 rounded-full ${
                      item.isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
