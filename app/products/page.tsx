"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { CATEGORIES, FEATURED_PRODUCTS } from "@/app/data";
import { LAMINATE_BRANDS_CONFIG } from "@/data/laminate_brands";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, SearchX, Home, Filter } from "lucide-react";
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
  const pageQuery = Number(searchParams.get("page")) || 1;

  // --- FIXED LOGIC ---
  const selectedCategory = categoryQuery || (searchQuery ? "All" : "Plywoods");

  const currentPage = pageQuery;

  // --- MOBILE OPTIMIZATION FLAG ---
  const isMobileFiltered = !!categoryQuery || !!searchQuery;

  // --- 3. SPECIAL FLOW: LAMINATES BRAND SELECTION ---
  const showLaminateBrands =
    selectedCategory === "Laminates" && !thicknessQuery;

  // --- 4. FILTER LOGIC ---
  let filteredProducts: any[] = [];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();

    FEATURED_PRODUCTS.forEach((product) => {
      // 1. Check Parent Matches
      const matchesParent =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      // 2. Check Variant Matches
      // @ts-ignore
      const variants = product.variants || [];
      // @ts-ignore
      const matchingVariants = variants.filter((v: any) =>
        (v.name || v).toLowerCase().includes(query)
      );

      // --- LOGIC: EXPLODE VARIANTS ---
      if (matchesParent) {
        if (variants.length > 0) {
          variants.forEach((v: any) => {
            filteredProducts.push({
              ...product,
              ...v,
              name: v.name || v,
              image: v.image || product.image,
              variantName: v.name || v,
            });
          });
        } else {
          filteredProducts.push(product);
        }
      } else if (matchingVariants.length > 0) {
        matchingVariants.forEach((v: any) => {
          filteredProducts.push({
            ...product,
            ...v,
            name: v.name || v,
            image: v.image || product.image,
            variantName: v.name || v,
          });
        });
      }
    });

    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (thicknessQuery) {
      filteredProducts = filteredProducts.filter(
        (p) => p.thickness && p.thickness.includes(thicknessQuery)
      );
    }
  } else {
    // --- STANDARD BROWSING ---
    filteredProducts = FEATURED_PRODUCTS.filter((product) => {
      if (
        selectedCategory === "Laminates" &&
        product.category !== "Laminates"
      ) {
        return false;
      }
      if (selectedCategory !== "All" && product.category !== selectedCategory) {
        return false;
      }

      if (thicknessQuery && product.variants) {
        // @ts-ignore
        const hasThickness = product.variants.some(
          (v: any) => v.thickness && v.thickness.includes(thicknessQuery)
        );
        if (!hasThickness) return false;
      }

      return true;
    });
  }

  // --- SPECIAL LAYOUT LOGIC FOR ADHESIVES ---
  const isAdhesive = selectedCategory === "Adhesive";
  const gridClass = isAdhesive
    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (catName: string) => {
    router.push(`/products?category=${encodeURIComponent(catName)}&page=1`);
  };

  // --- RENDER: LAMINATE BRAND SELECTOR ---
  if (showLaminateBrands) {
    return (
      <div className="container mx-auto px-4 py-12">
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
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 filter brightness-[0.8]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/70 transition duration-500">
                  <h2 className="text-4xl font-black text-white uppercase tracking-widest border-4 border-white/20 p-4 backdrop-blur-sm group-hover:opacity-0 transition duration-300 transform group-hover:-translate-y-4">
                    {brand.name}
                  </h2>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="text-gray-300 text-sm font-bold uppercase tracking-widest mb-6">
                    Select Thickness
                  </span>
                  <div className="flex flex-col gap-4 w-full px-12">
                    {brand.thicknesses.map((thickness) => (
                      <Link
                        key={thickness}
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

  // --- RENDER: STANDARD PRODUCT GRID ---
  return (
    <>
      {/* --- FULL WIDTH HEADER BANNER (Outside Container) --- */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm py-8 md:py-10">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
              <span
                className={`w-2 h-10 rounded-full bg-accent hidden md:block`}
              ></span>
              {selectedCategory === "All" ? "Search Results" : selectedCategory}

              {(searchQuery || thicknessQuery) && (
                <span className="text-gray-400 font-light flex items-center text-2xl">
                  {searchQuery && ` / ${searchQuery}`}
                  {thicknessQuery && ` / ${thicknessQuery}`}
                </span>
              )}

              <span className="ml-auto text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                {filteredProducts.length} Products
              </span>
            </h2>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* UPDATED GAP: Reduced lg:gap-12 to lg:gap-6 to reduce wasted space */}

          {/* SIDEBAR */}
          <div className="lg:w-1/4">
            <FadeIn direction="right">
              <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                {/* --- MOBILE COMPACT HEADER --- */}
                {isMobileFiltered && (
                  <div className="lg:hidden mb-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          Category
                        </span>
                        <span className="font-bold text-gray-900 flex items-center gap-2 text-xl leading-tight">
                          {selectedCategory === "All"
                            ? "Search Results"
                            : selectedCategory}
                        </span>
                      </div>
                      <Link
                        href="/products"
                        className="text-xs font-bold bg-white text-primary border border-gray-200 px-3 py-2 rounded-full hover:bg-gray-50 shadow-sm whitespace-nowrap"
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                )}

                {/* --- FULL CATEGORY LIST --- */}
                <div
                  className={`${
                    isMobileFiltered ? "hidden lg:block" : "block"
                  }`}
                >
                  <h3 className="font-bold text-lg mb-6 px-2 text-primary flex items-center gap-2">
                    <Filter className="w-5 h-5" /> Categories
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
                </div>

                {/* Active Filters Display */}
                {(thicknessQuery || searchQuery) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Active Filters
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory !== "All" && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold flex items-center">
                          {selectedCategory}
                        </span>
                      )}
                      {searchQuery && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center">
                          Brand: {searchQuery}
                          <Link
                            href={`/products?category=${
                              selectedCategory === "All"
                                ? "Plywoods"
                                : selectedCategory
                            }`}
                            className="ml-2 hover:text-blue-800"
                          >
                            <SearchX className="w-3 h-3" />
                          </Link>
                        </span>
                      )}
                      {thicknessQuery && (
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold flex items-center">
                          {thicknessQuery}
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
            {/* Grid starts directly here now, header is above */}
            <FadeIn>
              {filteredProducts.length > 0 ? (
                <>
                  {/* Dynamic Grid */}
                  <div className={gridClass}>
                    {displayedProducts.map((product, idx) => {
                      let targetLink = `/products/${product.id}`;

                      if (product.variantName) {
                        targetLink = `/products/${
                          product.id
                        }/variant?name=${encodeURIComponent(
                          product.variantName
                        )}`;
                      } else if (
                        (["Flush Doors", "Laminates"].includes(
                          product.category
                        ) ||
                          product.name === "Grippo") &&
                        product.variants &&
                        product.variants.length > 0
                      ) {
                        // @ts-ignore
                        const vName =
                          product.variants[0].name || product.variants[0];
                        targetLink = `/products/${
                          product.id
                        }/variant?name=${encodeURIComponent(vName)}`;
                      }

                      const isAdhesiveCard = product.category === "Adhesive";
                      const titleSize = isAdhesiveCard ? "text-lg" : "text-xl";
                      const paddingSize = isAdhesiveCard ? "p-3" : "p-6";

                      return (
                        <FadeIn
                          key={`${product.id}-${product.variantName || idx}`}
                          delay={idx * 0.05}
                        >
                          <Link
                            href={targetLink}
                            className="group block h-full"
                          >
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

                              <div
                                className={`relative z-10 ${paddingSize} flex flex-col items-start w-full`}
                              >
                                <span className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1 opacity-90">
                                  {product.category}
                                </span>
                                <h3
                                  className={`${titleSize} font-bold text-white mb-1 leading-tight group-hover:text-accent transition drop-shadow-sm`}
                                >
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
                      products in{" "}
                      {selectedCategory === "All"
                        ? "catalog"
                        : selectedCategory}
                      .
                    </p>
                    <button
                      onClick={() => {
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
            </FadeIn>
          </div>
        </div>
      </div>
    </>
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
