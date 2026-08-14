"use client";

import { useState } from "react";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function SiteSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState({
    contact_email: initialSettings.contact_email || "prasanth.dev.studio@gmail.com",
    contact_phone: initialSettings.contact_phone || "+91 98765 43210",
    github_url: initialSettings.github_url || "https://github.com/BloodHunt029",
    linkedin_url: initialSettings.linkedin_url || "https://linkedin.com/in/prasanth-dev",
    notification_email: initialSettings.notification_email || "prasanth.dev.studio@gmail.com",
    resume_url: initialSettings.resume_url || "/Prasanth_Developer_Capabilities.pdf",
    stat_experience_years: initialSettings.stat_experience_years || "3+ Yrs",
    stat_projects_delivered: initialSettings.stat_projects_delivered || "12+",
    stat_live_demos: initialSettings.stat_live_demos || "4+",
    stat_code_ownership: initialSettings.stat_code_ownership || "100%",
    meta_title: initialSettings.meta_title || "Prasanth | Custom Web Development & Business Software Studio",
    meta_description:
      initialSettings.meta_description ||
      "High-converting custom web apps, Rental Management Systems, and Inventory Tracking solutions built for modern businesses.",
    ga4_id: initialSettings.ga4_id || "",
    meta_pixel_id: initialSettings.meta_pixel_id || "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      if (!res.ok) throw new Error("Failed to save settings.");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 rounded-3xl border border-slate-800 max-w-4xl">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Site settings updated successfully.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Studio Contact & Social Channels */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
          Studio Contact & Public Profiles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Contact / Reply Email
            </label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Notification Alert Email (For New Leads)
            </label>
            <input
              type="email"
              value={settings.notification_email}
              onChange={(e) => handleChange("notification_email", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={settings.github_url}
              onChange={(e) => handleChange("github_url", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={settings.linkedin_url}
              onChange={(e) => handleChange("linkedin_url", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Capabilities Deck / CV PDF URL
            </label>
            <input
              type="text"
              value={settings.resume_url}
              onChange={(e) => handleChange("resume_url", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Quantified Homepage Stat Counters */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
          Homepage Hero Stat Overrides
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Experience Years
            </label>
            <input
              type="text"
              value={settings.stat_experience_years}
              onChange={(e) => handleChange("stat_experience_years", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Projects Shipped
            </label>
            <input
              type="text"
              value={settings.stat_projects_delivered}
              onChange={(e) => handleChange("stat_projects_delivered", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Live Working Demos
            </label>
            <input
              type="text"
              value={settings.stat_live_demos}
              onChange={(e) => handleChange("stat_live_demos", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Code Ownership
            </label>
            <input
              type="text"
              value={settings.stat_code_ownership}
              onChange={(e) => handleChange("stat_code_ownership", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Default Meta Tags */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
          SEO & OpenGraph Meta Defaults
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Default Meta Title
            </label>
            <input
              type="text"
              value={settings.meta_title}
              onChange={(e) => handleChange("meta_title", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.meta_description}
              onChange={(e) => handleChange("meta_description", e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Ad Tracking Pixel IDs */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
          Ad Campaign Analytics & Pixels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Google Analytics 4 (GA4 ID)
            </label>
            <input
              type="text"
              value={settings.ga4_id}
              onChange={(e) => handleChange("ga4_id", e.target.value)}
              placeholder="G-XXXXXXX"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Meta (Facebook) Pixel ID
            </label>
            <input
              type="text"
              value={settings.meta_pixel_id}
              onChange={(e) => handleChange("meta_pixel_id", e.target.value)}
              placeholder="PIXEL-XXXXXXXX"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Settings...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Site Settings</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
