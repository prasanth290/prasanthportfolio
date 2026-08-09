import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { CheckCircle2, ShieldCheck, ExternalLink, Code2, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;
  return {
    title: `Custom ${campaign.replace("-", " ")} Solutions | Prasanth Dev`,
    description: `High-performance custom software build for ${campaign.replace("-", " ")}. Direct developer access, fast delivery, live demos available.`,
  };
}

export default async function CampaignLandingPage({ params }: { params: Promise<{ campaign: string }> }) {
  const { campaign } = await params;

  const campaignConfigs: Record<string, any> = {
    "rental-management": {
      title: "Custom Rental & Property Management Software Engineered For Your Portfolio",
      badge: "Paid Ad Special — Rental Systems",
      subheadline:
        "Replace expensive monthly per-unit SaaS subscriptions with a custom rental management web app tailored to your exact property operations.",
      heroImage: "/images/rental.png",
      demoSlug: "propflow-rental-management",
      bulletPoints: [
        "Digital tenant lease agreements & auto payment processing",
        "Tenant maintenance portal with photo uploads & status queue",
        "Multi-property vacancy metrics & financial P&L reporting",
        "100% source code ownership with zero recurring SaaS fees",
      ],
    },
    "inventory-systems": {
      title: "Real-Time Multi-Warehouse Inventory & Barcode Tracking Systems",
      badge: "Paid Ad Special — Inventory Suites",
      subheadline:
        "Eliminate stockouts and manual inventory count errors with web-based barcode scanning, automated supplier PO generation, and instant multi-store stock sync.",
      heroImage: "/images/inventory.png",
      demoSlug: "nexusstock-inventory-system",
      bulletPoints: [
        "Web barcode & QR scanner app for warehouse staff",
        "Automated low-stock threshold email alerts",
        "Supplier purchase order generation & receipt tracking",
        "Sub-second inventory synchronization across locations",
      ],
    },
    "custom-web-apps": {
      title: "Tailor-Made Business Software & Web Apps Built In 3 Weeks",
      badge: "Custom Business Systems",
      subheadline:
        "Turn complex operational workflows into clean, mobile-optimized Next.js web applications engineered for speed, security, and growth.",
      heroImage: "/images/analytics.png",
      demoSlug: "pulseanalytics-saas-dashboard",
      bulletPoints: [
        "Direct communication with a Senior Full-Stack Engineer",
        "Modern Next.js 16 + React 19 + PostgreSQL architecture",
        "Fixed-price development quotes with guaranteed launch dates",
        "Full post-launch maintenance & security backup options",
      ],
    },
  };

  const config = campaignConfigs[campaign] || campaignConfigs["custom-web-apps"];

  // Fetch relevant project for showcase
  let project = null;
  try {
    project = await prisma.project.findFirst({
      where: { slug: config.demoSlug },
    });
  } catch (e) {
    console.error("Error fetching campaign project:", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Campaign Top Banner */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-card border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Prasanth<span className="text-emerald-400">.dev</span> Studio Campaign
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Special Offer: Free Tech Consultation</span>
        </div>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            {config.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {config.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {config.subheadline}
          </p>

          <ul className="space-y-3 pt-2">
            {config.bulletPoints.map((point: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href="#lead-form"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-emerald-500/20"
            >
              Get Free Custom Proposal
            </a>
            {project?.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <span>Test Live Demo</span>
                <ExternalLink className="w-4 h-4 text-emerald-400" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden glass-card border border-slate-700 shadow-2xl">
            <Image src={config.heroImage} alt={config.title} fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* Embedded Lead Capture Form Section */}
      <div id="lead-form" className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-slate-800">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Request Your Custom Solution Proposal</h2>
          <p className="text-slate-400 text-sm">
            Fill out your project details below to receive a fixed quote and estimated launch timeline.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
