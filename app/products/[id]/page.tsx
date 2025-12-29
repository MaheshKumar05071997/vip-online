import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn"; // Import Animation
import { FEATURED_PRODUCTS } from "@/app/data";
import { Phone, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next"; // Import Metadata type

type Props = {
  params: Promise<{ id: string }>;
};

// --- SEO: DYNAMIC METADATA GENERATOR ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = FEATURED_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name, // e.g. "Hafele Kitchen Tandem Box"
    description: `Buy ${product.name} by ${product.brand}. Premium ${product.category} at wholesale prices from VIP Online.`,
    openGraph: {
      images: [product.image], // Shows the product image when shared on WhatsApp/Facebook
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function ProductPage({ params }: Props) {
  // 1. Await the params object (Critical for Next.js 15)
  const { id } = await params;

  // 2. Now we can safely use the ID
  const product = FEATURED_PRODUCTS.find((p) => p.id === Number(id));

  // 3. If product not found, show 404
  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <FadeIn direction="right">
          <Link
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
        </FadeIn>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Image */}
            <FadeIn direction="right" className="h-full">
              <div className="h-96 md:h-[600px] bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>

            {/* Right Side: Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <FadeIn delay={0.1}>
                <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-blue-50 text-primary px-4 py-2 rounded-lg inline-block font-semibold mb-6 self-start">
                  Brand: {product.brand}
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  Premium quality {product.name.toLowerCase()} from{" "}
                  {product.brand}. Designed for durability and style. Perfect
                  for modern interiors.
                </p>
              </FadeIn>

              {/* Features List */}
              <FadeIn delay={0.4}>
                <div className="space-y-3 mb-8">
                  {[
                    "Authentic Product",
                    "Warranty Included",
                    "Best Price Guarantee",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Call to Action */}
              <FadeIn delay={0.5}>
                <div className="flex flex-col gap-4">
                  <a
                    href={`https://wa.me/919876543210?text=Hi, I am interested in ${product.name}`}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition flex justify-center items-center gap-2 shadow-lg shadow-green-100"
                  >
                    <Phone className="w-5 h-5" /> Enquire on WhatsApp
                  </a>
                  <p className="text-center text-gray-400 text-sm">
                    Instant response • Bulk discounts available
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
