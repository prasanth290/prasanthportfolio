import Link from "next/link";
import Image from "next/image";
import { getSafeProjects } from "@/lib/db";
import {
  Building2,
  Boxes,
  Code2,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Zap,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "Delivered Products & Services | Prasanth Dev",
  description:
    "Explore completed custom software products ready for live demo, adaptation, or custom web app builds.",
};

export const revalidate = 300;

export default async function ServicesPage() {
  const adminProjects = await getSafeProjects();

  const customServices = [
    {
      icon: Code2,
      title: "Custom Business Web Apps & Portals",
      category: "Bespoke System Build",
      description:
        "Tailor-made web applications engineered around your exact operational workflows — client portals, CRM dashboards, appointment booking engines, and internal tools.",
      proofNotes: [
        "Custom database architecture (PostgreSQL / SQLite)",
        "Role-based access security & payment integrations",
        "Sub-second page load performance on Next.js 16",
        "100% full source code ownership with zero vendor lock-in",
      ],
    },
    {
      icon: Wrench,
      title: "SLA Maintenance, Upgrades & Support",
      category: "Ongoing Care",
      description:
        "Dedicated monthly technical support, server monitoring, database backups, security patches, and ongoing feature enhancements for your custom software.",
      proofNotes: [
        "Automated daily encrypted database backups",
        "Server scaling & uptime monitoring",
        "Monthly feature iteration hours included",
        "Direct WhatsApp & email developer access",
      ],
    },
  ];

  const faqs = [
    {
      q: "Can I test a real working system before placing an order?",
      a: "Yes! Visit the Live Demos page or inspect any published project case study to launch working builds immediately.",
    },
    {
      q: "Can you customize an existing system for my business?",
      a: "Absolutely. I can take any existing delivered platform, re-skin it, and adapt its database models to fit your specific operational workflows in 2 to 3 weeks.",
    },
    {
      q: "Do I own the full source code after delivery?",
      a: "Yes, 100%. Full code repositories (GitHub) and production hosting servers are transferred directly to your control upon project delivery.",
    },
    {
      q: "What happens if I need ongoing feature updates?",
      a: "Every build includes 1 to 3 months of complimentary post-launch support. Afterward, flexible monthly SLA maintenance tiers are available.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-700" />
          <span>Completed Products & Custom Offerings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight">
          Delivered Software Products & Bespoke Builds
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          I showcase completed, working software products managed directly via the Admin portal. Test any live system below, or let's engineer a custom web application tailored to your business operations.
        </p>
      </div>

      {/* Delivered Admin Projects Grid */}
      <div className="space-y-12">
        {adminProjects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700">Live Admin Projects</h2>
                <h3 className="text-2xl font-extrabold text-[#0a192f]">Delivered Software Products</h3>
              </div>
              <Link
                href="/projects"
                className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {adminProjects.map((project) => {
                const techList = JSON.parse(project.techStack || "[]");
                return (
                  <div
                    key={project.id}
                    className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {project.category}
                        </span>
                        {project.businessType && (
                          <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                            {project.businessType}
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-[#0a192f]">{project.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{project.shortDesc}</p>

                      {project.keyResults && (
                        <div className="space-y-2 pt-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                            Key Results & Delivered Capabilities:
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <span>{project.keyResults}</span>
                          </div>
                        </div>
                      )}

                      {project.problemSolved && (
                        <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
                          <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                          <span>Problem Solved: {project.problemSolved}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-bold text-slate-700 hover:text-amber-700 flex items-center gap-1"
                      >
                        <span>View Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs hover:brightness-105 transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Launch Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Custom Development & SLA Offerings */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700">Custom Engineering</h2>
            <h3 className="text-2xl font-extrabold text-[#0a192f]">Bespoke Systems & Ongoing Care</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {customServices.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {p.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#0a192f]">{p.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Capabilities Included:
                      </div>
                      <ul className="space-y-2">
                        {p.proofNotes.map((note, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                            <span>{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-slate-700 hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>Inquire Custom Build</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Proof-First Philosophy Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#0a192f] to-slate-900 border border-amber-500/30 p-10 sm:p-12 text-white space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <h3 className="text-2xl font-extrabold text-white">
            Need To Adapt A System Or Build From Scratch?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            All systems I build are structured modularly. I can quickly adapt an existing engine for your specific business rules or build a clean custom web application.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-xs hover:brightness-105 transition-all shadow-lg flex items-center gap-2"
          >
            <span>Request Custom Adaptation Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demos"
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Browse All Live Demos</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-slate-200">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl font-extrabold text-[#0a192f]">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <h4 className="font-bold text-[#0a192f] text-base">{faq.q}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

