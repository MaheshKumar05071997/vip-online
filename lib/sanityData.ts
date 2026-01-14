import { client } from "@/sanity/lib/client";
import { Product } from "@/app/data";
import { urlFor } from "@/sanity/lib/image";

export async function getProducts(): Promise<Product[]> {
  // --- UPDATED QUERY ---
  // 1. Sort by 'order'. Missing order becomes 99999 (pushes to end).
  // 2. Secondary sort by 'name' ensures stability if orders are same.
  const query = `*[_type == "product"] | order(coalesce(order, 99999) asc, name asc) {
    _id,
    name,
    "category": category->title, 
    brand,
    image,
    variants[] {
      name,
      price,
      originalPrice,
      "image": image.asset->url,
      thickness,
      sizes,
      priceMapping[] {
        thickness,
        size,
        price,
        originalPrice
      },
      specs[] {
        key,
        value
      }
    }
  }`;

  // --- CRITICAL FIX: revalidate: 0 ---
  // This forces Next.js to fetch fresh data on every request, ignoring the cache.
  const data = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return data.map((item: any) => {
    // --- VARIANT HANDLING ---
    // If variants exist in CMS, use them.
    // If NOT, create a dummy "Standard" variant so the UI works consistently.
    const rawVariants =
      item.variants && item.variants.length > 0
        ? item.variants
        : [
            {
              name: "Standard",
              price: item.price,
              originalPrice: item.originalPrice,
            },
          ];

    const processedVariants = rawVariants.map((v: any) => {
      const priceList: Record<
        string,
        { price: string; originalPrice?: string }
      > = {};

      if (v.priceMapping) {
        v.priceMapping.forEach((pm: any) => {
          // Key Logic: Create a unique key for lookup
          let key = "";
          if (pm.thickness && pm.size) {
            key = `${pm.thickness}_${pm.size}`;
          } else if (pm.thickness) {
            key = pm.thickness;
          } else if (pm.size) {
            key = pm.size;
          }

          if (key) {
            priceList[key] = {
              price: String(pm.price),
              originalPrice: pm.originalPrice
                ? String(pm.originalPrice)
                : undefined,
            };
          }
        });
      }

      return {
        name: v.name || "Standard",
        image: v.image || (item.image ? urlFor(item.image).url() : ""),
        price: v.price,
        originalPrice: v.originalPrice,
        thickness: v.thickness || [],
        sizes: v.sizes || [],
        priceList: priceList,
        specs: v.specs
          ? v.specs.reduce(
              (acc: any, curr: any) => ({ ...acc, [curr.key]: curr.value }),
              {}
            )
          : undefined,
      };
    });

    return {
      id: item._id,
      name: item.name,
      category: item.category || "Uncategorized",
      brand: item.brand || "Generic",
      image: item.image ? urlFor(item.image).url() : "/placeholder.png",
      variants: processedVariants,
    };
  });
}

// --- NEW SMART SEARCH FUNCTION ---
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  // Logic:
  // 1. Check if Name, Brand, or Category Name matches directly.
  // 2. OR check if the product's category ID matches the category ID of a product found by name.

  const query = `*[_type == "product" && (
    name match $term + "*" || 
    brand match $term + "*" || 
    category->title match $term + "*" ||
    category._ref in *[_type == "product" && name match $term + "*"].category._ref
  )] {
    _id,
    name,
    "category": category->title,
    brand,
    image,
    variants[] {
      name,
      "image": image.asset->url
    }
  }[0...20]`; // Increased limit from 5 to 20 so you can actually see the related products

  const data = await client.fetch(query, { term: searchTerm });

  // Map the data (same as before)
  return data.map((item: any) => ({
    id: item._id,
    name: item.name,
    category: item.category || "Uncategorized",
    brand: item.brand || "Generic",
    image: item.image ? urlFor(item.image).url() : "/placeholder.png",
    variants: item.variants || [],
  }));
}
