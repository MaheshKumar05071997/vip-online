"use client";

import { useState, FormEvent, useEffect } from "react";
import { Phone, CheckCircle, X, Upload } from "lucide-react";
import { auth } from "@/app/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

type Props = {
  productName: string;
};

export default function ProductActionButtons({ productName }: Props) {
  // --- Form & OTP States ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  // Initialize Recaptcha (Unique ID for Product Page)
  useEffect(() => {
    if (isFormOpen) {
      setTimeout(() => {
        try {
          if (!window.recaptchaVerifierProduct) {
            window.recaptchaVerifierProduct = new RecaptchaVerifier(
              auth,
              "recaptcha-container-product", // Unique ID
              {
                size: "invisible",
                callback: () => {},
              }
            );
          }
        } catch (err) {
          console.error("Recaptcha Error:", err);
        }
      }, 500);
    }
  }, [isFormOpen]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSubmitting(true);
    const phoneNumber = "+91" + formData.phone;
    try {
      const appVerifier = window.recaptchaVerifierProduct;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult);
      setShowOtpInput(true);
      alert("OTP Sent to " + phoneNumber);
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify & Submit
  const handleVerifyAndSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setIsSubmitting(true);
    try {
      if (!verificationId) throw new Error("No verification ID");
      await verificationId.confirm(otp);
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

  // Fix window type
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).recaptchaVerifierProduct = undefined;
    }
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        {/* 1. WhatsApp Enquire Button */}
        <a
          href={`https://wa.me/919845575885?text=Hi, I am interested in ${productName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 btn-capsule font-bold text-lg hover:bg-green-600 transition flex items-center justify-center gap-2 shadow-lg shadow-green-100"
        >
          <Phone className="w-5 h-5" /> Enquire on WhatsApp
        </a>

        {/* 2. Sign Up Button */}
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full sm:w-auto bg-accent text-gray-900 px-8 py-4 btn-capsule font-bold text-lg hover:bg-yellow-500 transition flex items-center justify-center gap-2 shadow-lg shadow-yellow-100 border border-yellow-600"
        >
          Sign Up for Best Price
        </button>
      </div>

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
                Get Wholesale Rates
              </h2>
              <p className="text-blue-100 text-sm mt-2">
                Sign up to unlock contractor pricing for {productName}
              </p>
            </div>

            {/* Form Body */}
            <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Request Sent!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Our team will contact you with the best rates shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyAndSubmit} className="space-y-4">
                  <div id="recaptcha-container-product"></div>

                  {!showOtpInput ? (
                    // Step 1: Details
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
                      <input
                        type="tel"
                        placeholder="Phone Number*"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none font-bold tracking-wide"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-bold py-3 btn-capsule hover:bg-gray-800 transition mt-4"
                      >
                        {isSubmitting ? "Sending OTP..." : "Get OTP"}
                      </button>
                    </>
                  ) : (
                    // Step 2: OTP
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Enter OTP
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Sent to +91 {formData.phone}
                      </p>
                      <input
                        type="text"
                        placeholder="XXXXXX"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-32 text-center text-2xl font-bold border border-gray-300 rounded-lg p-2 mb-4 tracking-widest"
                        maxLength={6}
                      />
                      {otpError && (
                        <p className="text-red-500 text-sm mb-2">{otpError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 text-white font-bold py-3 btn-capsule hover:bg-green-600 transition"
                      >
                        {isSubmitting ? "Verifying..." : "Verify & Submit"}
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
