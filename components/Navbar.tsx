"use client";

import Link from "next/link";
import { Search, Phone, Menu, X, Upload, CheckCircle } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase"; // Import the file you created in Step 2
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // --- CONTRACTOR FORM & OTP STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // OTP Logic States
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] =
    useState<ConfirmationResult | null>(null);
  const [otpError, setOtpError] = useState("");

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

  // 1. Initialize Recaptcha when the modal opens
  useEffect(() => {
    if (isFormOpen && !window.recaptchaVerifier) {
      setTimeout(() => {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: () => {
                // reCAPTCHA solved
              },
            }
          );
        } catch (err) {
          console.error("Recaptcha Error:", err);
        }
      }, 500);
    }
  }, [isFormOpen]);

  // 2. Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    const phoneNumber = "+91" + formData.phone; // Hardcoded for India

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );

      setVerificationId(confirmationResult);
      setShowOtpInput(true); // Switch to OTP view
      alert("OTP Sent to " + phoneNumber);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Step 2: Verify OTP & Submit Data
  const handleVerifyAndSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setIsSubmitting(true);

    try {
      if (!verificationId) throw new Error("No verification ID");

      // A. Verify OTP with Firebase
      await verificationId.confirm(otp);

      // B. If Valid, Submit to Google Sheet
      await fetch(
        "https://script.google.com/macros/s/AKfycbxfL4uwmWhTYIqvjol7cNTWFPaW9M0NNb96TH4OMFmjxSwLgdIuLJsjc2IpSvsF4RFp/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      setIsSuccess(true);
      // Reset Form
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        company: "",
        gstNumber: "",
      });
      setOtp("");
      setShowOtpInput(false);

      setTimeout(() => {
        setIsSuccess(false);
        setIsFormOpen(false);
      }, 3000);
    } catch (error) {
      console.error("OTP Error:", error);
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fix for TypeScript window object
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).recaptchaVerifier = undefined;
    }
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar */}
        <div className="bg-primary text-white py-3 px-4 flex justify-center items-center shadow-md relative z-10 text-center flex-wrap">
          <span className="text-xm md:text-sm font-bold tracking-wide flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-700 flex-wrap">
            📞 Call us for bulk orders:{" "}
            <a
              href="tel:+919845575885"
              className="text-yellow-300 hover:underline whitespace-nowrap"
            >
              +91 98455 75885
            </a>
          </span>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/vip_logo.jpg"
              alt="VIP Online"
              className="h-12 w-auto object-contain" /* Adjust h-12 to make it bigger/smaller */
            />
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-lg mx-8 relative"
          >
            <input
              type="text"
              placeholder="Search for Plywood, Locks, Hafele..."
              className="w-full border border-gray-300 btn-capsule py-2 px-4 pl-10 focus:outline-none focus:border-primary"
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

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4 text-gray-700">
            <Link href="/products" className="hover:text-primary font-medium">
              Browse Catalog
            </Link>
            <a
              href="https://wa.me/919845575885?text=Hello, I saw your website and would like product details and pricing."
              className="flex items-center bg-green-500 text-white px-4 py-2 btn-capsule hover:bg-green-600 transition"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm font-bold">Enquire</span>
            </a>
          </div>

          {/* Mobile Right */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="https://wa.me/919845575885?text=Hello, I saw your website and would like product details and pricing."
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-400 text-white px-4 py-2 btn-capsule shadow-lg shadow-green-200 animate-pulse border-2 border-green-300 transform active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span className="font-bold uppercase text-sm tracking-wide">
                Enquire
              </span>
            </a>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4 w-full">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:border-primary bg-gray-50 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute left-3 top-3.5 text-gray-400"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Contractor Banner */}
        <div
          onClick={() => setIsFormOpen(true)}
          className="relative overflow-hidden bg-accent text-gray-900 font-bold text-center py-2 px-4 cursor-pointer hover:bg-yellow-500 transition border-t border-b border-yellow-600 group"
        >
          <div
            className="absolute inset-0 w-1/2 h-full z-0"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "skewX(-20deg)",
              animation: "rollLight 2.5s infinite linear",
            }}
          />
          <span className="relative z-10 inline-block leading-tight text-xs md:text-sm tracking-wide">
            🎉Sign up for latest updates & exclusive offers🎉
          </span>
        </div>
      </nav>

      {/* --- POPUP MODAL --- */}
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
                    Application Verified & Sent!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    We will verify your details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyAndSubmit} className="space-y-4">
                  {/* Invisible Recaptcha Container */}
                  <div id="recaptcha-container"></div>

                  {!showOtpInput ? (
                    // STEP 1: Details Form
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name*"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>

                      {/* Phone Input */}
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number (10 digits)*"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none font-bold tracking-wide"
                        />
                      </div>

                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                      />
                      <input
                        type="text"
                        placeholder="GST Number (Optional)"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                      />

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 text-gray-400 text-sm">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-300" />{" "}
                        File upload enabled after verification.
                      </div>

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-bold py-3 btn-capsule hover:bg-gray-800 transition mt-4 disabled:opacity-50"
                      >
                        {isSubmitting
                          ? "Sending OTP..."
                          : "Verify Mobile Number"}
                      </button>
                    </>
                  ) : (
                    // STEP 2: OTP Entry
                    <div className="text-center animate-in slide-in-from-right-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Enter OTP
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        Sent to +91 {formData.phone}
                      </p>

                      <input
                        type="text"
                        placeholder="XXXXXX"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-32 text-center text-2xl font-bold border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none tracking-widest mb-4"
                        maxLength={6}
                      />

                      {otpError && (
                        <p className="text-red-500 text-sm mb-4 font-bold">
                          {otpError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 text-white font-bold py-3 btn-capsule hover:bg-green-600 transition disabled:opacity-50 shadow-lg shadow-green-100"
                      >
                        {isSubmitting
                          ? "Verifying..."
                          : "Verify & Submit Application"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowOtpInput(false);
                          setOtp("");
                          setOtpError("");
                        }}
                        className="mt-4 text-xs text-gray-500 underline"
                      >
                        Change Number
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
