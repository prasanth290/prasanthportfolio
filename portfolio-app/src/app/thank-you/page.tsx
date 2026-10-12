import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Calendar, MessageSquare, ArrowRight, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Inquiry Received | Prasanth Dev Studio",
  description: "Thank you for reaching out. Your custom web application inquiry has been received.",
};

export default function ThankYouPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Top Success Card */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-amber-400/40 text-center space-y-6 bg-gradient-to-b from-emerald-950/60 via-[#0a1710] to-[#060b08] shadow-2xl shadow-emerald-950/50">
        <div className="w-20 h-20 rounded-full bg-emerald-950 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/40 animate-in zoom-in-75 duration-500">
          <CheckCircle2 className="w-10 h-10 text-amber-400" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Inquiry Received Successfully</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Thank You for Your Project Request!
          </h1>
          <p className="text-stone-300 text-base leading-relaxed">
            I have received your specifications and am personally reviewing your requirements to provide an exact fixed-scope proposal and delivery timeline.
          </p>
        </div>

        {/* Commitment Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-emerald-950/80 px-4 py-2 rounded-full border border-amber-400/30">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Guaranteed Developer Reply Within 12 Hours</span>
        </div>
      </div>

      {/* 3-Step What Happens Next */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight">What Happens Next</h2>
          <p className="text-stone-400 text-xs sm:text-sm">Here is how we transition from idea to working software:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-amber-400/30 text-amber-300 font-extrabold text-sm flex items-center justify-center">
              01
            </span>
            <h3 className="text-base font-bold text-white">Requirement Analysis</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              I review your operational workflows, spreadsheet bottlenecks, and feature list to determine the optimal database architecture and UI requirements.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-amber-400/30 text-amber-300 font-extrabold text-sm flex items-center justify-center">
              02
            </span>
            <h3 className="text-base font-bold text-white">Live Sandbox Match</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              I match your project against my existing working platforms (Rental, Inventory, Booking) so you can test-drive live code before writing a single line of custom software.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-950 border border-amber-400/30 text-amber-300 font-extrabold text-sm flex items-center justify-center">
              03
            </span>
            <h3 className="text-base font-bold text-white">Fixed-Scope Proposal</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              You receive a transparent proposal with fixed pricing, milestone deliverables, and a guaranteed 18–21 day launch schedule with zero surprise costs.
            </p>
          </div>
        </div>
      </div>

      {/* Action Strip: Explore Demos While You Wait */}
      <div className="glass-card p-8 rounded-3xl border border-emerald-900/40 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0a1710]/80">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-base font-bold text-white">Want to test live systems right now?</h4>
          <p className="text-xs text-stone-400">Launch my deployed property management or inventory platforms with pre-configured demo logins.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <Link
            href="/demos"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 border border-amber-400/50 text-amber-100 font-bold text-xs shadow-lg shadow-emerald-950/50 hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Test-Drive Live Demos</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
          </Link>
          <Link
            href="/projects"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#060b08] hover:bg-[#07130c] text-amber-200 border border-emerald-900/60 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>View Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
