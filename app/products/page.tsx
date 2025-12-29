"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn"; // Import Animation
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  BRAND_DESCRIPTIONS,
  BRANDS,
} from "@/app/data";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, SearchX, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";

function ProductContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState("Plywoods");
  const [isSearching, setIsSearching] = useState(false);

  // Check if the search query matches a known Brand (Case insensitive)
  const matchedBrand = BRANDS.find(
    (b) => b.toLowerCase() === searchQuery?.toLowerCase()
  );
  const isBrandPage = !!matchedBrand;

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      if (!isBrandPage) setSelectedCategory("All");
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, isBrandPage]);

  // Filter Logic
  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    if (isSearching && searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    return product.category === selectedCategory;
  });

  // --- VIEW 1: BRAND COLLECTION PAGE (Full Width, No Sidebar) ---
  if (isBrandPage && matchedBrand) {
    return (
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary flex items-center">
              <Home className="w-4 h-4 mr-1" /> Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-semibold">{matchedBrand}</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mb-12 border-b pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {matchedBrand}
            </h1>
            <h2 className="text-xl text-gray-600 font-medium mb-6">
              Buy {matchedBrand} Products Online at Best Prices from VIP
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-4xl">
              {BRAND_DESCRIPTIONS[matchedBrand] ||
                `Explore the exclusive collection of ${matchedBrand} products at VIP Online. We offer the best wholesale rates for all ${matchedBrand} fittings and hardware.`}
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <FadeIn key={product.id} delay={idx * 0.05}>
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group block"
                >
                  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition h-full flex flex-col">
                    <div className="h-64 bg-gray-100 relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-800">
                        {product.brand}
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {product.category}
                      </p>
                      <div className="mt-auto">
                        <span className="text-accent text-sm font-bold flex items-center group-hover:underline">
                          View Details <ChevronRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-xl border border-dashed">
              <p className="text-gray-500">
                No products found for {matchedBrand} yet.
              </p>
            </div>
          )}
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-20 pt-10 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Buy {matchedBrand} from VIP?
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
              <li>
                <strong>Wholesale Pricing:</strong> Get the best market rates
                for bulk and retail orders.
              </li>
              <li>
                <strong>Authentic Products:</strong> 100% genuine products
                directly from the manufacturer.
              </li>
              <li>
                <strong>Fast Delivery:</strong> We ensure quick delivery across
                Bangalore and nearby regions.
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    );
  }

  // --- VIEW 2: STANDARD CATALOG PAGE (With Sidebar) ---
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR */}
        <div className="lg:w-1/4">
          <FadeIn direction="right">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-6 px-2 text-primary">
                Categories
              </h3>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setIsSearching(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex justify-between items-center ${
                        !isSearching && selectedCategory === cat.name
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {cat.name}
                      {!isSearching && selectedCategory === cat.name && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:w-3/4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span
                className={`w-2 h-8 mr-3 rounded-full ${
                  isSearching ? "bg-green-500" : "bg-accent"
                }`}
              ></span>
              {isSearching
                ? `Search Results for "${searchQuery}"`
                : selectedCategory}
            </h2>
          </FadeIn>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => (
                <FadeIn key={product.id} delay={idx * 0.05}>
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition h-full flex flex-col">
                      <div className="h-56 bg-gray-100 relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-800">
                          {product.brand}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          Premium quality {product.category.toLowerCase()} from{" "}
                          {product.brand}.
                        </p>
                        <div className="mt-auto">
                          <span className="text-accent text-sm font-bold flex items-center group-hover:underline">
                            View Details{" "}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <SearchX className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No products found
                </h3>
                <p className="text-gray-500 mt-2 max-w-sm">
                  We couldn't find anything for "{searchQuery}". Try searching
                  for categories like 'Plywood' or brands like 'Hafele'.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("Plywoods");
                    setIsSearching(false);
                  }}
                  className="mt-6 text-primary font-semibold hover:underline"
                >
                  Clear Search & View Catalog
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header logic moved inside ProductContent or Conditional Rendering if needed */}

      <Suspense
        fallback={<div className="text-center py-20">Loading catalog...</div>}
      >
        <ProductContent />
      </Suspense>

      <Footer />
    </main>
  );
}
