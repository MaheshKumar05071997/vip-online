"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  FEATURED_BRANDS,
  CATEGORIES,
  FEATURED_PRODUCTS,
  TESTIMONIALS,
} from "@/app/data";
import {
  ArrowRight,
  Tag,
  Package,
  Smile,
  PenTool,
  Star,
  ShieldCheck,
  Award,
  Truck,
  Banknote,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  // --- TRUST BAR CONFIG ---
  const TRUST_BADGES = [
    {
      icon: ShieldCheck,
      label: "Authorized Dealer",
      sub: "Genuine Products",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Award,
      label: "Premium Brands",
      sub: "Hafele, Blum & More",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: Banknote,
      label: "Bulk Discounts",
      sub: "Best Market Rates",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Truck,
      label: "Fast Delivery",
      sub: "Bangalore & Beyond",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* FLOATING LEFT STATS BAR */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-6 bg-gradient-to-b from-orange-50 via-orange-100 to-orange-300 backdrop-blur-md border border-orange-200 rounded-2xl px-5 py-6 shadow-xl">
          {/* Trusted Brands */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <Tag className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition" />
            <span className="text-lg font-bold text-gray-900">1000+</span>
            <span className="text-xs text-gray-500">Trusted Brands</span>
          </div>

          {/* Products */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <Package className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition" />
            <span className="text-lg font-bold text-gray-900">25,000+</span>
            <span className="text-xs text-gray-500">Products</span>
          </div>

          {/* Happy Customers */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <Smile className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition" />
            <span className="text-lg font-bold text-gray-900">3,000+</span>
            <span className="text-xs text-gray-500">Happy Clients</span>
          </div>

          {/* Architects */}
          <div className="flex flex-col items-center text-center group cursor-default">
            <PenTool className="w-8 h-8 text-orange-500 mb-2 group-hover:scale-110 transition" />
            <span className="text-lg font-bold text-gray-900">1000+</span>
            <span className="text-xs text-gray-500">Architects</span>
          </div>
        </div>
      </div>

      {/* --- NEW & TRENDY HERO SECTION --- */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Fixed Position for Parallax Feel */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-fixed"
          style={{ backgroundImage: "url('/main_shop_image.jpeg')" }}
        />

        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90 z-10" />

        <div className="container mx-auto px-4 relative z-20 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn delay={0.2}>
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-orange-300 font-bold uppercase tracking-widest text-xs md:text-sm">
                  Wholesale Prices
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-orange-500 mb-6 md:mb-8 tracking-tighter leading-tight drop-shadow-xl">
                Vishwakarma <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600">
                  Interior Products
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.4}>
              {/* Subtitle Box */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-10 rounded-2xl md:rounded-3xl mb-8 md:mb-12 max-w-3xl mx-auto shadow-2xl ring-1 ring-white/10">
                <p className="text-lg md:text-2xl text-gray-200 leading-relaxed font-light">
                  Authorized dealers of{" "}
                  <strong className="text-white font-semibold">Hafele</strong>,{" "}
                  <strong className="text-white font-semibold">Blum</strong>,
                  and{" "}
                  <strong className="text-white font-semibold">Greenply</strong>
                  .
                  <span className="block mt-4 text-base md:text-lg text-gray-400">
                    Your one-stop destination for Premium Plywood, Architectural
                    Hardware, and Digital Safety Locks.
                  </span>
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link href="/products" className="group">
                  <button className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2">
                    Explore Catalog
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="#our-location">
                  <button className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                    Contact Us
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MOBILE STATS BAR */}
      <section className="lg:hidden bg-white border-t border-b border-orange-100 py-6">
        <div className="grid grid-cols-2 gap-6 text-center px-6">
          <div>
            <Tag className="mx-auto w-7 h-7 text-orange-500 mb-1" />
            <p className="font-bold text-gray-900">1000+</p>
            <p className="text-xs text-gray-500">Brands</p>
          </div>
          <div>
            <Package className="mx-auto w-7 h-7 text-orange-500 mb-1" />
            <p className="font-bold text-gray-900">25,000+</p>
            <p className="text-xs text-gray-500">Products</p>
          </div>
          <div>
            <Smile className="mx-auto w-7 h-7 text-orange-500 mb-1" />
            <p className="font-bold text-gray-900">3,000+</p>
            <p className="text-xs text-gray-500">Customers</p>
          </div>
          <div>
            <PenTool className="mx-auto w-7 h-7 text-orange-500 mb-1" />
            <p className="font-bold text-gray-900">1000+</p>
            <p className="text-xs text-gray-500">Architects</p>
          </div>
        </div>
      </section>

      {/* 1. TRUST BAR */}
      <section className="py-10 border-b border-gray-100 bg-white shadow-sm relative z-20 -mt-8 mx-4 md:mx-auto md:max-w-6xl rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {TRUST_BADGES.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition duration-300">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}
                >
                  <item.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold text-gray-900 leading-tight">
                    {item.label}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {item.sub}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-20 container mx-auto px-4 border-t border-orange-200">
        <FadeIn>
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Shop By Category
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap justify-center gap-6 md:gap-14">
          {CATEGORIES.map((cat, idx) => (
            <FadeIn key={cat.id} delay={idx * 0.05}>
              <Link
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group cursor-pointer flex flex-col items-center text-center w-40 md:w-48"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full bg-white mb-6 overflow-hidden border-4 border-white shadow-sm group-hover:border-primary group-hover:shadow-xl transition-all duration-300 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition">
                  {cat.name}
                </h3>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 4. SHOP FROM LEADING BRANDS */}
      <section className="py-16 border-t border-orange-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
              Shop From Leading Brands
            </h2>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6">
            {FEATURED_BRANDS.map((brand, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <Link
                  href={`/products?search=${brand.name}`}
                  className="group w-full sm:w-56 md:w-64 block"
                >
                  <div className="relative bg-white border border-orange-100 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition cursor-pointer aspect-[4/3] md:aspect-[3/4]">
                    <div className="absolute inset-0 bg-orange-50/50">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition duration-700"
                      />
                    </div>

                    <div className="absolute top-8 left-0 right-0 z-10 flex flex-col items-center">
                      <span className="text-2xl font-black text-orange-500 tracking-[0.2em] drop-shadow-sm">
                        VIP{" "}
                        <span className="text-gray-300 text-lg align-middle">
                          X
                        </span>
                      </span>
                    </div>

                    <div className="absolute bottom-16 left-0 right-0 z-10 px-4 flex justify-center">
                      <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase text-center leading-none group-hover:text-primary transition drop-shadow-md">
                        {brand.name}
                      </h3>
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center text-xs text-gray-500 font-bold group-hover:text-accent transition z-10">
                      View Collection <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div className="flex justify-center mt-10">
              <Link href="/products">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition shadow-lg hover:shadow-orange-200">
                  View all
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. TRENDING PRODUCTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Trending Products
              </h2>
              <Link href="/products">
                <button className="text-primary font-semibold flex items-center hover:underline">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.slice(0, 4).map((product, idx) => {
              let targetLink = `/products/${product.id}`;

              // --- UPDATE: EXCEPTION FOR GRIPPO ---
              // If it's Laminates/Flush Doors OR specifically "Grippo", go direct to variant.
              if (
                (["Flush Doors", "Laminates"].includes(product.category) ||
                  product.name === "Grippo") &&
                product.variants &&
                product.variants.length > 0
              ) {
                // @ts-ignore
                const vName = product.variants[0].name || product.variants[0];
                targetLink = `/products/${
                  product.id
                }/variant?name=${encodeURIComponent(vName)}`;
              }

              return (
                <FadeIn key={product.id} delay={idx * 0.1}>
                  <Link href={targetLink} className="block group">
                    <div className="border border-orange-100 rounded-xl overflow-hidden hover:shadow-lg transition bg-white h-full">
                      <div className="h-48 bg-gray-100 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                          {product.brand}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-primary transition">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {product.category}
                        </p>
                        <button className="w-full bg-orange-50 text-gray-800 py-2 rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition flex justify-center items-center gap-2">
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-20 bg-white/60 backdrop-blur-sm border-t border-orange-100">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-16">
              Hear from Our Happy Customers
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {TESTIMONIALS.map((review, idx) => (
              <FadeIn key={review.id} delay={idx * 0.2}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-orange-100 shadow-sm">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-orange-500 text-orange-500"
                      />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {review.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div>
              <a
                href="https://www.google.com/maps/place/Vishwakarma+Interior+Products/@13.069999,77.63347,14z/data=!4m18!1m9!3m8!1s0x3bae19c56f95ce6f:0x746c77d989937fd3!2sVishwakarma+Interior+Products!8m2!3d13.0699986!4d77.6334698!9m1!1b1!16s%2Fg%2F11scrt5jwz!3m7!1s0x3bae19c56f95ce6f:0x746c77d989937fd3!8m2!3d13.0699986!4d77.6334698!9m1!1b1!16s%2Fg%2F11scrt5jwz?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  Leave a Review
                </button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-50 lg:hidden">
        <a href="tel:+919845575885">
          <button className="w-full bg-orange-500 text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-orange-600 transition">
            Call Now
          </button>
        </a>
      </div>

      <Footer />
    </main>
  );
}
