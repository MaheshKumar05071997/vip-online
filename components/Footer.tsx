"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  X,
  CheckCircle,
  Upload,
} from "lucide-react";
import { CATEGORIES, BRANDS } from "@/app/data";
import { useState, FormEvent } from "react";

export default function Footer() {
  // --- Contractor Form Logic (Reused) ---
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
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
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
    <footer className="bg-white pt-12 border-t border-gray-100">
      {/* 1. TOP CTA SECTION */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Get Premium Plywood at Best Rates?
            </h3>
            <p className="text-gray-500">
              Join our network of 1000+ satisfied contractors today.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-accent text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-100"
            >
              Sign Up as Contractor
            </button>
            <a
              href="https://wa.me/919845575885"
              className="border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS */}
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-primary tracking-tight mb-4 block"
            >
              VIP<span className="text-accent">ONLINE</span>
            </Link>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              <b>Vishwakarma Interior Products.</b>
              <br />
              Premium Hardware & Plywood Solutions for modern homes.
            </p>
            <p className="text-xs text-gray-400 mb-6">GSTIN: 29ABCDE1234F1Z5</p>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Dynamic Product Range */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-accent">
              Product Range
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?search=${cat.name}`}
                    className="hover:text-primary transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dynamic Top Brands */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-accent">
              Top Brands
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {BRANDS.slice(0, 7).map((brand, idx) => (
                <li key={idx}>
                  <Link
                    href={`/products?search=${brand}`}
                    className="hover:text-primary transition"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Quick Links & Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            <div className="space-y-2 text-sm text-gray-600">
              <a
                href="tel:+919845575885"
                className="flex items-center hover:text-primary font-bold"
              >
                <Phone className="w-4 h-4 mr-2 text-accent" /> +91 98455 75885
              </a>
              <a
                href="mailto:sales@viponline.in"
                className="flex items-center hover:text-primary"
              >
                <Mail className="w-4 h-4 mr-2 text-accent" /> sales@viponline.in
              </a>
            </div>
          </div>

          {/* Column 5: Google Map Location */}
          <div className="lg:col-span-1" id="our-location">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-accent">
              Our Location
            </h4>
            <p className="text-xs text-gray-500 mb-3 flex items-start">
              <MapPin className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
              536, Vishwakarma Complex Basement and Ground Floor, 2nd Main
              Thanisandra, Main Road Dr, S R K Nagar, Post, RK Hegde Nagar,
              Bengaluru, Karnataka 560077
            </p>
            <div className="rounded-lg overflow-hidden h-32 bg-gray-200 border border-gray-300">
              {/* Placeholder Map of Bangalore - Replace src with your specific shop embed link */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.460054163099!2d77.6308948757242!3d13.070003812711896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19c56f95ce6f%3A0x746c77d989937fd3!2sVishwakarma%20Interior%20Products!5e0!3m2!1sen!2sin!4v1766999897179!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* 3. COPYRIGHT BAR */}
      <div className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>© 2025 Vishwakarma Interior Products. All rights reserved.</p>
      </div>

      {/* --- CONTRACTOR FORM MODAL (Updated to match Navbar exactly) --- */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            {/* Header */}
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

            {/* Form Body */}
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Application Sent!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    We will verify your details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone* (+91)
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Number (Optional)
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Certificate (Upload Later)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 text-gray-400 text-sm">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      File upload enabled after verification.
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition mt-4 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
