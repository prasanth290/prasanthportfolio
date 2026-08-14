"use client";

import { useState } from "react";
import { Download, FileText, X, CheckCircle2, ShieldCheck } from "lucide-react";

export function ResumeDownloadModal() {
  const [isOpen, setIsOpen] = useState(false);

  const pdfUrl = "/Prasanth_Developer_Capabilities.pdf";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-sm"
      >
        <FileText className="w-4 h-4 text-emerald-400" />
        <span>View Capabilities Deck / CV</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in-50">
          <div className="relative w-full max-w-lg glass-card p-8 rounded-3xl border border-slate-800 space-y-6 text-slate-100 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Developer Capabilities & CV</h3>
                <p className="text-xs text-slate-400">Software Engineering Track Record & System Specs</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Next.js, React 19, TypeScript & PostgreSQL Tech Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Rental, Inventory & Booking Systems Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Direct Developer Access — No Middleman Agency Fees</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                download="Prasanth_Software_Developer_Profile.pdf"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Profile</span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="py-3 px-6 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
