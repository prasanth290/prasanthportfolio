import Link from "next/link";
import Image from "next/image";
import { getSafeProjects } from "@/lib/db";
import {
  ArrowRight,
  ExternalLink,
  Clock,
  UserCheck,
  Award,
  LifeBuoy,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FAQSection } from "@/components/home/FAQSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { ResumeDownloadModal } from "@/components/ui/ResumeDownloadModal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { prisma, withDbTimeout } from "@/lib/db";

export const revalidate = 300;

export default async function HomePage() {
  const featuredProjects = await getSafeProjects();

  let settingsMap: Record<string, string> = {};
  let dbFaqs: any[] = [];

  try {
    const [settings, faqs] = await Promise.all([
      withDbTimeout(prisma.siteSetting.findMany(), 2000, []),
      withDbTimeout(
        prisma.fAQ.findMany({
          where: { isPublished: true },
          orderBy: { displayOrder: "asc" },
        }),
        2000,
        []
      ),
    ]);

    settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    dbFaqs = faqs;
  } catch (e) {
    console.warn("Failed to fetch settings/faqs from DB:", e);
  }

  return (
    <div className="space-y-24 pb-20 overflow-hidden relative">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-radial-gradient-mask pointer-events-none opacity-60" />

      {/* 1. Hero Section */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        {/* Ambient Pulsing Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-emerald-600/12 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[320px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide shadow-lg shadow-emerald-950/40 animate-float-slow">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Heritage Bespoke Systems Studio</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Real Business Software I've Built —{" "}
                <span className="gradient-text-emerald">Ready To See Live</span>.
              </h1>

              <p className="text-lg sm:text-xl text-stone-300 max-w-2xl leading-relaxed font-normal">
                Don't settle for agency promises. Inspect working, completed software platforms in action — then let's adapt a solution or build custom for your business operations.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/demos"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-amber-100 font-bold text-base border border-amber-400/50 hover:border-amber-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2 group"
                >
                  <span>View Live Demos</span>
                  <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0a160f]/90 hover:bg-[#0f2418] border border-amber-400/30 hover:border-amber-400/60 text-stone-200 hover:text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
                >
                  <span>Get a Custom Quote</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </Link>

                <div className="w-full sm:w-auto flex justify-center">
                  <ResumeDownloadModal />
                </div>
              </div>

              {/* Trust & Quantified Track Record Metrics (4-stat row with Animated Counters) */}
              <div className="pt-6 border-t border-emerald-950/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0 text-left">
                <div className="p-3 rounded-xl bg-[#0a160f]/70 border border-emerald-900/50 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    <AnimatedCounter value={settingsMap.stat_experience_years || "3+ Yrs"} />
                  </div>
                  <div className="text-xs text-stone-400 font-medium">Systems Experience</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0a160f]/70 border border-emerald-900/50 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                    <AnimatedCounter value={settingsMap.stat_projects_delivered || "12+"} />
                  </div>
                  <div className="text-xs text-stone-400 font-medium">Projects Delivered</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0a160f]/70 border border-emerald-900/50 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    <AnimatedCounter value={settingsMap.stat_live_demos || "4+"} />
                  </div>
                  <div className="text-xs text-stone-400 font-medium">Live Working Demos</div>
                </div>
                <div className="p-3 rounded-xl bg-[#0a160f]/70 border border-emerald-900/50 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-200">
                    <AnimatedCounter value={settingsMap.stat_code_ownership || "100%"} />
                  </div>
                  <div className="text-xs text-stone-400 font-medium">Code Ownership</div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Showcase: Studio Workbench with Mouse Spotlight */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <SpotlightCard
                  className="p-3 border-emerald-900/60 shadow-2xl space-y-3 transform hover:scale-[1.01] transition-transform"
                  spotlightColor="rgba(16, 185, 129, 0.16)"
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-emerald-950/80">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs text-stone-400 ml-2 font-mono">studio.prasanth.dev/engineering</span>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] bg-emerald-950/80 text-amber-300 rounded font-bold uppercase border border-amber-400/30">
                      Developer Cockpit
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0a160f]">
                    <Image
                      src="/images/developer-workbench.png"
                      alt="Software Engineering Workbench & Architecture UI"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="p-3.5 bg-[#0a160f]/90 rounded-xl border border-emerald-900/60 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Full-Stack Business Architecture</div>
                      <div className="text-stone-400 text-[11px]">Next.js 16 • React 19 • TypeScript • Prisma</div>
                    </div>
                    <Link
                      href="/about"
                      className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-700 to-teal-700 text-amber-100 rounded-lg font-bold border border-amber-400/40 hover:brightness-110 transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>Process</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </SpotlightCard>

                <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl glass-card border border-emerald-900/80 shadow-2xl z-30">
                  <div className="w-10 h-10 rounded-lg bg-emerald-950/90 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Direct Developer</div>
                    <div className="text-[11px] text-stone-400">Zero agency bloat • Fast 2-4 wk sprints</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "Why Work With Me" Value-Props 4-Column Strip with Mouse Spotlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Differentiation & Trust</h2>
          <h3 className="text-3xl font-extrabold text-white">Why Work With Me</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Column 1: On-Time Delivery */}
          <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(5, 150, 105, 0.16)">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">On-Time Delivery</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Track record of shipping working, production-ready software on schedule with strict milestone timelines.
            </p>
          </SpotlightCard>

          {/* Column 2: Direct Access */}
          <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(212, 175, 55, 0.15)">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Direct Access</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Work directly with the senior software engineer building your system — zero agency layers or account managers.
            </p>
          </SpotlightCard>

          {/* Column 3: Proven Process */}
          <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(5, 150, 105, 0.16)">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Proven Process</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Real delivered software products as evidence, not just promises. Test live working demos before committing.
            </p>
          </SpotlightCard>

          {/* Column 4: Ongoing Support */}
          <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(212, 175, 55, 0.15)">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center justify-center">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Ongoing Support</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Ownership doesn't end at launch; post-launch maintenance, automated backups, and feature iterations included.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* 4. Featured Projects Section with Interactive Spotlight Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <SpotlightCard
                key={project.id}
                className="flex flex-col group"
                spotlightColor="rgba(5, 150, 105, 0.16)"
              >
                <div className="relative aspect-[16/9] bg-[#0a160f] overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b08] via-transparent to-transparent opacity-85" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#0a160f]/90 text-amber-300 border border-amber-400/40 backdrop-blur-md">
                    {project.category}
                  </span>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-700 to-teal-700 text-amber-100 font-bold text-xs border border-amber-400/50 hover:brightness-110 transition-all shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 z-30"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    </a>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h4>
                    {project.businessType && (
                      <div className="text-xs text-amber-300 font-semibold mt-1">
                        Built for: {project.businessType}
                      </div>
                    )}
                    <p className="text-stone-400 text-sm mt-2 leading-relaxed line-clamp-3">
                      {project.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2 border-t border-emerald-950/80">
                    <div className="flex flex-wrap gap-1.5">
                      {techList.slice(0, 5).map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#0a160f]/80 text-stone-300 border border-emerald-900/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-xs font-bold text-stone-300 hover:text-white flex items-center gap-1"
                      >
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                      </Link>

                      {project.demoCredentials && (
                        <span className="text-[11px] text-amber-300 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/30">
                          Credentials Included
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* 5. "Recently Delivered" Interim Trust & Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SpotlightCard className="p-8 sm:p-12 space-y-8 bg-gradient-to-b from-[#0a160f] to-[#060b08] border border-emerald-900/60" spotlightColor="rgba(5, 150, 105, 0.16)">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Client Systems Delivered</span>
              </div>
              <h3 className="text-3xl font-extrabold text-white">Recently Delivered Live Systems</h3>
              <p className="text-stone-400 text-sm mt-1">
                Custom software solutions engineered and shipped for real active client businesses.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a160f]/90 border border-emerald-900/60 flex items-center gap-3 text-xs text-stone-300">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong className="text-white block font-bold">Client Verification & References</strong>
                Ask me directly — happy to connect you with past clients.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Showcase 1: Twosomesty */}
            <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(5, 150, 105, 0.16)">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-950 to-teal-900 text-amber-300 flex items-center justify-center font-bold text-base border border-amber-400/30">
                    T
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Twosomesty</h4>
                    <span className="text-xs text-emerald-400 font-medium">Live Client Software System</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Delivered & Active
                </span>
              </div>

              <p className="text-stone-300 text-xs leading-relaxed">
                Full-stack custom platform engineered for client e-commerce operations, order tracking, and custom workflow automation with real-time database management.
              </p>

              <div className="pt-3 border-t border-emerald-950 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Sprint: 18 Days
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  100% Custom Architecture
                </span>
              </div>
            </SpotlightCard>

            {/* Client Showcase 2: Subash Build */}
            <SpotlightCard className="p-6 space-y-4" spotlightColor="rgba(212, 175, 55, 0.15)">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-950 to-emerald-950 text-amber-300 flex items-center justify-center font-bold text-base border border-amber-400/30">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Subash Build</h4>
                    <span className="text-xs text-emerald-400 font-medium">Construction Operations Platform</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Delivered & Active
                </span>
              </div>

              <p className="text-stone-300 text-xs leading-relaxed">
                Tailored business management tool for site project estimates, contractor material allocation, and automated client status reporting.
              </p>

              <div className="pt-3 border-t border-emerald-950 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Sprint: 21 Days
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Site Management Suite
                </span>
              </div>
            </SpotlightCard>
          </div>
        </SpotlightCard>
      </section>

      {/* 5. Client Testimonials Section */}
      <TestimonialSection />

      {/* 5.5 Dynamic FAQ Section */}
      <FAQSection items={dbFaqs} />

      {/* 6. "Ready To Start Your Project?" CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/90 via-[#0a160f] to-[#07130c] border border-amber-400/40 p-10 sm:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 text-amber-300 text-xs font-bold uppercase tracking-wider mx-auto border border-amber-400/40">
              Conversion Final Push
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready To Start Your Custom Software Project?
            </h3>
            <p className="text-stone-300 text-base leading-relaxed">
              Whether you want to adapt my proven Rental or Inventory systems or build a fully custom application tailored to your business, let's discuss your requirements today.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-amber-100 font-bold text-base border border-amber-400/50 hover:border-amber-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-2"
            >
              <span>Get Your Free Custom Proposal</span>
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </Link>
            <Link
              href="/demos"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#060b08] border border-emerald-800/80 hover:bg-[#0a160f] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
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