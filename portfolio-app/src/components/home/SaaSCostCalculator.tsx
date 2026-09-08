"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  Calculator,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

export function SaaSCostCalculator() {
  const monthlyInputId = useId();
  const seatsInputId = useId();
  const [monthlySpend, setMonthlySpend] = useState<number>(450);
  const [seatsOrUnits, setSeatsOrUnits] = useState<number>(20);

  // Math models
  const yearlySaaS = monthlySpend * 12;
  const threeYearSaaS = monthlySpend * 36;
  const fiveYearSaaS = monthlySpend * 60;

  // Approximate fixed-price one-time custom investment based on scale
  const estimatedCustomBuild = Math.min(
    Math.max(Math.round((monthlySpend * 7.5) / 250) * 250, 2500),
    6500
  );

  const threeYearSavings = threeYearSaaS - estimatedCustomBuild;
  const breakEvenMonths = Math.max(Math.round(estimatedCustomBuild / monthlySpend), 3);

  return (
    <div className="rounded-3xl overflow-hidden glass-card border border-slate-700/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-[#070a12] p-8 sm:p-12 shadow-2xl relative">
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>ROI & Capital Efficiency Analyzer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Stop Renting SaaS. See How Much You Save by <span className="gradient-text-emerald">Owning Your Code</span>.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Off-the-shelf software charges per-seat, per-unit, and per-transaction fees that increase every year. Calculate your real 3-year savings by switching to a tailor-made, one-time custom system.
          </p>
        </div>

        {/* Interactive Sliders & Live Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-8 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800">
            {/* Slider 1: Monthly SaaS Spend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor={monthlyInputId} className="font-semibold text-slate-200">
                  Current Monthly SaaS Fees (Subscriptions & Add-ons)
                </label>
                <span className="font-mono font-bold text-lg text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                  ${monthlySpend.toLocaleString()}/mo
                </span>
              </div>
              <input
                id={monthlyInputId}
                type="range"
                min={100}
                max={2500}
                step={50}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>$100/mo</span>
                <span>$1,200/mo</span>
                <span>$2,500+/mo</span>
              </div>
            </div>

            {/* Slider 2: Team Members or Managed Units */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor={seatsInputId} className="font-semibold text-slate-200">
                  Team Seats, Portals or Managed Units
                </label>
                <span className="font-mono font-bold text-lg text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
                  {seatsOrUnits} Seats/Units
                </span>
              </div>
              <input
                id={seatsInputId}
                type="range"
                min={5}
                max={150}
                step={5}
                value={seatsOrUnits}
                onChange={(e) => setSeatsOrUnits(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>5 units/seats</span>
                <span>75 units/seats</span>
                <span>150+ units/seats</span>
              </div>
            </div>

            {/* Key Value Checklist */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited users & records — zero penalty for growing your business</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% intellectual property & database ownership transferred to you</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fixed-scope quote with guaranteed delivery timeline</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comparison Card & ROI Projection */}
          <div className="lg:col-span-6 space-y-6">
            {/* The Comparison Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SaaS Drain Box */}
              <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>3-Year SaaS Drain</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                  ${threeYearSaaS.toLocaleString()}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Lost forever in monthly subscription rent with 0% asset equity.
                </p>
              </div>

              {/* Custom Studio Advantage */}
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Your 3-Year Net Savings</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                  +${threeYearSavings.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  Capital saved after full system payback in approx.{" "}
                  <strong className="text-white font-bold">{breakEvenMonths} months</strong>.
                </p>
              </div>
            </div>

            {/* Timeline Breakdown Strip */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold text-white">Full Financial Payback Horizon:</span>
                <span className="font-mono text-emerald-400 font-bold">Month {breakEvenMonths}</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((breakEvenMonths / 36) * 100, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Month 0 (Launch)</span>
                <span className="text-emerald-300 font-semibold">100% Breakeven (Mo. {breakEvenMonths})</span>
                <span>Month 36 (Pure Profit & Equity)</span>
              </div>
            </div>

            {/* Call to Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
              >
                <span>Request Custom System Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fixed price quote • 12-hour response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
