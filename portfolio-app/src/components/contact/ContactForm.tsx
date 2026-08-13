"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function ContactFormInner() {
  const searchParams = useSearchParams();

  const initialType = searchParams.get("type") || "Rental Management";
  const initialBudget = searchParams.get("budget") || "$3,000 - $5,000";
  const initialRef = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: initialType,
    budgetRange: initialBudget,
    message: initialRef ? `Hi Prasanth, I'm interested in building a system similar to "${initialRef}".` : "",
    utmSource: "",
    utmCampaign: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const utmSource = searchParams.get("utm_source") || "";
    const utmCampaign = searchParams.get("utm_campaign") || "";
    if (utmSource || utmCampaign) {
      setFormData((prev) => ({ ...prev, utmSource, utmCampaign }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-10 rounded-3xl border border-emerald-500/40 text-center space-y-6 bg-emerald-500/5 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            Thank you, <strong className="text-emerald-400">{formData.name}</strong>. I have received your request for a <strong className="text-white">{formData.projectType}</strong> project and will reply within 12 hours.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={() => {
              setSuccess(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                projectType: "Rental Management",
                budgetRange: "$3,000 - $5,000",
                message: "",
                utmSource: "",
                utmCampaign: "",
              });
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6">
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Phone / WhatsApp (Optional)
          </label>
          <input
            type="tel"
            placeholder="+1 (234) 567-8900"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Project Category *
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="Rental Management">Rental & Property Management</option>
            <option value="Inventory System">Inventory & Warehouse Control</option>
            <option value="Booking Engine">Booking & Appointment Platform</option>
            <option value="Custom Web App">Custom Web App / Portal</option>
            <option value="Other">Other Custom Software</option>
          </select>
        </div>
      </div>

      {/* Budget range */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Target Budget Range (USD)
        </label>
        <select
          value={formData.budgetRange}
          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
        >
          <option value="$1,000 - $3,000">$1,000 – $3,000 (Small Starter App)</option>
          <option value="$3,000 - $5,000">$3,000 – $5,000 (Standard MVP System)</option>
          <option value="$5,000+">$5,000+ (Full Suite / Enterprise)</option>
          <option value="Undecided">Undecided / Flexible</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Project Requirements & Vision *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Describe your current manual process, key features needed, and target timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Proposal Request</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-slate-400">Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
