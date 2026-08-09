import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, Phone, MessageSquare, ShieldCheck, Clock, Calendar } from "lucide-react";

export const metadata = {
  title: "Request a Free Quote | Prasanth Dev",
  description:
    "Contact Prasanth for custom business software development, Rental Management Systems, and Inventory platforms.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Direct Developer Contact</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let’s Build Your Custom Business System
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Tell me about your business software goals or manual bottlenecks. I’ll review your request and send a fixed-scope proposal with timeline options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Column: Direct Info & Booking Placeholder */}
        <div className="lg:col-span-5 space-y-8">
          {/* Direct channels */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Direct Channels</h3>

            <div className="space-y-4 text-xs">
              <a
                href="mailto:prasanth@devstudio.com"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Email Address</div>
                  <div className="font-bold text-white text-sm">prasanth@devstudio.com</div>
                </div>
              </a>

              <a
                href="tel:+15550192831"
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Direct Phone / WhatsApp</div>
                  <div className="font-bold text-white text-sm">+1 (555) 019-2831</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Schedule Booking Box */}
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-4 bg-gradient-to-br from-slate-900 to-emerald-950/40">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>

            <div>
              <h4 className="font-bold text-white text-lg">Prefer A 1-on-1 Discovery Call?</h4>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                Book a 15-minute video consultation to walk through your system requirements live.
              </p>
            </div>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full text-center py-3 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
            >
              Book 15-Min Zoom Call
            </a>
          </div>

          {/* Response SLA */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
            <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Average initial proposal response time: <strong className="text-white">Under 12 Hours</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
