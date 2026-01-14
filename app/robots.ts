import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://viponline.in"; // REPLACE WITH REAL DOMAIN

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/admin"], // Hide admin pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
