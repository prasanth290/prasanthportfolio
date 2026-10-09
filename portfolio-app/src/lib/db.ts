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

export const FALLBACK_PROJECTS: any[] = [];

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
  return [];
}

export const getSafeProjects = cache(async () => {
  try {
    const dbProjects = await withDbTimeout(
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      }),
      2500,
      []
    );

    if (dbProjects !== null) {
      return dbProjects.filter((p) => {
        const fullText = `${p.title} ${p.shortDesc} ${p.keyResults || ""} ${p.slug}`.toLowerCase();
        return !fullText.includes("aeoncare") && !fullText.includes("health-care-ecommerce");
      });
    }

    return [];
  } catch (e) {
    console.warn("Prisma query failed, returning fallback projects:", e);
    return [];
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

export const DEFAULT_TERMS_PAGE = {
  id: "terms-conditions-default",
  title: "Terms and Conditions",
  slug: "terms",
  metaTitle: "Terms and Conditions | Prasanth Dev",
  metaDescription: "Terms and Conditions for web development services provided by Prasanth – Web Developer.",
  isPublished: true,
  isSystem: true,
  displayOrder: 2,
  createdAt: new Date("2026-10-08T00:00:00.000Z"),
  updatedAt: new Date("2026-10-08T00:00:00.000Z"),
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

    return [DEFAULT_PRIVACY_POLICY_PAGE, DEFAULT_TERMS_PAGE];
  } catch (e) {
    console.warn("Prisma query failed for getSafePages:", e);
    return [DEFAULT_PRIVACY_POLICY_PAGE, DEFAULT_TERMS_PAGE];
  }
});

export const getSafePageBySlug = cache(async (slug: string) => {
  if (!slug) return null;
  const isPrivacy = slug === "privacy-policy";
  const isTerms = slug === "terms" || slug === "terms-and-conditions";
  try {
    const page = await withDbTimeout(
      prisma.page.findUnique({ where: { slug: isTerms ? "terms" : slug } }),
      2500,
      undefined
    );

    if (page !== undefined && page !== null) {
      return page;
    }

    if (isPrivacy) return DEFAULT_PRIVACY_POLICY_PAGE;
    if (isTerms) return DEFAULT_TERMS_PAGE;

    return null;
  } catch (e) {
    console.warn("Prisma query failed for page slug:", slug, e);
    if (isPrivacy) return DEFAULT_PRIVACY_POLICY_PAGE;
    if (isTerms) return DEFAULT_TERMS_PAGE;
    return null;
  }
});

export async function getAllAdminPages() {
  try {
    const dbPages = await prisma.page.findMany({
      orderBy: [{ isSystem: "desc" }, { createdAt: "desc" }],
    });
    if (dbPages.length === 0) {
      return [DEFAULT_PRIVACY_POLICY_PAGE, DEFAULT_TERMS_PAGE];
    }
    return dbPages;
  } catch (e) {
    console.warn("Prisma query failed for admin pages:", e);
    return [DEFAULT_PRIVACY_POLICY_PAGE, DEFAULT_TERMS_PAGE];
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


