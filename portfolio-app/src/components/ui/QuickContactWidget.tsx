"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Phone, X, MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";

export function QuickContactWidget({
  whatsappNumber = "+91 98765 43210",
  contactPhone = "+91 98765 43210",
  customMessage = "Hi Prasanth, I saw your portfolio and would like to discuss building a custom software/web system.",
}: {
  whatsappNumber?: string;
  contactPhone?: string;
  customMessage?: string;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [activeWhatsapp, setActiveWhatsapp] = useState(whatsappNumber);
  const [activePhone, setActivePhone] = useState(contactPhone);
  const [activeMessage, setActiveMessage] = useState(customMessage);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.settings) {
          if (data.settings.whatsapp_number) setActiveWhatsapp(data.settings.whatsapp_number);
          if (data.settings.contact_phone) setActivePhone(data.settings.contact_phone);
          if (data.settings.whatsapp_message) setActiveMessage(data.settings.whatsapp_message);
        }
      })
      .catch(() => {});
  }, []);

  // Auto-hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const cleanWhatsapp = (activeWhatsapp || "+91 98765 43210").replace(/[^0-9]/g, "");
  const cleanPhone = (activePhone || activeWhatsapp || "+91 98765 43210").replace(/[^0-9+]/g, "");
  const encodedMessage = encodeURIComponent(
    activeMessage || "Hi Prasanth, I saw your portfolio and would like to discuss building a custom software/web system."
  );
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Popup Menu */}
      {isOpen && (
        <div className="mb-3 w-80 glass-card p-5 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 space-y-4 animate-in slide-in-from-bottom-5 fade-in duration-200 bg-slate-950/95 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Direct Developer Access</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Have a custom business software project or need an instant quote? Reach out directly:
          </p>

          {/* Quick Action Channels */}
          <div className="space-y-2">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp
                  </div>
                  <div className="text-[10px] text-emerald-400/80 font-mono">Instant Mobile Reply</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${cleanPhone}`}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold shrink-0 border border-slate-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Direct Phone Call
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{activePhone || activeWhatsapp}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Submit Quote Request */}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center font-bold shrink-0 border border-slate-700">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Detailed Proposal Form
                  </div>
                  <div className="text-[10px] text-slate-400">Fixed Cost & 18-Day SLA</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-3 rounded-full flex items-center gap-2.5 shadow-2xl transition-all duration-300 group ${
          isOpen
            ? "bg-slate-900 text-white border border-slate-700 hover:bg-slate-800"
            : "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold hover:shadow-emerald-500/25 hover:scale-105"
        }`}
        aria-label="Contact Prasanth directly"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-current" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
          )}
        </div>
        <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
          {isOpen ? "Close Quick Menu" : "Chat on WhatsApp / Call"}
        </span>
        <span className="text-xs font-extrabold tracking-wide sm:hidden">
          {isOpen ? "Close" : "Chat"}
        </span>
      </button>
    </div>
  );
}
