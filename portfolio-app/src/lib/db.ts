import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const FALLBACK_PROJECTS = [
  {
    id: "p1-propflow",
    title: "PropFlow — Enterprise Rental & Property Management System",
    slug: "propflow-rental-management",
    category: "Rental",
    businessType: "Residential & Commercial Landlords (45+ Managed Units)",
    problemSolved: "Unreliable cash flow from manual rent chasing, paper lease agreements, and delayed tenant maintenance tracking.",
    keyResults: "Automated 95% of monthly rent collection via Stripe and cut tenant repair dispatch times by half.",
    deliveryTimeline: "Delivered in 18 Days",
    performanceMetric: "98/100 Mobile Speed & 0.4s API Response",
    scopeShipped: "8 Core Modules (Rentals, Leases, Maintenance, Financials)",
    shortDesc: "Real completed property management platform featuring automated tenant rent collection, online lease onboarding, maintenance ticket queues, and financial P&L reporting.",
    fullDesc: `### Product Case Study: PropFlow\nPropFlow is a fully custom rental management system built for real property operations. Rather than relying on generic per-unit SaaS subscriptions, this platform provides complete ownership over tenant leases, financial ledgers, and maintenance workflows.\n\n#### Operational Challenges Solved:\n- **Rent Collection Friction:** Replaced manual checks and offline bank transfers with automated recurring Stripe billing and automated SMS reminders.\n- **Tenant Maintenance Overhead:** Streamlined tenant repair requests with photo uploads, contractor assignment, and real-time status tracking.\n- **Lease Document Chaos:** Digital tenant onboarding with stored PDF lease agreements and deposit ledgers.\n\n#### Live Working Capability:\nYou can test the actual deployed platform right now via the Live Demo button using pre-configured landlord credentials.`,
    techStack: JSON.stringify(["Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "SQLite / PostgreSQL", "Stripe API"]),
    demoUrl: "https://demo.propflow-rental.com",
    demoCredentials: "Role: Landlord Admin | Email: demo@propflow.com | Pass: demo123",
    status: "PUBLISHED",
    isFeatured: true,
    coverImage: "/images/rental.png",
    galleryImages: JSON.stringify(["/images/rental.png"]),
    displayOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p2-nexusstock",
    title: "NexusStock — Real-Time Multi-Warehouse Inventory & Barcode Suite",
    slug: "nexusstock-inventory-system",
    category: "Inventory",
    businessType: "Wholesale Regional Distributor & E-Commerce Warehouse (4,000+ SKUs)",
    problemSolved: "Stockouts from slow paper inventory counts, untracked stock transfers, and batch expiration losses.",
    keyResults: "Achieved sub-second multi-location stock synchronization, 100% elimination of out-of-stock orders, and 3x faster receiving via web barcode scanning.",
    deliveryTimeline: "Delivered in 21 Days",
    performanceMetric: "Sub-Second Barcode Sync & 99.9% Uptime",
    scopeShipped: "10 Warehouse Modules & Live QR Scanner Integration",
    shortDesc: "High-throughput inventory control web app built for multi-location stock tracking, barcode receiving, dynamic low-stock reorder triggers, and supplier PO workflows.",
    fullDesc: `### Product Case Study: NexusStock\nNexusStock was engineered for a high-volume wholesale distributor that needed immediate visibility across multiple warehouse facilities and retail outlets.\n\n#### Operational Challenges Solved:\n- **Instant Stock Sync:** Sub-second stock movement logs prevent overselling across online channels and physical stores.\n- **Web Barcode & QR Receiving:** Warehouse staff use mobile devices to scan items during packing, picking, and receiving.\n- **Automated Reordering:** Low-stock threshold alerts auto-draft purchase orders for approved suppliers before stock runs out.\n\n#### Live Working Capability:\nTest-drive the live warehouse manager portal using the credentials provided below.`,
    techStack: JSON.stringify(["React", "Node.js", "Express", "PostgreSQL", "Redis", "Tailwind CSS", "WebSockets"]),
    demoUrl: "https://demo.nexusstock-inventory.com",
    demoCredentials: "Role: Warehouse Manager | Email: admin@nexusstock.com | Pass: inventory2026",
    status: "PUBLISHED",
    isFeatured: true,
    coverImage: "/images/inventory.png",
    galleryImages: JSON.stringify(["/images/inventory.png"]),
    displayOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p3-omnibooking",
    title: "OmniBooking — Custom Service Booking & Staff Scheduling Platform",
    slug: "omnibooking-platform",
    category: "Booking",
    businessType: "Multi-Location Service Clinic & Appointment Business",
    problemSolved: "High appointment no-show rates (over 25%) and staff schedule conflicts during peak hours.",
    keyResults: "Reduced appointment no-shows by 40% with automated Twilio SMS deposit reminders and live calendar sync.",
    deliveryTimeline: "Delivered in 14 Days",
    performanceMetric: "100% Mobile Responsive & 0.3s Slot Booking",
    scopeShipped: "6 Modules (3-Step Booking, Shift Roster, Deposit Gateways)",
    shortDesc: "Full-featured appointment booking platform built with staff shift management, client CRM histories, SMS deposit reminders, and payment gateway integration.",
    fullDesc: `### Product Case Study: OmniBooking\nOmniBooking provides appointment-driven businesses with a 3-step mobile booking engine that increased online customer bookings by 45%.\n\n#### Operational Challenges Solved:\n- **No-Show Reduction:** Integrated SMS deposit reminders via Twilio reduced missed appointments significantly.\n- **Staff Shift Roster:** Drag-and-drop availability scheduler with commission calculation per completed service.\n\n#### Live Working Capability:\nTest the live customer booking flow and manager dashboard via the demo link.`,
    techStack: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "GraphQL", "MongoDB", "Twilio API"]),
    demoUrl: "https://demo.omnibooking-app.com",
    demoCredentials: "Role: Business Manager | Email: demo@omnibooking.com | Pass: booking123",
    status: "PUBLISHED",
    isFeatured: true,
    coverImage: "/images/booking.png",
    galleryImages: JSON.stringify(["/images/booking.png"]),
    displayOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "p4-pulseanalytics",
    title: "PulseAnalytics — Executive SaaS Operations & Operations Cockpit",
    slug: "pulseanalytics-saas-dashboard",
    category: "CRM",
    businessType: "B2B Software Studio & Enterprise Client Operations",
    problemSolved: "Fragmented data across 5 different services with zero real-time visibility into customer churn and system health.",
    keyResults: "Unified business operational metrics into a single real-time dashboard with sub-second API latency graphs.",
    deliveryTimeline: "Delivered in 16 Days",
    performanceMetric: "60 FPS Real-Time Charts & Sub-second Telemetry",
    scopeShipped: "5 Telemetry Pipelines & Executive Revenue Reporting",
    shortDesc: "High-performance business intelligence dashboard aggregating live API metrics, subscription cohort analytics, and automated reporting pipelines.",
    fullDesc: `### Product Case Study: PulseAnalytics\nPulseAnalytics is a custom internal tool engineered to aggregate live system telemetry, subscription revenue, and user cohort health into a unified control center.`,
    techStack: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "PostgreSQL", "Docker"]),
    demoUrl: "https://demo.pulseanalytics-dashboard.com",
    demoCredentials: "Role: Executive Director | Email: exec@pulseanalytics.io | Pass: analytics2026",
    status: "PUBLISHED",
    isFeatured: true,
    coverImage: "/images/analytics.png",
    galleryImages: JSON.stringify(["/images/analytics.png"]),
    displayOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

