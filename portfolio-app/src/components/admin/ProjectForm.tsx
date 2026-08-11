"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Save, Loader2, AlertCircle, Wand2, Link2, CheckCircle2 } from "lucide-react";

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

      // Save project to client localStorage for instant browser persistence across lambda resets
      try {
        const pObj = data.project || { ...payload, id: `proj-${Date.now()}` };
        const local = localStorage.getItem("devstudio_custom_projects");
        let list = local ? JSON.parse(local) : [];
        list = list.filter((p: any) => p.id !== pObj.id && p.slug !== pObj.slug);
        list.unshift(pObj);
        localStorage.setItem("devstudio_custom_projects", JSON.stringify(list));

        // Remove from deleted list if present
        const delLocal = localStorage.getItem("devstudio_deleted_projects");
        if (delLocal) {
          const delList = JSON.parse(delLocal).filter((dId: string) => dId !== pObj.id && dId !== pObj.slug);
          localStorage.setItem("devstudio_deleted_projects", JSON.stringify(delList));
        }
      } catch {}

      window.location.href = "/admin/projects";
    } catch (err: any) {
      setError(err.message || "Error saving project.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 rounded-3xl border border-slate-800">
      {/* Magic URL Auto-Fill Widget */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Magic URL Auto-Fill Engine</h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
            Paste & Fill
          </span>
        </div>
        <p className="text-xs text-slate-300">
          Paste your website or demo URL below. Our AI auto-fill engine will extract the title, description, category, tech stack, and case study details automatically!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Link2 className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. https://demo.propflow.com or https://my-project.vercel.app"
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleAutoFill}
            disabled={autoFilling}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-slate-950 font-bold text-xs shrink-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
          >
            {autoFilling ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Extracting Details...</span>
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
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Successfully auto-filled title, slug, category, tech stack, and case study from URL!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. PropFlow — Enterprise Rental Management"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            URL Slug *
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="propflow-rental-management"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Case Study Meta Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
            Business Type Built For
          </label>
          <input
            type="text"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            placeholder="e.g. Residential Landlords (45+ Units)"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">
            Problem Solved
          </label>
          <input
            type="text"
            value={problemSolved}
            onChange={(e) => setProblemSolved(e.target.value)}
            placeholder="e.g. Unreliable rent chasing & paper maintenance tracking"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
            Key Results / Impact
          </label>
          <input
            type="text"
            value={keyResults}
            onChange={(e) => setKeyResults(e.target.value)}
            placeholder="e.g. Automated 95% of rent collection & cut maintenance delays in half"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Category *
            </label>
            <button
              type="button"
              onClick={() => setIsCustomCategory(!isCustomCategory)}
              className="text-[11px] text-emerald-400 hover:underline font-semibold"
            >
              {isCustomCategory ? "Choose from presets" : "+ Add Custom Category"}
            </button>
          </div>

          {isCustomCategory ? (
            <input
              type="text"
              required
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Type new category (e.g. Healthcare, Fintech, SaaS)..."
              className="w-full bg-slate-900 border border-emerald-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
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
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
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
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Publication Status *
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="PUBLISHED">Published (Visible Publicly)</option>
            <option value="DRAFT">Draft (Hidden)</option>
          </select>
        </div>

        {/* Featured Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Featured On Homepage
          </label>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsFeatured(!isFeatured)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                isFeatured
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : "bg-slate-900 text-slate-400 border-slate-800"
              }`}
            >
              {isFeatured ? "★ Featured Project" : "Standard Project"}
            </button>
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Short Card Summary (1-2 sentences) *
        </label>
        <textarea
          required
          rows={2}
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="Multi-property lease tracking, automated tenant rent collection, and maintenance queues..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Tech Stack Input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Tech Stack Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {techStack.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 text-slate-200 border border-slate-700 flex items-center gap-1.5"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTechTag(tag)}
                className="hover:text-rose-400"
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
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="button"
            onClick={addTechTag}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            Add Tag
          </button>
        </div>
      </div>

      {/* Live Demo URL & Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Live Demo Deployment URL
          </label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://demo.propflow-rental.com"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Demo Login Credentials Note
          </label>
          <input
            type="text"
            value={demoCredentials}
            onChange={(e) => setDemoCredentials(e.target.value)}
            placeholder="Role: Landlord | Email: demo@propflow.com | Pass: demo123"
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Cover Image Upload */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Cover Thumbnail Image *
        </label>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-40 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
            {coverImage ? (
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-slate-500">No Image</div>
            )}
          </div>

          <div className="space-y-2 w-full">
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/images/rental.png or image URL"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
            />
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>{uploading ? "Uploading..." : "Upload New File"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, true)}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Full Description Markdown */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Full Case Study Description (Markdown supported) *
        </label>
        <textarea
          required
          rows={10}
          value={fullDesc}
          onChange={(e) => setFullDesc(e.target.value)}
          placeholder="### Overview&#10;Describe problem solved, technical challenges, and key features..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
        />
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Submit Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:opacity-95 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
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
