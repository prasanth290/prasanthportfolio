import Link from "next/link";
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About Prasanth | Full-Stack Custom Software Engineer",
  description:
    "Learn about Prasanth, full-stack software engineer specializing in custom business web apps, Rental Management Systems, and Inventory platforms.",
};

export default function AboutPage() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Workflow Mapping",
      desc: "We analyze your operational bottlenecks, spreadsheet workflows, and exact feature requirements into a clear technical spec document.",
    },
    {
      num: "02",
      title: "Interactive Prototype & DB Design",
      desc: "I design high-fidelity UI screens and model a scalable relational database schema (Prisma/PostgreSQL) tuned for fast queries.",
    },
    {
      num: "03",
      title: "Full-Stack Development & Demos",
      desc: "Code is engineered using Next.js, React, and TypeScript with live staging links so you test features as they are built.",
    },
    {
      num: "04",
      title: "Deployment & Code Handoff",
      desc: "We deploy to production, connect custom domains, set up automated daily database backups, and transfer full source code ownership to you.",
    },
  ];

  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: Code2,
      skills: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "State Management"],
    },
    {
      title: "Backend & DB Systems",
      icon: Terminal,
      skills: ["Node.js / Express", "Prisma ORM", "PostgreSQL / SQLite", "REST & GraphQL APIs", "Redis Caching", "JWT / OAuth Auth"],
    },
    {
      title: "DevOps & Integrations",
      icon: Cpu,
      skills: ["Vercel / Railway", "Docker Containers", "Stripe API & Webhooks", "Twilio SMS", "AWS S3 / Cloudinary", "GA4 / Meta Pixel"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Bio Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Full-Stack Web App Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a192f] tracking-tight leading-tight">
            Hi, I’m Prasanth. I Build Business Systems That Scale.
          </h1>

          <p className="text-slate-600 text-base leading-relaxed">
            I specialize in engineering custom web applications for businesses that have outgrown off-the-shelf software or cumbersome Excel sheets.
          </p>

          <p className="text-slate-600 text-sm leading-relaxed">
            My primary focus is delivering high-impact, custom operational software — flagship examples include <strong className="text-[#0a192f]">Rental & Lease Management Systems</strong> and <strong className="text-[#0a192f]">Real-Time Inventory Suites</strong>, alongside custom client portals, booking engines, and internal CRM dashboards.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:brightness-105 transition-all flex items-center gap-2"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/projects"
              className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0a192f] hover:border-amber-400 font-semibold text-sm transition-colors shadow-sm"
            >
              View Work
            </Link>
          </div>
        </div>

        {/* Right Studio Promise Card */}
        <div className="lg:col-span-5">
          <div className="glass-card p-8 rounded-3xl border border-slate-200 space-y-6 bg-gradient-to-b from-slate-50 to-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#0a192f] text-lg">My Code Quality Promise</h3>
                <p className="text-xs text-slate-500">Direct Senior Engineer Commitment</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Zero bloated dependencies or slow template code. Clean, maintainable TypeScript.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Sub-second page load times optimized for mobile ad campaign traffic.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>Direct daily communication with full transparent progress tracking.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tech Skill Radar */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700">Technical Foundation</h2>
          <h3 className="text-3xl font-extrabold text-[#0a192f]">Full-Stack Tech Proficiency</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-[#0a192f] text-base">{cat.title}</h4>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cat.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Step Process */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-700">Execution Framework</h2>
          <h3 className="text-3xl font-extrabold text-[#0a192f]">How We Build Together</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200 space-y-3 relative shadow-sm">
              <span className="text-3xl font-extrabold text-amber-600/40 font-mono">{st.num}</span>
              <h4 className="text-lg font-bold text-[#0a192f]">{st.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
