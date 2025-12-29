"use client"; // Required for interactivity (Clicking the button)

import Link from "next/link";
import { Search, Phone, Menu, X, Upload, CheckCircle } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Added for navigation

export default function Navbar() {
  // --- Search Logic (New) ---
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // --- Existing Contractor Form Logic ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form States
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
      // Your Google Script URL
      const response = await fetch(
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
      // Close modal after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error!", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar - Contact Info (UPDATED) */}
        <div className="bg-primary text-white py-4 px-4 flex justify-center items-center shadow-md relative z-10">
          <span className="text-sm md:text-base font-bold tracking-wide flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-700">
            📞 Call us for bulk orders:{" "}
            <span className="text-yellow-300">+91 98455 75885</span>
          </span>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-primary tracking-tight"
          >
            VIP<span className="text-accent">ONLINE</span>
          </Link>

          {/* Search Bar - UPDATED TO FUNCTIONAL FORM */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-8 relative"
          >
            <input
              type="text"
              placeholder="Search for Plywood, Locks, Hafele..."
              className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-2.5 text-gray-400 hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 text-gray-700">
            <Link
              href="/products"
              className="hidden md:block hover:text-primary font-medium"
            >
              Browse Catalog
            </Link>
            <a
              href="https://wa.me/919876543210"
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">Enquire</span>
            </a>
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contractor Banner */}
        <div
          onClick={() => setIsFormOpen(true)}
          className="bg-accent text-gray-900 font-bold text-center py-3 px-4 cursor-pointer hover:bg-yellow-500 transition border-t border-b border-yellow-600"
        >
          <span>
            👷 Are you an Interior Contractor? Sign up for exclusive offers. →
          </span>
        </div>
      </nav>

      {/* --- POPUP MODAL (Kept Exactly as before) --- */}
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
    </>
  );
}
