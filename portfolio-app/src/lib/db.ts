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

export async function getFilteredFallbackProjects() {
  return FALLBACK_PROJECTS;
}

export async function getSafeProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
    });
    const cleaned = dbProjects.filter((p) => {
      const fullText = `${p.title} ${p.shortDesc} ${p.keyResults || ""} ${p.slug}`.toLowerCase();
      return !fullText.includes("aeoncare") && !fullText.includes("health-care-ecommerce");
    });
    return cleaned.length > 0 ? cleaned : FALLBACK_PROJECTS.filter((p) => p.status === "PUBLISHED");
  } catch (e) {
    console.warn("Prisma query failed, returning fallback projects:", e);
    return FALLBACK_PROJECTS.filter((p) => p.status === "PUBLISHED");
  }
}

export async function getAllAdminProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    const cleaned = dbProjects.filter((p) => {
      const fullText = `${p.title} ${p.shortDesc} ${p.keyResults || ""} ${p.slug}`.toLowerCase();
      return !fullText.includes("aeoncare") && !fullText.includes("health-care-ecommerce");
    });
    return cleaned.length > 0 ? cleaned : FALLBACK_PROJECTS;
  } catch (e) {
    console.warn("Prisma query failed, returning fallback projects:", e);
    return FALLBACK_PROJECTS;
  }
}

export async function getSafeProjectBySlug(slug: string) {
  if (slug.toLowerCase().includes("aeoncare") || slug.toLowerCase().includes("health-care")) {
    return null;
  }
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project) return project;
  } catch (e) {
    console.warn("Prisma query failed for slug:", slug, e);
  }
  return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
}

