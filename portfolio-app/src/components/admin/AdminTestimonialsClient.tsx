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
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonial Form */}
      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 max-w-4xl">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>{isEditing ? "Edit Testimonial Entry" : "Add New Client Testimonial"}</span>
          {isEditing && (
            <button type="button" onClick={resetForm} className="text-xs text-slate-400 hover:text-white">
              Cancel Edit
            </button>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Subash / Twosomesty Founder"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Role & Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Managing Director & Site Lead"
              value={formData.clientRole}
              onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Company Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Subash Build / Twosomesty"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Rating (1 to 5 Stars)
            </label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
              <option value={3}>⭐⭐⭐ (3 Stars)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Testimonial Quote Text *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Prasanth delivered our custom management software in under 3 weeks. Communication was direct, code ownership is 100% ours..."
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="rounded bg-slate-900 border-slate-800 text-emerald-500 focus:ring-emerald-500"
            />
            <span>Publish on public homepage & case studies</span>
          </label>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
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
        <h3 className="text-base font-bold text-white">All Testimonials ({items.length})</h3>

        {items.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
            No testimonials added yet. Fill the form above to add your first verified quote!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.clientName}</h4>
                    <p className="text-xs text-emerald-400">{item.clientRole} • {item.company}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">"{item.quote}"</p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                  <div className="flex text-amber-400">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className={item.isPublished ? "text-emerald-400 font-medium" : "text-slate-500"}>
                    {item.isPublished ? "Published" : "Draft / Hidden"}
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
