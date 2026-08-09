import Link from "next/link";
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
    "Explore completed custom software products (Rental Management, Inventory Suites) ready for live demo, adaptation, or custom web app builds.",
};

export default function ServicesPage() {
  const productsDelivered = [
    {
      icon: Building2,
      title: "PropFlow — Rental Management System",
      category: "Completed Flagship Product",
      slug: "propflow-rental-management",
      demoUrl: "https://demo.propflow-rental.com",
      description:
        "Full-featured property management software already engineered and operating. Features automated tenant lease tracking, Stripe rent collection, maintenance dispatch, and financial P&L reporting.",
      proofNotes: [
        "Tested live tenant payment & invoice ledger",
        "Digital lease document management & PDF export",
        "Maintenance dispatch queue with photo attachments",
        "Can be adapted or customized for your rental business in 2 weeks",
      ],
    },
    {
      icon: Boxes,
      title: "NexusStock — Inventory & Warehouse Control Suite",
      category: "Completed Flagship Product",
      slug: "nexusstock-inventory-system",
      demoUrl: "https://demo.nexusstock-inventory.com",
      description:
        "High-throughput inventory control system built for multi-location stock synchronization, web barcode scanning, automated purchase orders, and batch expiration tracking.",
      proofNotes: [
        "Live web barcode & QR scanning interface",
        "Multi-warehouse stock transfers & low-stock alerts",
        "Supplier purchase order generation workflows",
        "Can be tailored to your warehouse SKU catalog",
      ],
    },
    {
      icon: Code2,
      title: "Custom Business Web Apps & Portals",
      category: "Bespoke System Build",
      slug: "",
      demoUrl: "",
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
      slug: "",
      demoUrl: "",
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
      a: "Yes! Visit the Live Demos page to launch working builds of our Rental Management, Inventory System, and Booking platforms immediately.",
    },
    {
      q: "Can you customize an existing system for my business?",
      a: "Absolutely. I can take existing products like PropFlow or NexusStock, re-skin them, and adapt their database models to fit your specific operational workflows in 2 to 3 weeks.",
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          <span>Completed Products & Custom Offerings</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Delivered Software Products & Bespoke Builds
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          I showcase completed, working software products as proof of capability. Test any live system below, or let's engineer a custom web application tailored to your business operations.
        </p>
      </div>

      {/* Delivered Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {productsDelivered.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-emerald-400 border border-slate-800">
                    {p.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.description}</p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Capabilities Tested & Delivered:
                  </div>
                  <ul className="space-y-2">
                    {p.proofNotes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                {p.slug ? (
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                  >
                    <span>Inquire Custom Build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}

                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md"
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

      {/* Proof-First Philosophy Banner */}
      <div className="glass-card p-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/50 space-y-6">
        <div className="max-w-2xl space-y-3">
          <h3 className="text-2xl font-extrabold text-white">
            Need To Adapt A System Or Build From Scratch?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            All systems I build are structured modularly. I can quickly adapt an existing engine (Rental, Inventory, Booking) for your specific business rules or build a clean custom web application.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center gap-2"
          >
            <span>Request Custom Adaptation Quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demos"
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <span>Browse All Live Demos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-slate-800">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="font-bold text-white text-base">{faq.q}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
