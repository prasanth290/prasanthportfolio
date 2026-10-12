import Link from "next/link";
import { CheckCircle2, Clock, ArrowRight, Sparkles, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Inquiry Received | Prasanth Dev Studio",
  description: "Thank you for reaching out. Your custom web application inquiry has been received.",
};

export default function ThankYouPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Top Success Card */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-amber-500/30 text-center space-y-6 bg-gradient-to-b from-amber-500/10 via-white to-slate-50 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#c5a059] flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10 animate-in zoom-in-75 duration-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#c5a059] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inquiry Received Successfully</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight">
            Thank You for Your Project Request!
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            I have received your specifications and am personally reviewing your requirements to provide an exact fixed-scope proposal and delivery timeline.
          </p>
        </div>

        {/* Commitment Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a059] bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
          <Clock className="w-4 h-4" />
          <span>Guaranteed Developer Reply Within 12 Hours</span>
        </div>
      </div>

      {/* 3-Step What Happens Next */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0a192f] tracking-tight">What Happens Next</h2>
          <p className="text-slate-600 text-xs sm:text-sm">Here is how we transition from idea to working software:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-3 bg-white/95">
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#c5a059] font-extrabold text-sm flex items-center justify-center">
              01
            </span>
            <h3 className="text-base font-bold text-[#0a192f]">Requirement Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              I review your operational workflows, spreadsheet bottlenecks, and feature list to determine the optimal database architecture and UI requirements.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-3 bg-white/95">
            <span className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 font-extrabold text-sm flex items-center justify-center">
              02
            </span>
            <h3 className="text-base font-bold text-[#0a192f]">Live Sandbox Match</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              I match your project against my existing working platforms (Rental, Inventory, Booking) so you can test-drive live code before writing a single line of custom software.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-200/90 shadow-md space-y-3 bg-white/95">
            <span className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#c5a059] font-extrabold text-sm flex items-center justify-center">
              03
            </span>
            <h3 className="text-base font-bold text-[#0a192f]">Fixed-Scope Proposal</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You receive a transparent proposal with fixed pricing, milestone deliverables, and a guaranteed 18–21 day launch schedule with zero surprise costs.
            </p>
          </div>
        </div>
      </div>

      {/* Action Strip: Explore Demos While You Wait */}
      <div className="glass-card p-8 rounded-3xl border border-slate-200/90 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 bg-white/95">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-[#0a192f]">Want to test live systems right now?</h4>
          <p className="text-xs text-slate-500">Launch my deployed property management or inventory platforms with pre-configured demo logins.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link
            href="/demos"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs shadow-lg shadow-[#c5a059]/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Test-Drive Live Demos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-[#c5a059] text-slate-700 hover:text-[#0a192f] font-semibold text-xs shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>View Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
