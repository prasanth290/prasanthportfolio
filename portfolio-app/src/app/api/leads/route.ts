import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

// GET /api/leads (Admin only)
export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

// POST /api/leads (Public lead capture)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, budgetRange, message, utmSource, utmCampaign } = body;

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Name, email, project type, and message are required." }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        projectType,
        budgetRange: budgetRange || null,
        message,
        utmSource: utmSource || null,
        utmCampaign: utmCampaign || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
