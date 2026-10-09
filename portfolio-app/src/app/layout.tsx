import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuickContactWidget } from "@/components/ui/QuickContactWidget";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Prasanth | Custom Business Web Apps & Software Solutions",
  description:
    "Freelance custom web development studio specializing in Rental Management Systems, Inventory Control, and Enterprise Web Applications. Explore live interactive demos.",
  keywords: [
    "custom web app developer",
    "rental management software developer",
    "inventory management system custom",
    "freelance software engineer",
    "business web app developer",
  ],
  authors: [{ name: "Prasanth" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://prasanthportfolio-five.vercel.app"),
  openGraph: {
    title: "Prasanth | Real Business Software Built & Tested Live",
    description: "Bespoke rental management systems, inventory tracking suites, and custom web applications.",
    siteName: "Prasanth Dev Studio",
    locale: "en_US",
    type: "website",
  },
};

import { getSafeSiteSettings } from "@/lib/db";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSafeSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://prasanthportfolio-five.vercel.app/#person",
        name: siteSettings.developer_name || "Prasanth",
        jobTitle: "Full-Stack Software Engineer & Web Developer",
        url: "https://prasanthportfolio-five.vercel.app",
        image: "https://prasanthportfolio-five.vercel.app/images/developer-workbench.png",
        sameAs: [
          siteSettings.github_url || "https://github.com/BloodHunt029",
          siteSettings.linkedin_url || "https://linkedin.com/in/prasanth-dev",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "India",
        },
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Custom Web Development",
          "Rental Management Systems",
          "Inventory Control Systems",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://prasanthportfolio-five.vercel.app/#service",
        name: "Prasanth – Web Developer Studio",
        url: "https://prasanthportfolio-five.vercel.app",
        logo: "https://prasanthportfolio-five.vercel.app/images/developer-workbench.png",
        description: "Bespoke web development services, rental management applications, and inventory tracking systems for business operations.",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          addressCountry: "India",
        },
        telephone: siteSettings.contact_phone || "+91 98765 43210",
        email: siteSettings.contact_email || "prasanth.dev.studio@gmail.com",
        founder: { "@id": "https://prasanthportfolio-five.vercel.app/#person" },
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <QuickContactWidget
          whatsappNumber={siteSettings.whatsapp_number || siteSettings.contact_phone}
          contactPhone={siteSettings.contact_phone || siteSettings.whatsapp_number}
          customMessage={siteSettings.whatsapp_message}
        />
      </body>
    </html>
  );
}
