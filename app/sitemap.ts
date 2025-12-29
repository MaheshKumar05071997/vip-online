import { MetadataRoute } from 'next';
import { FEATURED_PRODUCTS } from './data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vip-online.vercel.app'; // REPLACE THIS WITH YOUR ACTUAL DOMAIN LATER

  // 1. Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // 2. Generate Dynamic Product Pages
  const productPages = FEATURED_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages];
}