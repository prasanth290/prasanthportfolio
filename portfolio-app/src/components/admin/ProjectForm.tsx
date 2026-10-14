"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Save, Loader2, AlertCircle, Wand2, Link2, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const isEditing = Boolean(initialData?.id);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Rental");
  const [customCategory, setCustomCategory] = useState("");
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [businessType, setBusinessType] = useState(initialData?.businessType || "");
  const [problemSolved, setProblemSolved] = useState(initialData?.problemSolved || "");
  const [keyResults, setKeyResults] = useState(initialData?.keyResults || "");
  const [shortDesc, setShortDesc] = useState(initialData?.shortDesc || "");
  const [fullDesc, setFullDesc] = useState(initialData?.fullDesc || "");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || "");
  const [demoCredentials, setDemoCredentials] = useState(initialData?.demoCredentials || "");
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "/images/rental.png");

  // Tech stack tags
  const parsedTech = initialData?.techStack ? JSON.parse(initialData.techStack) : ["Next.js", "TypeScript", "Tailwind CSS"];
  const [techStack, setTechStack] = useState<string[]>(parsedTech);
  const [newTag, setNewTag] = useState("");

  // Gallery images
  const parsedGallery = initialData?.galleryImages ? JSON.parse(initialData.galleryImages) : [];
  const [galleryImages, setGalleryImages] = useState<string[]>(parsedGallery);

  // Auto-Fill URL input state
  const [inputUrl, setInputUrl] = useState("");
  const [autoFilling, setAutoFilling] = useState(false);
  const [autoFillSuccess, setAutoFillSuccess] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleAutoFill = async () => {
    if (!inputUrl.trim()) {
      setError("Please paste a URL to auto-fill.");
      return;
    }

    setAutoFilling(true);
    setError("");
    setAutoFillSuccess(false);

    try {
      const res = await fetch("/api/projects/autofill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Auto-fill failed.");

      const data = json.data;
      if (data.title) setTitle(data.title);
      if (data.slug) setSlug(data.slug);
      if (data.category) setCategory(data.category);
      if (data.businessType) setBusinessType(data.businessType);
      if (data.problemSolved) setProblemSolved(data.problemSolved);
      if (data.keyResults) setKeyResults(data.keyResults);
      if (data.shortDesc) setShortDesc(data.shortDesc);
      if (data.fullDesc) setFullDesc(data.fullDesc);
      if (data.techStack && data.techStack.length > 0) setTechStack(data.techStack);
      if (data.demoUrl) setDemoUrl(data.demoUrl);
      if (data.demoCredentials) setDemoCredentials(data.demoCredentials);
      if (data.coverImage) setCoverImage(data.coverImage);

      setAutoFillSuccess(true);
      setTimeout(() => setAutoFillSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to auto-fill details from URL.");
    } finally {
      setAutoFilling(false);
    }
  };

  const addTechTag = () => {
    if (newTag.trim() && !techStack.includes(newTag.trim())) {
      setTechStack([...techStack, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTechTag = (tag: string) => {
    setTechStack(techStack.filter((t) => t !== tag));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCover = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (isCover) {
        setCoverImage(data.url);
      } else {
        setGalleryImages([...galleryImages, data.url]);
      }
    } catch (err: any) {
      setError(err.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const finalCategory = isCustomCategory && customCategory.trim() ? customCategory.trim() : category;

    const payload = {
      title,
      slug,
      category: finalCategory,
      businessType,
      problemSolved,
      keyResults,
      shortDesc,
      fullDesc,
      techStack,
      demoUrl,
      demoCredentials,
      status,
      isFeatured,
      coverImage,
      galleryImages,
    };

    try {
      const url = isEditing ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project.");

      window.location.href = "/admin/projects";
    } catch (err: any) {
      setError(err.message || "Error saving project.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md">
      {/* Top back navigation */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0a192f] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects List</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">
          {isEditing ? `ID: ${initialData?.id?.slice(0, 12)}...` : "New Project Entry"}
        </span>
      </div>

      {/* Magic URL Auto-Fill Widget */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white to-slate-50 border border-amber-300/80 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-[#c5a059] flex items-center justify-center font-bold">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0a192f] text-sm sm:text-base">Magic URL Auto-Fill Engine</h3>
              <p className="text-[11px] text-slate-500">Auto-extract title, tech stack, and case study specs from any live demo</p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-[#0a192f] font-bold border border-amber-300">
            AI Assistant
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Link2 className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. https://demo.propflow.com or https://my-app.vercel.app"
              className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 font-mono transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleAutoFill}
            disabled={autoFilling}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs shrink-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-[#c5a059]/20 hover:opacity-95 cursor-pointer"
          >
            {autoFilling ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting Specs...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Auto-Fill Details ✨</span>
              </>
            )}
          </button>
        </div>

        {autoFillSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Successfully auto-filled title, slug, category, tech stack, and case study from URL!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Core Project Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. PropFlow — Enterprise Rental Management"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            URL Slug *
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="propflow-rental-management"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
          />
        </div>
      </div>

      {/* Case Study Meta Fields */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Client Story & Business Outcomes
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0a192f] block">
              Business Type Built For
            </label>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="e.g. Residential Landlords (45+ Units)"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0a192f] block">
              Problem Solved
            </label>
            <input
              type="text"
              value={problemSolved}
              onChange={(e) => setProblemSolved(e.target.value)}
              placeholder="e.g. Unreliable rent chasing & manual paperwork"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0a192f] block">
              Key Results / Impact
            </label>
            <input
              type="text"
              value={keyResults}
              onChange={(e) => setKeyResults(e.target.value)}
              placeholder="e.g. Automated 95% of rent collection in 30 days"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Category *
            </label>
            <button
              type="button"
              onClick={() => setIsCustomCategory(!isCustomCategory)}
              className="text-[11px] text-[#c5a059] hover:underline font-bold cursor-pointer"
            >
              {isCustomCategory ? "Presets" : "+ Custom"}
            </button>
          </div>

          {isCustomCategory ? (
            <input
              type="text"
              required
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Type new category..."
              className="w-full bg-slate-50 border border-[#c5a059] rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none"
            />
          ) : (
            <select
              value={category}
              onChange={(e) => {
                if (e.target.value === "CUSTOM_NEW") {
                  setIsCustomCategory(true);
                } else {
                  setCategory(e.target.value);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
            >
              <option value="Rental">Rental Systems</option>
              <option value="Inventory">Inventory Systems</option>
              <option value="Booking">Booking & Scheduling</option>
              <option value="CRM">CRM & Operations</option>
              <option value="Healthcare">Healthcare & Medical</option>
              <option value="E-Commerce">E-Commerce Platforms</option>
              <option value="SaaS">SaaS & Products</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other Custom Web App</option>
              <option value="CUSTOM_NEW">+ Add New Custom Category...</option>
            </select>
          )}
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Publication Status *
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
          >
            <option value="PUBLISHED">Published (Visible Publicly)</option>
            <option value="DRAFT">Draft (Hidden)</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Featured On Homepage
          </label>
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setIsFeatured(!isFeatured)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isFeatured
                  ? "bg-amber-50 text-amber-800 border-amber-300 shadow-2xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {isFeatured ? "★ Featured on Homepage" : "Standard Portfolio Project"}
            </button>
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Short Card Summary (1-2 sentences) *
        </label>
        <textarea
          required
          rows={2}
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="Multi-property lease tracking, automated tenant rent collection, and maintenance queues..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
        />
      </div>

      {/* Tech Stack Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Tech Stack Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 flex items-center gap-1.5"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTechTag(tag)}
                className="hover:text-rose-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechTag();
              }
            }}
            placeholder="Add tech tag (e.g. Next.js, Prisma, Stripe)..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] focus:ring-2 focus:ring-[#c5a059]/20 transition-all"
          />
          <button
            type="button"
            onClick={addTechTag}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a192f] text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Live Demo URL & Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Live Demo Deployment URL
          </label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://demo.propflow-rental.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] font-mono transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Demo Login Credentials Note
          </label>
          <input
            type="text"
            value={demoCredentials}
            onChange={(e) => setDemoCredentials(e.target.value)}
            placeholder="Role: Landlord | Email: demo@propflow.com | Pass: demo123"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] font-mono transition-all"
          />
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Cover Thumbnail Image *
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-44 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs">
            {coverImage ? (
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-400">No Image</div>
            )}
          </div>

          <div className="space-y-2 w-full">
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/images/rental.png or image URL"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-[#c5a059] transition-all"
            />
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a192f] text-xs font-bold border border-slate-200 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-[#c5a059]" />
                <span>{uploading ? "Uploading..." : "Upload New File"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <span className="text-[11px] text-slate-500">
                Supports PNG, JPG, or WebP.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description Markdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
          Full Case Study Description (Markdown supported) *
        </label>
        <textarea
          required
          rows={10}
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          placeholder="### Overview&#10;Describe problem solved, technical challenges, and key features..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#c5a059] font-mono leading-relaxed transition-all"
        />
      </div>

      {/* Action Submit Button */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-md shadow-[#c5a059]/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Project...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{isEditing ? "Update Case Study" : "Publish Case Study"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
