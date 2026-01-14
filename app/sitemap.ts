import { MetadataRoute } from "next";
import { getProducts } from "@/lib/sanityData"; // Fetch real data

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://viponline.in"; // REPLACE WITH REAL DOMAIN

  // 1. Fetch all products from Sanity
  const products = await getProducts();

  // 2. Define Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // 3. Generate Dynamic Product URLs
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(), // If you have 'updatedAt' from Sanity, use that
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productUrls];
}
