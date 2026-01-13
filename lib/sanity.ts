import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // You'll get this from sanity.config.ts
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Set to false for fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// This function fetches products and converts them to your EXISTING format
export async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    brand,
    category,
    price,
    originalPrice,
    "image": image.asset->url,
    variants,
    specs
  }`;

  const products = await client.fetch(query);

  // Map Sanity data to your specific App structure
  return products.map((p: any) => ({
    id: p._id, // NOTE: ID is now a STRING (e.g. "Draft..."), not a Number
    name: p.name,
    brand: p.brand,
    category: p.category,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    variants: p.variants || [],
    specs: p.specs 
      ? p.specs.reduce((acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }), {}) 
      : {},
  }));
}