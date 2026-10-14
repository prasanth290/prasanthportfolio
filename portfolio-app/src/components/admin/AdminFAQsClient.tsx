"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2, HelpCircle } from "lucide-react";

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

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6 max-w-4xl">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#0a192f]">
              {isEditing ? "Edit FAQ Question" : "Add New FAQ Question"}
            </h3>
            <p className="text-[11px] text-slate-500">Provide direct answers to client questions regarding timelines, code ownership, and pricing</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Question Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Do I get 100% full ownership of the source code?"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. General, Pricing, Timeline"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Detailed Answer *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Explain clearly so prospects understand IP rights, milestones, and deliverables..."
            value={formData.answer}
            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
            <span>Publish on website FAQ accordions</span>
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
                <span>{isEditing ? "Update FAQ" : "Save FAQ"}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-4 max-w-4xl">
        <h3 className="text-base font-extrabold text-[#0a192f]">
          Configured FAQs ({items.length})
        </h3>

        {items.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
            No custom FAQs added to DB yet. Default fallback FAQs are currently shown on the public site.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                      {item.category || "General"}
                    </span>
                    <h4 className="font-bold text-[#0a192f] text-sm">{item.question}</h4>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
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

                <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
