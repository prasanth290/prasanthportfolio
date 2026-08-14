"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I get 100% full ownership of the source code?",
    answer:
      "Yes, absolutely. Once the project is completed and handed over, you receive 100% unencumbered IP rights to all custom source code, database schemas, and assets. Zero vendor lock-in or recurring developer licensing fees.",
  },
  {
    question: "How do we handle project payments and milestones?",
    answer:
      "I work on structured milestone payments (typically 30% upfront deposit to initiate architecture, 40% upon staging build presentation, and 30% upon final production deployment and code transfer).",
  },
  {
    question: "What happens after launch? Do you provide maintenance?",
    answer:
      "Every project includes 30 days of complimentary post-launch bug fixing and monitoring. After 30 days, optional retainer plans are available for ongoing feature development, server optimization, and security updates.",
  },
  {
    question: "Can you build systems that integrate with my existing tools?",
    answer:
      "Yes. I specialize in REST API and Webhook integrations — connecting custom web apps with Payment Gateways (Stripe, Razorpay, PayPal), Accounting Software (QuickBooks, Tally), CRM databases, and SMS/WhatsApp alert channels.",
  },
  {
    question: "How long does a typical custom software MVP take to build?",
    answer:
      "Most custom rental, inventory, or booking MVPs ship to production within 2 to 4 weeks. Timeline depends on scope, custom workflow complexity, and third-party API dependencies.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need to Know Before Starting
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Clear, transparent answers about source code ownership, timeline, payment milestones, and post-launch support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-900/40 transition-colors"
                >
                  <span className="font-bold text-white text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-400 border-emerald-500/40" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
