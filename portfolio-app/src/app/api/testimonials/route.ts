import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// GET /api/testimonials (Public: fetch published testimonials)
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.warn("GET /api/testimonials error:", error);
    return NextResponse.json({ testimonials: [] });
  }
}

// POST /api/testimonials (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { clientName, clientRole, company, avatarUrl, quote, rating, projectSlug, isPublished, displayOrder } = body;

    if (!clientName || !clientRole || !company || !quote) {
      return NextResponse.json({ error: "Client name, role, company, and quote text are required." }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientName,
        clientRole,
        company,
        avatarUrl: avatarUrl || null,
        quote,
        rating: typeof rating === "number" ? rating : 5,
        projectSlug: projectSlug || null,
        isPublished: isPublished !== false,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
      },
    });

    return NextResponse.json({ success: true, testimonial });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
