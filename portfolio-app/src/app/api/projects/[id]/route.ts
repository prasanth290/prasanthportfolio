import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        category,
        businessType: businessType !== undefined ? businessType : undefined,
        problemSolved: problemSolved !== undefined ? problemSolved : undefined,
        keyResults: keyResults !== undefined ? keyResults : undefined,
        shortDesc,
        fullDesc,
        techStack: typeof techStack === "string" ? techStack : JSON.stringify(techStack || []),
        demoUrl,
        demoCredentials,
        status,
        isFeatured: Boolean(isFeatured),
        coverImage,
        galleryImages: typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages || []),
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      },
    });

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
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
