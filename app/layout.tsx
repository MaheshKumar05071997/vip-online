import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader"; // <--- 1. ADD IMPORT

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO: GLOBAL CONFIG ---
// 1. Replace with your ACTUAL DOMAIN (e.g. https://viponline.in)
const BASE_URL = "https://viponline.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL), // Critical for OpenGraph images
  title: {
    default: "VIP Online | Premium Plywood, Hardware & Interior Fittings",
    template: "%s | VIP Online", // This adds "| VIP Online" to every page title automatically
  },
  description:
    "Authorized dealers of Hafele, Blum, Greenply, and Godrej in Bangalore. Wholesale prices on Plywood, Laminates, and Kitchen Fittings.",
  keywords: [
    "VIP Hegde Nagar",
    "Plywood Dealers Bangalore",
    "Hafele Fittings",
    "Blum Hardware",
    "Greenply Wholesale",
    "Godrej Safes",
    "Kitchen Basket",
    "Interior Hardware Shop",
    "Vishwakarma Interior Products",
    "Vishwakarma Interiors",
    "Rakesh Kumar",
    "Rakesh Kumar Vishwakarma",
    "Plywood Shop in Hegde Nagar",
  ],

  // --- ADD THIS BLOCK ---
  verification: {
    google: "2vtRi8AibpdSpfJ8PmBNTPpK_2D5louhSd-9y4QIZ6o",
  },
  openGraph: {
    title: "VIP Online | Wholesale Interior Products",
    description: "Premium interior products at wholesale prices in Bangalore.",
    url: BASE_URL,
    siteName: "VIP Online",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-orange-50`}
      >
        {/* 2. ADD THE LOADER COMPONENT HERE */}
        <NextTopLoader
          color="#F97316" // VIP Orange Color
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true} // Set to false if you don't want the spinner circle on top right
          easing="ease"
          speed={200}
          shadow="0 0 10px #F97316,0 0 5px #F97316"
        />

        {children}
      </body>
    </html>
  );
}
