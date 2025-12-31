"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { CATEGORIES, FEATURED_PRODUCTS } from "@/app/data";
import { LAMINATE_BRANDS_CONFIG } from "@/data/laminate_brands"; // Import the new config
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, SearchX, Home } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 24;

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Params
  const searchQuery = searchParams.get("search") || "";
  const thicknessQuery = searchParams.get("thickness");
  const categoryQuery = searchParams.get("category");

  // State
  const [selectedCategory, setSelectedCategory] = useState("Plywoods");
  const [currentPage, setCurrentPage] = useState(1);

  // --- 1. SYNC STATE WITH URL ---
  useEffect(() => {
    setCurrentPage(1);

    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    } else if (searchQuery) {
      // If searching for a brand that is technically a laminate, switch category context if needed
      // But usually search overrides category.
      // For this specific flow, we treat "search" as the Brand Filter when inside Laminates.
      const isLaminateBrand = LAMINATE_BRANDS_CONFIG.some(
        (b) => b.name.toLowerCase() === searchQuery.toLowerCase()
      );
      if (isLaminateBrand) {
        setSelectedCategory("Laminates");
      }
    }
  }, [searchQuery, categoryQuery, thicknessQuery]);

  // --- 2. SPECIAL FLOW: LAMINATES BRAND SELECTION ---
  // If we are in "Laminates" category BUT we haven't picked a specific thickness/brand combination yet
  // (We use 'thicknessQuery' as the indicator that a user has made a selection)
  const showLaminateBrands =
    selectedCategory === "Laminates" && !thicknessQuery;

  // --- 3. FILTER LOGIC ---
  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    // A. Search / Brand Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // B. Category Filter
    // If we are in "Laminates" mode (even with search), ensure we only show Laminates
    if (selectedCategory === "Laminates" && product.category !== "Laminates") {
      return false;
    }
    // Standard Category Filter (if not searching globally)
    if (
      selectedCategory !== "All" &&
      !searchQuery &&
      product.category !== selectedCategory
    ) {
      return false;
    }

    // C. Thickness Filter (The New Requirement)
    if (thicknessQuery && product.variants) {
      // Check if ANY variant of this product has the selected thickness
      // @ts-ignore
      const hasThickness = product.variants.some(
        (v: any) => v.thickness && v.thickness.includes(thicknessQuery)
      );
      if (!hasThickness) return false;
    }

    return true;
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    // Reset filters when switching categories
    router.push(`/products?category=${encodeURIComponent(catName)}`);
  };

  // --- RENDER: LAMINATE BRAND SELECTOR ---
  if (showLaminateBrands) {
    return (
      <div className="container mx-auto px-4 py-12">
        {/* REMOVED DUPLICATE NAVBAR HERE */}

        <FadeIn>
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <button
              onClick={() => router.push("/")}
              className="hover:text-primary flex items-center"
            >
              <Home className="w-4 h-4 mr-1" /> Home
            </button>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 font-bold">Laminates</span>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose a Brand
            </h1>
            <p className="text-gray-500 text-lg">
              Hover over a brand to select thickness
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LAMINATE_BRANDS_CONFIG.map((brand, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group relative h-96 rounded-2xl overflow-hidden cursor-default shadow-md hover:shadow-2xl transition-all duration-500">
                {/* 1. Background Image */}
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 filter brightness-[0.8]"
                />

                {/* 2. Brand Name (Visible initially) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/70 transition duration-500">
                  <h2 className="text-4xl font-black text-white uppercase tracking-widest border-4 border-white/20 p-4 backdrop-blur-sm group-hover:opacity-0 transition duration-300 transform group-hover:-translate-y-4">
                    {brand.name}
                  </h2>
                </div>

                {/* 3. Hover Overlay (Thickness Options) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6">
                    Select Thickness
                  </span>

                  <div className="flex flex-col gap-4 w-full px-12">
                    {brand.thicknesses.map((thickness) => (
                      <Link
                        key={thickness}
                        // CLICK FLOW: Filters by Category + Brand + Thickness
                        href={`/products?category=Laminates&search=${encodeURIComponent(
                          brand.name
                        )}&thickness=${encodeURIComponent(thickness)}`}
                        className="w-full"
                      >
                        <button className="w-full bg-white hover:bg-accent text-gray-900 font-black text-2xl py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-black/10">
                          {thickness}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    );
  }

  // --- RENDER: STANDARD PRODUCT GRID (Filtered) ---
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
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex justify-between items-center ${
                        selectedCategory === cat.name
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {cat.name}
                      {selectedCategory === cat.name && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Active Filters Display */}
              {(thicknessQuery || searchQuery) && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Active Filters
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold flex items-center">
                        {selectedCategory}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center">
                        Brand: {searchQuery}
                        <Link
                          href={`/products?category=${selectedCategory}`}
                          className="ml-2 hover:text-blue-800"
                        >
                          <SearchX className="w-3 h-3" />
                        </Link>
                      </span>
                    )}
                    {thicknessQuery && (
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold flex items-center">
                        {thicknessQuery}
                        {/* Clear thickness filter goes back to Brand Selector */}
                        <Link
                          href={`/products?category=Laminates`}
                          className="ml-2 hover:text-yellow-900"
                        >
                          <SearchX className="w-3 h-3" />
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:w-3/4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className={`w-2 h-8 mr-3 rounded-full bg-accent`}></span>
              {selectedCategory}
              {searchQuery && ` / ${searchQuery}`}
              {thicknessQuery && ` / ${thicknessQuery}`}
              <span className="ml-auto text-sm text-gray-400 font-normal">
                {filteredProducts.length} items
              </span>
            </h2>
          </FadeIn>

          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product, idx) => {
                  // DIRECT LINK LOGIC:
                  // For Laminates/Flush Doors, go directly to variant page with pre-selected thickness/name
                  let targetLink = `/products/${product.id}`;
                  if (
                    ["Flush Doors", "Laminates"].includes(product.category) &&
                    product.variants &&
                    product.variants.length > 0
                  ) {
                    const firstVariant = product.variants[0];
                    const vName = firstVariant.name || firstVariant;
                    targetLink = `/products/${
                      product.id
                    }/variant?name=${encodeURIComponent(vName)}`;
                  }

                  return (
                    <FadeIn key={product.id} delay={idx * 0.05}>
                      <Link href={targetLink} className="group block h-full">
                        <div className="relative bg-white border border-gray-200 rounded-2xl w-full aspect-[3/4] shadow-sm hover:shadow-2xl hover:border-accent transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-end">
                          <div className="absolute inset-0 w-full h-full bg-gray-200">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />

                          <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-gray-900 z-10 shadow-sm border border-gray-100">
                            {product.brand}
                          </span>

                          <div className="relative z-10 p-6 flex flex-col items-start w-full">
                            <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">
                              {product.category}
                            </span>
                            <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-accent transition drop-shadow-sm">
                              {product.name}
                            </h3>
                            <div className="mt-3 flex items-center text-white/90 text-sm font-semibold group-hover:text-white transition">
                              View Details{" "}
                              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </FadeIn>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <span className="px-4 font-bold text-gray-900">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full border border-gray-300 bg-white hover:bg-orange-50 disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}
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
                  We couldn't find any{" "}
                  {thicknessQuery ? `${thicknessQuery} ` : ""}
                  {searchQuery ? `${searchQuery} ` : ""}
                  products in {selectedCategory}.
                </p>
                <button
                  onClick={() => {
                    // If we are deep in filters, go back to Laminate Brand Selection
                    if (selectedCategory === "Laminates") {
                      router.push("/products?category=Laminates");
                    } else {
                      handleCategoryClick("All");
                    }
                  }}
                  className="mt-6 text-primary font-semibold hover:underline"
                >
                  Clear Filters
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
