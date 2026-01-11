import { source } from "@/lib/source";
import { readdir } from "fs/promises";
import { join } from "path";
import type { MetadataRoute } from "next";

const baseUrl = "https://hytalemodding.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0,
  });

  // Get all pages from source
  const pages = source.getPages();

  for (const page of pages) {
    // Skip if page doesn't have url
    if (!page.url) continue;

    sitemap.push({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  await addProjectPages(sitemap);

  return sitemap;
}

async function addProjectPages(sitemap: MetadataRoute.Sitemap) {
  const projectsPath = join(process.cwd(), "content", "projects");

  try {
    const files = await readdir(projectsPath);
    const mdxFiles = files.filter(
      (file) => file.endsWith(".mdx") && file !== "example.mdx",
    );

    sitemap.push({
      url: `${baseUrl}/en/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const file of mdxFiles) {
      const slug = file.replace(/\.mdx$/, "");
      sitemap.push({
        url: `${baseUrl}/en/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch (error) {
    console.error("Error reading projects for sitemap:", error);
  }
}
