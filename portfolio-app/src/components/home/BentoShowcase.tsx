"use client";

import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Code2,
  Lock,
  ArrowUpRight,
  ExternalLink,
  Layers,
  Sparkles,
  Clock,
  CheckCircle2,
  Activity,
  MessageSquare,
} from "lucide-react";

export function BentoShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Velocity Engineering Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="gradient-text-emerald">Speed, Scale & Sovereignty</span>.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            Every web application is hand-crafted with cutting-edge full-stack architecture — designed to outperform bloated agency builds and eliminate SaaS rental subscriptions forever.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0 group"
        >
          <span>Explore Architecture Specifications</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Bento Grid Mosaic */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Bento Tile 1: Large Flagship Systems Preview (Span 8) */}
        <div className="md:col-span-8 rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-6 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Full-Scale Production Systems</h3>
                <p className="text-xs text-slate-400">Tested, battle-hardened live operational web apps</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
              Live Sandbox Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* System 1 Pill */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">PropFlow Rental Engine</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">18-Day Build</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated Stripe rent collection, digital lease contracts, and tenant maintenance ticketing queue.
              </p>
            </div>

            {/* System 2 Pill */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">NexusStock Inventory</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">21-Day Build</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Web barcode scanning, multi-warehouse stock sync, and automated supplier purchase orders.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Standard delivery sprint: <strong>14–21 business days</strong></span>
            </div>
            <Link
              href="/demos"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>Test All Live Demos</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </Link>
          </div>
        </div>

        {/* Bento Tile 2: Sub-Second Speed & Lighthouse (Span 4) */}
        <div className="md:col-span-4 rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-5 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="text-4xl font-black text-cyan-400 font-mono flex items-baseline gap-2">
              <span>98/100</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans">
                Mobile Speed
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Zero Bloat Performance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sub-second API response times, Turbopack bundling, and lightweight database indexing.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-300 font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">P99 Latency:</span>
              <span className="text-emerald-400 font-bold">&lt; 25ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Architecture:</span>
              <span className="text-white">Next.js 16 + Postgres</span>
            </div>
          </div>
        </div>

        {/* Bento Tile 3: 100% Code Ownership (Span 4) */}
        <div className="md:col-span-4 rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">100% Code Ownership</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Full GitHub repository transfer, database schemas, and intellectual property handed over upon launch. No proprietary lock-in.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero Recurring Platform Fees</span>
          </div>
        </div>

        {/* Bento Tile 4: Direct Senior Engineer Access (Span 4) */}
        <div className="md:col-span-4 rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-4 relative group hover:border-purple-500/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Direct Engineer Channel</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Communicate directly with the developer building your app via WhatsApp & email. No salespeople, account managers, or junior handoffs.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-purple-300 font-semibold pt-1">
            <Activity className="w-3.5 h-3.5" />
            <span>12-Hour Proposal Response SLA</span>
          </div>
        </div>

        {/* Bento Tile 5: 30-Day Support Guarantee (Span 4) */}
        <div className="md:col-span-4 rounded-3xl glass-card border border-slate-700/80 p-6 sm:p-8 space-y-4 relative group hover:border-teal-500/40 transition-colors">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">30-Day Launch Guarantee</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every build includes 30 days of free bug-fixing and operational support following deployment to ensure smooth adoption.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-teal-300 font-semibold pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strict NDA Available on Request</span>
          </div>
        </div>
      </div>
    </section>
  );
}
