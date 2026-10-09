import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { getSafePageBySlug, getSafeSiteSettings } from "@/lib/db";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getSafePageBySlug(slug);
  if (!page || !page.isPublished) return { title: "Page Not Found" };

  return {
    title: page.metaTitle || `${page.title} | Prasanth Dev`,
    description: page.metaDescription || `Read ${page.title} on Prasanth Dev Studio.`,
  };
}

export default async function CustomDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getSafePageBySlug(slug);

  if (!page || !page.isPublished) {
    notFound();
  }

  const settings = await getSafeSiteSettings();
  const developerEmail = settings.contact_email || "prasanth.dev.studio@gmail.com";
  const developerPhone = settings.contact_phone || settings.whatsapp_number || "+91 98765 43210";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Custom Page</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {page.title}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm font-mono">
          Last updated: {new Date(page.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Main Content */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-6 text-sm text-slate-300 leading-relaxed">
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
          {page.content}
        </div>

        {/* Footer Contact Box */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 font-mono text-emerald-400">
            <div>Studio Developer: Prasanth – Web Developer</div>
            <div>Official Email: {developerEmail}</div>
            <div>Direct Phone: {developerPhone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
