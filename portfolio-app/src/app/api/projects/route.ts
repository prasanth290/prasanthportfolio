import { NextResponse } from "next/server";
import { prisma, getFilteredFallbackProjects, registerDynamicProject, isProjectDeleted } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { cookies } from "next/headers";

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
      const cleanProjects = projects.filter(
        (p) => !isProjectDeleted(p.id) && !isProjectDeleted(p.slug)
      );
      return NextResponse.json({ projects: cleanProjects });
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

    registerDynamicProject(project);

    // Clear project ID & slug from deleted projects cookie if re-added
    const cookieStore = await cookies();
    const existingDeletedCookie = cookieStore.get("devstudio_deleted_projects")?.value;
    let deletedList: string[] = [];
    if (existingDeletedCookie) {
      try { deletedList = JSON.parse(existingDeletedCookie); } catch {}
    }
    const updatedDeletedList = deletedList.filter(
      (id) => id !== project.id && id !== project.slug && id !== finalSlug && id !== baseSlug
    );

    // Store dynamic project in cookies for serverless persistence
    const existingDynamicCookie = cookieStore.get("devstudio_dynamic_projects")?.value;
    let dynamicList: any[] = [];
    if (existingDynamicCookie) {
      try { dynamicList = JSON.parse(existingDynamicCookie); } catch {}
    }
    const filteredDynamics = dynamicList.filter((p) => p.id !== project.id && p.slug !== project.slug);
    filteredDynamics.unshift(project);

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
  } catch (error: any) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create project" }, { status: 500 });
  }
}
