"use client";

import FadeIn from "@/components/FadeIn";
import { Product, LAMINATE_BRANDS_CONFIG } from "@/app/data";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  SearchX,
  Home,
  LayoutGrid,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// --- CONFIGURATION ---
const ITEMS_PER_PAGE = 24;
const LARGE_CARD_CATEGORIES = ["Plywoods", "Block Boards", "Flush Doors"];

interface ProductCatalogProps {
  products: Product[];
  categories: { id: string; name: string }[];
}

export default function ProductCatalog({
  products,
  categories,
}: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State to track active brand on mobile (Tap logic)
  const [mobileActiveBrand, setMobileActiveBrand] = useState<string | null>(
    null
  );

  // URL Params
  const searchQuery = searchParams.get("search") || "";
  const thicknessQuery = searchParams.get("thickness");
  const categoryQuery = searchParams.get("category");
  const pageQuery = Number(searchParams.get("page")) || 1;

  // Default to "All"
  const selectedCategory = categoryQuery || "All";

  const currentPage = pageQuery;
  const isMobileFiltered = !!categoryQuery || !!searchQuery;
  const showLaminateBrands =
    selectedCategory === "Laminates" && !thicknessQuery;

  // --- FILTER LOGIC ---
  let filteredProducts: any[] = [];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();

    // --- STEP 1: SMART CATEGORY DETECTION ---
    // Logic: If a product matches the name "fevi", we identify its category (Adhesives).
    // Then we allow ALL products from "Adhesives" to show up.
    const matchedCategories = new Set<string>();

    products.forEach((p) => {
      const directMatch =
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);

      // @ts-ignore
      const variantMatch = p.variants?.some((v: any) =>
        (v.name || "").toLowerCase().includes(query)
      );

      if (directMatch || variantMatch) {
        matchedCategories.add(p.category);
      }
    });
    // ----------------------------------------

    products.forEach((product) => {
      // Check if this product belongs to a matched category
      const isCategoryMatch = matchedCategories.has(product.category);

      const matchesParent =
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        isCategoryMatch;

      // @ts-ignore
      const variants = product.variants || [];
      // @ts-ignore
      const matchingVariants = variants.filter((v: any) =>
        (v.name || v).toLowerCase().includes(query)
      );

      // Helper to fix the name: "Standard" -> "Product Name"
      const getDisplayName = (v: any) =>
        v.name === "Standard" ? product.name : `${product.name} - ${v.name}`;

      // If the PARENT matches (via name or Smart Category), show everything
      if (matchesParent) {
        if (variants.length > 0) {
          variants.forEach((v: any) => {
            filteredProducts.push({
              ...product,
              ...v,
              name: getDisplayName(v), // <--- FIXED: Uses Product Name if "Standard"
              image: v.image || product.image,
              variantName: v.name || v,
              originalProduct: product,
            });
          });
        } else {
          filteredProducts.push(product);
        }
      }
      // If only specific variants matched
      else if (matchingVariants.length > 0) {
        matchingVariants.forEach((v: any) => {
          filteredProducts.push({
            ...product,
            ...v,
            name: getDisplayName(v), // <--- FIXED: Uses Product Name if "Standard"
            image: v.image || product.image,
            variantName: v.name || v,
            originalProduct: product,
          });
        });
      }
    });

    // --- STEP 2: SORTING ---
    // Ensure actual text matches (Fevicol) appear BEFORE expanded category matches (Grippo)
    filteredProducts.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      // Check if the item actually has the search term
      const aHasTerm =
        aName.includes(query) || a.brand.toLowerCase().includes(query);
      const bHasTerm =
        bName.includes(query) || b.brand.toLowerCase().includes(query);

      if (aHasTerm && !bHasTerm) return -1; // a comes first
      if (!aHasTerm && bHasTerm) return 1; // b comes first
      return 0;
    });

    // Apply additional filters if present
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
    // Standard filtering (No Search)
    filteredProducts = products.filter((product) => {
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

  // --- LAYOUT LOGIC ---
  const isCompactView =
    !!searchQuery || !LARGE_CARD_CATEGORIES.includes(selectedCategory);

  const gridClass = isCompactView
    ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

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

  if (showLaminateBrands) {
    return (
      <div className="w-full px-4 py-12">
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
            <p className="text-gray-500 text-lg flex items-center justify-center gap-2">
              Hover or <span className="underline decoration-dotted">Tap</span>{" "}
              a brand to select thickness
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {LAMINATE_BRANDS_CONFIG.map((brand, idx) => {
            const isMobileActive = mobileActiveBrand === brand.name;
            return (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div
                  onClick={() =>
                    setMobileActiveBrand(isMobileActive ? null : brand.name)
                  }
                  className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={`w-full h-full object-cover transition duration-700 filter brightness-[0.8] 
                      ${isMobileActive ? "scale-110" : "group-hover:scale-110"}
                    `}
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition duration-500
                      ${
                        isMobileActive
                          ? "opacity-0 bg-black/70"
                          : "opacity-100 group-hover:bg-black/70 group-hover:opacity-0"
                      }
                    `}
                  >
                    <h2 className="text-4xl font-black text-white uppercase tracking-widest border-4 border-white/20 p-4 backdrop-blur-sm transition duration-300 transform">
                      {brand.name}
                    </h2>
                  </div>
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition duration-300 
                      ${
                        isMobileActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                      }
                    `}
                  >
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
                          onClick={(e) => e.stopPropagation()}
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
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HEADER */}
      <div className="w-full py-6 px-4 md:px-8">
        <FadeIn>
          <h2 className="text-2xl font-bold text-gray-800 flex flex-wrap items-center">
            <span className={`w-2 h-8 mr-3 rounded-full bg-accent`}></span>
            {selectedCategory === "All" ? "All Products" : selectedCategory}

            {searchQuery && (
              <span className="ml-2 text-gray-400 font-normal">
                / {searchQuery}
              </span>
            )}
            <span className="ml-auto text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              {filteredProducts.length} Products
            </span>
          </h2>
        </FadeIn>
      </div>

      <div className="w-full px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* SIDEBAR */}
          <div className="lg:w-1/4">
            <FadeIn direction="right">
              {isMobileFiltered && (
                <div className="lg:hidden mb-6 border-b border-gray-100 pb-4 animate-in slide-in-from-left-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        Current Category
                      </span>
                      <span className="font-bold text-gray-900 flex items-center gap-2 text-xl leading-tight">
                        {selectedCategory === "All"
                          ? "Search Results"
                          : selectedCategory}
                      </span>
                    </div>
                    <Link
                      href="/products"
                      className="text-xs font-bold bg-white text-primary border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 shadow-sm whitespace-nowrap flex items-center gap-1"
                    >
                      <LayoutGrid className="w-3 h-3" /> View All Categories
                    </Link>
                  </div>
                </div>
              )}

              <div
                className={`bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-50 overflow-hidden sticky top-24 transition-all duration-300 
                ${isMobileFiltered ? "hidden lg:block" : "block"}`}
              >
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  <h3 className="font-bold text-lg text-white flex items-center gap-2 relative z-10">
                    <LayoutGrid className="w-5 h-5 text-accent" /> VIEW OUR
                    RANGE
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 relative z-10">
                    Select a category to filter
                  </p>
                </div>

                <div className="p-4 space-y-2">
                  <button
                    onClick={() => handleCategoryClick("All")}
                    className={`group w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex justify-between items-center relative overflow-hidden
                      ${
                        selectedCategory === "All"
                          ? "bg-gray-900 text-white shadow-lg shadow-gray-200 translate-x-2"
                          : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:pl-7"
                      }`}
                  >
                    <span className="flex items-center gap-3 relative z-10">
                      <Sparkles
                        className={`w-4 h-4 ${
                          selectedCategory === "All"
                            ? "text-accent"
                            : "text-gray-400 group-hover:text-orange-500"
                        }`}
                      />
                      All Products
                    </span>
                    {selectedCategory === "All" && (
                      <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
                    )}
                  </button>

                  <div className="h-px bg-gray-100 my-2 mx-4"></div>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`group w-full text-left px-5 py-3.5 rounded-2xl text-sm font-medium transition-all duration-300 flex justify-between items-center relative
                        ${
                          selectedCategory === cat.name
                            ? "bg-gray-900 text-white shadow-lg shadow-gray-200 translate-x-2 font-bold"
                            : "bg-transparent text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:pl-7"
                        }`}
                    >
                      <span className="relative z-10">{cat.name}</span>
                      {selectedCategory === cat.name ? (
                        <ArrowRight className="w-4 h-4 text-accent animate-pulse" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-400 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {(thicknessQuery || searchQuery) && (
                <div className="mt-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
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
                              ? "All"
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
            </FadeIn>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:w-3/4">
            {filteredProducts.length > 0 ? (
              <>
                <div className={gridClass} key={selectedCategory + searchQuery}>
                  {displayedProducts.map((product, idx) => {
                    // --- CHANGED LOGIC START: DIRECT LINKING ---
                    let targetLink = `/products/${product.id}`;

                    // 1. If searching via explode (already has variantName)
                    if (product.variantName) {
                      targetLink = `/products/${
                        product.id
                      }/variant?name=${encodeURIComponent(
                        product.variantName
                      )}`;
                    }
                    // 2. If Single Variant (or Standard) -> Go Direct
                    else if (
                      product.variants &&
                      product.variants.length === 1
                    ) {
                      const vName = product.variants[0].name;
                      targetLink = `/products/${
                        product.id
                      }/variant?name=${encodeURIComponent(vName)}`;
                    }
                    // --- CHANGED LOGIC END ---

                    const titleSize = !isCompactView ? "text-xl" : "text-lg";
                    const paddingSize = !isCompactView ? "p-6" : "p-3";

                    return (
                      <FadeIn
                        key={`${product.id}-${product.variantName || idx}`}
                        delay={idx * 0.05}
                      >
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
                    No products found for "{searchQuery}"
                  </h3>
                  <p className="text-gray-500 mt-2 max-w-sm">
                    We might have this in our offline stock, or we can arrange
                    it for you.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href={`https://wa.me/919845575885?text=Hi, I searched for '${searchQuery}' on your website but couldn't find it. Do you have it in stock?`}
                      target="_blank"
                      className="bg-green-500 text-white px-6 py-3 btn-capsule font-bold hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                    >
                      Enquire on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        if (selectedCategory === "Laminates") {
                          router.push("/products?category=Laminates");
                        } else {
                          handleCategoryClick("All");
                        }
                      }}
                      className="border border-gray-300 text-gray-700 px-6 py-3 btn-capsule font-bold hover:bg-gray-50 transition"
                    >
                      View Full Catalog
                    </button>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
