import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog";
import { getProducts } from "@/lib/sanityData";
import { client } from "@/sanity/lib/client";
import { Metadata } from "next"; // Import Metadata

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category as string;
  const search = params.search as string;

  let title = "All Products | VIP Online";
  let description =
    "Browse our extensive catalog of plywood, hardware, and interior fittings.";

  if (category && category !== "All") {
    title = `Buy ${category} Online | Wholesale Prices | VIP`;
    description = `Shop premium ${category} at wholesale rates in Bangalore. Top brands available.`;
  }

  if (search) {
    title = `Results for "${search}" | VIP Online`;
  }

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/products${category ? `?category=${category}` : ""}`,
    },
  };
}

export default async function CatalogPage() {
  // 1. Fetch Products
  const products = await getProducts();

  // 2. Fetch Categories
  const categories = await client.fetch(`*[_type == "category"]{
    "id": _id,
    "name": title
  }`);

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductCatalog products={products} categories={categories} />
      <Footer />
    </main>
  );
}
