import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prasanthportfolio-five.vercel.app";

  // Static site routes
  const routes = ["", "/services", "/projects", "/demos", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic project routes
  try {
    const projects = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true },
    });

    const projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt.toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.warn("Failed to generate dynamic project sitemap routes:", error);
    return routes;
  }
}
