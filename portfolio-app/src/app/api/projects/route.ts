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

    if (!title || !slug || !category || !shortDesc || !fullDesc || !coverImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug already exists. Choose a unique slug." }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        category,
        businessType: businessType || null,
        problemSolved: problemSolved || null,
        keyResults: keyResults || null,
        shortDesc,
        fullDesc,
        techStack: Array.isArray(techStack) ? JSON.stringify(techStack) : techStack || "[]",
        demoUrl: demoUrl || null,
        demoCredentials: demoCredentials || null,
        status: status || "PUBLISHED",
        isFeatured: Boolean(isFeatured),
        coverImage,
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : galleryImages || "[]",
      },
    });

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
