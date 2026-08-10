import { NextResponse } from "next/server";
import { prisma, registerDeletedProject, registerDynamicProject } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
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
      displayOrder,
    } = body;

    let project;
    try {
      project = await prisma.project.upsert({
        where: { id },
        update: {
          title,
          slug,
          category,
          businessType: businessType || null,
          problemSolved: problemSolved || null,
          keyResults: keyResults || null,
          shortDesc,
          fullDesc,
          techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
          demoUrl: demoUrl || null,
          demoCredentials: demoCredentials || null,
          status: status || "PUBLISHED",
          isFeatured: Boolean(isFeatured),
          coverImage,
          galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages || []),
          displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
        },
        create: {
          id,
          title,
          slug,
          category,
          businessType: businessType || null,
          problemSolved: problemSolved || null,
          keyResults: keyResults || null,
          shortDesc,
          fullDesc,
          techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
          demoUrl: demoUrl || null,
          demoCredentials: demoCredentials || null,
          status: status || "PUBLISHED",
          isFeatured: Boolean(isFeatured),
          coverImage,
          galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages || []),
          displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
        },
      });
    } catch (dbErr) {
      console.warn("Could not upsert project to database, returning fallback project data:", dbErr);
      project = { id, title, slug, category, businessType, problemSolved, keyResults, shortDesc, fullDesc, techStack, demoUrl, demoCredentials, status, isFeatured, coverImage, galleryImages };
    }

    registerDynamicProject(project);

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    registerDeletedProject(id);

    try {
      await prisma.project.delete({ where: { id } });
    } catch (e) {
      console.warn(`Prisma delete project ${id} failed (entry may be fallback):`, e);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ success: true });
  }
}
