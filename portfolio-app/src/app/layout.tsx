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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark`}>
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
