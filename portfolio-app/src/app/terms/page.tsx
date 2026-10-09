import Link from "next/link";
import { ShieldCheck, ArrowLeft, FileCheck, Scale, Lock } from "lucide-react";
import { getSafePageBySlug, getSafeSiteSettings, DEFAULT_TERMS_PAGE } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const page = await getSafePageBySlug("terms");
  return {
    title: page?.metaTitle || "Terms and Conditions | Prasanth Dev",
    description: page?.metaDescription || "Terms and Conditions for web development services provided by Prasanth – Web Developer.",
  };
}

export default async function TermsPage() {
  const page = (await getSafePageBySlug("terms")) || DEFAULT_TERMS_PAGE;
  const settings = await getSafeSiteSettings();

  const developerEmail = settings.contact_email || "prasanth.dev.studio@gmail.com";
  const developerPhone = settings.contact_phone || settings.whatsapp_number || "+91 98765 43210";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Client Agreement & Legal Terms</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {page.title}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-mono">
          Last updated: October 8, 2026 | Effective Date: Immediately
        </p>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">100% Code Ownership</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Full ownership of final custom code and assets transferred to you upon complete project payment.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">30-Day Work Warranty</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Complimentary bug-fix guarantee included on all custom builds delivered for your business.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <Lock className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Strict Confidentiality</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your proprietary business information, credentials, and data are strictly safeguarded under NDA terms.
          </p>
        </div>
      </div>

      {/* Main Content Render */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
          {page.content}
        </div>

        {/* Contact Footer Box */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
            <div>Studio Developer: Prasanth – Web Developer</div>
            <div>Official Email: {developerEmail}</div>
            <div>Direct Phone: {developerPhone}</div>
            <div>Jurisdiction: Chennai, Tamil Nadu, India</div>
            <div>Website: https://prasanthportfolio-five.vercel.app</div>
          </div>
        </div>
      </div>
    </div>
  );
}
