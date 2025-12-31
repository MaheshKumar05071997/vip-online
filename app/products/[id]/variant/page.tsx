"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FEATURED_PRODUCTS } from "@/app/data";
import {
  ArrowLeft,
  Check,
  Phone,
  ShieldCheck,
  X,
  CheckCircle,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useParams, notFound } from "next/navigation";
import { useState, FormEvent } from "react";

export default function VariantDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const productId = Number(params.id);
  const variantName = searchParams.get("name");

  const product = FEATURED_PRODUCTS.find((p) => p.id === productId);
  const variant = product?.variants?.find(
    (v: any) => (v.name || v) === variantName
  ) as any;

  if (!product || !variant) return notFound();

  const [selectedThickness, setSelectedThickness] = useState(
    variant.thickness ? variant.thickness[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    variant.sizes ? variant.sizes[0] : ""
  );

  const specs = variant.specs || {
    Grade: "Standard",
    Type: product.category,
    Warranty: "Manufacturer Warranty",
    Usage: "Interior / Exterior",
  };

  // --- CONTRACTOR FORM LOGIC ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    company: "",
    gstNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxfL4uwmWhTYIqvjol7cNTWFPaW9M0NNb96TH4OMFmjxSwLgdIuLJsjc2IpSvsF4RFp/exec",
        { method: "POST", body: JSON.stringify(formData) }
      );
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        company: "",
        gstNumber: "",
      });
      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href={`/products/${productId}`}
            className="text-gray-500 hover:text-primary flex items-center text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {product.name}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: LARGE IMAGE */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 sticky top-24 h-fit">
            <img
              src={variant.image || product.image}
              alt={variant.name}
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-4 left-4 bg-accent text-gray-900 font-bold px-3 py-1 text-xs uppercase tracking-wide rounded shadow-sm">
              {product.brand}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {variant.name}
            </h1>
            <p className="text-gray-500 text-lg mb-6">
              {product.category} - {product.brand}
            </p>

            {/* Pricing Section */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              {variant.price ? (
                <div className="flex items-end gap-3">
                  {variant.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      Rs. {variant.originalPrice}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-red-500">
                    Rs. {variant.price}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    / unit (Approx)
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  Price on Request
                </span>
              )}

              {/* --- UPDATED CLICKABLE TEXT --- */}
              <p
                onClick={() => setIsFormOpen(true)}
                className="text-xs text-blue-600 font-medium mt-2 cursor-pointer hover:underline flex items-center gap-1"
              >
                Click here to get Professional discounted prices
              </p>
            </div>

            {/* Selectors */}
            {variant.thickness && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Thickness
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variant.thickness.map((t: string) => (
                    <button
                      key={t}
                      onClick={() => setSelectedThickness(t)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        selectedThickness === t
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {variant.sizes && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variant.sizes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                        selectedSize === s
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mb-10">
              <a
                href={`https://wa.me/919845575885?text=Hi, I am interested in ${variant.name} (${selectedThickness} - ${selectedSize}). Please quote best price.`}
                className="flex-1 bg-accent text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-500 transition text-center shadow-lg shadow-yellow-100 flex items-center justify-center gap-2"
              >
                Enquire Now
              </a>
              <a
                href="tel:+919845575885"
                className="flex-1 border border-gray-300 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-50 transition text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>

            {/* Product Description Table */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                Product Description & Specs
              </h3>
              <div className="space-y-0 text-sm">
                {Object.entries(specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-3 py-3 border-b border-gray-200 ${
                      idx === Object.keys(specs).length - 1 ? "border-0" : ""
                    }`}
                  >
                    <span className="text-gray-500 col-span-1">{key}</span>
                    <span className="text-gray-900 font-medium col-span-2">
                      {value as React.ReactNode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* --- CONTRACTOR FORM POPUP --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
            <div className="bg-primary p-6 text-center relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white">
                Interior Contractor Signup
              </h2>
              <p className="text-blue-100 text-sm mt-2">
                Get special wholesale pricing & priority support.
              </p>
            </div>
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Application Sent!</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name*"
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border border-gray-300 p-3 rounded-lg w-full"
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone*"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                  />
                  <input
                    type="text"
                    placeholder="GST Number (Optional)"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                  />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 text-gray-400 text-sm">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-300" />{" "}
                    File upload enabled after verification.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-gray-900 font-bold py-3 rounded-lg mt-4"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
