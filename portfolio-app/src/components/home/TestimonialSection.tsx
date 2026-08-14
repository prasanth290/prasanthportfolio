import { prisma } from "@/lib/db";
import { Star, MessageSquareQuote, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export async function TestimonialSection() {
  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.warn("Failed to fetch published testimonials, using trust-lite showcase:", e);
  }

  return (
    <section className="py-20 bg-slate-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Verified Client Proof & Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Delivered Custom Software for Real Operations
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Direct developer collaboration, 100% full source code ownership, and battle-tested production deployments.
          </p>
        </div>

        {testimonials.length > 0 ? (
          /* Real Client Testimonials Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-bold text-slate-950 text-sm">
                    {t.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.clientName}</div>
                    <div className="text-xs text-emerald-400">{t.clientRole} • {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback Outcome-Based Proof Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                    T
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Twosomesty</h3>
                    <span className="text-xs text-emerald-400 font-medium">E-Commerce & Orders Engine</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Delivered & Active
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "Full-stack custom platform engineered for client e-commerce operations, order tracking, and custom workflow automation with real-time database management."
              </p>
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Sprint: 18 Days
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  100% Code Ownership
                </span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    S
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Subash Build</h3>
                    <span className="text-xs text-emerald-400 font-medium">Construction Operations Platform</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Delivered & Active
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "Tailored business management tool for site project estimates, contractor material allocation, and automated client status reporting."
              </p>
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Sprint: 21 Days
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  Site Management Suite
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-xs text-slate-400 italic">
            * Ask me directly during consultation — happy to connect you with past client references.
          </p>
        </div>
      </div>
    </section>
  );
}