import { cache } from "react";

export async function withDbTimeout<T>(promise: Promise<T>, timeoutMs = 2500, fallbackValue: T): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`[db] Query timed out after ${timeoutMs}ms, using fallback data`);
      resolve(fallbackValue);
    }, timeoutMs);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer!);
    return result;
  } catch (err) {
    clearTimeout(timer!);
    console.warn("[db] Query error, using fallback data:", err);
    return fallbackValue;
  }
}

export async function getFilteredFallbackProjects() {
  return FALLBACK_PROJECTS;
}

export const getSafeProjects = cache(async () => {
  try {
    const dbProjects = await withDbTimeout(
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
      2500,
      null
    );

    if (dbProjects !== null) {
      return dbProjects.filter((p) => {
        const fullText = `${p.title} ${p.shortDesc} ${p.keyResults || ""} ${p.slug}`.toLowerCase();
        return !fullText.includes("aeoncare") && !fullText.includes("health-care-ecommerce");
      });
    }

    return FALLBACK_PROJECTS.filter((p) => p.status === "PUBLISHED");
  } catch (e) {
    console.warn("Prisma query failed, returning fallback projects:", e);
    return FALLBACK_PROJECTS.filter((p) => p.status === "PUBLISHED");
  }
});

export async function getAllAdminProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    return dbProjects.filter((p) => {
      const fullText = `${p.title} ${p.shortDesc} ${p.keyResults || ""} ${p.slug}`.toLowerCase();
      return !fullText.includes("aeoncare") && !fullText.includes("health-care-ecommerce");
    });
  } catch (e) {
    console.warn("Prisma query failed for admin projects:", e);
    return [];
  }
}

