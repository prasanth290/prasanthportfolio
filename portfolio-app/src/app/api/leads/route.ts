import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

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

// POST /api/leads (Public lead capture with rate limiting & bot prevention)
export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check (5 submissions per IP per 10 minutes)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-ip";
    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      name,
      email,
      phone,
      projectType,
      budgetRange,
      message,
      utmSource,
      utmCampaign,
      utmMedium,
      utmTerm,
      gclid,
      website_hp,
    } = body;

    // 2. Honeypot check (Bots that auto-fill all form fields will trigger this)
    if (website_hp) {
      // Silently return success to fool bots without creating database clutter
      return NextResponse.json({ success: true, leadId: "hp_blocked" });
    }

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: "Name, email, project type, and message are required." }, { status: 400 });
    }

    const attributionDetails = [
      gclid ? `Google Click ID (gclid): ${gclid}` : "",
      utmMedium ? `Medium: ${utmMedium}` : "",
      utmTerm ? `Keyword/Search Term: ${utmTerm}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        projectType,
        budgetRange: budgetRange || null,
        message,
        utmSource: utmSource || (gclid ? "google-ads" : null),
        utmCampaign: utmCampaign || null,
        notes: attributionDetails || null,
        status: "NEW",
      },
    });

    // 3. Optional Email Alert (Resend integration if configured in process.env)
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || "prasanth.dev.studio@gmail.com";
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Leads <leads@customwebstudio.com>",
            to: notificationEmail,
            subject: `🔥 New Lead Submission from ${name} (${projectType})`,
            html: `
              <h2>New Lead Received!</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "N/A"}</p>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Budget Range:</strong> ${budgetRange || "N/A"}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f4f4f4; padding: 12px; border-radius: 6px;">${message}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn("Failed to dispatch lead email notification:", emailErr);
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
