"use client";

import { useState } from "react";
import {
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Server,
  Zap,
  ShieldCheck,
  Database,
  Cpu,
} from "lucide-react";

type CommandKey = "stack" | "latency" | "billing" | "architecture";

interface CommandOption {
  key: CommandKey;
  label: string;
  command: string;
  description: string;
}

const COMMANDS: CommandOption[] = [
  {
    key: "stack",
    label: "Inspect Full Stack",
    command: "studio inspect --production-stack",
    description: "Core technologies & runtime environment",
  },
  {
    key: "latency",
    label: "Database Latency Test",
    command: "cluster ping --db=postgresql --nodes=3",
    description: "Multi-region query response times",
  },
  {
    key: "billing",
    label: "Simulate Auto-Billing",
    command: "stripe webhook simulate --event=invoice.paid",
    description: "Automated recurring tenant ledger update",
  },
  {
    key: "architecture",
    label: "View Architecture",
    command: "deploy topology --env=production",
    description: "Full-stack decoupled infrastructure",
  },
];

const TERMINAL_OUTPUTS: Record<CommandKey, string[]> = {
  stack: [
    "[INIT] Fetching runtime architecture...",
    "✔ Client Framework: Next.js 16.3 (Turbopack Engine, App Router)",
    "✔ Frontend Core: React 19 + TypeScript 5.6 (Strict Mode)",
    "✔ Styling System: Vanilla CSS & Tailwind CSS v4 (Glassmorphism design tokens)",
    "✔ Database ORM: Prisma Client v5.22 + PostgreSQL Connection Pooling",
    "✔ Cache & Queues: Redis Key-Value Store + Upstash Rate-Limiting",
    "✔ Payments: Stripe API (Webhooks, Invoicing, Split Payouts)",
    "✔ Deployment: Edge CDN, Zero-Cold-Start Serverless Micro-Workers",
    "[STATUS] 100% Full-Stack Production Readiness Verified.",
  ],
  latency: [
    "[PING] Dispatching synthetic read/write queries to database cluster...",
    "→ Node 1 (US-East / Virginia):       14ms (Read)  | 28ms (Write)",
    "→ Node 2 (EU-Central / Frankfurt):    18ms (Read)  | 32ms (Write)",
    "→ Node 3 (AP-South / Mumbai):        8ms (Read)   | 16ms (Write)",
    "✔ Connection Pool Utilization:       12% / 100 connections available",
    "✔ P99 Global Query Latency:         < 25ms (Sub-second threshold)",
    "[RESULT] Database cluster operating at optimal sub-second speed.",
  ],
  billing: [
    "[EVENT] Inbound Webhook: Stripe [invoice.payment_succeeded]",
    "→ Payload Verification:             HMAC-SHA256 Signature Valid",
    "→ Tenant Account:                   ID: ten_908234 (Residential Unit #4B)",
    "→ Amount Captured:                  $1,850.00 USD (Auto-Stripe Transfer)",
    "→ Database Transaction:             Ledger entry #L-8910 logged in 6ms",
    "→ Document Automation:              PDF Receipt generated & queued for dispatch",
    "→ SMS & Email Dispatch:             Delivered via Twilio / SendGrid in 420ms",
    "[SUCCESS] 100% Hands-off recurring tenant rent processing completed.",
  ],
  architecture: [
    "┌─────────────────────────────────────────────────────────────┐",
    "│             HIGH-PERFORMANCE SYSTEM ARCHITECTURE            │",
    "└─────────────────────────────────────────────────────────────┘",
    "  [Client / Mobile Web] ──(HTTPS/WSS)──> [Next.js 16 Edge Gateway]",
    "                                                  │",
    "          ┌───────────────────────────────────────┴───────────────────────────────────────┐",
    "          ▼                                       ▼                                       ▼",
    "   [Prisma ORM Layer]                    [Stripe & Auth Handlers]                 [Redis Cache Layer]",
    "          │                                       │                                       │",
    "          ▼                                       ▼                                       ▼",
    "   [PostgreSQL DB]                       [Background Workers]                     [Sub-Second Cache]",
    "   (Indexed Schemas)                     (PDFs, Invoices, SMS)                    (Session / Stock)",
    "",
    "✔ Guaranteed 100% Client Code & Database Ownership — Zero Third-Party SaaS Lock-In.",
  ],
};

export function InteractiveTerminal() {
  const [activeCommand, setActiveCommand] = useState<CommandKey>("stack");
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRunCommand = (key: CommandKey) => {
    setActiveCommand(key);
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 250);
  };

  const output = TERMINAL_OUTPUTS[activeCommand];
  const activeObj = COMMANDS.find((c) => c.key === activeCommand)!;

  return (
    <div className="rounded-3xl overflow-hidden glass-card border border-slate-700/80 bg-slate-950/95 shadow-2xl space-y-0">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <div className="flex items-center gap-2 ml-2 text-xs font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>prasanth@studio-core: ~ (production-cluster)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
            Cluster Online
          </span>
        </div>
      </div>

      {/* Interactive Command Selector Pills */}
      <div className="p-3 sm:p-4 bg-slate-900/50 border-b border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-1 hidden md:inline">
          Click to Execute:
        </span>
        {COMMANDS.map((cmd) => {
          const isActive = cmd.key === activeCommand;
          return (
            <button
              key={cmd.key}
              onClick={() => handleRunCommand(cmd.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/10 font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
              }`}
            >
              <Play className={`w-3 h-3 ${isActive ? "text-emerald-400 fill-emerald-400" : "text-slate-500"}`} />
              <span>{cmd.label}</span>
            </button>
          );
        })}
      </div>

      {/* Terminal Screen Canvas */}
      <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed min-h-[280px] sm:min-h-[320px] bg-slate-950/90 overflow-x-auto text-slate-300">
        {/* Active Command Line */}
        <div className="flex items-center gap-2 text-emerald-400 pb-3 mb-3 border-b border-slate-800/60">
          <span className="text-cyan-400 font-bold">visitor@cloud:~$</span>
          <span className="text-white font-semibold">{activeObj.command}</span>
          <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1 inline-block" />
        </div>

        {/* Output lines */}
        <div className="space-y-1.5">
          {output.map((line, i) => {
            const isSuccess = line.startsWith("✔") || line.includes("100%");
            const isWarning = line.includes("P99") || line.includes("Latency");
            const isHeader = line.startsWith("┌") || line.startsWith("│") || line.startsWith("└");

            return (
              <div
                key={i}
                className={`${
                  isSuccess
                    ? "text-emerald-400 font-semibold"
                    : isWarning
                    ? "text-cyan-300 font-semibold"
                    : isHeader
                    ? "text-slate-400"
                    : "text-slate-300"
                }`}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-5 py-2.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>V8 Engine • Turbo Build • 0.3s Execution</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Production Environment</span>
        </div>
      </div>
    </div>
  );
}
