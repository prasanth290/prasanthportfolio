import { getSafeSiteSettings } from "@/lib/db";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Zap,
  Code2,
  Lock,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Request a Fixed-Price Quote | Custom Web App Development",
  description:
    "Get a fixed-price proposal for custom business software, client portals, and bespoke web apps. Fast 2-3 week delivery, direct senior engineer access, and 100% code ownership.",
};

export default async function ContactPage() {
  const siteSettings = await getSafeSiteSettings();

  const whatsappNumber = (siteSettings.whatsapp_number || siteSettings.contact_phone || "+91 98765 43210").replace(/[^0-9+]/g, "");
  const cleanPhone = (siteSettings.contact_phone || siteSettings.whatsapp_number || "+91 98765 43210").replace(/[^0-9+]/g, "");
  const displayPhone = siteSettings.contact_phone || siteSettings.whatsapp_number || "+91 98765 43210";
  const displayEmail = siteSettings.contact_email || "prasanth.dev.studio@gmail.com";
  const developerName = siteSettings.developer_name || "Prasanth";
  const whatsappGreeting = encodeURIComponent(
    siteSettings.whatsapp_message || "Hi Prasanth, I saw your portfolio and would like to discuss building a custom web system."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${whatsappGreeting}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Top Google Ads High-Trust Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl glass-card border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-slate-900/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
              <span>Direct Client Intake — Fast-Track Proposal</span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                Guaranteed Response Under 12h
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Work directly with Senior Engineer {developerName} — zero middlemen or agency overhead.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>100% Code Ownership Guarantee</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fixed-Price Quotes • Rapid 2–3 Week Delivery</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Build Your Custom Business Software With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Zero Monthly SaaS Fees</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Replace rigid subscriptions and slow manual spreadsheets with a high-performance, mobile-optimized web application engineered precisely for your operational workflow.
        </p>

        {/* Quick Highlights Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Fixed Quote Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Source Code Ownership</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>30-Day Free Post-Launch Support</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>Strict NDA Available</span>
          </div>
        </div>
      </div>

      {/* Main Conversion Grid: Form + Live Contact Channels */}
      <div id="quote-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-1 rounded-3xl bg-gradient-to-b from-emerald-500/20 to-transparent">
            <ContactForm />
          </div>
          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Your contact info is 100% private. We never share your data or spam you.</span>
          </p>
        </div>

        {/* Right Column: Direct Channels & Guarantee Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Direct Actions Box */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Direct Contact Channels</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Prefer immediate messaging or a call? Connect directly right now:
              </p>
            </div>

            <div className="space-y-3">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                      Chat on WhatsApp
                    </div>
                    <div className="font-bold text-white text-sm">
                      {displayPhone}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${cleanPhone}`}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Direct Phone
                    </div>
                    <div className="font-bold text-white text-sm">{displayPhone}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct Email */}
              <a
                href={`mailto:${displayEmail}?subject=Custom%20Web%20App%20Inquiry`}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                      Direct Email
                    </div>
                    <div className="font-bold text-white text-sm truncate max-w-[200px]">
                      {displayEmail}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* What Happens Next Card */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 bg-gradient-to-br from-slate-900 to-emerald-950/30">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>What Happens After You Submit?</span>
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  1
                </span>
                <span>
                  <strong className="text-white">Requirements Review:</strong> I personally analyze your workflow and project scope within 12 hours.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  2
                </span>
                <span>
                  <strong className="text-white">Fixed-Price Proposal:</strong> You receive an itemized proposal with clear milestone pricing and delivery timeline.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                  3
                </span>
                <span>
                  <strong className="text-white">Live Discovery Call:</strong> If everything aligns, we jump on a 20-minute video call to finalize your roadmap.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Value Comparison: Custom Software vs Off-The-Shelf SaaS */}
      <div className="space-y-8 pt-8 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Why Custom Software Always Outperforms Cookie-Cutter SaaS
          </h2>
          <p className="text-slate-400 text-sm">
            Stop forcing your business into software designed for someone else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">Zero Monthly SaaS Rent</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Standard commercial software charges per-seat, per-unit, or per-transaction fees that increase every year. With custom software, you pay once and own the intellectual property 100%.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">Tailored to Your Exact Logic</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No unnecessary features cluttering your screen, and no missing fields that require awkward spreadsheet workarounds. Built exclusively around how your team actually operates.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-lg">Direct Senior Engineer Speed</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Skip slow agencies with junior account managers and 6-month backlogs. You communicate directly with a seasoned full-stack engineer who turns requests into production code in days.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Step Rapid Delivery Framework */}
      <div className="space-y-8 pt-8 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <span>Guaranteed Timeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            From Idea to Production in 4 Structured Steps
          </h2>
          <p className="text-slate-400 text-sm">
            Predictable delivery with transparent milestones and guaranteed launch dates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-3xl font-black text-emerald-500/40">01</div>
            <h3 className="font-bold text-white text-base">Scope & Strategy</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We define core modules, data schemas, user permissions, and user flows with a fixed price quote.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-3xl font-black text-cyan-500/40">02</div>
            <h3 className="font-bold text-white text-base">Architecture & UI</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Interactive design prototypes and database structure prepared and approved before writing production code.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-3xl font-black text-purple-500/40">03</div>
            <h3 className="font-bold text-white text-base">Rapid Full-Stack Build</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Next.js, TypeScript, PostgreSQL database, security authentication, and API integrations engineered in 2 weeks.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-3xl font-black text-emerald-500/40">04</div>
            <h3 className="font-bold text-white text-base">Launch & 30-Day Support</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Zero-downtime deployment, code handover, and 30 days of included bug fixes and operational support.
            </p>
          </div>
        </div>
      </div>

      {/* Google Ads High-Intent FAQs */}
      <div className="space-y-8 pt-8 border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">
            Everything you need to know before kicking off your custom software project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-xs">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">
              How much does a typical custom web app project cost?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Most starter systems and business MVPs range between $1,000 to $5,000 depending on complexity, user roles, and integrations. Every quote is 100% fixed-price with clear milestone deliverables — you will never be surprised by open-ended hourly billing.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">
              How quickly can my project be completed?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Standard custom web apps and internal portals are typically completed and launched within 2 to 3 weeks. Because you work directly with me without agency layers, decision-making and execution happen at high speed.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">
              Do I own the source code and database?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Yes, 100%. Upon completion and final payment, the complete GitHub repository, database schemas, and intellectual property are fully transferred to you. There is zero vendor lock-in.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-white text-sm">
              What happens after the software launches?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Every project comes with 30 days of complimentary post-launch support and bug fixes to ensure your software runs smoothly. Optional monthly maintenance and feature expansion plans are also available.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2 md:col-span-2">
            <h3 className="font-bold text-white text-sm">
              Can we sign a Non-Disclosure Agreement (NDA) first?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Absolutely. I routinely sign standard mutual NDAs before discussing proprietary business processes, commercial formulas, or intellectual property.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/30 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto">
          Ready to Turn Your Idea or Manual Process Into High-Performance Software?
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Submit your requirements above or message directly on WhatsApp to get a fixed-price proposal within 12 hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#quote-form"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-emerald-500/20"
          >
            Request Fixed-Price Proposal
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-semibold text-sm hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
