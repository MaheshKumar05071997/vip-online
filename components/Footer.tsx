"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  X,
  Upload,
} from "lucide-react";
import { CATEGORIES, FEATURED_BRANDS } from "@/app/data";
import { useState, FormEvent, useEffect } from "react";
import { auth } from "@/app/firebase"; // Ensure this import exists
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

export default function Footer() {
  // --- Contractor Form States ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- OTP Logic States ---
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

  // 1. Initialize Recaptcha when the modal opens (Unique ID for Footer)
  useEffect(() => {
    if (isFormOpen) {
      // Small delay to ensure DOM element exists
      setTimeout(() => {
        try {
          // Use a specific property for footer recaptcha to avoid conflict with Navbar
          if (!window.recaptchaVerifierFooter) {
            window.recaptchaVerifierFooter = new RecaptchaVerifier(
              auth,
              "recaptcha-container-footer", // Unique ID for footer
              {
                size: "invisible",
                callback: () => {
                  // reCAPTCHA solved
                },
              }
            );
          }
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
    const phoneNumber = "+91" + formData.phone;

    try {
      const appVerifier = window.recaptchaVerifierFooter;
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
      alert("Failed to send OTP. Please try again (Check Console).");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. Step 2: Verify OTP & Submit
  const handleVerifyAndSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setIsSubmitting(true);

    try {
      if (!verificationId) throw new Error("No verification ID");

      // A. Verify OTP
      await verificationId.confirm(otp);

      // B. Submit to Google Sheet
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
      console.error("OTP/Submission Error:", error);
      setOtpError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Type definition for window object to avoid TS errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).recaptchaVerifierFooter = undefined;
    }
  }, []);

  return (
    <footer className="bg-white pt-12 border-t border-gray-100 relative">
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
              className="bg-accent text-gray-900 px-6 py-3 btn-capsule font-bold hover:bg-yellow-500 transition shadow-lg shadow-yellow-100"
            >
              Sign Up as Contractor
            </button>
            <a
              href="https://wa.me/919845575885"
              className="border border-gray-300 px-6 py-3 btn-capsule font-semibold hover:bg-gray-100 transition"
            >
              Get Instant Quote
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS */}
      <div className="container mx-auto px-4 pb-12">
        {/* TRUSTED PARTNERS */}
        <div className="mb-12 border-b border-gray-100 pb-12">
          <h4 className="font-bold text-gray-900 mb-8 text-sm uppercase tracking-widest text-center">
            Our Trusted Partners
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {FEATURED_BRANDS.map((brand, idx) => (
              <Link
                key={idx}
                href={`/products?search=${encodeURIComponent(brand.name)}`}
                // CHANGED: Increased mobile size to 'w-32 h-16' (same as desktop) for better visibility
                className="group w-32 h-16 md:w-32 md:h-16 relative flex items-center justify-center bg-white rounded-lg p-2 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 block">
              <img
                src="/vip_logo.jpg"
                alt="VIP Online"
                className="h-16 w-auto object-contain" /* Slightly larger for footer */
              />
            </Link>

            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              <b>Vishwakarma Interior Products.</b>
              <br />
              Premium Hardware & Plywood Solutions for modern homes.
            </p>
            <p className="text-xs text-gray-400 mb-6">GSTIN: 29AEGPV8823C2Z4</p>
            <div className="flex space-x-4 justify-center md:justify-start">
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

          {/* Product Range */}
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

          {/* Quick Links */}
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
                className="flex items-center justify-center md:justify-start hover:text-primary font-bold"
              >
                <Phone className="w-4 h-4 mr-2 text-accent" /> +91 98455 75885
              </a>
              <a
                href="mailto:sales@viponline.in"
                className="flex items-center justify-center md:justify-start hover:text-primary"
              >
                <Mail className="w-4 h-4 mr-2 text-accent" /> sales@viponline.in
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="lg:col-span-1" id="our-location">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider text-accent">
              Our Location
            </h4>
            <p className="text-xs text-gray-500 mb-3 flex items-start justify-center md:justify-start">
              <MapPin className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
              536, Vishwakarma Complex Basement and Ground Floor, 2nd Main
              Thanisandra, Main Road Dr, S R K Nagar, Post, RK Hegde Nagar,
              Bengaluru, Karnataka 560077
            </p>
            <div className="rounded-lg overflow-hidden h-32 bg-gray-200 border border-gray-300">
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

      {/* COPYRIGHT */}
      <div className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>© 2026 Vishwakarma Interior Products. All rights reserved.</p>
      </div>

      {/* STICKY CALL BUTTON */}
      <a
        href="tel:+919845575885"
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4"
        style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
      >
        <Phone className="w-5 h-5 animate-pulse" />
        <span className="font-bold text-lg hidden md:block">Call Now</span>
        <span className="font-bold text-lg md:hidden">Call</span>
      </a>

      {/* --- CONTRACTOR FORM MODAL --- */}
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
                  {/* Invisible Recaptcha Container (Unique ID for Footer) */}
                  <div id="recaptcha-container-footer"></div>

                  {!showOtpInput ? (
                    // STEP 1: DETAILS FORM
                    <>
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
                            maxLength={10}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none font-bold tracking-wide"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email (Optional)
                          </label>
                          <input
                            type="email"
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
                    // STEP 2: OTP ENTRY
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
    </footer>
  );
}
