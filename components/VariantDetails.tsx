"use client";

import FadeIn from "@/components/FadeIn";
import { Product } from "@/app/data";
import {
  ArrowLeft,
  Phone,
  ShieldCheck,
  X,
  CheckCircle,
  Upload,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { auth } from "@/app/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useRouter } from "next/navigation";

interface VariantDetailsProps {
  product: Product;
  variantName: string;
}

export default function VariantDetails({
  product,
  variantName,
}: VariantDetailsProps) {
  const router = useRouter();

  // Find the specific variant from the passed product
  const variant = product.variants?.find(
    (v: any) => (v.name || v) === variantName
  ) as any;

  // If variant not found, show a simple error or redirect
  if (!variant) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">Variant Not Found</h2>
        <Link href="/products" className="text-blue-500 underline mt-4 block">
          Go back to products
        </Link>
      </div>
    );
  }

  // Selection Hooks
  const [selectedThickness, setSelectedThickness] = useState(
    variant.thickness ? variant.thickness[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    variant.sizes ? variant.sizes[0] : ""
  );

  // Dynamic Price Logic
  const getDynamicPrice = () => {
    let currentPrice = variant.price;
    let currentOriginal = variant.originalPrice;

    if (variant.priceList) {
      const comboKey = `${selectedThickness}_${selectedSize}`;
      const thicknessKey = selectedThickness;
      const sizeKey = selectedSize;

      if (selectedThickness && selectedSize && variant.priceList[comboKey]) {
        currentPrice = variant.priceList[comboKey].price;
        currentOriginal = variant.priceList[comboKey].originalPrice;
      } else if (selectedThickness && variant.priceList[thicknessKey]) {
        currentPrice = variant.priceList[thicknessKey].price;
        currentOriginal = variant.priceList[thicknessKey].originalPrice;
      } else if (selectedSize && variant.priceList[sizeKey]) {
        currentPrice = variant.priceList[sizeKey].price;
        currentOriginal = variant.priceList[sizeKey].originalPrice;
      }
    }
    return { price: currentPrice, original: currentOriginal };
  };

  const { price, original } = getDynamicPrice();

  const specs = variant.specs || {
    Grade: "Standard",
    Type: product.category,
    Warranty: "Manufacturer Warranty",
    Usage: "Interior / Exterior",
  };

  // --- FORM & OTP LOGIC ---
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

  useEffect(() => {
    if (isFormOpen) {
      setTimeout(() => {
        try {
          if (!(window as any).recaptchaVerifierVariant) {
            (window as any).recaptchaVerifierVariant = new RecaptchaVerifier(
              auth,
              "recaptcha-container-variant",
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

  const handleSendOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsSubmitting(true);
    const phoneNumber = "+91" + formData.phone;

    try {
      const appVerifier = (window as any).recaptchaVerifierVariant;
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

  const handleVerifyAndSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError("");
    setIsSubmitting(true);
    try {
      if (!verificationId) throw new Error("No verification ID");
      await verificationId.confirm(otp);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).recaptchaVerifierVariant = undefined;
    }
  }, []);

  // --- CHANGED LOGIC START ---
  // If only 1 variant exists, go back to the Category Page (Products List)
  // Otherwise, go back to the Product Page (Variant List)
  const isSingleVariant = product.variants && product.variants.length === 1;

  const backLink = isSingleVariant
    ? `/products?category=${encodeURIComponent(product.category)}`
    : `/products/${product.id}`;
  // --- CHANGED LOGIC END ---

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <Link
            href={backLink}
            className="text-gray-500 hover:text-primary flex items-center text-sm font-medium"
          >
            {/* Update Label slightly based on destination */}
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isSingleVariant
              ? `Back to ${product.category}`
              : `Back to ${product.name}`}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: LARGE IMAGE */}
          <div className="bg-white rounded-2xl overflow-hidden border border-orange-100 relative lg:sticky lg:top-24 h-fit shadow-lg">
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

            <div className="mb-6 pb-6 border-b border-gray-200 mt-4">
              {price ? (
                <div className="flex items-end gap-3">
                  {original && (
                    <span className="text-gray-400 line-through text-lg">
                      Rs. {original}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-red-500">
                    Rs. {price}
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

              <p
                onClick={() => setIsFormOpen(true)}
                className="text-xs text-blue-600 font-medium mt-2 cursor-pointer hover:underline flex items-center gap-1"
              >
                Click here to get Professional discounted prices{" "}
                <ArrowRight className="w-3 h-3" />
              </p>
            </div>

            {/* THICKNESS SELECTOR */}
            {variant.thickness && variant.thickness.length > 0 && (
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

            {/* SIZE SELECTOR */}
            {variant.sizes && variant.sizes.length > 0 && (
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

            <div className="flex gap-4 mb-10">
              <a
                href={`https://wa.me/919845575885?text=Hi, I am interested in ${variant.name} (${selectedThickness} - ${selectedSize}). Please quote best price.`}
                className="flex-1 bg-accent text-gray-900 font-bold py-4 btn-capsule hover:bg-yellow-500 transition text-center shadow-lg shadow-yellow-100 flex items-center justify-center gap-2"
              >
                Get the Best Quotes
              </a>
              <a
                href="tel:+919845575885"
                className="flex-1 border border-gray-300 text-gray-700 font-bold py-4 btn-capsule hover:bg-white transition text-center flex items-center justify-center gap-2 bg-white/50"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>

            {/* SPECS */}
            <div className="bg-white rounded-xl p-6 border border-orange-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                Product Description & Specs
              </h3>
              <div className="space-y-0 text-sm">
                {Object.entries(specs).map(([key, value], idx) => (
                  <div
                    key={key}
                    className={`grid grid-cols-3 py-3 border-b border-gray-100 ${
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

      {/* POPUP FORM */}
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
                  <h3 className="text-2xl font-bold">
                    Application Verified & Sent!
                  </h3>
                  <p className="text-gray-500 mt-2">
                    We will verify your details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleVerifyAndSubmit} className="space-y-4">
                  <div id="recaptcha-container-variant"></div>

                  {!showOtpInput ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name*"
                          required
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                      <input
                        type="tel"
                        placeholder="Phone* (+91)"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={10}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none font-bold tracking-wide"
                      />
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                      />
                      <input
                        type="text"
                        placeholder="GST Number (Optional)"
                        name="gstNumber"
                        value={formData.gstNumber}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-primary outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSubmitting}
                        className="w-full bg-black text-white font-bold py-3 btn-capsule mt-4 hover:bg-gray-800 transition disabled:opacity-50"
                      >
                        {isSubmitting
                          ? "Sending OTP..."
                          : "Verify Mobile Number"}
                      </button>
                    </>
                  ) : (
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
