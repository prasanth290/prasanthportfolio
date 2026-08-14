import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Prasanth Dev Studio",
    url: "https://prasanthportfolio-five.vercel.app",
    description: "High-performance custom web app development, rental management software, and enterprise software engineering.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: "Prasanth",
      jobTitle: "Senior Software Engineer & Web Developer",
      sameAs: [
        "https://github.com/BloodHunt029",
        "https://linkedin.com/in/prasanth-dev",
      ],
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Rental Management Systems",
      "Inventory Management Systems",
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
      </body>
    </html>
  );
}
