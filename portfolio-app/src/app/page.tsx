import Link from "next/link";
import Image from "next/image";
import { getSafeProjects } from "@/lib/db";
import {
  ArrowRight,
  ExternalLink,
  Building2,
  Boxes,
  Clock,
  UserCheck,
  Award,
  LifeBuoy,
  CheckCircle2,
  Sparkles,
  Calculator,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { EstimatorWidget } from "@/components/home/EstimatorWidget";

export const revalidate = 0;

export default async function HomePage() {
  const featuredProjects = await getSafeProjects();

  const flagshipRental = featuredProjects.find((p) => p.category === "Rental") || featuredProjects[0];
  const flagshipInventory = featuredProjects.find((p) => p.category === "Inventory") || featuredProjects[1];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portfolio & Proven Systems Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Real Business Software I've Built —{" "}
                <span className="gradient-text-emerald">Ready To See Live</span>.
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal">
                Don't settle for agency promises. See working, completed systems like my flagship{" "}
                <strong className="text-white font-semibold">Rental Management Platform</strong> and{" "}
                <strong className="text-white font-semibold">Inventory Tracking Suite</strong> in action — then let's adapt a solution or build custom for your business.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/demos"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 group"
                >
                  <span>View Live Demos</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
                >
                  <span>Get a Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">4+</div>
                  <div className="text-xs text-slate-400 font-medium">Live Demo Systems</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Full Code Ownership</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">2–4 Wks</div>
                  <div className="text-xs text-slate-400 font-medium">Average Adapt / Launch</div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Showcase: Studio Workbench */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl glass-card border border-slate-700/60 p-3 shadow-2xl space-y-3 transform hover:scale-[1.01] transition-transform">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs text-slate-400 ml-2 font-mono">studio.prasanth.dev/engineering</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-bold uppercase">
                      Developer Cockpit
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900">
                    <Image
                      src="/images/developer-workbench.png"
                      alt="Software Engineering Workbench & Architecture UI"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Full-Stack Business Architecture</div>
                      <div className="text-slate-400 text-[11px]">Next.js 16 • React 19 • TypeScript • Prisma</div>
                    </div>
                    <Link
                      href="/about"
                      className="px-3.5 py-1.5 bg-emerald-500 text-slate-950 rounded-lg font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <span>Engineering Process</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl glass-card border border-slate-700/80 shadow-2xl">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Direct Developer</div>
                    <div className="text-[11px] text-slate-400">Zero agency bloat • Fast 2-4 wk sprints</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Flagship Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Proven Flagship Systems</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Completed Products Delivered For Business Operations
          </p>
          <p className="text-slate-400 text-base">
            These flagship platforms represent real, completed applications built for actual business operations — see them live and discover how they can be customized for your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flagship 1: Rental */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Flagship Product
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Rental & Property Management System</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {flagshipRental?.shortDesc ||
                  "Built for landlords and property managers to automate digital lease onboarding, monthly rent collection via Stripe, and maintenance dispatch queues."}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Real Operation Impact:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {flagshipRental?.keyResults ||
                    "Automated 95% of monthly tenant rent collection and cut maintenance dispatch delays in half."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href={`/projects/${flagshipRental?.slug || "propflow-rental-management"}`}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={flagshipRental?.demoUrl || "https://demo.propflow-rental.com"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>View Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Flagship 2: Inventory */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Boxes className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Flagship Product
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white">Real-Time Inventory & Warehouse Control</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {flagshipInventory?.shortDesc ||
                  "Built for wholesale distributors and e-commerce warehouses requiring multi-location stock tracking, barcode scanning, auto reorder triggers, and supplier PO drafting."}
              </p>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Real Operation Impact:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {flagshipInventory?.keyResults ||
                    "Sub-second stock sync across 2 distribution hubs, zero stockout orders, and 3x faster barcode stock receiving."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href={`/projects/${flagshipInventory?.slug || "nexusstock-inventory-system"}`}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={flagshipInventory?.demoUrl || "https://demo.nexusstock-inventory.com"}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-md"
              >
                <span>View Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Why Work With Me" Value-Props 4-Column Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Differentiation & Trust</h2>
          <h3 className="text-3xl font-extrabold text-white">Why Work With Me</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: On-Time Delivery */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">On-Time Delivery</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Track record of shipping working, production-ready software on schedule with strict milestone timelines.
            </p>
          </div>

          {/* Column 2: Direct Access */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Direct Access</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Work directly with the senior software engineer building your system — zero agency layers or account managers.
            </p>
          </div>

          {/* Column 3: Proven Process */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Proven Process</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Real delivered software products as evidence, not just promises. Test live working demos before committing.
            </p>
          </div>

          {/* Column 4: Ongoing Support */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Ongoing Support</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Ownership doesn't end at launch; post-launch maintenance, automated backups, and feature iterations included.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">Full Portfolio Evidence</h2>
            <h3 className="text-3xl font-extrabold text-white">Featured Software Projects</h3>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            <span>Browse All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => {
            const techList = JSON.parse(project.techStack || "[]");
            return (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-slate-800 flex flex-col group"
              >
                <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-emerald-400 border border-slate-700/80 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg flex items-center gap-1.5"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h4>
                    {project.businessType && (
                      <div className="text-xs text-emerald-400 font-semibold mt-1">
                        Built for: {project.businessType}
                      </div>
                    )}
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {techList.slice(0, 5).map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {project.demoCredentials && (
                        <span className="text-[11px] text-amber-400/90 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          Credentials Included
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Interactive Cost & Timeline Estimator Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Adaptation & Custom Estimator</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white leading-tight">
                Want To Adapt An Existing System Or Build Custom?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Select your required modules and features to get an instant estimate range for customizing one of my built systems or creating a bespoke web app from scratch.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% full source code ownership guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Fast 2 to 4 week launch timelines</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <EstimatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Ready To Start Your Project?" CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border border-emerald-500/40 p-10 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mx-auto">
              Conversion Final Push
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready To Start Your Custom Software Project?
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Whether you want to adapt my proven Rental or Inventory systems or build a fully custom application tailored to your business, let's discuss your requirements today.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <span>Get Your Free Custom Proposal</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demos"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Explore Live Demos First</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}