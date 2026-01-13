import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { getProducts } from "@//lib/sanityData";
import { Phone, Check, ArrowLeft, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

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

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  const LARGE_CARD_CATEGORIES = ["Plywoods", "Block Boards", "Flush Doors"];
  const isLargeCategory = LARGE_CARD_CATEGORIES.includes(product.category);
  const useCompactGrid = !isLargeCategory;

  const gridClass = useCompactGrid
    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
    : "grid grid-cols-1 md:grid-cols-3 gap-6";

  const titleSize = useCompactGrid ? "text-lg md:text-xl" : "text-2xl";
  const paddingSize = useCompactGrid ? "p-4" : "p-6";

  // --- FILTER: Hide "Standard" variants ---
  // If the only variant is "Standard", this array becomes empty,
  // triggering the fallback view below (which shows the Enquire button).
  const visibleVariants =
    product.variants?.filter((v: any) => v.name && v.name !== "Standard") || [];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <FadeIn direction="right">
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {product.category}
          </Link>
        </FadeIn>

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

        <FadeIn delay={0.3}>
          {visibleVariants.length > 0 ? (
            <div className={gridClass}>
              {/* @ts-ignore */}
              {visibleVariants.map((variant: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/products/${
                    product.id
                  }/variant?name=${encodeURIComponent(
                    variant.name || "Standard"
                  )}`}
                  className={`group relative bg-white border border-gray-200 rounded-2xl w-full aspect-[3/4] flex flex-col shadow-sm hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer overflow-hidden`}
                >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />
                  <div
                    className={`absolute bottom-0 w-full ${paddingSize} flex flex-col items-center justify-end z-10 text-center h-full`}
                  >
                    <h3
                      className={`${titleSize} font-bold text-white mb-2 group-hover:text-accent transition leading-tight drop-shadow-md`}
                    >
                      {variant.name || "Standard"}
                    </h3>
                    <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-3 transition-all duration-300">
                      <span className="text-[10px] md:text-xl font-bold text-gray-900 flex items-center bg-white px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                        Choose Options <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-3xl mx-auto">
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Premium quality {product.name.toLowerCase()} from{" "}
                {product.brand}. Designed for durability and style. Perfect for
                modern interiors.
              </p>
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/919845575885?text=Hi, I am interested in ${product.name}`}
                  className="bg-green-500 text-white px-8 py-4 btn-capsule font-bold text-lg hover:bg-green-600 transition flex items-center gap-2 shadow-lg shadow-green-100"
                >
                  <Phone className="w-5 h-5" /> Enquire on WhatsApp
                </a>
              </div>
            </div>
          )}
        </FadeIn>

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
      <Footer />
    </main>
  );
}
