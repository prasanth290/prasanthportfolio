# Product Requirements Document (PRD)
## Freelance Web Development Services & Portfolio Website

**Document owner:** [Your Name]
**Version:** 1.0
**Date:** August 9, 2026
**Status:** Draft

---

## 1. Overview

A single-owner (freelancer/agency-of-one) marketing website that promotes **custom web development and software solutions for businesses** — drives traffic through paid ads, showcases **already-built, working products** (not just hypothetical service offerings) via **live demo links and project images**, captures leads/inquiries, and gives the owner a simple **admin panel** to add/edit/delete projects and images without touching code.

The portfolio spans any custom business solution the owner has actually built — **Rental Management System** and **Inventory Management System** are two real, completed products (built for actual businesses) used as flagship proof of capability. The messaging should read as "here's what I've already built — see it live, and I can customize/adapt it or build something similar for your business" rather than "here's a list of features I will build for you." This is a portfolio-first site, not a feature-brochure/agency-pitch site.

### 1.1 Problem Statement
Potential clients searching for a custom software/web app developer for their business need proof that goes beyond promises — they want to see a **real, working product** (live demo, real screenshots) before trusting someone with their own project. The owner needs to update this proof (new projects, new screenshots) frequently without developer overhead each time.

### 1.2 Goals
- Convert paid ad traffic into qualified leads (inquiry form / call bookings)
- Build credibility through live, interactive demos rather than static screenshots alone
- Let the owner self-manage all portfolio content via an admin dashboard
- Rank organically over time for both niche keywords (rental management software, inventory system for small business) and broader ones (custom web app developer, custom business software developer)

### 1.3 Non-Goals
- Not a SaaS product signup platform (demos are showcases, not live customer accounts)
- Not a multi-vendor/team marketplace — single owner/admin only
- Not building a full CMS/blogging platform (a lightweight blog may be phase 2)

---

## 2. Target Audience & Personas

| Persona | Description | What they need to see |
|---|---|---|
| Small property owner / property manager | Wants custom rental management software (tenants, leases, payments) | Live demo of rental system, pricing hints, contact form |
| Retail/warehouse owner | Wants inventory tracking, stock alerts, reporting | Live demo of inventory system, feature list, screenshots |
| General business owner | Needs a custom web app/software tool for their specific operation (booking, CRM, POS, internal dashboard, etc.) but isn't sure what's possible | Portfolio breadth across industries, testimonials, clear service packages |
| Referral/organic visitor | Found via Google/social, comparing freelancers | Case studies, tech stack credibility, easy contact |

---

## 3. Information Architecture / Sitemap

```
/                      → Home (hero, services summary, featured projects, CTA)
/services              → Service offerings & packages
/projects              → Portfolio grid (filterable: Rental / Inventory / Other)
/projects/[slug]       → Project detail page (images, description, tech stack, live demo link)
/demos                 → Curated list of live demo links (quick access)
/about                 → About the developer, skills, experience
/contact               → Lead capture form, contact info, booking link
/landing/[campaign]    → Dedicated ad-landing pages (optional, per campaign)
/admin (auth-protected)
   /admin/login
   /admin/projects            → List/manage projects
   /admin/projects/new        → Create project
   /admin/projects/[id]/edit  → Edit project + manage images
   /admin/leads                → View submitted inquiries
   /admin/settings             → Site-wide settings (contact info, SEO meta, ad pixel IDs)
```

---

## 4. Functional Requirements

### 4.1 Public Website

**Home Page**
- Hero section with value proposition anchored in proof, not promises — e.g. "Real Software I've Built, Ready to See Live" + primary CTA ("View Live Demos" / "Get a Custom Quote")
- Flagship projects section: **Rental Management System** and **Inventory Management System** shown as real, completed, working products — each with a "View Live Demo" button and a few real screenshots, framed as case studies ("Built for [type of business] — here's what it does") rather than a feature checklist of what could be built
- Additional featured projects (3–6 more, pulled dynamically from admin-managed project list)
- Testimonials/social proof section (optional, phase 2)
- Secondary CTA (contact/lead form) — positioned as "want something similar, or fully custom?" rather than a generic quote form

**Services Page**
- Framed around what's already been delivered: "Products I've Built" (Rental Management System, Inventory Management System) each linking to its full project detail/case-study page, plus "Custom Business Web Apps" and "Maintenance/Support" as adjacent offerings
- Avoid a generic feature-checklist/agency-brochure tone (e.g. long bullet lists of features "included" in a hypothetical build) — instead point to the real, live project as the proof, with a short note that it can be customized or a similar system built for the visitor's business
- Optional package tiers (Starter / Standard / Custom quote) if pricing structure is wanted

**Projects (Portfolio) Page**
- Grid/list of all projects with thumbnail image, title, short description, category tag
- Filter/sort by category (Rental, Inventory, Other) and tech stack
- Each card links to project detail page and/or direct "Live Demo" button

**Project Detail Page**
- Title, business type it was built for, problem it solved, key results/impact
- Full description, tech stack used
- Image gallery (multiple real screenshots per project, lightbox view)
- "View Live Demo" button (opens demo URL, new tab)
- "Request Similar Project" CTA → contact form pre-filled with project reference

