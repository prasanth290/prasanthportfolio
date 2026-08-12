import { NextResponse } from "next/server";
import { prisma, getFilteredFallbackProjects } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// GET /api/projects
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }
    if (status) {
      where.status = status;
    } else {
      const session = await getAdminSession();
      if (!session) {
        where.status = "PUBLISHED";
      }
    }
    if (featured === "true") {
      where.isFeatured = true;
    }

    try {
      const projects = await prisma.project.findMany({
        where,
        orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
      });
      return NextResponse.json({ projects });
    } catch (e) {
      console.warn("Prisma GET projects failed, using fallback store:", e);
    }

    const fallbackProjects = await getFilteredFallbackProjects();
    return NextResponse.json({ projects: fallbackProjects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ projects: await getFilteredFallbackProjects() });
  }
}

// POST /api/projects (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      category,
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
    } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Project Title is required." }, { status: 400 });
    }

    const finalTitle = title.trim();
    let baseSlug = (slug || finalTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `project-${Date.now()}`;

    let finalSlug = baseSlug;
    try {
      const existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
      if (existing) {
        finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      }
    } catch (e) {
      console.warn("Prisma slug check failed, proceeding:", e);
    }

    const finalCategory = category || "Rental";
    const finalShortDesc = shortDesc || `${finalTitle} — Custom business web application.`;
    const finalFullDesc = fullDesc || `### Product Case Study: ${finalTitle}\n\n${finalShortDesc}`;
    const finalCoverImage = coverImage || "/images/booking.png";

    const project = await prisma.project.create({
      data: {
        title: finalTitle,
        slug: finalSlug,
        category: finalCategory,
        businessType: businessType || null,
        problemSolved: problemSolved || null,
        keyResults: keyResults || null,
        shortDesc: finalShortDesc,
        fullDesc: finalFullDesc,
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        demoUrl: demoUrl || null,
        demoCredentials: demoCredentials || null,
        status: status || "PUBLISHED",
        isFeatured: Boolean(isFeatured),
        coverImage: finalCoverImage,
        galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages || []),
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create project" }, { status: 500 });
  }
}

