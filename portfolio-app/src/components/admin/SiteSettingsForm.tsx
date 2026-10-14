"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, CheckCircle2, AlertCircle, Settings, Globe, Phone, Shield, BarChart3 } from "lucide-react";

export function SiteSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const router = useRouter();
  const [settings, setSettings] = useState({
    contact_email: initialSettings.contact_email || "prasanth.dev.studio@gmail.com",
    contact_phone: initialSettings.contact_phone || "+91 98765 43210",
    whatsapp_number: initialSettings.whatsapp_number || initialSettings.contact_phone || "+91 98765 43210",
    whatsapp_message:
      initialSettings.whatsapp_message ||
      "Hi Prasanth, I saw your portfolio and would like to discuss building a custom software/web system.",
    developer_name: initialSettings.developer_name || "Prasanth",
    privacy_policy_custom_notes: initialSettings.privacy_policy_custom_notes || "",
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
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md max-w-4xl">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Site settings updated successfully.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Studio Contact & Public Profiles */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-4 h-4 text-[#c5a059]" />
          <h3 className="text-base font-extrabold text-[#0a192f]">
            Studio Identity & Public Profiles
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Developer / Studio Brand Name
            </label>
            <input
              type="text"
              value={settings.developer_name}
              onChange={(e) => handleChange("developer_name", e.target.value)}
              placeholder="Prasanth"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Contact / Reply Email
            </label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Lead Notification Alert Email
            </label>
            <input
              type="email"
              value={settings.notification_email}
              onChange={(e) => handleChange("notification_email", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Direct Phone Call Number
            </label>
            <input
              type="text"
              value={settings.contact_phone}
              onChange={(e) => handleChange("contact_phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={settings.github_url}
              onChange={(e) => handleChange("github_url", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={settings.linkedin_url}
              onChange={(e) => handleChange("linkedin_url", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Capabilities Deck / CV PDF URL
            </label>
            <input
              type="text"
              value={settings.resume_url}
              onChange={(e) => handleChange("resume_url", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>
      </div>

      {/* WhatsApp & Quick Channels Widget Settings */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base font-extrabold text-[#0a192f]">
              Floating WhatsApp & Call Widget
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            High Conversion Channel
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              WhatsApp Number (with country code)
            </label>
            <input
              type="text"
              value={settings.whatsapp_number}
              onChange={(e) => handleChange("whatsapp_number", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              WhatsApp Pre-filled Greeting Message
            </label>
            <input
              type="text"
              value={settings.whatsapp_message}
              onChange={(e) => handleChange("whatsapp_message", e.target.value)}
              placeholder="Hi Prasanth, I saw your portfolio and would like to discuss building a custom software/web system."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Privacy Policy & Legal Customization */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Shield className="w-4 h-4 text-amber-600" />
          <h3 className="text-base font-extrabold text-[#0a192f]">
            Privacy Policy & Legal Customization
          </h3>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Custom Legal Notes / Jurisdiction (Optional additions shown on /privacy-policy)
          </label>
          <textarea
            rows={3}
            value={settings.privacy_policy_custom_notes}
            onChange={(e) => handleChange("privacy_policy_custom_notes", e.target.value)}
            placeholder="Add any company registration numbers, specific jurisdiction laws, or custom NDA clauses..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] font-mono text-xs transition-all"
          />
        </div>
      </div>

      {/* Quantified Homepage Stat Counters */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h3 className="text-base font-extrabold text-[#0a192f]">
            Homepage Hero Stat Overrides
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Experience Years
            </label>
            <input
              type="text"
              value={settings.stat_experience_years}
              onChange={(e) => handleChange("stat_experience_years", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Projects Shipped
            </label>
            <input
              type="text"
              value={settings.stat_projects_delivered}
              onChange={(e) => handleChange("stat_projects_delivered", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Live Working Demos
            </label>
            <input
              type="text"
              value={settings.stat_live_demos}
              onChange={(e) => handleChange("stat_live_demos", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Code Ownership
            </label>
            <input
              type="text"
              value={settings.stat_code_ownership}
              onChange={(e) => handleChange("stat_code_ownership", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Default Meta Tags */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-base font-extrabold text-[#0a192f] border-b border-slate-100 pb-3">
          SEO & OpenGraph Meta Defaults
        </h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Default Meta Title
            </label>
            <input
              type="text"
              value={settings.meta_title}
              onChange={(e) => handleChange("meta_title", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={settings.meta_description}
              onChange={(e) => handleChange("meta_description", e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Ad Tracking Pixel IDs */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="text-base font-extrabold text-[#0a192f] border-b border-slate-100 pb-3">
          Ad Campaign Analytics & Tracking Pixels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Google Analytics 4 (GA4 ID)
            </label>
            <input
              type="text"
              value={settings.ga4_id}
              onChange={(e) => handleChange("ga4_id", e.target.value)}
              placeholder="G-XXXXXXX"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Meta (Facebook) Pixel ID
            </label>
            <input
              type="text"
              value={settings.meta_pixel_id}
              onChange={(e) => handleChange("meta_pixel_id", e.target.value)}
              placeholder="PIXEL-XXXXXXXX"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200 flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#c5a059]/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
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
