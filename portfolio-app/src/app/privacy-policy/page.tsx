import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, EyeOff, FileText, Mail, Info } from "lucide-react";
import { getSafeSiteSettings } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Privacy Policy | Prasanth Dev Studio",
  description:
    "Privacy Policy for Prasanth Dev Studio. Learn how client project inquiries, contact details, and proprietary software ideas are safeguarded.",
};

export default async function PrivacyPolicyPage() {
  const settings = await getSafeSiteSettings();
  const lastUpdated = "September 2026";
  const developerName = settings.developer_name || "Prasanth";
  const developerEmail = settings.contact_email || "prasanth.dev.studio@gmail.com";
  const developerPhone = settings.contact_phone || settings.whatsapp_number || "";
  const customNotes = settings.privacy_policy_custom_notes || "";

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
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm">
          Last Updated: {lastUpdated} | Effective Date: Immediately
        </p>
      </div>

      {/* Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <Lock className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">Strict Confidentiality</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your business workflows, proprietary system ideas, and contact information are protected under standard NDA principles.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <EyeOff className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Zero Data Selling</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            I do not sell, rent, monetize, or share your contact info with third-party marketers or brokers. Ever.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <FileText className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Code & Data Ownership</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            All software engineered for your business belongs 100% to you, including databases, schemas, and credentials.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-8 text-sm text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Information Collected</h2>
          <p>
            When you request a quote, schedule a consultation, or contact Prasanth Dev Studio, you may provide:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400 text-xs sm:text-sm">
            <li><strong className="text-slate-200">Contact Information:</strong> Your full name, email address, and optional phone number.</li>
            <li><strong className="text-slate-200">Project Requirements:</strong> System category (Rental, Inventory, Booking, Custom App), estimated budget, target timeline, and feature specifications.</li>
            <li><strong className="text-slate-200">Attribution Analytics:</strong> Referral information (e.g. Google Ads click identifier or campaign source) to understand how you discovered the studio.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. How Your Information Is Used</h2>
          <p>
            Your information is used exclusively to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400 text-xs sm:text-sm">
            <li>Evaluate your software specifications and generate fixed-scope technical proposals.</li>
            <li>Schedule discovery calls or demonstrate relevant live system sandboxes.</li>
            <li>Communicate project milestones, code handoff access, and post-launch maintenance.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Advertising & Analytics Cookies</h2>
          <p>
            This website may use privacy-compliant measurement tags (such as Google Ads Conversion Tracking) to evaluate the performance of paid search campaigns and improve landing page relevance. These cookies do not collect personal banking or sensitive identification data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Data Security & Storage</h2>
          <p>
            Inquiries submitted through this site are transmitted over encrypted TLS/SSL connections and stored in secure, password-protected database environments. Access is restricted solely to the principal software engineer.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Direct Developer Contact</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to have your submitted project details deleted, please contact:
          </p>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
            <div>Developer / Studio: {developerName}</div>
            <div>Email: {developerEmail}</div>
            {developerPhone && <div>Phone / WhatsApp: {developerPhone}</div>}
            <div>Website: prasanthportfolio-five.vercel.app</div>
          </div>

          {customNotes && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-white uppercase tracking-wider text-[10px]">Additional Policy Provisions</div>
              <p className="whitespace-pre-line leading-relaxed">{customNotes}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
