import Link from "next/link";
import { ArrowRight, Home, Layers, Sparkles, Mail, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-gradient-mask pointer-events-none opacity-50" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide shadow-sm">
          <FileQuestion className="w-4 h-4 text-amber-400" />
          <span>404 Error • Resource Missing</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Page Not Found
          </h2>
          <p className="text-stone-400 text-base max-w-md mx-auto leading-relaxed">
            The page or project case study you're looking for doesn't exist, was renamed, or has been moved.
          </p>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="glass-card p-6 rounded-2xl border border-emerald-900/40 bg-[#0a1710]/70 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Recommended Destinations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <Link
              href="/"
              className="p-3.5 rounded-xl bg-[#060b08] border border-emerald-950/70 hover:border-amber-400/40 text-stone-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                <Home className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Home Page</div>
                <div className="text-[10px] text-stone-400">Main studio overview</div>
              </div>
            </Link>

            <Link
              href="/projects"
              className="p-3.5 rounded-xl bg-[#060b08] border border-emerald-950/70 hover:border-amber-400/40 text-stone-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Portfolio</div>
                <div className="text-[10px] text-stone-400">View real software</div>
              </div>
            </Link>

            <Link
              href="/contact"
              className="p-3.5 rounded-xl bg-[#060b08] border border-emerald-950/70 hover:border-amber-400/40 text-stone-200 hover:text-white transition-all flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:bg-amber-400 group-hover:text-stone-950 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold">Contact Studio</div>
                <div className="text-[10px] text-stone-400">Get custom proposal</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Return Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 border border-amber-400/50 text-amber-100 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-950/50"
          >
            <span>Return to Studio Homepage</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