export const getSafeProjectBySlug = cache(async (slug: string) => {
  if (!slug || slug.toLowerCase().includes("aeoncare") || slug.toLowerCase().includes("health-care")) {
    return null;
  }
  try {
    const project = await withDbTimeout(
      prisma.project.findUnique({ where: { slug } }),
      2500,
      undefined
    );

    if (project !== undefined) {
      return project;
    }

    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  } catch (e) {
    console.warn("Prisma query failed for slug:", slug, e);
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
  }
});

export const DEFAULT_SITE_SETTINGS: Record<string, string> = {
  contact_email: "prasanth.dev.studio@gmail.com",
  contact_phone: "+91 98765 43210",
  whatsapp_number: "+91 98765 43210",
  whatsapp_message: "Hi Prasanth, I saw your portfolio and would like to discuss building a custom software/web system.",
  developer_name: "Prasanth",
  privacy_policy_custom_notes: "",
  github_url: "https://github.com/BloodHunt029",
  linkedin_url: "https://linkedin.com/in/prasanth-dev",
  notification_email: "prasanth.dev.studio@gmail.com",
  resume_url: "/Prasanth_Developer_Capabilities.pdf",
  meta_title: "Prasanth | Real Business Software Built & Tested Live",
  meta_description:
    "Portfolio of real completed custom business software — Rental Management Systems, Inventory Control, and Custom Web Apps.",
};

export const DEFAULT_PRIVACY_POLICY_PAGE = {
  id: "privacy-policy-default",
  title: "Privacy Policy",
  slug: "privacy-policy",
  metaTitle: "Privacy Policy | Prasanth Dev",
  metaDescription: "Privacy Policy for Prasanth – Web Developer. Learn how your data and inquiries are safeguarded.",
  isPublished: true,
  isSystem: true,
  displayOrder: 1,
  createdAt: new Date("2026-10-08T00:00:00.000Z"),
  updatedAt: new Date("2026-10-08T00:00:00.000Z"),
  content: `### Privacy Policy
**Last updated: October 8, 2026**

This Privacy Policy explains how Prasanth – Web Developer ("I", "me", "my") collects, uses, and protects your information when you visit [https://prasanthportfolio-five.vercel.app](https://prasanthportfolio-five.vercel.app/) (the "Website") or contact me about web development services. By using this Website, you agree to this policy.

#### 1. Information I Collect
- **Information you give me:** When you fill in a contact or enquiry form, email me, call me, or message me, I may collect your name, email address, phone number, company name, and the details of your project or message.
- **Information collected automatically:** When you browse the Website, I and my service providers may automatically collect technical data such as your IP address, browser type, device type, operating system, pages visited, time spent on pages, referring website, and approximate location (city/country level).

#### 2. How I Use Your Information
- To reply to your enquiries and provide quotes or proposals
- To deliver web development, design, and related services you request
- To improve the Website, its content, and user experience
- To measure and improve my advertising and marketing performance
- To send project-related updates or follow-ups you have asked for
- To protect against spam, fraud, and misuse, and to meet legal obligations

*I do not sell your personal information.*

#### 3. Cookies and Similar Technologies
This Website uses cookies, pixels, and similar technologies to remember preferences, understand how visitors use the site, and measure advertising. You can control or delete cookies through your browser settings. Blocking some cookies may affect how parts of the Website work.

#### 4. Advertising, Analytics, and Third-Party Services
I use the following third-party services, which may collect data through cookies or tags:
- **Google Ads and Google Analytics** – to measure ad performance and site traffic, and to show relevant ads (including remarketing). Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this Website and other sites on the internet.
- **Meta (Facebook/Instagram) Pixel** – to measure conversions and show relevant ads on Meta platforms.
- **Vercel** – to host the Website and collect basic performance and traffic data.
- **Email, messaging, and form tools** – to receive and respond to your messages.

You can opt out of personalised advertising from Google at [Google Ads Settings](https://adssettings.google.com/) or at [www.aboutads.info](https://www.aboutads.info/), and install the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout). You can manage Meta ad preferences in your Facebook/Instagram [Ad Preferences](https://www.facebook.com/adpreferences). To learn how Google uses data from sites that use its services, visit [Google's Privacy & Terms](https://policies.google.com/technologies/partner-sites).

#### 5. Sharing of Information
I share information only with trusted service providers who help me operate the Website and my business (hosting, analytics, advertising, email), when required by law, or to protect my rights. These providers may only use your data to perform services for me.

#### 6. Data Retention
I keep your personal information only as long as needed for the purposes in this policy, such as responding to your enquiry, completing a project, or meeting legal and accounting requirements. After that, it is deleted or anonymised.

#### 7. Data Security
I use reasonable technical and organisational measures to protect your information, such as HTTPS encryption and restricted access. However, no method of transmission over the internet is 100% secure, so I cannot guarantee absolute security.

#### 8. Your Rights
Under applicable laws, including India's Digital Personal Data Protection Act, 2023, you may have the right to access, correct, update, or request deletion of your personal data, and to withdraw your consent at any time. To exercise these rights, email me at [prasanth.dev.studio@gmail.com](mailto:prasanth.dev.studio@gmail.com).

#### 9. Children's Privacy
This Website is not directed at children under 18, and I do not knowingly collect personal information from them. If you believe a child has given me their data, contact me and I will delete it.

#### 10. External Links
The Website may link to other websites (for example, client projects, GitHub, or social profiles). I am not responsible for the privacy practices of those sites.

#### 11. Changes to This Policy
I may update this policy from time to time. The "Last updated" date at the top shows when it was last changed. Continued use of the Website means you accept the updated policy.

#### 12. Contact Me
If you have any questions about this Privacy Policy, contact:
- **Prasanth – Web Developer**
- **Email:** [prasanth.dev.studio@gmail.com](mailto:prasanth.dev.studio@gmail.com)
- **Phone:** +91 98765 43210
- **Location:** Chennai, Tamil Nadu, India`,
};

