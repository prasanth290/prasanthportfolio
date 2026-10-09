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

  // Seed Privacy Policy Custom Page
  await prisma.page.upsert({
    where: { slug: "privacy-policy" },
    update: {},
    create: {
      id: "privacy-policy-default",
      title: "Privacy Policy",
      slug: "privacy-policy",
      metaTitle: "Privacy Policy | Prasanth Dev",
      metaDescription: "Privacy Policy for Prasanth – Web Developer. Learn how your data and inquiries are safeguarded.",
      isPublished: true,
      isSystem: true,
      displayOrder: 1,
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
- **Location:** Chennai, Tamil Nadu, India`,
    },
  });
  console.log("Seeded Privacy Policy Page");

  // Seed Terms and Conditions Custom Page
  await prisma.page.upsert({
    where: { slug: "terms" },
    update: {},
    create: {
      id: "terms-conditions-default",
      title: "Terms and Conditions",
      slug: "terms",
      metaTitle: "Terms and Conditions | Prasanth Dev",
      metaDescription: "Terms and Conditions for web development services provided by Prasanth – Web Developer.",
      isPublished: true,
      isSystem: true,
      displayOrder: 2,
      content: `### Terms and Conditions
**Last updated: October 8, 2026**

These Terms and Conditions ("Terms") govern your use of [https://prasanthportfolio-five.vercel.app](https://prasanthportfolio-five.vercel.app/) (the "Website") and any web development, design, or related services provided by Prasanth – Web Developer ("I", "me", "my"). By using the Website or hiring me, you agree to these Terms. If you do not agree, please do not use the Website.

#### 1. Services
I provide freelance web development services, which may include custom web applications, business websites, management systems (such as rental or inventory management), landing pages, and related maintenance and support. The exact scope, features, timeline, and price for each project will be agreed in writing (a proposal, quotation, or email) before work begins.

#### 2. Website Use
You agree to use the Website only for lawful purposes. You must not:
- Attempt to hack, disrupt, or gain unauthorised access to the Website or its servers
- Send spam, malware, or false or misleading information through any form
- Copy, scrape, or reproduce the Website content or design without permission

#### 3. Quotes, Payments, and Fees
- Quotes are valid for the period stated in the quote (or 15 days if none is stated).
- Unless agreed otherwise, an advance payment is required before work starts, and the balance is due on the milestones or completion date stated in the agreement.
- Payments are non-refundable once work on a stage has started, except where stated in section 9.
- Late payments may pause the project, delay delivery, or lead to extra charges as agreed.
- Third-party costs (domain, hosting, paid plugins, APIs, stock assets, SMS/email services) are paid by the client unless agreed otherwise. Applicable taxes will be added where required.

#### 4. Client Responsibilities
To deliver on time, you agree to provide content, images, logos, access credentials, feedback, and approvals promptly. Delays on your side may move the delivery timeline. You confirm that all material you provide is yours or you have the right to use it, and does not break any law or third-party rights.

#### 5. Revisions and Changes in Scope
Each project includes the number of revision rounds stated in the agreement. Requests beyond the agreed scope or revision limit are treated as change requests and may change the price and timeline. I will confirm any such change with you before starting it.

#### 6. Intellectual Property
- After full payment, you own the final custom deliverables made specifically for you (such as your site design and custom code), unless agreed otherwise in writing.
- Until full payment is received, all rights remain with me and you may not use the deliverables live.
- I keep ownership of my pre-existing tools, code libraries, templates, and general know-how, and you receive a licence to use them as part of your project.
- Third-party and open-source components stay under their own licences.
- Unless you ask me not to in writing, I may show the finished project in my portfolio and marketing, without revealing your confidential information.

#### 7. Confidentiality
I will keep your non-public business information, credentials, and data confidential and use it only for your project. This does not apply to information that is already public, or that I must disclose by law.

#### 8. Support, Maintenance, and Hosting
Unless a maintenance plan is agreed, support after delivery is limited to fixing bugs in my own work reported within the warranty period stated in the agreement (30 days if none is stated). New features, content updates, third-party service changes, and hosting management are separate, chargeable work.

#### 9. Cancellation and Refunds
Either party may end a project by written notice. If you cancel, you pay for all work completed and costs incurred up to the cancellation date. If I am unable to deliver the agreed work for reasons within my control, I will refund the part of the advance that relates to work not delivered.

#### 10. No Guarantee of Results
I build websites and applications to the agreed specification. I do not guarantee specific business results such as search rankings, traffic, leads, sales, or ad performance, as these depend on many factors outside my control.

#### 11. Disclaimer and Limitation of Liability
The Website is provided "as is" without warranties of any kind. To the fullest extent allowed by law, I am not liable for any indirect, incidental, or consequential loss (including loss of profit, data, or business) arising from use of the Website or my services. My total liability for any claim relating to a project is limited to the amount you paid me for that project.

#### 12. Third-Party Services and Links
The Website and projects may use or link to third-party services such as hosting, payment gateways, analytics, or APIs. I am not responsible for their availability, terms, or privacy practices.

#### 13. Privacy
How I collect and use your personal information is explained in my [Privacy Policy](/privacy-policy), which forms part of these Terms.

#### 14. Governing Law and Disputes
These Terms are governed by the laws of India. I will first try to resolve any dispute through discussion. If that fails, the courts at Chennai, Tamil Nadu, will have jurisdiction.

#### 15. Changes to These Terms
I may update these Terms from time to time. The "Last updated" date shows the latest version. Continued use of the Website after changes means you accept them. Terms agreed in a signed project agreement apply to that project even if this page changes.

#### 16. Contact
If you have any questions about these Terms, contact:
- **Prasanth – Web Developer**
- **Email:** [prasanth.dev.studio@gmail.com](mailto:prasanth.dev.studio@gmail.com)
- **Phone:** +91 98765 43210
- **Location:** Chennai, Tamil Nadu, India`,
    },
  });
  console.log("Seeded Terms and Conditions Page");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
