import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma, DEFAULT_PRIVACY_POLICY_PAGE } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let page: any = await prisma.page.findUnique({ where: { id } });
    if (!page && (id === "privacy-policy-default" || id === "privacy-policy")) {
      page = DEFAULT_PRIVACY_POLICY_PAGE;
    }
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch page" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, slug, content, metaTitle, metaDescription, isPublished, displayOrder } = body;

    const cleanSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : undefined;

    // Check if updating privacy-policy default page for the first time in DB
    if (id === "privacy-policy-default" || id === "privacy-policy") {
      const page = await prisma.page.upsert({
        where: { slug: "privacy-policy" },
        update: {
          title,
          content,
          metaTitle,
          metaDescription,
          isPublished: isPublished ?? true,
          displayOrder: Number(displayOrder) || 0,
        },
        create: {
          title: title || DEFAULT_PRIVACY_POLICY_PAGE.title,
          slug: "privacy-policy",
          content: content || DEFAULT_PRIVACY_POLICY_PAGE.content,
          metaTitle: metaTitle || DEFAULT_PRIVACY_POLICY_PAGE.metaTitle,
          metaDescription: metaDescription || DEFAULT_PRIVACY_POLICY_PAGE.metaDescription,
          isPublished: isPublished ?? true,
          isSystem: true,
          displayOrder: Number(displayOrder) || 1,
        },
      });
      return NextResponse.json(page);
    }

    const updated = await prisma.page.update({
      where: { id },
      data: {
        title,
        slug: cleanSlug,
        content,
        metaTitle,
        metaDescription,
        isPublished,
        displayOrder: displayOrder !== undefined ? Number(displayOrder) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;

    const target = await prisma.page.findUnique({ where: { id } });
    if (target?.isSystem) {
      return NextResponse.json({ error: "System pages (e.g. Privacy Policy) cannot be deleted." }, { status: 400 });
    }

    if (id === "privacy-policy-default") {
      return NextResponse.json({ error: "System pages cannot be deleted." }, { status: 400 });
    }

    await prisma.page.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete page" }, { status: 500 });
  }
}
