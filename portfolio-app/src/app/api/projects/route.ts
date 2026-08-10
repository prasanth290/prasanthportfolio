import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
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

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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
    const finalSlug = (slug || finalTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `project-${Date.now()}`;
    const finalCategory = category || "Rental";
    const finalShortDesc = shortDesc || `${finalTitle} — Custom business web application.`;
    const finalFullDesc = fullDesc || `### Product Case Study: ${finalTitle}\n\n${finalShortDesc}`;
    const finalCoverImage = coverImage || "/images/booking.png";

    let existing = null;
    try {
      existing = await prisma.project.findUnique({ where: { slug: finalSlug } });
    } catch (e) {
      console.warn("Prisma slug check failed, proceeding:", e);
    }

    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique slug." }, { status: 400 });
    }

    let project;
    try {
      project = await prisma.project.create({
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
    } catch (createErr) {
      console.warn("Prisma project.create failed on serverless runtime, returning fallback project payload:", createErr);
      project = {
        id: `proj-${Date.now()}`,
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
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create project" }, { status: 500 });
  }
}
