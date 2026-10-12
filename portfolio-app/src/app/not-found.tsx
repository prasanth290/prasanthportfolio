import Link from "next/link";
import { ArrowRight, Home, Layers, Sparkles, Mail, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-gradient-mask pointer-events-none opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
          <FileQuestion className="w-4 h-4" />
          <span>404 Error • Resource Missing</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto leading-relaxed">
            The page or project case study you're looking for doesn't exist, was renamed, or has been moved.
          </p>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended Destinations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href="/"
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Home Page</div>
                <div className="text-[10px] text-slate-400">Main studio overview</div>
              </div>
            </Link>

            <Link
              href="/projects"
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Portfolio</div>
                <div className="text-[10px] text-slate-400">View real software</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 text-slate-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Contact Studio</div>
                <div className="text-[10px] text-slate-400">Get custom proposal</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            <span>Return to Studio Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
