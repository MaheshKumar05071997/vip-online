import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/ProductCatalog"; // Import the new component
import { getProducts } from "@/lib/sanityData";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic"; // Ensure it doesn't cache stale data indefinitely

export default async function CatalogPage() {
  // 1. Fetch Products from Sanity
  const products = await getProducts();

  // 2. Fetch Categories from Sanity (for the sidebar)
  const categories = await client.fetch(`*[_type == "category"]{
    "id": _id,
    "name": title
  }`);

  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Pass the fetched data to the client component */}
      <ProductCatalog products={products} categories={categories} />
      <Footer />
    </main>
  );
}
