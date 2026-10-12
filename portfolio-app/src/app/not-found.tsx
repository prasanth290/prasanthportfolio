import Link from "next/link";
import { ArrowRight, Home, Layers, Mail, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background Grid & Subtle Glow */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-gradient-mask pointer-events-none opacity-40" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#c5a059] text-xs font-semibold tracking-wide">
          <FileQuestion className="w-4 h-4" />
          <span>404 Error • Resource Missing</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0a192f] via-[#c5a059] to-[#d4af37] tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a192f]">
            Page Not Found
          </h2>
          <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
            The page or project case study you're looking for doesn't exist, was renamed, or has been moved.
          </p>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200/90 shadow-lg space-y-4 bg-white/95">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recommended Destinations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href="/"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#c5a059] text-slate-800 hover:text-[#0a192f] transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-[#c5a059] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-slate-950 transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Home Page</div>
                <div className="text-[10px] text-slate-500">Main studio overview</div>
              </div>
            </Link>

            <Link
              href="/projects"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#c5a059] text-slate-800 hover:text-[#0a192f] transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-slate-950 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Portfolio</div>
                <div className="text-[10px] text-slate-500">View real software</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#c5a059] text-slate-800 hover:text-[#0a192f] transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#c5a059] flex items-center justify-center group-hover:bg-[#c5a059] group-hover:text-slate-950 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Contact Studio</div>
                <div className="text-[10px] text-slate-500">Get custom proposal</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-[#c5a059]/20"
          >
            <span>Return to Studio Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
