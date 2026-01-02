import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import { FEATURED_PRODUCTS } from "@/app/data";
import { Phone, Check, ArrowLeft, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

// --- SEO: DYNAMIC METADATA GENERATOR ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = FEATURED_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: `Buy ${product.name} at wholesale prices. Authorized dealer for ${product.brand}.`,
    openGraph: {
      images: [product.image],
    },
  };
}

// --- MAIN PAGE COMPONENT ---
export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = FEATURED_PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return notFound();
  }

  // --- SPECIAL LAYOUT LOGIC FOR ADHESIVES ---
  const isAdhesive = product.category === "Adhesive";

  // Grid Layout: Adhesives get 5 columns (smaller cards), others get 3.
  const gridClass = isAdhesive
    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4" // Compact Grid
    : "grid grid-cols-1 md:grid-cols-3 gap-6"; // Standard Grid

  // Text Sizes: Adhesives get smaller text to fit the smaller cards.
  const titleSize = isAdhesive ? "text-lg md:text-xl" : "text-2xl";
  const paddingSize = isAdhesive ? "p-4" : "p-6";

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button - FIXED: Now goes back to the specific Category */}
        <FadeIn direction="right">
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {product.category}
          </Link>
        </FadeIn>

        {/* PAGE HEADER */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <FadeIn delay={0.1}>
            <span className="text-gray-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              — {product.category} —
            </span>

            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-accent transform -skew-x-12 shadow-lg rounded-sm"></div>
              <h1 className="relative z-10 text-3xl md:text-5xl font-black text-gray-900 px-8 py-3 uppercase tracking-wider leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="block">
              <div className="inline-block bg-white border border-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold shadow-sm mb-8">
                Brand:{" "}
                <span className="text-primary font-bold">{product.brand}</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Select a sub-category below to view available sizes, thickness,
              and wholesale prices.
            </p>
          </FadeIn>
        </div>

        {/* --- DYNAMIC VARIANTS GRID --- */}
        <FadeIn delay={0.3}>
          {product.variants && product.variants.length > 0 ? (
            <div className={gridClass}>
              {/* @ts-ignore */}
              {product.variants.map((variant: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/products/${
                    product.id
                  }/variant?name=${encodeURIComponent(
                    variant.name || variant
                  )}`}
                  className={`group relative bg-white border border-gray-200 rounded-2xl w-full aspect-[3/4] flex flex-col shadow-sm hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer overflow-hidden`}
                >
                  {/* 1. FULL BACKGROUND IMAGE */}
                  <div className="absolute inset-0 w-full h-full bg-gray-200">
                    {variant.image ? (
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Layers className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* 2. GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />

                  {/* 3. TEXT CONTENT */}
                  <div
                    className={`absolute bottom-0 w-full ${paddingSize} flex flex-col items-center justify-end z-10 text-center h-full`}
                  >
                    <h3
                      className={`${titleSize} font-bold text-white mb-2 group-hover:text-accent transition leading-tight drop-shadow-md`}
                    >
                      {variant.name || variant}
                    </h3>

                    {/* Hide the "Click to view" button on small cards to reduce clutter, show only on hover */}
                    <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all duration-300">
                      <span className="text-[10px] md:text-xs font-bold text-gray-900 flex items-center bg-white px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        View Prices <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* FALLBACK */
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Premium quality {product.name.toLowerCase()} from{" "}
                {product.brand}. Designed for durability and style. Perfect for
                modern interiors.
              </p>
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/919845575885?text=Hi, I am interested in ${product.name}`}
                  className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition flex items-center gap-2 shadow-lg shadow-green-100"
                >
                  <Phone className="w-5 h-5" /> Enquire on WhatsApp
                </a>
              </div>
            </div>
          )}
        </FadeIn>

        {/* Footer Trust Markers */}
        <div className="mt-20 border-t border-gray-200 pt-10 flex flex-wrap justify-center gap-8 text-gray-500 text-sm">
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" /> Authentic{" "}
            {product.brand} Product
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" /> Wholesale Pricing
          </div>
          <div className="flex items-center">
            <Check className="w-4 h-4 text-green-500 mr-2" /> GST Invoice
            Available
          </div>
        </div>
      </div>
    </main>
  );
}
