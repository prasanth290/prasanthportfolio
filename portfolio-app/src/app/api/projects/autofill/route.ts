import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Please provide a valid website URL." }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    let html = "";
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (response.ok) {
        html = await response.text();
      }
    } catch (e) {
      console.warn("Failed to fetch target URL HTML, will parse domain name:", e);
    }

    // Helper functions for parsing HTML metadata
    const getMetaContent = (nameOrProperty: string): string => {
      if (!html) return "";
      const regex = new RegExp(
        `<meta[^>]+(?:name|property)=["']${nameOrProperty}["'][^>]+content=["']([^"']+)["']`,
        "i"
      );
      const match = html.match(regex);
      if (match && match[1]) return match[1].trim();

      const reverseRegex = new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${nameOrProperty}["']`,
        "i"
      );
      const revMatch = html.match(reverseRegex);
      return revMatch && revMatch[1] ? revMatch[1].trim() : "";
    };

    const getTagContent = (tagName: string): string => {
      if (!html) return "";
      const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
      const match = html.match(regex);
      return match && match[1] ? match[1].replace(/<[^>]+>/g, "").trim() : "";
    };

    // Extract Title
    const rawTitle =
      getMetaContent("og:title") ||
      getMetaContent("twitter:title") ||
      getTagContent("title") ||
      getTagContent("h1") ||
      parsedUrl.hostname.replace(/^www\./, "");

    const title = rawTitle.replace(/\s*[-|–—]\s*.*$/, "").trim() || rawTitle;

    // Generate Slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Extract Description
    const rawDesc =
      getMetaContent("og:description") ||
      getMetaContent("twitter:description") ||
      getMetaContent("description") ||
      `Custom business web application engineered for ${parsedUrl.hostname}.`;

    const shortDesc = rawDesc.length > 220 ? rawDesc.substring(0, 217) + "..." : rawDesc;

    // Detect Category based on text
    const textCorpus = (title + " " + rawDesc + " " + html).toLowerCase();
    let category = "Other";
    if (/rental|property|tenant|landlord|lease|rent/i.test(textCorpus)) {
      category = "Rental";
    } else if (/inventory|stock|warehouse|sku|barcode|supplier|po\b/i.test(textCorpus)) {
      category = "Inventory";
    } else if (/booking|appointment|schedule|clinic|reservation/i.test(textCorpus)) {
      category = "Booking";
    } else if (/crm|sales|lead|pipeline|analytics|dashboard|metrics/i.test(textCorpus)) {
      category = "CRM";
    }

    // Infer Tech Stack
    const techStack: string[] = ["Next.js", "TypeScript", "Tailwind CSS"];
    if (/react/i.test(textCorpus)) techStack.push("React");
    if (/node|express/i.test(textCorpus)) techStack.push("Node.js");
    if (/postgres|pg\b/i.test(textCorpus)) techStack.push("PostgreSQL");
    if (/stripe/i.test(textCorpus)) techStack.push("Stripe API");
    if (/twilio/i.test(textCorpus)) techStack.push("Twilio API");
    if (/prisma/i.test(textCorpus)) techStack.push("Prisma ORM");

    const uniqueTechStack = Array.from(new Set(techStack));

    // Cover Image
    let coverImage =
      getMetaContent("og:image") ||
      getMetaContent("twitter:image") ||
      "";

    if (coverImage && coverImage.startsWith("/")) {
      coverImage = parsedUrl.origin + coverImage;
    }
    if (!coverImage) {
      coverImage = category === "Rental" ? "/images/rental.png" : category === "Inventory" ? "/images/inventory.png" : "/images/booking.png";
    }

    const businessType = `${category} & Digital Operations Firm (${parsedUrl.hostname})`;
    const problemSolved = `Manual data entry, fragmented workflows, and lack of real-time operational visibility for ${title}.`;
    const keyResults = `Automated 90%+ of core routine tasks and provided sub-second real-time system synchronization.`;

    const fullDesc = `### Product Case Study: ${title}

${rawDesc}

#### Key Operational Features:
- **Streamlined Workflow:** Custom web application designed to eliminate operational friction and manual tracking.
- **Real-Time Data Sync:** Live system telemetry and automated status updates across all connected interfaces.
- **Enterprise-Grade Infrastructure:** Built with high performance, security, and responsive UI components.

#### Live Working Demo:
Test the active live application directly via the **View Live Demo** button below.`;

    return NextResponse.json({
      success: true,
      data: {
        title,
        slug,
        category,
        businessType,
        problemSolved,
        keyResults,
        shortDesc,
        fullDesc,
        techStack: uniqueTechStack,
        demoUrl: targetUrl,
        coverImage,
      },
    });
  } catch (error: any) {
    console.error("Auto-fill error:", error);
    return NextResponse.json({ error: error?.message || "Failed to auto-fill details from URL." }, { status: 500 });
  }
}
