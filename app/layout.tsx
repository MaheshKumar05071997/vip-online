import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO IMPROVEMENT: GLOBAL METADATA ---
export const metadata: Metadata = {
  title: {
    default: "VIP Online | Premium Plywood, Hardware & Interior Fittings",
    template: "%s | VIP Online", // This allows sub-pages to look like "Hafele Hinge | VIP Online"
  },
  description:
    "Authorized dealers of Hafele, Blum, Greenply, and Godrej. Buy premium plywood, hardware, kitchen fittings, and safes at wholesale prices in Bangalore.",
  keywords: [
    "VIP HegdeNagar",
    "VIP Hegde Nagar",
    "Vishwakarma Interior Products Hegde Nagar",
    "Vishwakarma Interior Products",
    "VIP",
    "Plywood",
    "Hardware",
    "Interior Fittings",
    "Hafele",
    "Blum",
    "Greenply",
    "Godrej Safes",
    "Bangalore Hardware Shop",
    "Wholesale Plywood",
  ],
  openGraph: {
    title: "VIP Online | Wholesale Interior Products",
    description:
      "Premium interior products at wholesale prices. Authorized dealers for top global brands.",
    type: "website",
    locale: "en_IN", // Targeting India
    siteName: "VIP Online",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
