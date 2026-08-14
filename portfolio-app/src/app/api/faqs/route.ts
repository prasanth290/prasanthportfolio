import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// GET /api/faqs (Public)
export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isPublished: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ faqs });
  } catch (error) {
    console.warn("GET /api/faqs error:", error);
    return NextResponse.json({ faqs: [] });
  }
}

// POST /api/faqs (Admin only)
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { question, answer, category, isPublished, displayOrder } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: "Question and answer text are required." }, { status: 400 });
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        category: category || "General",
        isPublished: isPublished !== false,
        displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
      },
    });

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
