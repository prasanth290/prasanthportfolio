import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return crypto.createHash("sha256").update(password + "devstudio_salt_2026").digest("hex");
}

async function main() {
  console.log("Seeding database with updated proof-first case study PRD content...");

  // Ensure Admin User exists
  const passwordHash = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@devstudio.com" },
    update: { passwordHash },
    create: {
      email: "admin@devstudio.com",
      name: "Prasanth Dev",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("Created Admin:", admin.email);

  // Create/Update Flagship Projects (Real Built Software Case Studies)
  const projectDataList = [
    {
      id: "p1-propflow",
      title: "PropFlow — Enterprise Rental & Property Management System",
      slug: "propflow-rental-management",
      category: "Rental",
      businessType: "Residential & Commercial Landlords (45+ Managed Units)",
      problemSolved: "Unreliable cash flow from manual rent chasing, paper lease agreements, and delayed tenant maintenance tracking.",
      keyResults: "Automated 95% of monthly rent collection via Stripe and cut tenant repair dispatch times by half.",
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
    },
    {
      id: "p2-nexusstock",
      title: "NexusStock — Real-Time Multi-Warehouse Inventory & Barcode Suite",
      slug: "nexusstock-inventory-system",
      category: "Inventory",
      businessType: "Wholesale Regional Distributor & E-Commerce Warehouse (4,000+ SKUs)",
      problemSolved: "Stockouts from slow paper inventory counts, untracked stock transfers, and batch expiration losses.",
      keyResults: "Achieved sub-second multi-location stock synchronization, 100% elimination of out-of-stock orders, and 3x faster receiving via web barcode scanning.",
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
    },
    {
      id: "p3-omnibooking",
      title: "OmniBooking — Custom Service Booking & Staff Scheduling Platform",
      slug: "omnibooking-platform",
      category: "Booking",
      businessType: "Multi-Location Service Clinic & Appointment Business",
      problemSolved: "High appointment no-show rates (over 25%) and staff schedule conflicts during peak hours.",
      keyResults: "Reduced appointment no-shows by 40% with automated Twilio SMS deposit reminders and live calendar sync.",
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
    },
    {
      id: "p4-pulseanalytics",
      title: "PulseAnalytics — Executive SaaS Operations & Operations Cockpit",
      slug: "pulseanalytics-saas-dashboard",
      category: "CRM",
      businessType: "B2B Software Studio & Enterprise Client Operations",
      problemSolved: "Fragmented data across 5 different services with zero real-time visibility into customer churn and system health.",
      keyResults: "Unified business operational metrics into a single real-time dashboard with sub-second API latency graphs.",
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
    },
  ];

  for (const p of projectDataList) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: p,
    });
  }

  console.log("Seeded Proof-First Projects");

  // Seed Sample Leads if empty
  const leadCount = await prisma.lead.count();
  if (leadCount === 0) {
    await prisma.lead.createMany({
      data: [
        {
          name: "Marcus Vance",
          email: "marcus@vanceproperties.com",
          phone: "+1 (555) 389-1122",
          projectType: "Rental Management",
          budgetRange: "$3,000 - $5,000",
          message:
            "Hi Prasanth, I tested your PropFlow demo and love how the tenant rent collection and maintenance queue work. I manage 45 residential units in Texas and want to adapt a similar system for our business.",
          utmSource: "google_ads",
          utmCampaign: "rental_search_campaign",
          status: "NEW",
          notes: "Tested PropFlow demo. High intent landlord.",
        },
        {
          name: "Sarah Jenkins",
          email: "sjenkins@apexsupply.io",
          phone: "+1 (555) 902-3344",
          projectType: "Inventory System",
          budgetRange: "$5,000+",
          message:
            "We run 2 distribution hubs with over 4,000 SKUs. Saw your NexusStock demo and need a similar web app with barcode scanner support.",
          utmSource: "meta_ads",
          utmCampaign: "inventory_b2b_retargeting",
          status: "CONTACTED",
          notes: "Tested NexusStock demo.",
        },
      ],
    });
  }

  // Seed Site Settings
  const settings = [
    { key: "contact_email", value: "prasanth@customwebstudio.com" },
    { key: "contact_phone", value: "+1 (555) 019-2831" },
    { key: "contact_whatsapp", value: "+15550192831" },
    { key: "meta_title", value: "Prasanth | Real Business Software Built & Tested Live" },
    {
      key: "meta_description",
      value:
        "Portfolio of real completed custom business software — Rental Management Systems, Inventory Control, and Custom Web Apps. See live working demos.",
    },
    { key: "ga4_id", value: "G-DEVSTUDIO2026" },
    { key: "meta_pixel_id", value: "PIXEL-987654321" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("Seeded Updated Site Settings");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
