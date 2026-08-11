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

    const domainHost = parsedUrl.hostname.replace(/^www\./, "");
    const siteNameCapitalized = domainHost
      .split(".")[0]
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    let html = "";
    try {
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(9000),
      });
      if (response.ok) {
        html = await response.text();
      }
    } catch (e) {
      console.warn("Failed to fetch target URL HTML, proceeding with domain intelligence:", e);
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

    const getAllTagContents = (tagName: string): string[] => {
      if (!html) return [];
      const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "gi");
      const matches = Array.from(html.matchAll(regex));
      return matches
        .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
        .filter((text) => text.length > 5 && text.length < 300);
    };

    // Clean body text
    const cleanBodyText = html
      ? html
          .replace(/<script[\s\S]*?<\/script>/gi, " ")
          .replace(/<style[\s\S]*?<\/style>/gi, " ")
          .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "";

    // 1. Title Extraction
    const rawOgTitle = getMetaContent("og:title") || getMetaContent("twitter:title") || getTagContent("title");
    let extractedTitle = rawOgTitle
      ? rawOgTitle.replace(/\s*[-|–—:]\s*(Home|Welcome|Official Site|App|Page).*$/i, "").trim()
      : "";

    if (!extractedTitle || extractedTitle.length < 3) {
      const h1List = getAllTagContents("h1");
      if (h1List.length > 0) extractedTitle = h1List[0];
    }

    if (!extractedTitle || extractedTitle.length < 3) {
      extractedTitle = siteNameCapitalized;
    }

    const title = `${extractedTitle} — Custom Web System`;

    // 2. Slug Generation
    const slug = siteNameCapitalized
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `project-${Date.now()}`;

    // 3. Description Extraction
    const metaDesc =
      getMetaContent("og:description") ||
      getMetaContent("twitter:description") ||
      getMetaContent("description");

    const paragraphs = getAllTagContents("p").filter((p) => p.length > 30);
    let extractedDesc = metaDesc || (paragraphs.length > 0 ? paragraphs[0] : "");

    if (!extractedDesc || extractedDesc.length < 20) {
      extractedDesc = `High-performance custom web application engineered for ${domainHost}. Provides automated workflows, real-time data sync, and modern digital operations.`;
    }

    const shortDesc =
      extractedDesc.length > 220 ? extractedDesc.substring(0, 217) + "..." : extractedDesc;

    // 4. Category Intelligence
    const corpus = (title + " " + extractedDesc + " " + cleanBodyText.substring(0, 3000)).toLowerCase();
    let category = "Rental";
    if (/rental|property|tenant|landlord|lease|rent|real estate/i.test(corpus)) {
      category = "Rental";
    } else if (/inventory|stock|warehouse|sku|barcode|supplier|po\b|e-commerce|store/i.test(corpus)) {
      category = "Inventory";
    } else if (/booking|appointment|schedule|clinic|doctor|health|medical|reservation/i.test(corpus)) {
      category = "Booking";
    } else if (/crm|sales|lead|pipeline|analytics|dashboard|metrics|saas/i.test(corpus)) {
      category = "CRM";
    } else {
      category = "Other";
    }

    // 5. Business Type, Problem Solved, Key Results
    let businessType = `Digital Operations & Custom Software (${domainHost})`;
    if (category === "Rental") businessType = `Property Operations & Real Estate (${domainHost})`;
    else if (category === "Inventory") businessType = `E-Commerce & Warehouse Supply Chain (${domainHost})`;
    else if (category === "Booking") businessType = `Healthcare & Service Appointment Business (${domainHost})`;
    else if (category === "CRM") businessType = `B2B Enterprise & Operational Dashboard (${domainHost})`;

    const problemSolved = metaDesc
      ? `Eliminated manual administrative friction: "${metaDesc.length > 110 ? metaDesc.substring(0, 107) + "..." : metaDesc}"`
      : `Manual paper processes, fragmented data tracking, and operational visibility bottlenecks for ${siteNameCapitalized}.`;

    const keyResults = `Automated core operational workflows for ${domainHost}, cutting manual processing times by over 80% with instant data synchronization.`;

    // 6. Tech Stack Inference
    const techStack: string[] = ["Next.js", "TypeScript", "Tailwind CSS"];
    if (/react/i.test(corpus)) techStack.push("React");
    if (/node|express/i.test(corpus)) techStack.push("Node.js");
    if (/postgres|pg\b/i.test(corpus)) techStack.push("PostgreSQL");
    if (/mongo/i.test(corpus)) techStack.push("MongoDB");
    if (/stripe/i.test(corpus)) techStack.push("Stripe API");
    if (/twilio/i.test(corpus)) techStack.push("Twilio API");
    if (/prisma/i.test(corpus)) techStack.push("Prisma ORM");
    if (/graphql/i.test(corpus)) techStack.push("GraphQL");

    const uniqueTechStack = Array.from(new Set(techStack));

    // 7. Cover Image (Real OpenGraph image or Live Screenshot API)
    let coverImage = getMetaContent("og:image") || getMetaContent("twitter:image") || "";
    if (coverImage && coverImage.startsWith("/")) {
      coverImage = parsedUrl.origin + coverImage;
    }
    if (!coverImage || !coverImage.startsWith("http")) {
      coverImage = `https://image.thum.io/get/width/1200/crop/800/${targetUrl}`;
    }

    // 8. Full Case Study Description (Markdown)
    const h2Headings = getAllTagContents("h2").slice(0, 4);
    const featureListItems =
      h2Headings.length > 0
        ? h2Headings.map((h) => `- **${h}:** Custom web feature designed to eliminate manual overhead.`).join("\n")
        : `- **Automated Workflows:** Replaced paper friction and offline manual tracking with real-time digital automation.
- **Instant System Telemetry:** Live data sync across connected dashboards and client interfaces.
- **Enterprise Architecture:** Engineered for maximum responsiveness, security, and uptime performance.`;

    const fullDesc = `### Product Case Study: ${extractedTitle}

${extractedDesc}

#### Key Operational Capabilities:
${featureListItems}

#### Live Working Demonstration:
Test the active deployed application directly via the **View Live Demo** link below.`;

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
        demoCredentials: "Role: Live Application | Access: Public Live Access Available",
        coverImage,
      },
    });
  } catch (error: any) {
    console.error("Auto-fill error:", error);
    return NextResponse.json({ error: error?.message || "Failed to auto-fill details from URL." }, { status: 500 });
  }
}
