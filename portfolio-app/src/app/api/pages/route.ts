import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma, getAllAdminPages } from "@/lib/db";

export async function GET() {
  try {
    const pages = await getAllAdminPages();
    return NextResponse.json(pages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const { title, slug, content, metaTitle, metaDescription, isPublished, isSystem, displayOrder } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required." }, { status: 400 });
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const existing = await prisma.page.findUnique({ where: { slug: cleanSlug } });
    if (existing) {
      return NextResponse.json({ error: `A page with slug "${cleanSlug}" already exists.` }, { status: 400 });
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug: cleanSlug,
        content,
        metaTitle: metaTitle || `${title} | Prasanth Dev`,
        metaDescription: metaDescription || shortSnippet(content),
        isPublished: isPublished ?? true,
        isSystem: isSystem ?? false,
        displayOrder: Number(displayOrder) || 0,
      },
    });

    return NextResponse.json(page, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create page" }, { status: 500 });
  }
}

function shortSnippet(text: string) {
  return text.replace(/[\#\*\_]/g, "").slice(0, 150).trim() + "...";
}
