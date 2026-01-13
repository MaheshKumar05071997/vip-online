import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/sanityData";
import { notFound } from "next/navigation";
import VariantDetails from "@/components/VariantDetails"; // Import the client component

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name: string }>; // NOTE: searchParams is also a Promise in Next 15
};

export default async function VariantPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { name } = await searchParams; // Get ?name=Value

  // 1. Fetch products from Sanity
  const products = await getProducts();

  // 2. Find the product by string ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <Navbar />
      {/* 3. Pass data to the Client Component */}
      <VariantDetails product={product} variantName={name} />
      <Footer />
    </main>
  );
}
