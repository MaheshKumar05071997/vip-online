"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  CATEGORIES,
  FEATURED_PRODUCTS,
  BRAND_DESCRIPTIONS,
  BRANDS,
} from "@/app/data";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, SearchX, Home } from "lucide-react";
import { useSearchParams } from "next/navigation";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 24;

function ProductContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState("Plywoods");
  const [isSearching, setIsSearching] = useState(false);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);

  // Check if the search query matches a known Brand (Case insensitive)
  const matchedBrand = BRANDS.find(
    (b) => b.toLowerCase() === searchQuery?.toLowerCase()
  );
  const isBrandPage = !!matchedBrand;

  useEffect(() => {
    // Reset to Page 1 whenever filters change
    setCurrentPage(1);

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

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- REUSABLE CARD COMPONENT (Full Image Style) ---
  const ProductCard = ({ product }: { product: any }) => (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="relative bg-white border border-gray-200 rounded-2xl w-full aspect-[3/4] shadow-sm hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-end">
        {/* 1. FULL BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
          />
        </div>

        {/* 2. GRADIENT OVERLAY (For Text Readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />

        {/* 3. BRAND BADGE (Top Left) */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-900 z-10 shadow-sm border border-gray-100">
          {product.brand}
        </span>

        {/* 4. TEXT CONTENT (Bottom) */}
        <div className="relative z-10 p-6 flex flex-col items-start w-full">
          <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">
            {product.category}
          </span>
          <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-accent transition drop-shadow-sm">
            {product.name}
          </h3>

          {/* Hover Arrow */}
          <div className="mt-3 flex items-center text-white/90 text-sm font-semibold group-hover:text-white transition">
            View Details{" "}
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </Link>
  );

  // --- PAGINATION CONTROLS COMPONENT ---
  const PaginationControls = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center gap-2 mt-12 mb-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-50 disabled:hover:bg-white transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Page Numbers */}
        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full font-bold text-sm transition ${
                currentPage === page
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-orange-50 hover:border-orange-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-50 disabled:hover:bg-white transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    );
  };

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, idx) => (
              <FadeIn key={product.id} delay={idx * 0.05}>
                <ProductCard product={product} />
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

        {/* Add Pagination Here */}
        <FadeIn>
          <PaginationControls />
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 pt-10 border-t border-gray-200">
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
              <span className="ml-auto text-sm text-gray-400 font-normal">
                {filteredProducts.length} items
              </span>
            </h2>
          </FadeIn>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product, idx) => (
                  <FadeIn key={product.id} delay={idx * 0.05}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>

              {/* Pagination Controls */}
              <PaginationControls />
            </>
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
    // No bg color here, using global background from layout.tsx
    <main className="min-h-screen">
      <Navbar />
      <Suspense
        fallback={<div className="text-center py-20">Loading catalog...</div>}
      >
        <ProductContent />
      </Suspense>
      <Footer />
    </main>
  );
}
