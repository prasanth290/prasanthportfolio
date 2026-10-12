"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export function EstimatorWidget() {
  const [projectType, setProjectType] = useState<string>("Rental Management");
  const [features, setFeatures] = useState<string[]>([
    "Tenant Portal & Payments",
    "Analytics Dashboard",
  ]);

  const projectTypes = [
    { label: "Rental Management", baseCost: 3200 },
    { label: "Inventory & Warehouse", baseCost: 3500 },
    { label: "Booking & Scheduling", baseCost: 2800 },
    { label: "Custom CRM / Web App", baseCost: 3000 },
  ];

  const featureOptions = [
    { label: "Tenant Portal & Payments", cost: 800 },
    { label: "Barcode & Stock Sync", cost: 900 },
    { label: "SMS & Email Reminders", cost: 500 },
    { label: "Multi-Role User Auth", cost: 600 },
    { label: "Analytics Dashboard", cost: 700 },
    { label: "Stripe / Payment Gateway", cost: 600 },
  ];

  const toggleFeature = (label: string) => {
    if (features.includes(label)) {
      setFeatures(features.filter((f) => f !== label));
    } else {
      setFeatures([...features, label]);
    }
  };

  const selectedTypeObj = projectTypes.find((t) => t.label === projectType) || projectTypes[0];
  const featuresCost = features.reduce((sum, featLabel) => {
    const found = featureOptions.find((o) => o.label === featLabel);
    return sum + (found ? found.cost : 0);
  }, 0);

  const totalMin = selectedTypeObj.baseCost + featuresCost;
  const totalMax = Math.round(totalMin * 1.25);

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xl space-y-6 bg-white/95">
      {/* Step 1: Select Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          1. System Solution Category
        </label>
        <div className="grid grid-cols-2 gap-2">
          {projectTypes.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => setProjectType(t.label)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                projectType === t.label
                  ? "bg-amber-500/15 text-[#0a192f] border-amber-500 font-bold shadow-sm"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:text-[#0a192f] hover:border-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Select Features */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          2. Required Capability Modules
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {featureOptions.map((f) => {
            const isSelected = features.includes(f.label);
            return (
              <button
                key={f.label}
                type="button"
                onClick={() => toggleFeature(f.label)}
                className={`p-2.5 rounded-xl text-[11px] font-medium text-left transition-all border flex items-center justify-between gap-1.5 ${
                  isSelected
                    ? "bg-amber-50 text-[#0a192f] border-amber-300 font-semibold shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:text-[#0a192f]"
                }`}
              >
                <span>{f.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result Card: Executive High-Contrast Slate-Navy Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0a192f] border border-amber-500/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400">Estimated Investment Range</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}{" "}
            <span className="text-xs font-normal text-slate-400">USD</span>
          </div>
          <div className="text-[11px] text-[#c5a059] font-medium mt-0.5">
            Est. Timeline: {projectType === "Rental Management" || projectType === "Inventory & Warehouse" ? "3–4 Weeks" : "2–3 Weeks"}
          </div>
        </div>

        <Link
          href={`/contact?type=${encodeURIComponent(projectType)}&budget=${encodeURIComponent(`$${totalMin.toLocaleString()} - $${totalMax.toLocaleString()}`)}`}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all text-center flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-[#c5a059]/20"
        >
          <span>Claim Proposal With Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
