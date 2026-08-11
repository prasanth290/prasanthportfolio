import { NextResponse } from "next/server";
import { prisma, registerDeletedProject, registerDynamicProject } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { cookies } from "next/headers";

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

    // Clear project ID & slug from deleted projects cookie
    const cookieStore = await cookies();
    const existingDeletedCookie = cookieStore.get("devstudio_deleted_projects")?.value;
    let deletedList: string[] = [];
    if (existingDeletedCookie) {
      try { deletedList = JSON.parse(existingDeletedCookie); } catch {}
    }
    const updatedDeletedList = deletedList.filter(
      (dId) => dId !== id && dId !== project.id && dId !== project.slug && dId !== slug
    );

    // Store dynamic project in cookies for serverless persistence (minified to prevent cookie size limits)
    const existingDynamicCookie = cookieStore.get("devstudio_dynamic_projects")?.value;
    let dynamicList: any[] = [];
    if (existingDynamicCookie) {
      try { dynamicList = JSON.parse(existingDynamicCookie); } catch {}
    }

    const minifiedProject = {
      ...project,
      fullDesc: (project.fullDesc || "").substring(0, 300),
    };

    const filteredDynamics = dynamicList
      .filter((p) => p.id !== id && p.id !== project.id && p.slug !== project.slug)
      .slice(0, 10);
    filteredDynamics.unshift(minifiedProject);

    const res = NextResponse.json({ success: true, project });
    res.cookies.set("devstudio_deleted_projects", JSON.stringify(updatedDeletedList), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    res.cookies.set("devstudio_dynamic_projects", JSON.stringify(filteredDynamics), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return res;
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
      const res = await prisma.project.deleteMany({
        where: { OR: [{ id }, { slug: id }] },
      });
      console.log(`Prisma delete project ${id}: ${res.count} record(s) removed.`);
    } catch (e) {
      console.warn(`Prisma delete project ${id} failed:`, e);
    }

    const cookieStore = await cookies();
    const existingCookie = cookieStore.get("devstudio_deleted_projects")?.value;
    let deletedList: string[] = [];
    if (existingCookie) {
      try {
        deletedList = JSON.parse(existingCookie);
      } catch {}
    }
    if (!deletedList.includes(id)) {
      deletedList.push(id);
    }

    const res = NextResponse.json({ success: true, message: "Project deleted successfully" });
    res.cookies.set("devstudio_deleted_projects", JSON.stringify(deletedList), {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });

    return res;
  } catch (error: any) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete project" }, { status: 500 });
  }
}