**Demos Page**
- Simple curated list/table of all live demo links with credentials note if demo requires login (e.g., "Use demo login: user/pass")
- Useful as a direct landing target for ad campaigns

**Contact / Lead Capture**
- Form fields: Name, Email, Phone (optional), Project type (dropdown: Rental / Inventory / Other), Budget range (optional), Message
- Spam protection (reCAPTCHA or honeypot)
- On submit: stored in admin "Leads" list + optional email notification to owner
- Optional: calendar booking link (Calendly-style) for discovery calls

**Landing Pages for Ads**
- Lightweight, focused pages per ad campaign (e.g., `/landing/rental-management`) with a single CTA, matching ad messaging for better Quality Score / conversion rate
- Must support UTM parameter capture for attribution

### 4.2 Admin Panel (Backend)

**Authentication**
- Single-admin login (email/password), optionally with 2FA
- Session-based auth with logout

**Project Management (CRUD)**
- Create/edit/delete project entries with fields:
  - Title, slug (URL), category (Rental/Inventory/Other/custom tags)
  - Business type built for, problem solved, key results/impact (case-study fields)
  - Short description (for cards), full description (rich text)
  - Tech stack tags
  - Live demo URL + optional demo credentials
  - Status (Draft / Published)
  - Display order / "Featured" flag (for homepage)
- Multi-image upload per project (drag-and-drop), reorder images, set a cover/thumbnail image, delete images
- Image optimization on upload (resize/compress automatically)

**Lead/Inquiry Management**
- View list of form submissions with filters (date, project type, status: New/Contacted/Closed)
- Mark as read/contacted, add internal notes
- Export to CSV (optional)

**Site Settings**
- Update contact info, social links, meta title/description defaults
- Manage ad tracking pixel/analytics IDs (Google Analytics, Meta Pixel, Google Ads conversion tag)

---

## 5. Non-Functional Requirements

- **Performance:** Homepage and project pages should load under 2.5s (LCP) — critical since ad traffic is paid and bounces are costly
- **SEO:** Server-rendered or statically generated pages for public routes; clean URLs, meta tags, sitemap.xml, structured data (schema.org for Portfolio/Service)
- **Responsive:** Fully mobile-responsive (majority of ad traffic often mobile)
- **Security:** Admin routes protected, file upload validation (type/size limits), HTTPS enforced, rate-limited contact form
- **Analytics/Ad tracking:** Google Analytics 4, Meta Pixel, Google Ads conversion tracking on lead form submit and demo-link clicks
- **Accessibility:** Reasonable WCAG AA compliance (alt text fields for all images, managed via admin)
- **Scalability:** Should comfortably handle a growing portfolio (50–200 projects) without redesign

---

## 6. Suggested Tech Stack (flexible — not prescriptive)

| Layer | Options |
|---|---|
| Frontend | Next.js (React) — SSR/SSG for SEO, or lightweight alternative |
| Backend/Admin | Next.js API routes / Node.js + Express, or a headless CMS (Sanity/Strapi) for project content |
| Database | PostgreSQL / MySQL, or CMS-managed storage |
| Image storage | Cloud storage (S3/Cloudinary) with auto-optimization |
| Auth | NextAuth / simple JWT session for single admin user |
| Hosting | Vercel/Netlify (frontend) + managed DB (Supabase/Railway) |
| Forms | Native form + email service (Resend/SendGrid) or form service (Formspree) |

*A headless CMS (e.g., Sanity or Strapi) can replace a large chunk of custom admin-panel development — worth evaluating before building a fully custom admin from scratch.*

---

## 7. Success Metrics (KPIs)

- Cost per lead (CPL) from ad campaigns
- Lead-to-call/consultation conversion rate
- Live demo click-through rate from project pages
- Organic traffic growth month-over-month
- Average page load time / Core Web Vitals scores
- Number of published projects (portfolio growth as trust signal)

---

## 8. Phased Rollout

**Phase 1 — MVP**
- Home, Services, Projects grid, Project detail, Contact form
- Admin: login, project CRUD with image upload
- Basic analytics + one ad landing page

**Phase 2**
- Leads dashboard in admin
- Dedicated per-campaign landing pages
- Testimonials section, blog (optional)

**Phase 3**
- A/B testing on landing pages
- Booking/calendar integration
- Multi-language support (if targeting non-English markets)

---

## 9. Risks & Open Questions

- **Demo hosting:** Live demos need their own hosting/uptime — decide whether demos run on subdomains, separate servers, or sandboxed instances with seeded dummy data
- **Demo data safety:** Public demos of rental/inventory systems must use fake/sample data only, reset periodically to avoid abuse
- Content volume at launch: how many real projects/case studies are ready to publish on day one?
- Budget/timeline for ad spend and whether Google Ads, Meta Ads, or both are the initial channels
- Should the admin CMS be fully custom-built or use an existing headless CMS to save development time?

---

## 10. Appendix — Contact Form Field Reference

| Field | Type | Required |
|---|---|---|
| Name | Text | Yes |
| Email | Email | Yes |
| Phone | Text | No |
| Project Type | Dropdown (Rental / Inventory / Other) | Yes |
| Budget Range | Dropdown | No |
| Message | Textarea | Yes |
| UTM Source/Campaign (hidden) | Text | Auto-captured |