export const getSafePages = cache(async () => {
  try {
    const dbPages = await withDbTimeout(
      prisma.page.findMany({
        where: { isPublished: true },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
      2500,
      null
    );

    if (dbPages !== null && dbPages.length > 0) {
      return dbPages;
    }

    return [DEFAULT_PRIVACY_POLICY_PAGE];
  } catch (e) {
    console.warn("Prisma query failed for getSafePages:", e);
    return [DEFAULT_PRIVACY_POLICY_PAGE];
  }
});

export const getSafePageBySlug = cache(async (slug: string) => {
  if (!slug) return null;
  const isPrivacy = slug === "privacy-policy";
  try {
    const page = await withDbTimeout(
      prisma.page.findUnique({ where: { slug } }),
      2500,
      undefined
    );

    if (page !== undefined && page !== null) {
      return page;
    }

    if (isPrivacy) {
      return DEFAULT_PRIVACY_POLICY_PAGE;
    }

    return null;
  } catch (e) {
    console.warn("Prisma query failed for page slug:", slug, e);
    if (isPrivacy) return DEFAULT_PRIVACY_POLICY_PAGE;
    return null;
  }
});

export async function getAllAdminPages() {
  try {
    const dbPages = await prisma.page.findMany({
      orderBy: [{ isSystem: "desc" }, { createdAt: "desc" }],
    });
    if (dbPages.length === 0) {
      return [DEFAULT_PRIVACY_POLICY_PAGE];
    }
    return dbPages;
  } catch (e) {
    console.warn("Prisma query failed for admin pages:", e);
    return [DEFAULT_PRIVACY_POLICY_PAGE];
  }
}

export const getSafeSiteSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    return await withDbTimeout(
      prisma.siteSetting.findMany().then((list) => {
        if (!list || list.length === 0) return DEFAULT_SITE_SETTINGS;
        const map = { ...DEFAULT_SITE_SETTINGS };
        list.forEach((item) => {
          map[item.key] = item.value;
        });
        return map;
      }),
      2500,
      DEFAULT_SITE_SETTINGS
    );
  } catch (e) {
    console.warn("Failed to fetch settings from DB, using defaults:", e);
    return DEFAULT_SITE_SETTINGS;
  }
});


