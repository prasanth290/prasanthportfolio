"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function AdminFAQsClient({ initialFaqs }: { initialFaqs: any[] }) {
  const [items, setItems] = useState<any[]>(initialFaqs);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    isPublished: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "General",
      isPublished: true,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (item: any) => {
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || "General",
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
      const url = editId ? `/api/faqs/${editId}` : "/api/faqs";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save FAQ");

      if (editId) {
        setItems(items.map((it) => (it.id === editId ? data.faq : it)));
        setSuccess("FAQ question updated successfully!");
      } else {
        setItems([data.faq, ...items]);
        setSuccess("FAQ question created successfully!");
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
    if (!confirm("Are you sure you want to delete this FAQ question?")) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems(items.filter((it) => it.id !== id));
    } catch (err) {
      alert("Failed to delete FAQ");
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 max-w-4xl">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
          <span>{isEditing ? "Edit FAQ Question" : "Add New FAQ Question"}</span>
          {isEditing && (
            <button type="button" onClick={resetForm} className="text-xs text-slate-400 hover:text-white">
              Cancel Edit
            </button>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Question Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Do I get 100% full ownership of the source code?"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. General, Pricing, Timeline"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Detailed Answer *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Explain clearly so prospects understand IP rights, milestones, and deliverables..."
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
            <span>Publish on website</span>
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
                <span>{isEditing ? "Update FAQ" : "Save FAQ"}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-4 max-w-4xl">
        <h3 className="text-base font-bold text-white">Configured FAQs ({items.length})</h3>

        {items.length === 0 ? (
          <div className="glass-card p-8 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
            No custom FAQs added to DB yet. Default fallback FAQs are currently shown on the public site.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">
                      {item.category || "General"}
                    </span>
                    <h4 className="font-bold text-white text-sm">{item.question}</h4>
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

                <p className="text-xs text-slate-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
