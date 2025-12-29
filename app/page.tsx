import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn"; // Import Animation
import { BRANDS, CATEGORIES, FEATURED_PRODUCTS, TESTIMONIALS } from "./data";
import {
  ArrowRight,
  CheckCircle,
  Tag,
  Package,
  Smile,
  PenTool,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white min-h-[100vh] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="container mx-auto relative z-20 text-center">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vishwakarma Interior Products, <br />
              <br></br>
              <span className="text-accent">Wholesale Prices</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Authorized dealers of Hafele, Blum, and Greenply. One-stop shop
              for Plywood, Hardware, and Safety Locks.
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="flex justify-center gap-4">
              <Link href="/products">
                <button className="bg-accent text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition text-lg">
                  View All Products
                </button>
              </Link>
              <Link href="#contact-section">
                <button className="border border-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition text-lg">
                  Contact Us
                </button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 1. TRUST BAR */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            "Authorized Dealer",
            "Premium Brands",
            "Bulk Discounts",
            "Fast Delivery",
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="flex flex-col items-center">
                <CheckCircle className="text-green-500 mb-2 w-6 h-6" />
                <span className="font-semibold text-gray-700">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center">
                <Tag
                  className="w-10 h-10 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-gray-900">1000+</h3>
                <p className="text-gray-500 text-sm mt-1">Trusted Brands</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center">
                <Package
                  className="w-10 h-10 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-gray-900">25,000+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Products to choose from
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col items-center">
                <Smile
                  className="w-10 h-10 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-gray-900">3,000+</h3>
                <p className="text-gray-500 text-sm mt-1">Happy Customers</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col items-center">
                <PenTool
                  className="w-10 h-10 text-gray-900 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-gray-900">1000+</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Architects & Designers
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="py-20 container mx-auto px-4 border-t border-gray-200">
        <FadeIn>
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Shop By Category
          </h2>
        </FadeIn>

        <div className="flex flex-wrap justify-center gap-10 md:gap-14">
          {CATEGORIES.map((cat, idx) => (
            <FadeIn key={cat.id} delay={idx * 0.05}>
              <Link
                href={`/products?search=${cat.name}`}
                className="group cursor-pointer flex flex-col items-center text-center w-40 md:w-48"
              >
                <div className="w-40 h-40 md:w-44 md:h-44 rounded-full bg-white mb-6 overflow-hidden border-2 border-gray-200 group-hover:border-primary group-hover:shadow-xl transition-all duration-300 relative">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    Img
                  </div>
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
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">
              Shop From Leading Brands
            </h2>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6">
            {BRANDS.map((brand, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <Link
                  href={`/products?search=${brand}`}
                  className="group w-full sm:w-56 md:w-64 block"
                >
                  <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm group-hover:shadow-md transition cursor-pointer aspect-[3/4]">
                    <span className="text-xl font-bold text-accent tracking-widest">
                      VIP
                    </span>
                    <span className="text-gray-400 font-medium my-2">X</span>
                    <h3 className="text-xl font-bold text-gray-800 uppercase text-center group-hover:text-primary transition">
                      {brand}
                    </h3>
                    <div className="mt-8 text-xs text-gray-400 flex items-center group-hover:text-accent transition">
                      {brand} <ArrowRight className="w-3 h-3 ml-1" />
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
      <section className="py-16 bg-gray-50">
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
            {FEATURED_PRODUCTS.map((product, idx) => (
              <FadeIn key={product.id} delay={idx * 0.1}>
                <Link href={`/products/${product.id}`} className="block group">
                  <div className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-white h-full">
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
                      <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition flex justify-center items-center gap-2">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS */}
      <section className="py-20 bg-white border-t border-gray-100">
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
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-4 border-gray-50 shadow-sm">
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

          {/* Leave a Review Button */}
          <FadeIn delay={0.4}>
            <div>
              <a
                href="https://www.google.com/maps/place/Vishwakarma+Interior+Products/@13.069999,77.63347,14z/data=!4m18!1m9!3m8!1s0x3bae19c56f95ce6f:0x746c77d989937fd3!2sVishwakarma+Interior+Products!8m2!3d13.0699986!4d77.6334698!9m1!1b1!16s%2Fg%2F11scrt5jwz!3m7!1s0x3bae19c56f95ce6f:0x746c77d989937fd3!8m2!3d13.0699986!4d77.6334698!9m1!1b1!16s%2Fg%2F11scrt5jwz?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D" /* <-- PASTE YOUR LINK HERE */
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

      {/* Footer Wrapper with ID for scrolling */}
      <div id="contact-section">
        <Footer />
      </div>
    </main>
  );
}
