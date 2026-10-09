import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, FileText, Mail } from "lucide-react";
import { getSafePageBySlug, getSafeSiteSettings, DEFAULT_PRIVACY_POLICY_PAGE } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const page = await getSafePageBySlug("privacy-policy");
  return {
    title: page?.metaTitle || "Privacy Policy | Prasanth Dev",
    description: page?.metaDescription || "Privacy Policy for Prasanth – Web Developer.",
  };
}

export default async function PrivacyPolicyPage() {
  const page = (await getSafePageBySlug("privacy-policy")) || DEFAULT_PRIVACY_POLICY_PAGE;
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
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Data Protection</span>
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
          <Lock className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Strict Confidentiality</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your project details, business ideas, and contact information are protected with high-grade security standards.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <EyeOff className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Zero Data Selling</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            I do not sell, rent, or monetize your personal information or contact details to any third-party brokers.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <FileText className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">DPDP Act 2023 Compliant</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Respecting user privacy rights under India's Digital Personal Data Protection Act, 2023.
          </p>
        </div>
      </div>

      {/* Main Content Render */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
          {page.content}
        </div>

        {/* Quick Contact Footer Box */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
            <div>Studio Developer: Prasanth – Web Developer</div>
            <div>Official Email: {developerEmail}</div>
            <div>Direct Phone: {developerPhone}</div>
            <div>Location: Chennai, Tamil Nadu, India</div>
            <div>Website: https://prasanthportfolio-five.vercel.app</div>
          </div>
        </div>
      </div>
    </div>
  );
}

