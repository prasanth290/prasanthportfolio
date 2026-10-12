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
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-slate-700 hover:text-[#0a192f] text-xs font-semibold transition-all shadow-sm"
      >
        <FileText className="w-4 h-4 text-amber-700" />
        <span>View Capabilities Deck / CV</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in-50">
          <div className="relative w-full max-w-lg glass-card p-8 rounded-3xl border border-slate-200 space-y-6 text-slate-800 shadow-2xl bg-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#0a192f] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0a192f]">Developer Capabilities & CV</h3>
                <p className="text-xs text-slate-500">Software Engineering Track Record & System Specs</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Next.js, React 19, TypeScript & PostgreSQL Tech Stack</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Rental, Inventory & Booking Systems Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
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
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-xs hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Profile</span>
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="py-3 px-6 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-[#0a192f] text-xs font-semibold"
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
